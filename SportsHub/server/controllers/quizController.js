// controllers/quizController.js
const Question = require('../models/Question');
const QuizResult = require('../models/QuizResult');
const {
    getAvailableApiKey,
    recordApiCall,
    disableKeyTemporarily,
} = require('../utils/geminiApiManager');
const fetch = require('node-fetch').default; 
const mongoose = require('mongoose');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function generateQuizPrompt(sport, difficulty, count, existingQuestions = []) {
    const difficultyMap = {
        easy: "General knowledge about rules, famous players, or basic terminology.",
        medium: "Questions about significant past events, specific player achievements, or more detailed rules.",
        hard: "In-depth questions requiring analysis, strategic understanding, or knowledge of niche historical facts."
    };

    // Instruction to avoid similar questions based on recent ones
    const uniquenessInstruction = existingQuestions.length > 0
        ? `CRITICAL: Do not generate questions similar to these recent examples:\n${existingQuestions.map(q => `"${q}"`).join('\n')}\n`
        : "Ensure questions are fresh and varied. Avoid repeating common facts.";

    return `You are a world-class sports quiz master for ${sport}.
Generate exactly ${count} unique, multiple-choice quiz questions about ${sport}.
The difficulty level must be strictly '${difficulty}'. This means: ${difficultyMap[difficulty]}

Each question must have:
1. "question_text": The question itself.
2. "options": An array of 4 string options.
3. "correct_answer": The exact string of the correct option.
4. "explanation": A brief, 1-2 sentence explanation.

${uniquenessInstruction}

Format your output as a valid JSON array of objects. Do not include any other text, markdown, or commentary.
Example: [{"question_text": "...", "options": ["Option A", "Option B", "Option C", "Option D"], "correct_answer": "Option A", "explanation": "This is why."}]`;
}

// --- Scheduled Daily Question Generation Configuration ---
const SPORTS_TO_GENERATE_FOR = ["Cricket", "Football", "Basketball", "Tennis", "chess"];
const QUESTION_BREAKDOWN = { easy: 20, medium: 20, hard: 20 }; // Each level now generates 20 questions
const WAIT_BETWEEN_REQUESTS_MS = 2000; // A polite delay after each successful API call
const WAIT_FOR_KEY_RETRY_MS = 10 * 1000; // Check for an available key every 10 seconds

async function generateAndStoreDailyQuestions() {
    console.log(`[CRON] Starting daily question generation at ${new Date().toISOString()}`);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Start of today

    const generationTasks = [];
    for (const sport of SPORTS_TO_GENERATE_FOR) {
        for (const [level, count] of Object.entries(QUESTION_BREAKDOWN)) {
            // Count questions generated *today* for this sport and difficulty
            const generatedToday = await Question.countDocuments({ sport, difficulty: level, generatedAt: { $gte: startOfDay } });
            const needed = count - generatedToday;
            if (needed > 0) {
                generationTasks.push({ sport, level, count: needed });
            }
        }
    }

    if (generationTasks.length === 0) {
        console.log("[CRON] All daily questions have already been generated. Job complete.");
        return;
    }

    console.log(`[CRON] Found ${generationTasks.length} tasks to complete.`);

    // *** Main Sequential Loop ***
    for (const task of generationTasks) {
        const { sport, level, count } = task;
        let apiKey = null;

        // 1. Wait for an available API key
        while (!(apiKey = getAvailableApiKey())) {
            console.log(`[CRON] No API key available. Waiting ${WAIT_FOR_KEY_RETRY_MS / 1000}s...`);
            await delay(WAIT_FOR_KEY_RETRY_MS);
        }
        console.log(`[CRON] Acquired key ${apiKey.substring(0, 5)}... for ${sport} (${level})`);

        // 2. Prepare and make the API call
        try {
            // Fetch recent questions (last 50) for uniqueness check by AI
            const recentQuestions = await Question.find({ sport, difficulty: level })
                .sort({ generatedAt: -1 }) // Most recent first
                .limit(50)
                .select('question_text');
            const prompt = generateQuizPrompt(sport, level, count, recentQuestions.map(q => q.question_text));

            // Use gemini-1.5-flash model
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: "application/json" }
                })
            });

            // Record the call *immediately* after it's made, before checking response.ok
            recordApiCall(apiKey);

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`[CRON] Gemini API Error (Status ${response.status}) for ${sport} (${level}):`, JSON.stringify(errorData));
                if (response.status === 429) {
                    disableKeyTemporarily(apiKey);
                }
                // Continue to the next task if this one failed due to API error
                continue;
            }

            // 3. Process and save the result
            const result = await response.json();
            const jsonString = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!jsonString) {
                console.error('[CRON] Invalid API response structure or empty content:', result);
                continue;
            }

            let parsedQuestions;
            try {
                parsedQuestions = JSON.parse(jsonString);
                if (!Array.isArray(parsedQuestions)) {
                    console.error('[CRON] API response was not a JSON array:', jsonString);
                    continue;
                }
            } catch (jsonError) {
                console.error('[CRON] JSON parsing error from API response:', jsonError.message, 'Raw response:', jsonString);
                continue;
            }

            // Calculate archiveAfter date (2 days from now)
            const archiveDate = new Date();
            archiveDate.setDate(archiveDate.getDate() + 2);

            const questionDocs = parsedQuestions.map(q => ({
                sport,
                difficulty: level,
                question_text: q.question_text,
                options: q.options,
                correct_answer: q.correct_answer,
                explanation: q.explanation,
                generatedAt: new Date(),
                archiveAfter: archiveDate // Set the deletion date
            }));

            if (questionDocs.length > 0) {
                await Question.insertMany(questionDocs, { ordered: false }); // ordered: false to continue if some fail (e.g., duplicate question_text if unique was true)
                console.log(`[CRON] ✅ Successfully generated and stored ${questionDocs.length} ${level} questions for ${sport}.`);
            } else {
                console.warn(`[CRON] ⚠️ API returned 0 questions for ${sport} (${level}) despite prompt for ${count}.`);
            }

        } catch (error) {
            console.error(`[CRON] ❌ Failed to process task for ${sport} (${level}). Error:`, error.message);
            // Catch network errors, other unexpected errors during fetch
        } finally {
            // 4. Polite delay before the next task
            await delay(WAIT_BETWEEN_REQUESTS_MS);
        }
    }
    console.log(`[CRON] Daily question generation run finished at ${new Date().toISOString()}.`);
}

// --- API Endpoints ---
const generateQuizForUser = async (req, res) => {
    try {
        const { sports } = req.body;
        const QUIZ_PATTERN = { easy: 3, medium: 4, hard: 3 }; // 10 questions total for user quiz

        if (!sports || !Array.isArray(sports) || sports.length === 0) {
            return res.status(400).json({ message: "An array of sports is required." });
        }

        let selectedQuestions = [];

        for (const sport of sports) {
            for (const [level, count] of Object.entries(QUIZ_PATTERN)) {
                // Find questions that are not due for archiving
                const queryConditions = {
                    sport: sport,
                    difficulty: level,
                    archiveAfter: { $gt: new Date() } // Question must not be older than 2 days
                };

                const questions = await Question.find(queryConditions).limit(count);
                selectedQuestions = selectedQuestions.concat(questions);
            }
        }

        // Fallback: If not enough questions, try to find any available (not yet archived)
        if (selectedQuestions.length < (Object.values(QUIZ_PATTERN).reduce((a, b) => a + b, 0) * sports.length)) {
             for (const sport of sports) {
                 for (const [level, count] of Object.entries(QUIZ_PATTERN)) {
                      // How many more do we need for this sport/level?
                      const currentCount = selectedQuestions.filter(q => q.sport === sport && q.difficulty === level).length;
                      if (currentCount < count) {
                         const fallbackNeeded = count - currentCount;
                         const fallbackQuestions = await Question.find({
                             sport: sport,
                             difficulty: level,
                             _id: { $nin: selectedQuestions.map(q => q._id) }, // Avoid duplicates with already selected
                             archiveAfter: { $gt: new Date() }
                         }).limit(fallbackNeeded);
                         selectedQuestions = selectedQuestions.concat(fallbackQuestions);
                      }
                 }
             }
        }

        if (selectedQuestions.length === 0) {
            console.log('[Quiz] Not enough questions. Attempting to fetch any unarchived questions as fallback.');
            return res.status(202).json({
                message: "Questions are being generated and will be available soon. Please try again in a few minutes!",
                status: "generating",
                info: "Our AI is currently creating fresh questions for this sport. This process ensures high-quality, varied content."
            });
        }

        res.status(200).json({ questions: selectedQuestions });

    } catch (error) {
        console.error('Error generating quiz for user:', error);
        res.status(500).json({ message: "Server error while generating quiz." });
    }
};


const submitQuizResult = async (req, res) => {
    try {
        const { sport, questions, totalTimeTaken } = req.body;
        const userId = req.user._id;

        if (!sport || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "Sport and questions array are required." });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID format." });
        }

        // Calculate results
        const correctAnswers = questions.filter(q => q.isCorrect).length;
        const totalQuestions = questions.length;
        const score = Math.round((correctAnswers / totalQuestions) * 100);

        // Create quiz result
        const quizResult = new QuizResult({
            userId,
            sport,
            questions: questions.map(q => ({
                questionId: q.questionId,
                selectedAnswer: q.selectedAnswer,
                correctAnswer: q.correctAnswer,
                isCorrect: q.isCorrect,
                timeTaken: q.timeTaken
            })),
            totalQuestions,
            correctAnswers,
            score,
            timeTaken: totalTimeTaken
        });

        await quizResult.save();

        res.status(200).json({
            message: "Quiz result submitted successfully",
            result: {
                score,
                correctAnswers,
                totalQuestions,
                percentage: score
            }
        });

    } catch (error) {
        console.error('Error submitting quiz result:', error);
        res.status(500).json({ message: "Server error while submitting quiz result." });
    }
};

const getUserQuizResults = async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 10, page = 1 } = req.query;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID format." });
        }

        const skip = (page - 1) * limit;
        
        const results = await QuizResult.find({ userId })
            .sort({ completedAt: -1 })
            .limit(parseInt(limit))
            .skip(skip)
            .populate('questions.questionId', 'question_text difficulty');

        const totalResults = await QuizResult.countDocuments({ userId });

        res.status(200).json({
            results,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalResults / limit),
                totalResults,
                hasNext: skip + results.length < totalResults,
                hasPrev: page > 1
            }
        });

    } catch (error) {
        console.error('Error fetching user quiz results:', error);
        res.status(500).json({ message: "Server error while fetching quiz results." });
    }
};

module.exports = {
    generateAndStoreDailyQuestions,
    generateQuizForUser,
    submitQuizResult,
    getUserQuizResults
};
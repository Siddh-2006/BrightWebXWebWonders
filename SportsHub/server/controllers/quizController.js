const mongoose = require('mongoose');
const Question = require('../models/Question');
const UserQuizHistory = require('../models/UserQuizHistory');
const { getAvailableApiKey, updateKeyUsage, GEMINI_API_KEYS, GEMINI_PRO_DAILY_TOKEN_LIMIT } = require('../utils/geminiApiManager');
const fetch = require('node-fetch').default; // Ensure node-fetch is installed and available

/**
 * Utility function to introduce a delay.
 * @param {number} ms - The delay in milliseconds.
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates the prompt string for the Gemini API based on sport, difficulty, and count.
 * Includes instructions for generating explanations.
 * @param {string} sport The selected sport (e.g., "Cricket", "Football").
 * @param {string} difficulty_level The difficulty level ("easy", "medium", "hard").
 * @param {number} count The number of questions to generate.
 * @returns {string} The formatted prompt string.
 */
function generateQuizPrompt(sport, difficulty_level, count) {
    let specific_instructions = "";

    if (difficulty_level === "easy") {
        specific_instructions = `Easy: General knowledge about the basic rules, common terms, equipment, or famous players of ${sport}. Questions should be straightforward and widely known. Examples: "How many players are on a football team?", "What is the standard length of a cricket pitch in yards?".`;
    } else if (difficulty_level === "medium") {
        specific_instructions = `Medium: Questions about significant past matches, key historical events, important player achievements, or more detailed rules of ${sport}. Avoid asking for exact scores or obscure statistics. Focus on the narrative or impact. Examples: "Which famous football match is known as the 'Miracle of Istanbul'?", "Who holds the record for the most centuries in Test cricket?".`;
    } else if (difficulty_level === "hard") {
        specific_instructions = `Hard: Questions that require deeper understanding, logical deduction, scenario analysis, or distinguishing between very similar options. These should not be simple facts. For example, a question about complex qualification scenarios, strategic decisions, or subtle rule interpretations. Examples: "If CSK needs to maintain a Net Run Rate of +0.5 to qualify for the playoffs, and their next match is against RCB who needs to win by at least 30 runs to stay in contention, what's a realistic outcome for CSK to qualify assuming MI loses their next game?", "All of the following are types of 'outs' in cricket EXCEPT: a) Caught, b) Bowled, c) Leg Before Wicket, d) Run Out by a throw from the boundary." (where all options are valid but one is slightly out of context or a trick).`;
    }

    return `You are an expert sports quiz master. Your task is to generate exactly ${count} multiple-choice quiz questions about ${sport}.
Each question should have 4 options, with only one correct answer.
For each question, also provide a concise explanation (1-2 sentences) of why the correct answer is correct.
The questions must adhere to the following difficulty level guidelines for a knowledgeable sports fan:

${specific_instructions}

Ensure questions are engaging and test genuine fan knowledge, not just obscure facts or exact score memorization.
The questions should be fresh and varied within the chosen sport and difficulty.
Do not repeat questions.
Format your output as a JSON array of question objects. Each object must have the following keys:
- "question_text": (string) The full question.
- "options": (array of strings) An array containing exactly 4 distinct answer options.
- "correct_answer": (string) The exact text of the correct answer from the "options" array.
- "explanation": (string) A brief explanation of why the correct answer is correct.

Example JSON structure for one question:
[
  {
    "question_text": "What is the primary objective of a batsman in cricket?",
    "options": ["To hit boundaries only", "To score runs and protect their wicket", "To get the opposition out", "To stop the ball from reaching the boundary"],
    "correct_answer": "To score runs and protect their wicket",
    "explanation": "The batsman's main goal is to score runs for their team while preventing their wicket from being dismissed by the fielding side."
  }
]
`;
}

// --- Scheduled Daily Question Generation ---
const SPORTS_TO_GENERATE_FOR = ["Cricket", "Football", "Basketball", "Tennis", "Formula 1", "Boxing"];
// Increased question breakdown to generate many more questions daily
const QUESTION_BREAKDOWN = { easy: 20, medium: 20, hard: 20 }; // Now generating 60 questions per sport daily

// Recommended delay between API calls to avoid hitting per-minute rate limits
const API_CALL_DELAY_MS = 2000; // 2 seconds delay between each question generation API call

/**
 * Function to generate and store questions daily.
 * This function is scheduled to run automatically.
 */
async function generateAndStoreDailyQuestions() {
    console.log(`[CRON] Starting daily question generation at ${new Date().toISOString()}`);

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

    const expectedTotalQuestions = SPORTS_TO_GENERATE_FOR.length * (QUESTION_BREAKDOWN.easy + QUESTION_BREAKDOWN.medium + QUESTION_BREAKDOWN.hard);
    const existingQuestionsCount = await Question.countDocuments({
        generatedAt: { $gte: startOfDay }
    });

    if (existingQuestionsCount >= expectedTotalQuestions) {
        console.log("[CRON] Questions for today already seem to exist in sufficient quantity. Skipping generation.");
        return;
    }

    for (const sport of SPORTS_TO_GENERATE_FOR) {
        for (const [level, count] of Object.entries(QUESTION_BREAKDOWN)) {
            const prompt = generateQuizPrompt(sport, level, count);
            let currentApiKey = null;
            let generatedForThisLevel = false;
            let retryAttempts = 0;
            const MAX_API_RETRIES = GEMINI_API_KEYS.length;

            while (!generatedForThisLevel && retryAttempts < MAX_API_RETRIES) {
                currentApiKey = getAvailableApiKey();

                if (!currentApiKey) {
                    console.error(`[CRON] All API keys exhausted for ${sport} (${level}). Skipping further generation for this sport/level.`);
                    break;
                }

                try {
                    const payload = {
                        contents: [{ role: "user", parts: [{ text: prompt }] }],
                        generationConfig: {
                            responseMimeType: "application/json",
                        }
                    };

                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${currentApiKey}`;

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error(`[CRON] Gemini API error for key ${currentApiKey.substring(0, 5)}...:`, response.status, errorData);
                        if (response.status === 429) {
                            updateKeyUsage(currentApiKey, GEMINI_PRO_DAILY_TOKEN_LIMIT); // Mark as fully used
                            retryAttempts++;
                            await delay(API_CALL_DELAY_MS * 5); // Longer delay before retrying with new key
                            continue;
                        } else {
                            throw new Error(`Gemini API error: ${errorData.error.message || response.statusText}`);
                        }
                    }

                    const result = await response.json();
                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        
                        const jsonString = result.candidates[0].content.parts[0].text;
                        const parsedQuestions = JSON.parse(jsonString);

                        const estimatedTokens = jsonString.length / 4;
                        updateKeyUsage(currentApiKey, estimatedTokens);
                        
                        for (const q of parsedQuestions) {
                            const newQuestion = new Question({
                                sport: sport,
                                question_text: q.question_text,
                                options: q.options,
                                correct_answer: q.correct_answer,
                                explanation: q.explanation,
                                difficulty: level,
                                generatedAt: new Date()
                            });
                            await newQuestion.save();
                        }
                        console.log(`[CRON] Successfully generated and stored ${parsedQuestions.length} ${level} questions for ${sport}.`);
                        generatedForThisLevel = true;
                        retryAttempts = 0;
                    } else {
                        console.error("[CRON] Unexpected Gemini API response structure:", result);
                        throw new Error("Failed to get valid content from Gemini API.");
                    }
                } catch (apiError) {
                    console.error(`[CRON] Error during Gemini API call for ${sport} (${level}) with key ${currentApiKey.substring(0, 5)}...:`, apiError);
                    retryAttempts++;
                    if (retryAttempts >= MAX_API_RETRIES) {
                        console.error(`[CRON] Failed to generate questions for ${sport} (${level}) after multiple retries.`);
                        break;
                    }
                    console.log(`[CRON] Retrying with a different key... (Attempt ${retryAttempts}/${MAX_API_RETRIES})`);
                    await delay(API_CALL_DELAY_MS); // Delay before retrying with the same or next key
                }
            } // End while loop for retries
            if (generatedForThisLevel) {
                await delay(API_CALL_DELAY_MS); // Delay between different levels/sports API calls
            }
        }
    }
    console.log(`[CRON] Daily question generation finished at ${new Date().toISOString()}`);
}

/**
 * Function to delete old questions from the database.
 * Questions are automatically deleted by the `expires` index on `generatedAt` field after 7 days (TTL index).
 * This function is primarily for logging that the TTL index is working.
 */
async function deleteOldQuestions() {
    console.log(`[CRON] Starting old question deletion at ${new Date().toISOString()}`);
    console.log(`[CRON] Old question deletion process finished. (Handled by TTL index)`);
}


// --- API Endpoint Functions ---

/**
 * Handles the request to retrieve a new quiz for a user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const generateQuizForUser = async (req, res) => {
    const { sports } = req.body;
    const userId = req.user.id; // Get userId from authenticated user

    const QUIZ_PATTERN = { easy: 3, medium: 3, hard: 4 };

    if (!sports || sports.length === 0 || !userId) {
        return res.status(400).json({ message: "Please select at least one sport and provide a userId." });
    }

    try {
        let userHistory = await UserQuizHistory.findOne({ userId });
        if (!userHistory) {
            userHistory = new UserQuizHistory({ userId, seenQuestionIds: [] });
            await userHistory.save();
            console.log(`New user history created for userId: ${userId}`);
        }

        const seenIds = userHistory.seenQuestionIds.map(id => id.toString());
        let selectedQuestions = [];
        let newSeenQuestionIds = [...seenIds];

        for (const sport of sports) {
            for (const [level, count] of Object.entries(QUIZ_PATTERN)) {
                let questionsForLevel = [];
                let availableQuestions = [];

                availableQuestions = await Question.find({
                    sport: sport,
                    difficulty: level,
                    _id: { $nin: newSeenQuestionIds }
                }).limit(count * 10);

                if (availableQuestions.length < count) {
                    console.warn(`Not enough unseen ${level} questions for ${sport}. Fetching from all available, potentially repeating questions.`);
                    availableQuestions = await Question.find({
                        sport: sport,
                        difficulty: level
                    }).limit(count * 10);
                }

                availableQuestions.sort(() => Math.random() - 0.5);
                questionsForLevel = availableQuestions.slice(0, count);

                selectedQuestions = selectedQuestions.concat(questionsForLevel);
                questionsForLevel.forEach(q => {
                    if (!newSeenQuestionIds.includes(q._id.toString())) {
                        newSeenQuestionIds.push(q._id.toString());
                    }
                });
            }
        }

        selectedQuestions.sort(() => Math.random() - 0.5);

        userHistory.seenQuestionIds = newSeenQuestionIds;
        userHistory.lastActivity = new Date();
        await userHistory.save();
        console.log(`User ${userId} quiz history updated. Seen questions: ${userHistory.seenQuestionIds.length}`);

        if (selectedQuestions.length === 0) {
            return res.status(404).json({ message: "Could not find enough questions for the selected sports and difficulty levels. Please try again later or select different sports." });
        }

        res.status(200).json({ quizId: userHistory._id, questions: selectedQuestions });

    } catch (error) {
        console.error('Error retrieving quiz for user:', error);
        res.status(500).json({ message: "An unexpected error occurred while retrieving your quiz.", error: error.message });
    }
};

/**
 * Handles the request to get a user's quiz history (for debugging/display).
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const getUserQuizHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const userHistory = await UserQuizHistory.findOne({ userId }).populate('seenQuestionIds');
        if (!userHistory) {
            return res.status(404).json({ message: "No quiz history found for this user." });
        }
        res.status(200).json(userHistory);
    } catch (error) {
        console.error('Error fetching user quiz history:', error);
        res.status(500).json({ message: "Error fetching user quiz history.", error: error.message });
    }
};

module.exports = {
    generateQuizPrompt,
    generateAndStoreDailyQuestions,
    deleteOldQuestions,
    generateQuizForUser,
    getUserQuizHistory
};
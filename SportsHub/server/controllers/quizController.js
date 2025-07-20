const mongoose = require('mongoose');
const Question = require('../models/Question');
const UserQuizHistory = require('../models/UserQuizHistory');
const {
    getAvailableApiKey,
    updateKeyUsage,
    disableKeyTemporarily,
    estimateTokens,
    MAX_RPM_CALLS_PER_KEY
} = require('../utils/geminiApiManager');
const fetch = require('node-fetch').default;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Keep generateQuizPrompt function here ---
// It's a helper function primarily for generateAndStoreDailyQuestions,
// but it's good practice to keep it defined before its first use
// and export it if other modules might need it for clarity,
// although in your current setup, only quizController uses it directly.
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
const QUESTION_BREAKDOWN = { easy: 20, medium: 20, hard: 20 }; // Now generating 60 questions per sport daily
const TOTAL_EXPECTED_QUESTIONS = SPORTS_TO_GENERATE_FOR.length * (QUESTION_BREAKDOWN.easy + QUESTION_BREAKDOWN.medium + QUESTION_BREAKDOWN.hard);

const MIN_OVERALL_API_CALL_DELAY_MS = 2500;
const WAIT_FOR_API_KEY_MS = 15 * 1000;

async function generateAndStoreDailyQuestions() {
    console.log(`[CRON] Starting daily question generation at ${new Date().toISOString()}`);

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

    const existingQuestionsCount = await Question.countDocuments({
        generatedAt: { $gte: startOfDay }
    });

    if (existingQuestionsCount >= TOTAL_EXPECTED_QUESTIONS) {
        console.log("[CRON] Questions for today already seem to exist in sufficient quantity. Skipping generation.");
        return;
    }

    const generationTasks = [];
    for (const sport of SPORTS_TO_GENERATE_FOR) {
        for (const [level, count] of Object.entries(QUESTION_BREAKDOWN)) {
            const countForSportLevel = await Question.countDocuments({
                sport: sport,
                difficulty: level,
                generatedAt: { $gte: startOfDay }
            });

            if (countForSportLevel < count) {
                generationTasks.push({ sport, level, count: count - countForSportLevel });
            } else {
                console.log(`[CRON] Already have enough ${level} questions for ${sport} (${countForSportLevel}/${count}). Skipping task.`);
            }
        }
    }

    generationTasks.sort(() => Math.random() - 0.5);

    let successfullyGeneratedThisRun = 0;

    for (const task of generationTasks) {
        const { sport, level, count } = task;
        if (count <= 0) continue;

        const prompt = generateQuizPrompt(sport, level, count); // This is where it was being called
        let currentApiKey = null;
        let successfulGenerationAttempt = false;
        let retryCount = 0;
        const MAX_API_RETRY_ATTEMPTS = 5;

        while (!successfulGenerationAttempt && retryCount < MAX_API_RETRY_ATTEMPTS) {
            currentApiKey = getAvailableApiKey();

            if (!currentApiKey) {
                console.warn(`[CRON] No API key available for ${sport} (${level}). Waiting ${WAIT_FOR_API_KEY_MS / 1000}s before checking again... (Attempt ${retryCount + 1}/${MAX_API_RETRY_ATTEMPTS})`);
                await delay(WAIT_FOR_API_KEY_MS);
                retryCount++;
                continue;
            }

            try {
                const payload = {
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: {
                        responseMimeType: "application/json",
                    }
                };

                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${currentApiKey}`;

                console.log(`[CRON] Attempting to generate ${count} ${level} questions for ${sport} with key ${currentApiKey.substring(0, 5)}... (Attempt ${retryCount + 1})`);
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error(`[CRON] Gemini API error for key ${currentApiKey.substring(0, 5)}... (${sport}, ${level}): Status ${response.status}, Error:`, errorData);

                    if (response.status === 429) {
                        disableKeyTemporarily(currentApiKey);
                        console.log(`[CRON] Key ${currentApiKey.substring(0, 5)}... hit rate limit (429). Switching keys and waiting.`);
                        await delay(WAIT_FOR_API_KEY_MS);
                    } else if (response.status >= 500) {
                        console.error(`[CRON] Server error (${response.status}) from Gemini API. Retrying after delay...`);
                        await delay(WAIT_FOR_API_KEY_MS * 2);
                    } else if (response.status === 400 && errorData.error && errorData.error.message.includes("SAFETY")) {
                        console.warn(`[CRON] Content safety filter triggered for ${sport} (${level}). Skipping this prompt.`);
                        successfulGenerationAttempt = true;
                        break;
                    }
                     else {
                        console.error(`[CRON] Non-retryable API error (${response.status}) for ${sport} (${level}). Prompt or request might be an issue.`);
                    }
                    retryCount++;
                    continue;
                }

                const result = await response.json();
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {

                    const jsonString = result.candidates[0].content.parts[0].text;
                    let parsedQuestions;
                    try {
                        parsedQuestions = JSON.parse(jsonString);
                        if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
                            throw new Error("Parsed JSON is not an array or is empty.");
                        }
                    } catch (parseError) {
                        console.error(`[CRON] Failed to parse JSON response for ${sport} (${level}) with key ${currentApiKey.substring(0, 5)}...:`, parseError.message);
                        console.error("Malformed JSON received (snippet):", jsonString.substring(0, 500) + "...");
                        retryCount++;
                        await delay(WAIT_FOR_API_KEY_MS / 2);
                        continue;
                    }

                    const estimatedInputTokens = estimateTokens(prompt);
                    const estimatedOutputTokens = estimateTokens(jsonString);
                    updateKeyUsage(currentApiKey, estimatedInputTokens + estimatedOutputTokens);

                    let questionsSavedForThisTask = 0;
                    for (const q of parsedQuestions) {
                        if (q.question_text && Array.isArray(q.options) && q.options.length === 4 && q.correct_answer && q.explanation) {
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
                            successfullyGeneratedThisRun++;
                            questionsSavedForThisTask++;
                        } else {
                            console.warn(`[CRON] Invalid question format received for ${sport} (${level}). Skipping question:`, JSON.stringify(q).substring(0, 100) + "...");
                        }
                    }
                    console.log(`[CRON] Successfully generated and stored ${questionsSavedForThisTask} ${level} questions for ${sport}. Total this run: ${successfullyGeneratedThisRun}`);
                    successfulGenerationAttempt = true;
                    await delay(MIN_OVERALL_API_CALL_DELAY_MS);

                } else {
                    console.error("[CRON] Unexpected Gemini API response structure (no candidates/content parts):", result);
                    retryCount++;
                    await delay(WAIT_FOR_API_KEY_MS / 2);
                    continue;
                }
            } catch (apiError) {
                console.error(`[CRON] Unhandled error during Gemini API call for ${sport} (${level}) with key ${currentApiKey.substring(0, 5)}...:`, apiError);
                retryCount++;
                await delay(WAIT_FOR_API_KEY_MS);
            }
        }
        if (!successfulGenerationAttempt) {
            console.error(`[CRON] Failed to generate questions for ${sport} (${level}) after ${MAX_API_RETRY_ATTEMPTS} attempts. Moving to next task.`);
        }
    }
    console.log(`[CRON] Daily question generation finished at ${new Date().toISOString()}. Total new questions generated/stored this run: ${successfullyGeneratedThisRun}`);
    console.log(`[CRON] Final question count for today (including existing): ${await Question.countDocuments({ generatedAt: { $gte: startOfDay } })}`);
}

async function deleteOldQuestions() {
    console.log(`[CRON] Starting old question deletion check at ${new Date().toISOString()}`);
    console.log(`[CRON] Old question deletion process finished. (Handled by MongoDB TTL index on 'generatedAt' field, set to expire after 7 days).`);
}


const generateQuizForUser = async (req, res) => {
    const { sports } = req.body;
    const userId = req.user.id;

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
                }).limit(count * 5);

                if (availableQuestions.length < count) {
                    console.warn(`Not enough unseen ${level} questions for ${sport}. Fetching from all available, potentially repeating questions.`);
                    availableQuestions = await Question.find({
                        sport: sport,
                        difficulty: level
                    }).limit(count * 5);
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

// --- THIS IS THE CRUCIAL PART ---
// Export all functions that need to be accessible from other modules
module.exports = {
    generateQuizPrompt, // <-- MAKE SURE TO EXPORT IT HERE
    generateAndStoreDailyQuestions,
    deleteOldQuestions,
    generateQuizForUser,
    getUserQuizHistory
};
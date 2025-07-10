const mongoose = require('mongoose');
const Question = require('../models/Question');
const UserQuizHistory = require('../models/UserQuizHistory');
const { getAvailableApiKey, updateKeyUsage, GEMINI_API_KEYS, GEMINI_PRO_DAILY_TOKEN_LIMIT } = require('../utils/geminiApiManager');
const fetch = require('node-fetch'); // Ensure node-fetch is installed and available

function generateQuizPrompt(sport, difficulty_level, count) {
    let specific_instructions = "";
    if (difficulty_level === "easy") {
        specific_instructions = `Easy: General knowledge about basic rules, common terms, equipment, or famous players of ${sport}. Questions should be straightforward and widely known.`;
    } else if (difficulty_level === "medium") {
        specific_instructions = `Medium: Questions about significant past matches, key historical events, important player achievements, or detailed rules. Avoid obscure stats.`;
    } else if (difficulty_level === "hard") {
        specific_instructions = `Hard: Deeper understanding, logical deduction, scenario analysis, or tricky distinctions. These should require reasoning, not memorization.`;
    }

    return `You are an expert sports quiz master. Your task is to generate exactly ${count} multiple-choice quiz questions about ${sport}.
${specific_instructions}

Output format (JSON):
[
  {
    "question": "...",
    "options": ["a) ...", "b) ...", "c) ...", "d) ..."],
    "answer": "a",
    "description" : "..",
  }
]

Guidelines:
- Avoid repeated questions or obvious answers
- Stick to the difficulty level
- Use engaging, clear phrasing
- Do not exceed 300 characters per question+options block`;
}

const generateQuizForUser = async (req, res) => {
  const { sport, userId } = req.body;
  if (!sport || !userId) {
    return res.status(400).json({ error: "Missing required fields: sport or userId." });
  }

  try {
    const allQuestionIds = await Question.find({ sport }).distinct('_id');
    const userHistory = await UserQuizHistory.findOne({ userId });
    const seenIds = userHistory ? userHistory.quiz.map(id => id.toString()) : [];

    const unseenIds = allQuestionIds.filter(id => !seenIds.includes(id.toString()));

    if (unseenIds.length < 10) {
      return res.status(200).json({ message: "All questions already seen. No new quiz available." });
    }

    const easyQs = await Question.find({ sport, difficulty: "easy", _id: { $in: unseenIds } }).limit(3);
    const mediumQs = await Question.find({ sport, difficulty: "medium", _id: { $in: unseenIds } }).limit(3);
    const hardQs = await Question.find({ sport, difficulty: "hard", _id: { $in: unseenIds } }).limit(4);

    const allQuestions = [...easyQs, ...mediumQs, ...hardQs];

    await UserQuizHistory.findOneAndUpdate(
      { userId },
      { $addToSet: { quiz: { $each: allQuestions.map(q => q._id) } }, sport },
      { upsert: true, new: true }
    );

    return res.status(200).json({ quiz: allQuestions });
  } catch (err) {
    console.error("Error generating quiz:", err);
    return res.status(500).json({ error: "Server error while generating quiz." });
  }
};

const getUserQuizHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await UserQuizHistory.findOne({ userId }).populate('seenQuestionIds');
    res.status(200).json({ history });
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch quiz history' });
  }
};

let hasFetchedToday = false;

const generateAndStoreDailyQuestions = async () => {
  if (hasFetchedToday) {
    console.log("Questions already generated today. Skipping...");
    return;
  }
  const todayDateString = new Date().toISOString().slice(0, 10);
  if (lastFetchDate === todayDateString) {
    console.log("Questions already fetched today. Skipping...");
    return;
  }
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));

  const questionCount = await Question.countDocuments({ createdAt: { $gte: startOfDay } });

  if (questionCount > 0) {
    console.log("Questions for today already exist. Skipping generation...");
    hasFetchedToday = true;
    return;
  }
  console.log("Generating today's questions...");
  const sports = ['cricket', 'football', 'tennis'];

  for (const sport of sports) {
    const prompt = generateQuizPrompt(sport, 'easy', 3) + '\n\n' +
                   generateQuizPrompt(sport, 'medium', 3) + '\n\n' +
                   generateQuizPrompt(sport, 'hard', 4);

    try {
      const apiKey = getAvailableApiKey();
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const result = await response.json();
      const raw = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().replace(/^```(json)?|```$/g, '');
      const questions = JSON.parse(raw);

      const formatted = questions.map(q => ({ ...q, sport }));
      await Question.insertMany(formatted);

      const tokensUsed = prompt.split(" ").length + raw.split(" ").length;
      updateKeyUsage(apiKey, tokensUsed);
       hasFetchedToday = true;
      lastFetchDate = todayDateString;
    } catch (err) {
      console.error(`Error storing questions for ${sport}:`, err);
    }
  }
};

const deleteOldQuestions = async () => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  try {
    const result = await Question.deleteMany({ createdAt: { $lt: sevenDaysAgo } });
    console.log(`Deleted ${result.deletedCount} old questions`);
  } catch (err) {
    console.error("Error deleting old questions:", err);
  }
};

module.exports = {
  generateQuizPrompt,
  generateQuizForUser,
  getUserQuizHistory,
  generateAndStoreDailyQuestions,
  deleteOldQuestions
};
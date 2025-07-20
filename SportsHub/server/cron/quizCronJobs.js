// cron/quizCronJobs.js
const cron = require('node-cron');
const mongoose = require('mongoose');
const { generateAndStoreDailyQuestions } = require('../controllers/quizController');
const { resetDailyKeyUsage, getLastGenerationTimestamp } = require('../utils/geminiApiManager');
const Question = require('../models/Question'); // Need to import Question model for deletion

const MIN_TIME_BETWEEN_GENERATION_RUNS_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

const initQuizCronJobs = () => {
    console.log('Initializing Quiz Cron Jobs...');

    // Logic to run `generateAndStoreDailyQuestions` on startup IF it hasn't run recently
    const checkAndRunOnStartup = async () => {
        const now = Date.now();
        const lastGenTimestamp = getLastGenerationTimestamp(); // Get the latest recorded generation timestamp

        if (now - lastGenTimestamp >= MIN_TIME_BETWEEN_GENERATION_RUNS_MS) {
            console.log(`[CRON] Last generation run was > ${MIN_TIME_BETWEEN_GENERATION_RUNS_MS / (60 * 60 * 1000)} hours ago. Initiating immediate startup generation.`);
            await generateAndStoreDailyQuestions();
        } else {
            console.log(`[CRON] Daily question generation run detected within last ${MIN_TIME_BETWEEN_GENERATION_RUNS_MS / (60 * 60 * 1000)} hours. Skipping immediate startup generation.`);
        }
    };

    // Ensure MongoDB is connected before running startup tasks
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB is connected. Checking for startup generation.");
        checkAndRunOnStartup();
    } else {
        mongoose.connection.once('open', () => {
            console.log("MongoDB connection opened. Checking for startup generation.");
            checkAndRunOnStartup();
        });
    }

    // Schedule 1: Reset API key usage at midnight (00:00).
    // This ensures daily quotas are refreshed for the new day.
    cron.schedule('0 0 * * *', () => {
        console.log("[CRON] It's midnight! Resetting daily API key usage stats.");
        resetDailyKeyUsage();
    }, { timezone: "Asia/Kolkata" }); // Set your desired timezone

    // Schedule 2: Generate questions at 12:15 AM, after the API key reset.
    // This is the primary daily generation trigger.
    cron.schedule('15 0 * * *', () => {
        console.log("[CRON] Starting scheduled daily quiz generation (00:15 AM).");
        generateAndStoreDailyQuestions();
    }, { timezone: "Asia/Kolkata" });

    // Schedule 3: Delete questions older than 2 days at 01:00 AM.
    // This job cleans up questions whose `archiveAfter` date has passed.
    cron.schedule('0 1 * * *', async () => {
        console.log("[CRON] Starting scheduled 2-day old question deletion (01:00 AM).");
        try {
            // Delete documents where `archiveAfter` is less than or equal to the current time
            const result = await Question.deleteMany({ archiveAfter: { $lte: new Date() } });
            console.log(`[CRON] Deleted ${result.deletedCount} questions older than 2 days.`);
        } catch (error) {
            console.error("[CRON] Error deleting old questions:", error);
        }
    }, { timezone: "Asia/Kolkata" });

    console.log("[CRON] Old question deletion is managed by the scheduled task using 'archiveAfter' field.");
};

module.exports = initQuizCronJobs;

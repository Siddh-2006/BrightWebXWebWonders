// D:\WebWonders\SPORTS_HUB\SportsHub\server\cron\quizCronJobs.js
const cron = require('node-cron');
const { generateAndStoreDailyQuestions, deleteOldQuestions } = require('../controllers/quizController');
const { resetDailyKeyUsage } = require('../utils/geminiApiManager');
const mongoose = require('mongoose');

const initQuizCronJobs = () => { // <--- This function is defined, but not directly assigned to module.exports

    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB connected. Running initial cron tasks for today.");
        resetDailyKeyUsage();
        generateAndStoreDailyQuestions();
        deleteOldQuestions();
    } else {
        console.log("MongoDB not connected. Skipping initial cron run.");
    }

    cron.schedule('5 0 * * *', () => {
        try {
            console.log("Cron: Starting 00:05 AM daily API key usage reset.");
            resetDailyKeyUsage();
        } catch (err) {
            console.error("Cron 00:05 AM reset error:", err);
        }
    }, { timezone: "Asia/Kolkata" });

    cron.schedule('0 2 * * *', () => {
        try {
            console.log("Cron: Starting 2 AM quiz generation");
            generateAndStoreDailyQuestions();
        } catch (err) {
            console.error("Cron 2 AM generation error:", err);
        }
    }, { timezone: "Asia/Kolkata" });

    cron.schedule('0 3 * * *', () => {
        try {
            console.log("Cron: Starting 3 AM old question deletion.");
            deleteOldQuestions();
        } catch (err) {
            console.error("Cron 3 AM deletion error:", err);
        }
    }, { timezone: "Asia/Kolkata" });
};

module.exports = initQuizCronJobs; // <--- You are exporting the function 'initQuizCronJobs'
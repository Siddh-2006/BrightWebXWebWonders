const cron = require('node-cron');
const { generateAndStoreDailyQuestions, deleteOldQuestions } = require('../controllers/quizController');
const mongoose = require('mongoose');

const initQuizCronJobs = () => {

    if (mongoose.connection.readyState === 1) {
    generateAndStoreDailyQuestions();
    deleteOldQuestions();
    } else {
    console.log("MongoDB not connected. Skipping initial cron run.");
    }


 cron.schedule('0 2 * * *', () => {
    try {
        console.log("Cron: Starting 2 AM quiz generation");
        generateAndStoreDailyQuestions();
    } catch (err) {
        console.error("Cron 2 AM error:", err);
    }
    }, { timezone: "Asia/Kolkata" });


  cron.schedule('0 3 * * *', () => {
    deleteOldQuestions();
  }, { timezone: "Asia/Kolkata" });
};


module.exports = initQuizCronJobs;
// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController.js');

// Route to generate a quiz for a user
router.post('/generate', quizController.generateQuizForUser);

// Route to get a user's quiz history
router.get('/history/:userId', quizController.getUserQuizHistory);

module.exports = router;
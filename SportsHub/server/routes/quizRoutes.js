// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController.js');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to generate a quiz (no authentication required - public access)
router.post('/generate', quizController.generateQuizForUser);

// Route to submit quiz results (requires authentication)
router.post('/submit', authMiddleware, quizController.submitQuizResult);

// Route to get a user's quiz results (requires authentication)
router.get('/results/:userId', authMiddleware, quizController.getUserQuizResults);

module.exports = router;
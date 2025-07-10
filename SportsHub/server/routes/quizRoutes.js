const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/generate', quizController.generateQuizForUser);

router.get('/history/:userId', quizController.getUserQuizHistory);

module.exports = router;
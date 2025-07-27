// SportsHub/server/routes/analysisRoutes.js

const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// POST /api/analyze
router.post('/analyze', analysisController.analyzePosture);

// GET /api/history
router.get('/history', analysisController.getAnalysisHistory);

module.exports = router;

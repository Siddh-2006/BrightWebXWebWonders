const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/live', matchController.getLiveMatches);
router.get('/upcoming', matchController.getUpcomingMatches);
router.get('/past', matchController.getPastMatches);

module.exports=router;
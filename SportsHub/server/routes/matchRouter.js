const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/live', matchController.getLiveMatches);

module.exports=router;
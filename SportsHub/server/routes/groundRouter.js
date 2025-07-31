const express = require('express');
const router = express.Router();
const groundController = require('../controllers/groundController');

router.get('/:sport', groundController.getGroundsBySport);

module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/clubMiddleware');
const {
  createChallenge,
  acceptChallenge,
  declineChallenge
} = require('../controllers/challengeController');

router.post('/', protect, createChallenge);
router.patch('/:challengeId/accept', protect, acceptChallenge);
router.patch('/:challengeId/decline', protect, declineChallenge);

module.exports = router;
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/clubMiddleware');
const {
  createChallenge,
  acceptChallenge,
  declineChallenge,
  getChallenges,
  getNotifications,
  markNotificationAsRead
} = require('../controllers/challengeController');

router.post('/', protect, createChallenge);
router.get('/', protect, getChallenges);
router.patch('/:challengeId/accept', protect, acceptChallenge);
router.patch('/:challengeId/decline', protect, declineChallenge);
router.get('/notifications', protect, getNotifications);
router.patch('/notifications/:notificationId/read', protect, markNotificationAsRead);

module.exports = router;
const express = require('express');
const upload = require('../config/multer-config');
const {
  registerClub,
  approveClub,
  getAllClubs,
  getPendingClubs,
  clubSendRequest,
  userSendRequest,
  approveJoinRequest,
  getMyClub
} = require('../controllers/clubController');

const { protect, adminOnly } = require('../middlewares/clubMiddleware');

const multer = require('multer');
const router = express.Router();


router.post('/register', protect, upload.single('logo'), registerClub);
router.patch('/:clubId/approve', protect, adminOnly, approveClub);
router.get('/pending-clubs', protect, adminOnly, getPendingClubs);
router.get('/', getAllClubs);
router.get('/my-club', protect, getMyClub);
router.post('/request/club-to-user', protect, clubSendRequest);
router.post('/request/user-to-club', protect, userSendRequest);
router.patch('/request/:requestId/approve', protect, approveJoinRequest);

module.exports = router;

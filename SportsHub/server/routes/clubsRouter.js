const express = require('express');
const upload = require('../config/multer-config');
const {
  registerClub,
  approveClub,
  getAllClubs,
  clubSendRequest,
  userSendRequest,
  approveJoinRequest
} = require('../controllers/clubController');

const { protect, adminOnly } = require('../middleware/clubMiddleware');

const multer = require('multer');
const router = express.Router();


router.post('/register', protect, upload.single('logo'), registerClub);
router.patch('/:clubId/approve', protect, adminOnly, approveClub);
router.get('/', protect, getAllClubs);

router.post('/request/club-to-user', protect, clubSendRequest);
router.post('/request/user-to-club', protect, userSendRequest);
router.patch('/request/:requestId/approve', protect, approveJoinRequest);

module.exports = router;

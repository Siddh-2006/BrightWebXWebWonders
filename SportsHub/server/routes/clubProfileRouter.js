const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config'); // multer.memoryStorage()
const { editClub } = require('../controllers/updateClubProfile');

router.put('/edit/:clubId', upload.single('logo'), editClub);

module.exports = router;

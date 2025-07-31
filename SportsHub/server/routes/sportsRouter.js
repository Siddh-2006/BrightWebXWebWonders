// routes/clubRoutes.js
const express = require('express');
const router = express.Router();
const Club = require('../models/other-clubs-model');

// GET /api/clubs/by-sport/:sportName?page=1&limit=10
router.get('/:sportName', async (req, res) => {
  try {
    const { sportName } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filter = {
      sports: { $regex: new RegExp(`^${sportName}$`, 'i') }
    };

    const total = await Club.countDocuments(filter);
    const clubs = await Club.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      totalResults: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      clubs
    });
  } catch (err) {
    console.error('Error fetching clubs with pagination:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

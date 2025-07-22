const Match = require('../models/match-model'); // Adjust path as needed

// 📡 GET all live matches
exports.getLiveMatches = async (req, res) => {
  try {
    const liveMatches = await Match.find({ status: "Live" })
      .populate('clubA', 'name logo')
      .populate('clubB', 'name logo')
      .select('-playerStats -events'); // Exclude heavy fields for now

    res.status(200).json({
      success: true,
      count: liveMatches.length,
      matches: liveMatches,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message});
  }
};
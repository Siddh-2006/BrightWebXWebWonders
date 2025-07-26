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

// 📅 GET upcoming matches with full details
exports.getUpcomingMatches = async (req, res) => {
  try {
    const now = new Date();

    const upcomingMatches = await Match.find({
      status: "Not Started",
      startTime: { $gt: now }
    })
      .sort({ startTime: 1 }) // soonest first
      .populate('clubA', 'name logo institution')
      .populate('clubB', 'name logo institution')
      .populate('lineupA', 'fullName profilePhoto position') // Optional: Only if you want
      .populate('lineupB', 'fullName profilePhoto position') // Optional
      .populate('refereeName')
      .populate('createdBy', 'name') // who scheduled
      .lean(); // optional for performance

    res.status(200).json({
      success: true,
      count: upcomingMatches.length,
      matches: upcomingMatches,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};


// 📁 GET all past/ended matches with details & winners
exports.getPastMatches = async (req, res) => {
  try {
    const now = new Date();

    const pastMatches = await Match.find({
      status: "Ended",
      startTime: { $lt: now }
    })
      .sort({ startTime: -1 }) // most recent first
      .populate('clubA', 'name logo institution')
      .populate('clubB', 'name logo institution')
      .populate('winnerClub', 'name logo')
      .populate('MVPPlayer', 'fullName profilePhoto position')
      .populate('lineupA', 'fullName profilePhoto')
      .populate('lineupB', 'fullName profilePhoto')
      .lean();

    res.status(200).json({
      success: true,
      count: pastMatches.length,
      matches: pastMatches,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

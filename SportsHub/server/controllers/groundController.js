const Ground = require('../models/ground-model');

// Get paginated grounds by sport type
exports.getGroundsBySport = async (req, res) => {
  try {
    const sportType = req.params.sport;
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = 5;
    const skip = (page - 1) * limit;

    // Fetch grounds
    const grounds = await Ground.find({ sport: sportType })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination info
    const total = await Ground.countDocuments({ sport: sportType });

    res.status(200).json({
      totalGrounds: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      results: grounds
    });
  } catch (error) {
    console.error('Error fetching grounds with pagination:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

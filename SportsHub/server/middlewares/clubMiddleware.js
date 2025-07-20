const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const Club=require("../models/club-model");

const protect = async (req, res, next) => {
   const token =
    req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.cookies?.token;

  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ msg: 'Admin access only' });
  next();
};


const verifyClubOwnership = async (req, res, next) => {
  try {
    const userId = req.user._id; // Comes from isLoggedIn middleware

    // Find club created by the logged-in user
    const club = await Club.findOne({ createdBy: userId });

    if (!club) {
      return res.status(404).json({ message: "No club found for this user." });
    }

    // Attach the club to request for further use
    req.club = club;

    // ✅ All good, proceed
    next();
  } catch (err) {
    console.error("Ownership verification failed", err);
    res.status(500).json({ message: "Server error while verifying ownership" });
  }
};


module.exports = { protect, adminOnly ,verifyClubOwnership};

const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const Club = require('../models/club-model');

// Accepts the socket object, parses cookies, and verifies club ownership
const verifyClubOwnershipSocket = async (socket) => {
  try {
    // Get cookie string from socket handshake headers
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const token = cookies.token; // Change 'token' if your cookie key is different

    if (!token) {
      console.log('No token in cookies');
      return null;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.id;

    // Check if user is a club admin (i.e., has created a club)
    const club = await Club.findOne({ createdBy: userId });

    if (!club) {
      console.log('No club found for this user');
      return null;
    }

    // Return useful info
    return {
      userId,
      clubId: club._id,
      clubName: club.name,
    };
  } catch (err) {
    console.error('verifyClubOwnershipSocket error:', err.message);
    return null;
  }
};

module.exports = verifyClubOwnershipSocket;


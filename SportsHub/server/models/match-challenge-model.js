const mongoose = require('mongoose');

const matchChallengeSchema = new mongoose.Schema({
  challenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  opponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  proposedDateTime: {
    type: Date,
    required: false,
    default: Date.now
  },
  timezone: {
    type: String,
    required: false,
    default: 'UTC'
  },
  localDateTime: {
    type: String, // For display purposes - original local time input
  },
  liveStream: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('MatchChallenge', matchChallengeSchema);

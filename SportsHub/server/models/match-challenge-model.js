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
  date: {
    type: Date,
  },
  time: {
    type: String,
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

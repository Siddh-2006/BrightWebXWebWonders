const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  recipientClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  },
  type: {
    type: String,
    enum: ['challenge_request', 'challenge_accepted', 'challenge_declined', 'club_invitation', 'join_request'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: {
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MatchChallenge'
    },
    challengerClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club'
    },
    opponentClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club'
    },
    sport: String,
    prizePool: String,
    location: String,
    date: String
  },
  read: {
    type: Boolean,
    default: false
  },
  actionUrl: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
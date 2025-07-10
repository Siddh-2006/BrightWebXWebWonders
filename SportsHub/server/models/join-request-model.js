const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema({
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  requestedBy: { type: String, enum: ['club', 'user'], required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('JoinRequest', joinRequestSchema);

const mongoose = require("mongoose");

const matchChallengeSchema = new mongoose.Schema({
  fromClub: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  toClub: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  sport: { type: String, required: true },
  matchType: { type: String },
  startTime: { type: Date, required: true },
  venueName: String,
  location: {
    city: String,
    state: String,
  },
  isPaid: { type: Boolean, default: false },
  viewerFee: { type: Number, default: 0 },
  streamURL: String,
  lineupA: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  lineupB: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  notified: { type: Boolean, default: false } // for Club A
});

module.exports = mongoose.model("MatchChallenge", matchChallengeSchema);

const mongoose = require('mongoose');

// 🎯 Match Events (goals, fouls, etc.)
const eventSchema = new mongoose.Schema({
  time: String,
  type: String, // goal, foul, wicket, etc.
  description: String,
  player: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

// 📊 Player Stats
const playerStatSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
});

const matchSchema = new mongoose.Schema({
  // 🔗 From Challenge (important for traceability)
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "MatchChallenge" },

  // 🏆 Basic Info
  sport: {
    type: String,
    required: true,
    enum: ['football', 'cricket', 'basketball', 'tennis', 'hockey', 'baseball'],
  },
  matchType: {
    type: String,
    enum: ['friendly', 'tournament', 'semi-final', 'final'],
    default: 'friendly',
  },
  startTime: { type: Date, required: true },
  status: { type: String, default: 'Not Started' }, // Live, Ended, Half Time, etc.
  isLive: { type: Boolean, default: true },

  // 🏟️ Venue
  venueName: String,
  location: {
    city: String,
    state: String,
  },
  groundImage: String,

  // 🆚 Clubs
  clubA: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  clubB: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  score: {
    clubA: { type: Number, default: 0 },
    clubB: { type: Number, default: 0 },
  },

  // 💰 Monetization
  isPaid: { type: Boolean, default: false },
  viewerFee: { type: Number, default: 0 },
  streamURL: String,

  // 🧍‍♂️ Team Lineups
  lineupA: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  lineupB: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  // 📈 Match Activity
  events: [eventSchema],
  playerStats: [playerStatSchema],

  // 🧑‍⚖️ Officials
  refereeName: String,
  organizer: String,
  audienceLimit: Number,

  // 🧠 Post-match
  winnerClub: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
  MVPPlayer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  finalSummary: String,
  viewsCount: { type: Number, default: 0 },

  // 🏗️ Audit
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);

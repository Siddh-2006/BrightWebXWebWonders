const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: true,
        unique: true 
    },
    logo:{ 
        type: String
    },
    description:{
        type: String
    },
    sports: [
        { type: String }
    ],
    approved: { 
        type: Boolean, 
        default: false
    },
    posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    }],

    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    players: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    ],
    vlogs: [
        { type: String }
    ],
    reels: [
        { type: String }
    ],
    highlights: [
        { type: String }
    ],
    matchHistory: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Match' }
    ],
    liveMatches: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Match' }
    ],
    // 🆕 New Fields
    officialEmail: { type: String, required: true },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, default: "India" }
    },
    foundedYear: { type: Number },
    socialLinks: {
        instagram: { type: String },
        twitter: { type: String },
        youtube: { type: String },
        email: { type: String }
    },
    achievements: [{ type: String }],
    contactNumber: { type: String },
    website: { type: String },
    followersCount: { type: Number, default: 0 },
    performance: {
        totalMatches: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        draws: { type: Number, default: 0 },
        points: { type: Number, default: 0 } // typically: win = 3 pts, draw = 1 pt
    },

    }, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);

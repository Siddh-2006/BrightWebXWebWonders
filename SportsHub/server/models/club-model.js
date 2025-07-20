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
    approved: { 
        type: Boolean, 
        default: false
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    ]
    }, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);

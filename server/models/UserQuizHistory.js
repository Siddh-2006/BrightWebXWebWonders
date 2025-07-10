const mongoose = require('mongoose');

const userQuizHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    seenQuestionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    lastActivity: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserQuizHistory', userQuizHistorySchema);
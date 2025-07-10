const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    sport: { type: String, required: true },
    question_text: { type: String, required: true },
    options: { type: [String], required: true },
    correct_answer: { type: String, required: true },
    explanation: { type: String, required: true }, 
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    generatedAt: { type: Date, default: Date.now, expires: '7d' } 
});
questionSchema.index({ sport: 1, difficulty: 1 });

module.exports = mongoose.model('Question', questionSchema);
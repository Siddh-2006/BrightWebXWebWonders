const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    sport: { type: String, required: true },
    questions: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        selectedAnswer: { type: String, required: true },
        correctAnswer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        timeTaken: { type: Number, required: true } // in seconds
    }],
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    score: { type: Number, required: true }, // percentage
    completedAt: { type: Date, default: Date.now },
    timeTaken: { type: Number, required: true } // total time in seconds
});

quizResultSchema.index({ userId: 1, completedAt: -1 });

module.exports = mongoose.model('QuizResult', quizResultSchema);
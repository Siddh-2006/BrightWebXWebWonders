// SportsHub/server/models/AnalysisResult.js

const mongoose = require('mongoose');

const analysisResultSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    age: Number,
    height: Number,
    weight: Number,
    sport: String,
    goal: String,
    roleModel: String,
    mediaType: String,
    analysis: {
        overallScore: Number,
        strengths: [String],
        improvements: [String],
        steps: [String],
        metrics: Object,
        detailedFeedback: {
            overview: String,
            points: [{
                joint: String,
                area: String,
                feedback: String
            }]
        },
        primeAthleteComparison: {
            name: String,
            techniqueDescription: String
        }
    },
    date: { type: Date, default: Date.now }
});

const AnalysisResult = mongoose.model('AnalysisResult', analysisResultSchema);

module.exports = AnalysisResult;

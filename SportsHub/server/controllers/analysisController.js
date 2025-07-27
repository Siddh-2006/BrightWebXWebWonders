// SportsHub/server/controllers/analysisController.js

const AnalysisResult = require('../models/AnalysisResult');
const { generateAnalysis } = require('../services/geminiService');

// Handles POST /api/analyze request
const analyzePosture = async (req, res, next) => {
    try {
        const { profile, mediaType, landmarks } = req.body;

        if (!profile || !landmarks || landmarks.length === 0) {
            return res.status(400).json({ message: 'Missing profile or landmark data.' });
        }

        const userProfile = profile;
        console.log('Received analysis request for:', userProfile.name, 'Sport:', userProfile.sport, 'Media Type:', mediaType);
        console.log('Received Landmarks (first pose):', landmarks[0]); // Log the first detected pose for brevity

        // Call the Gemini service to generate the analysis
        const analysis = await generateAnalysis(userProfile, mediaType, landmarks);

        // Generate a simple unique user ID for demonstration purposes
        const userId = 'demo_user_' + Math.random().toString(36).substring(2, 9);

        // Save analysis to MongoDB
        const newAnalysisResult = new AnalysisResult({
            userId: userId,
            ...userProfile,
            mediaType: mediaType,
            analysis: analysis
        });
        await newAnalysisResult.save();
        console.log('Analysis saved to DB for:', userProfile.name);

        res.json(analysis);

    } catch (error) {
        console.error('Error during posture analysis:', error);
        // Pass error to the next middleware (error handler)
        next(new Error(`Internal server error during analysis: ${error.message}`));
    }
};

// Handles GET /api/history request
const getAnalysisHistory = async (req, res, next) => {
    try {
        const history = await AnalysisResult.find()
                                            .sort({ date: -1 })
                                            .limit(5); // Get top 5 most recent
        res.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        // Pass error to the next middleware (error handler)
        next(new Error(`Failed to fetch analysis history: ${error.message}`));
    }
};

module.exports = {
    analyzePosture,
    getAnalysisHistory
};

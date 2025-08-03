// SportsHub/server/services/geminiService.js

const aiChatRouter = require('./aiChatRouter');

/**
 * Generates a simulated posture analysis using the Gemini API.
 * The analysis includes overall score, strengths, improvements, action steps,
 * specific metrics, detailed feedback, and a comparison to a prime athlete.
 * @param {Object} userProfile - User's profile data.
 * @param {string} mediaType - Type of media uploaded ('video' or 'image').
 * @param {Array} landmarks - Array of MediaPipe pose landmark data.
 * @returns {Promise<Object>} - A promise that resolves to the parsed AI analysis object.
 */
async function generateAnalysis(userProfile, mediaType, landmarks) {
    try {
        console.log('[Gemini Service] Generating analysis using AI Chat Router');
        const analysis = await aiChatRouter.generateAnalysis(userProfile, mediaType, landmarks);
        return analysis;
    } catch (error) {
        console.error('[Gemini Service] Error generating analysis:', error);
        throw new Error(`AI analysis failed: ${error.message}`);
    }
}

module.exports = { generateAnalysis };
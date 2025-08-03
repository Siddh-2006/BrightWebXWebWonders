// SportsHub/server/services/geminiService.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Prioritize GEMINI_API_KEY_PostureCorrector, then GEMINI_API_KEY_AI_GURU, then GEMINI_API_KEYS (first one)
const geminiApiKey = process.env.GEMINI_API_KEY_PostureCorrector || process.env.GEMINI_API_KEY_AI_GURU || (process.env.GEMINI_API_KEYS && process.env.GEMINI_API_KEYS.split(',')[0]);

if (!geminiApiKey) {
    console.error("Error: No Gemini API Key found! Please set GEMINI_API_KEY_PostureCorrector, GEMINI_API_KEY_AI_GURU, or GEMINI_API_KEYS in your .env file.");
    // In a real app, you might throw an error here or handle gracefully, but for startup, exit is fine.
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
    // Stringify landmarks to include in the prompt
    // Use a compact string for prompt to save tokens, but still readable
    const landmarksString = JSON.stringify(landmarks.map(kp => ({
        name: kp.name,
        x: kp.x.toFixed(4), // Round to 4 decimal places for brevity
        y: kp.y.toFixed(4),
        z: kp.z ? kp.z.toFixed(4) : 'N/A', // Z might be undefined for 2D models
        score: kp.score ? kp.score.toFixed(2) : 'N/A' // Score might be undefined
    })));

    const prompt = `
        You are an elite sports coach and biomechanics expert specializing in ${userProfile.sport}.
        Your task is to analyze the posture and technique of an athlete based on their profile, the context of a ${userProfile.sport} action, and their detected pose landmarks.

        Athlete Profile:
        Name: ${userProfile.name}
        Age: ${userProfile.age}
        Height: ${userProfile.height} cm
        Weight: ${userProfile.weight} kg
        Performance Goal: ${userProfile.goal || 'Not specified'}
        Role Model (if any): ${userProfile.roleModel || 'Not specified'}

        Detected Pose Landmarks (from MediaPipe, for a key frame of their ${userProfile.sport} action, in normalized coordinates [0,1]):
        ${landmarksString}

        Based on the athlete's profile, sport, and the provided pose landmarks, provide a detailed posture and technique analysis.
        **Crucially, provide numerical scores (out of 100) for the following key performance indicators for ${userProfile.sport}:**
        - Balance
        - Power
        - Flexibility
        - Coordination
        - Stability
        ${(userProfile.sport === 'cricket' || userProfile.sport === 'tennis' || userProfile.sport === 'golf' || userProfile.sport === 'baseball') ? `- Accuracy\n- Precision` : ''}

        Also, identify a **prime athlete** in ${userProfile.sport} (ideally relevant to the user's role model if specified, or a universally recognized one)
        who exemplifies excellent technique for the user's stated goal or general performance. Describe their technique in relation to how it optimizes power, accuracy,
        and overall efficiency, and how the user can learn from it.

        Generate the analysis in a JSON format with the following structure. Ensure all fields are present and data types match.
        The scores should be realistic for an amateur/intermediate athlete (e.g., between 50-90).

        {
          "overallScore": <number between 50-99>,
          "strengths": ["<strength 1>", "<strength 2>", "..."],
          "improvements": ["<improvement 1>", "<improvement 2>", "..."],
          "steps": ["<action step 1>", "<action step 2>", "..."],
          "metrics": {
            "Balance": <number>,
            "Power": <number>,
            "Flexibility": <number>,
            "Coordination": <number>,
            "Stability": <number>
            ${(userProfile.sport === 'cricket' || userProfile.sport === 'tennis' || userProfile.sport === 'golf' || userProfile.sport === 'baseball') ? `,"Accuracy": <number>, "Precision": <number>` : ''}
          },
          "detailedFeedback": {
            "overview": "<A concise overall summary of the analysis, tailored to the sport and profile>",
            "points": [
              {"joint": "<e.g., Ankle>", "area": "<e.g., Lower Body>", "feedback": "<Specific feedback for this joint/area>"},
              {"joint": "<e.g., Shoulder>", "area": "<e.g., Upper Body>", "feedback": "<Specific feedback for this joint/area>"}
            ]
          },
          "primeAthleteComparison": {
            "name": "<Name of prime athlete>",
            "techniqueDescription": "<Detailed description of their technique, focusing on how they use their body parts and power, relevant to the user's sport and goal. Max 200 words.>"
          }
        }
        Provide realistic scores and feedback. Ensure the prime athlete comparison is relevant and insightful.
    `;

    try {
        const result = await model.generateContent(prompt);
        let responseText = await result.response.text();

        // Log the raw response text for debugging
        console.log('Raw Gemini Response:', responseText);

        // Robust FIX: Use regex to extract JSON content from within ```json ... ```
        const jsonMatch = responseText.match(/```json\n([\s\S]*)\n```/);
        if (jsonMatch && jsonMatch[1]) {
            responseText = jsonMatch[1].trim();
        } else {
            // Fallback if no markdown block is found, try to trim directly
            responseText = responseText.trim();
        }

        let analysis = {};
        try {
            analysis = JSON.parse(responseText);
            if (!analysis.overallScore || !analysis.strengths || !analysis.improvements || !analysis.metrics || !analysis.detailedFeedback || !analysis.primeAthleteComparison) {
                throw new Error("Gemini response missing expected fields or invalid structure.");
            }
        } catch (parseError) {
            console.error("Failed to parse Gemini response as JSON:", responseText, parseError);
            analysis = {
                overallScore: 0,
                strengths: ["Could not generate specific strengths."],
                improvements: ["Could not generate specific improvements."],
                steps: ["Review your prompt or try again."],
                metrics: { "Balance": 0, "Power": 0, "Flexibility": 0, "Coordination": 0, "Stability": 0 },
                detailedFeedback: {
                    overview: "Failed to generate detailed analysis. Please try again or refine your input.",
                    points: []
                },
                primeAthleteComparison: {
                    name: "N/A",
                    techniqueDescription: "Could not generate prime athlete comparison."
                }
            };
            throw new Error("Invalid AI analysis response format.");
        }
        return analysis;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error(`AI analysis failed: ${error.message}`);
    }
}

module.exports = { generateAnalysis };

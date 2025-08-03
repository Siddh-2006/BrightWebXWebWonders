// SportsHub/server/services/aiChatRouter.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
const geminiApiManager = require('../utils/geminiApiManager');

/**
 * Enhanced AI Chat Router with intelligent API key management
 * Handles multiple API keys with automatic failover on rate limits
 */
class AIChatRouter {
    constructor() {
        this.apiKeys = this.loadApiKeys();
        this.models = new Map(); // Cache for GoogleGenerativeAI instances
        this.retryAttempts = 3;
        this.retryDelay = 1000; // 1 second base delay
        
        // Initialize models for all available keys
        this.initializeModels();
    }

    /**
     * Load and validate API keys from environment
     */
    loadApiKeys() {
        const keys = [];
        
        // Primary keys
        if (process.env.GEMINI_API_KEY_AI_GURU) {
            keys.push({
                key: process.env.GEMINI_API_KEY_AI_GURU,
                name: 'AI_GURU',
                priority: 1
            });
        }
        
        if (process.env.GEMINI_API_KEY_TrainingPlan) {
            keys.push({
                key: process.env.GEMINI_API_KEY_TrainingPlan,
                name: 'TRAINING_PLAN',
                priority: 2
            });
        }
        
        if (process.env.GEMINI_API_KEY_PostureCorrector) {
            keys.push({
                key: process.env.GEMINI_API_KEY_PostureCorrector,
                name: 'POSTURE_CORRECTOR',
                priority: 3
            });
        }

        // Additional keys from comma-separated list
        if (process.env.GEMINI_API_KEYS) {
            const additionalKeys = process.env.GEMINI_API_KEYS.split(',');
            additionalKeys.forEach((key, index) => {
                if (key.trim()) {
                    keys.push({
                        key: key.trim(),
                        name: `BACKUP_${index + 1}`,
                        priority: 10 + index
                    });
                }
            });
        }

        if (keys.length === 0) {
            throw new Error('No Gemini API keys found in environment variables');
        }

        console.log(`[AI Chat Router] Loaded ${keys.length} API keys`);
        return keys.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Initialize GoogleGenerativeAI models for all keys
     */
    initializeModels() {
        this.apiKeys.forEach(({ key, name }) => {
            try {
                const genAI = new GoogleGenerativeAI(key);
                this.models.set(key, {
                    genAI,
                    model: genAI.getGenerativeModel({ model: "gemini-2.0-flash" }),
                    name
                });
                console.log(`[AI Chat Router] Initialized model for ${name}`);
            } catch (error) {
                console.error(`[AI Chat Router] Failed to initialize model for ${name}:`, error.message);
            }
        });
    }

    /**
     * Get the next available API key using the enhanced manager
     */
    async getAvailableApiKey() {
        const availableKey = geminiApiManager.getAvailableApiKey();
        
        if (!availableKey) {
            // If no key is available from the manager, try to find any key that might work
            const fallbackKey = this.apiKeys.find(({ key }) => {
                const modelInfo = this.models.get(key);
                return modelInfo !== undefined;
            });
            
            if (fallbackKey) {
                console.warn('[AI Chat Router] Using fallback key as no keys available from manager');
                return fallbackKey.key;
            }
            
            throw new Error('No API keys available. All keys have exceeded their rate limits.');
        }
        
        return availableKey;
    }

    /**
     * Execute AI request with automatic failover and retry logic
     */
    async executeWithFailover(requestFunction, context = {}) {
        let lastError = null;
        let attemptCount = 0;

        for (let retry = 0; retry < this.retryAttempts; retry++) {
            try {
                const apiKey = await this.getAvailableApiKey();
                const modelInfo = this.models.get(apiKey);
                
                if (!modelInfo) {
                    throw new Error(`Model not initialized for API key: ${apiKey.substring(0, 8)}...`);
                }

                console.log(`[AI Chat Router] Attempt ${retry + 1} using key: ${modelInfo.name}`);
                
                // Record the API call
                geminiApiManager.recordApiCall(apiKey);
                
                // Execute the request
                const result = await requestFunction(modelInfo.model, modelInfo.genAI);
                
                console.log(`[AI Chat Router] Success with key: ${modelInfo.name}`);
                return result;

            } catch (error) {
                attemptCount++;
                lastError = error;
                
                console.error(`[AI Chat Router] Attempt ${attemptCount} failed:`, error.message);
                
                // Handle rate limit errors
                if (this.isRateLimitError(error)) {
                    const currentKey = await this.getAvailableApiKey().catch(() => null);
                    if (currentKey) {
                        geminiApiManager.disableKeyTemporarily(currentKey);
                        console.warn(`[AI Chat Router] Temporarily disabled key due to rate limit`);
                    }
                }
                
                // Handle quota exceeded errors
                if (this.isQuotaExceededError(error)) {
                    const currentKey = await this.getAvailableApiKey().catch(() => null);
                    if (currentKey) {
                        geminiApiManager.disableKeyTemporarily(currentKey);
                        console.warn(`[AI Chat Router] Temporarily disabled key due to quota exceeded`);
                    }
                }

                // Wait before retry with exponential backoff
                if (retry < this.retryAttempts - 1) {
                    const delay = this.retryDelay * Math.pow(2, retry);
                    console.log(`[AI Chat Router] Waiting ${delay}ms before retry...`);
                    await this.sleep(delay);
                }
            }
        }

        // If all retries failed, throw the last error
        throw new Error(`AI request failed after ${this.retryAttempts} attempts. Last error: ${lastError?.message || 'Unknown error'}`);
    }

    /**
     * Generate content with automatic failover
     */
    async generateContent(prompt, options = {}) {
        return this.executeWithFailover(async (model) => {
            const result = await model.generateContent(prompt);
            return await result.response.text();
        }, { operation: 'generateContent', prompt: prompt.substring(0, 100) + '...' });
    }

    /**
     * Start chat session with automatic failover
     */
    async startChatSession(history = [], systemPrompt = '') {
        return this.executeWithFailover(async (model) => {
            const chatConfig = {
                history: history
            };
            
            // Only add systemInstruction if systemPrompt is provided and not empty
            if (systemPrompt && systemPrompt.trim()) {
                chatConfig.systemInstruction = {
                    role: 'system',
                    parts: [{ text: systemPrompt.trim() }]
                };
            }
            
            const chat = model.startChat(chatConfig);
            return chat;
        }, { operation: 'startChatSession', historyLength: history.length });
    }

    /**
     * Send message in chat session with automatic failover
     */
    async sendChatMessage(chatSession, message) {
        if (!chatSession) {
            throw new Error('Chat session is required');
        }

        return this.executeWithFailover(async () => {
            const result = await chatSession.sendMessage(message);
            return await result.response.text();
        }, { operation: 'sendChatMessage', message: message.substring(0, 100) + '...' });
    }

    /**
     * Generate analysis with enhanced error handling
     */
    async generateAnalysis(userProfile, mediaType, landmarks) {
        const prompt = this.buildAnalysisPrompt(userProfile, mediaType, landmarks);
        
        try {
            const responseText = await this.generateContent(prompt);
            return this.parseAnalysisResponse(responseText, userProfile);
        } catch (error) {
            console.error('[AI Chat Router] Analysis generation failed:', error);
            return this.getFallbackAnalysis(userProfile);
        }
    }

    /**
     * Generate custom training plan with enhanced error handling
     */
    async generateCustomTrainingPlan(planData) {
        const prompt = this.buildTrainingPlanPrompt(planData);
        
        try {
            const responseText = await this.generateContent(prompt);
            return this.parseTrainingPlanResponse(responseText, planData);
        } catch (error) {
            console.error('[AI Chat Router] Training plan generation failed:', error);
            return this.getFallbackTrainingPlan(planData);
        }
    }

    /**
     * Handle AI Guru chat with enhanced conversation management
     */
    async handleAIGuruChat(chatMessages, userQuestion, userDetails, userLanguage = 'en') {
        try {
            // Build conversation history
            const history = this.buildChatHistory(chatMessages, userQuestion);
            const systemPrompt = this.buildAIGuruPrompt(userDetails, userLanguage);
            
            // Start chat session
            const chat = await this.startChatSession(history, systemPrompt);
            
            // Send message
            const response = await this.sendChatMessage(chat, userQuestion);
            
            return response;
        } catch (error) {
            console.error('[AI Chat Router] AI Guru chat failed:', error);
            return this.getFallbackChatResponse(userDetails.userName, userLanguage);
        }
    }

    // Helper methods for error detection
    isRateLimitError(error) {
        const message = error.message?.toLowerCase() || '';
        return message.includes('rate limit') || 
               message.includes('too many requests') || 
               message.includes('429') ||
               error.status === 429;
    }

    isQuotaExceededError(error) {
        const message = error.message?.toLowerCase() || '';
        return message.includes('quota exceeded') || 
               message.includes('quota exhausted') ||
               message.includes('billing') ||
               error.status === 403;
    }

    // Utility methods
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Prompt building methods (implement based on existing logic)
    buildAnalysisPrompt(userProfile, mediaType, landmarks) {
        // Use existing logic from geminiService.js
        const landmarksString = JSON.stringify(landmarks.map(kp => ({
            name: kp.name,
            x: kp.x.toFixed(4),
            y: kp.y.toFixed(4),
            z: kp.z ? kp.z.toFixed(4) : 'N/A',
            score: kp.score ? kp.score.toFixed(2) : 'N/A'
        })));

        return `
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
            who exemplifies excellent technique for the user's stated goal or general performance.

            Generate the analysis in a JSON format with the following structure:
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
        `;
    }

    buildTrainingPlanPrompt(planData) {
        // Use existing logic from customTrainingPlanController.js
        return `
            You are an elite sports coach and training specialist. Create a comprehensive, personalized training plan based on the provided custom requirements.

            ## CUSTOM PLAN REQUIREMENTS
            **Plan Name:** ${planData.planName}
            **Sport:** ${planData.sport}
            **Difficulty Level:** ${planData.difficulty}
            **Duration:** ${planData.weeks} weeks (${planData.weeks * 7} days)
            **Sessions:** ${planData.sessionsPerWeek} sessions per week, ${planData.sessionDuration} minutes each
            **Total Sessions:** ${planData.weeks * planData.sessionsPerWeek}
            **Goals:** ${planData.goals?.join(', ') || 'General fitness improvement'}
            **Focus Areas:** ${planData.focusAreas?.join(', ') || 'Overall development'}
            **Equipment Available:** ${planData.equipment?.map(eq => eq.name || eq).join(', ') || 'Basic equipment'}
            **Custom Notes:** ${planData.customNotes || 'No specific notes'}

            Create a detailed training plan in JSON format with comprehensive structure including plan overview, weekly structure, session details, progression, equipment usage, safety guidelines, nutrition tips, and recovery guidelines.
        `;
    }

    buildAIGuruPrompt(userDetails, userLanguage) {
        return `
            You are AI Guru, an expert and professional sports coach with a modern, engaging communication style.

            ## USER CONTEXT
            **Name:** ${userDetails.userName}
            **Age:** ${userDetails.userAge}
            **Sex:** ${userDetails.userSex}
            **Height:** ${userDetails.userHeight} cm
            **Weight:** ${userDetails.userWeight} kg
            **Preferred Sport:** ${userDetails.preferredSport}
            **Other Details:** ${userDetails.otherBioDetails || 'N/A'}

            ## RESPONSE GUIDELINES
            Structure your response with beautiful formatting:
            - Use **bold text** for important points and section headers
            - Use emojis (🎯, 💪, 🏃‍♂️, ⚽, 🏀, 🎾, etc.) to make content engaging
            - Use bullet points (•) for tips and recommendations
            - Keep paragraphs short and scannable
            - Respond in ${userLanguage}
            - Keep responses concise but comprehensive, around 200-300 words
            - Always reference the user's specific sport, age, or goals to make advice relevant
        `;
    }

    buildChatHistory(chatMessages, currentQuestion) {
        if (!chatMessages || chatMessages.length === 0) {
            return [];
        }

        return chatMessages
            .filter(msg => {
                const isUserMessage = msg.role === 'user' || msg.type === 'user';
                const isNotCurrentQuestion = (msg.text || msg.message) !== currentQuestion;
                return isUserMessage && isNotCurrentQuestion;
            })
            .map(msg => ({
                role: 'user',
                parts: [{ text: msg.text || msg.message }]
            }));
    }

    // Fallback methods
    parseAnalysisResponse(responseText, userProfile) {
        try {
            // Extract JSON from markdown code block if present
            const jsonMatch = responseText.match(/```json\n([\s\S]*)\n```/);
            if (jsonMatch && jsonMatch[1]) {
                responseText = jsonMatch[1].trim();
            } else {
                responseText = responseText.trim();
            }

            const analysis = JSON.parse(responseText);
            
            // Validate required fields
            if (!analysis.overallScore || !analysis.strengths || !analysis.improvements || 
                !analysis.metrics || !analysis.detailedFeedback || !analysis.primeAthleteComparison) {
                throw new Error("Response missing expected fields");
            }
            
            return analysis;
        } catch (error) {
            console.error("Failed to parse analysis response:", error);
            return this.getFallbackAnalysis(userProfile);
        }
    }

    parseTrainingPlanResponse(responseText, planData) {
        try {
            const jsonMatch = responseText.match(/```json\n([\s\S]*)\n```/);
            if (jsonMatch && jsonMatch[1]) {
                responseText = jsonMatch[1].trim();
            } else {
                responseText = responseText.trim();
            }

            return JSON.parse(responseText);
        } catch (error) {
            console.error("Failed to parse training plan response:", error);
            return this.getFallbackTrainingPlan(planData);
        }
    }

    getFallbackAnalysis(userProfile) {
        return {
            overallScore: 75,
            strengths: ["Good basic form", "Consistent effort"],
            improvements: ["Focus on technique refinement", "Increase training consistency"],
            steps: ["Practice basic movements daily", "Work with a coach", "Record progress"],
            metrics: { 
                "Balance": 70, 
                "Power": 75, 
                "Flexibility": 65, 
                "Coordination": 70, 
                "Stability": 75 
            },
            detailedFeedback: {
                overview: `Analysis for ${userProfile.sport} technique shows good potential with room for improvement.`,
                points: [
                    {"joint": "Core", "area": "Stability", "feedback": "Focus on core strengthening exercises"},
                    {"joint": "Shoulders", "area": "Upper Body", "feedback": "Work on shoulder mobility and strength"}
                ]
            },
            primeAthleteComparison: {
                name: "Professional Athlete",
                techniqueDescription: "Professional athletes in this sport demonstrate excellent technique through consistent practice and proper form."
            }
        };
    }

    getFallbackTrainingPlan(planData) {
        return {
            planTitle: `${planData.planName} - ${planData.sport} Training Plan`,
            overview: `A comprehensive ${planData.difficulty.toLowerCase()} level training plan for ${planData.sport}.`,
            weeklyStructure: {
                sessionsPerWeek: planData.sessionsPerWeek,
                totalWeeks: planData.weeks,
                restDays: 7 - planData.sessionsPerWeek
            },
            sessionDetails: [
                {
                    sessionNumber: 1,
                    title: `${planData.sport} Training Session`,
                    duration: `${planData.sessionDuration} minutes`,
                    focus: planData.focusAreas?.[0] || "General fitness",
                    warmUp: ["5-minute light cardio", "Dynamic stretching", "Sport-specific movements"],
                    mainWorkout: ["Skill practice", "Conditioning exercises", "Sport-specific drills"],
                    coolDown: ["Static stretching", "Breathing exercises"]
                }
            ],
            progression: {
                "week1-2": "Foundation building and technique focus",
                "week3-4": "Intensity increase and skill development",
                "week5+": "Performance optimization and goal achievement"
            },
            equipment: planData.equipment?.map(eq => eq.name || eq) || ["Basic sports equipment"],
            safetyGuidelines: [
                "Always warm up before training",
                "Stay hydrated throughout sessions",
                "Listen to your body and rest when needed"
            ],
            nutritionTips: [
                "Eat a balanced meal 2-3 hours before training",
                "Stay hydrated before, during, and after exercise",
                "Include protein in post-workout meals for recovery"
            ],
            recoveryGuidelines: [
                "Get 7-9 hours of sleep per night",
                "Include rest days in your training schedule",
                "Use active recovery like light walking or stretching"
            ],
            additionalNotes: "Stay consistent with your training and track your progress!"
        };
    }

    getFallbackChatResponse(userName, userLanguage) {
        const responses = {
            en: `Hi ${userName}! 👋 I'm experiencing some technical difficulties right now, but I'm here to help! Please try asking your question again in a moment. In the meantime, remember to stay hydrated and keep up with your training! 💪`,
            hi: `नमस्ते ${userName}! 👋 मुझे अभी कुछ तकनीकी समस्या हो रही है, लेकिन मैं आपकी मदद के लिए यहाँ हूँ! कृपया थोड़ी देर बाद अपना प्रश्न फिर से पूछें। इस बीच, हाइड्रेटेड रहना और अपनी ट्रेनिंग जारी रखना याद रखें! 💪`
        };
        
        return responses[userLanguage] || responses.en;
    }

    /**
     * Get system status and statistics
     */
    getSystemStatus() {
        const availableKeys = this.apiKeys.filter(({ key }) => {
            try {
                return geminiApiManager.getAvailableApiKey() === key;
            } catch {
                return false;
            }
        });

        return {
            totalKeys: this.apiKeys.length,
            availableKeys: availableKeys.length,
            modelsInitialized: this.models.size,
            lastGenerationTimestamp: geminiApiManager.getLastGenerationTimestamp(),
            keyStatus: this.apiKeys.map(({ key, name, priority }) => ({
                name,
                priority,
                keyPreview: key.substring(0, 8) + '...',
                isAvailable: availableKeys.some(ak => ak.key === key),
                hasModel: this.models.has(key)
            }))
        };
    }
}

// Export singleton instance
const aiChatRouter = new AIChatRouter();
module.exports = aiChatRouter;
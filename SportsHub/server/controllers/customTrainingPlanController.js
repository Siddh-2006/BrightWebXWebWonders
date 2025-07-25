const CustomTrainingPlan = require('../models/CustomTrainingPlan');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const geminiApiKey = process.env.GEMINI_API_KEY_AI_GURU || process.env.GEMINI_API_KEY_PostureCorrector;
if (!geminiApiKey) {
  console.error("Error: No Gemini API Key found for custom training plans!");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

const CUSTOM_TRAINING_PLAN_PROMPT = `
You are an elite sports coach and training specialist. Create a comprehensive, personalized training plan based on the provided custom requirements.

## CUSTOM PLAN REQUIREMENTS
**Plan Name:** <<planName>>
**Sport:** <<sport>>
**Difficulty Level:** <<difficulty>>
**Duration:** <<weeks>> weeks (<<totalDays>> days)
**Sessions:** <<sessionsPerWeek>> sessions per week, <<sessionDuration>> minutes each
**Total Sessions:** <<totalSessions>>
**Goals:** <<goals>>
**Focus Areas:** <<focusAreas>>
**Equipment Available:** <<equipment>>
**Custom Notes:** <<customNotes>>

## TRAINING PLAN STRUCTURE

Create a detailed training plan that includes:

1. **Plan Overview** - Brief description tailored to the custom requirements
2. **Weekly Structure** - How sessions are distributed across weeks
3. **Session Details** - Detailed breakdown of each session type
4. **Progression** - How difficulty increases over the specified duration
5. **Equipment Usage** - How to utilize the available equipment
6. **Safety Guidelines** - Important safety considerations for this specific plan
7. **Nutrition Tips** - Nutrition advice tailored to the sport and goals
8. **Recovery Guidelines** - Rest and recovery recommendations

## DIFFICULTY LEVEL GUIDELINES

**Beginner:** Focus on fundamentals, basic techniques, and building fitness foundation
**Intermediate:** Combine technique refinement with moderate intensity training
**Advanced:** High-intensity training, complex techniques, and performance optimization
**Professional:** Elite-level training with advanced periodization and specialization

## RESPONSE FORMAT

Provide your response in JSON format with the following structure:

{
  "planTitle": "<<planName>> - <<sport>> Training Plan",
  "overview": "Comprehensive description of the training plan focus and goals based on custom requirements",
  "weeklyStructure": {
    "sessionsPerWeek": <<sessionsPerWeek>>,
    "totalWeeks": <<weeks>>,
    "restDays": <<restDays>>
  },
  "sessionDetails": [
    {
      "sessionNumber": 1,
      "title": "Session title based on focus areas",
      "duration": "<<sessionDuration>> minutes",
      "focus": "Main focus area from the selected focus areas",
      "warmUp": ["Warm-up exercise 1", "Warm-up exercise 2", "Warm-up exercise 3"],
      "mainWorkout": ["Main exercise 1", "Main exercise 2", "Main exercise 3", "Main exercise 4"],
      "coolDown": ["Cool-down exercise 1", "Cool-down exercise 2"]
    }
  ],
  "progression": {
    "week1-2": "Focus for initial weeks",
    "week3-4": "Focus for intermediate weeks",
    "week5+": "Focus for advanced weeks (adjust based on total duration)"
  },
  "equipment": ["Equipment from available list"],
  "safetyGuidelines": [
    "Safety tip 1 specific to sport and difficulty",
    "Safety tip 2 specific to equipment usage",
    "Safety tip 3 specific to training intensity"
  ],
  "nutritionTips": [
    "Nutrition tip 1 tailored to sport and goals",
    "Nutrition tip 2 for training days",
    "Nutrition tip 3 for recovery"
  ],
  "recoveryGuidelines": [
    "Recovery tip 1 based on session frequency",
    "Recovery tip 2 for the specific sport",
    "Recovery tip 3 for the difficulty level"
  ],
  "additionalNotes": "Personalized motivational message and any specific advice based on custom notes"
}

Make the plan highly specific to the custom requirements, incorporating all the selected focus areas, utilizing the available equipment, and addressing the specific goals mentioned.
`;

// Create a new custom training plan
const createCustomTrainingPlan = async (req, res) => {
  try {
    const {
      planName,
      sport,
      difficulty,
      weeks,
      sessionsPerWeek,
      sessionDuration,
      goals,
      focusAreas,
      equipment,
      customNotes,
      isPublic,
      tags
    } = req.body;

    // Calculate derived values
    const totalDays = weeks * 7;
    const totalSessions = weeks * sessionsPerWeek;
    const restDays = 7 - sessionsPerWeek;

    // Create the training plan document
    const customTrainingPlan = new CustomTrainingPlan({
      userId: req.user?.id || '507f1f77bcf86cd799439011', // Default user ID for testing
      planName,
      sport,
      difficulty,
      duration: {
        weeks,
        totalDays
      },
      sessions: {
        sessionsPerWeek,
        sessionDuration,
        totalSessions
      },
      goals: goals || [],
      focusAreas: focusAreas || [],
      equipment: equipment || [],
      customNotes: customNotes || '',
      isPublic: isPublic || false,
      tags: tags || []
    });

    // Generate AI training plan
    try {
      const fullPrompt = CUSTOM_TRAINING_PLAN_PROMPT
        .replace(/<<planName>>/g, planName)
        .replace(/<<sport>>/g, sport)
        .replace(/<<difficulty>>/g, difficulty)
        .replace(/<<weeks>>/g, weeks)
        .replace(/<<totalDays>>/g, totalDays)
        .replace(/<<sessionsPerWeek>>/g, sessionsPerWeek)
        .replace(/<<sessionDuration>>/g, sessionDuration)
        .replace(/<<totalSessions>>/g, totalSessions)
        .replace(/<<goals>>/g, goals?.join(', ') || 'General fitness improvement')
        .replace(/<<focusAreas>>/g, focusAreas?.join(', ') || 'Overall development')
        .replace(/<<equipment>>/g, equipment?.map(eq => eq.name).join(', ') || 'Basic equipment')
        .replace(/<<customNotes>>/g, customNotes || 'No specific notes')
        .replace(/<<restDays>>/g, restDays);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(fullPrompt);
      
      let responseText = await result.response.text();
      console.log('Raw Gemini Response for Custom Plan:', responseText);

      // Extract JSON from markdown code block if present
      const jsonMatch = responseText.match(/```json\n([\s\S]*)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        responseText = jsonMatch[1].trim();
      } else {
        responseText = responseText.trim();
      }

      let generatedPlan = {};
      try {
        generatedPlan = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse Gemini response as JSON:", responseText, parseError);
        
        // Fallback plan
        generatedPlan = {
          planTitle: `${planName} - ${sport} Training Plan`,
          overview: `A comprehensive ${difficulty.toLowerCase()} level training plan for ${sport} designed to achieve your specific goals over ${weeks} weeks.`,
          weeklyStructure: {
            sessionsPerWeek,
            totalWeeks: weeks,
            restDays
          },
          sessionDetails: [
            {
              sessionNumber: 1,
              title: `${sport} Training Session`,
              duration: `${sessionDuration} minutes`,
              focus: focusAreas?.[0] || "General fitness",
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
          equipment: equipment?.map(eq => eq.name) || ["Basic sports equipment"],
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
          additionalNotes: "Stay consistent with your training and track your progress. Remember, improvement takes time and dedication!"
        };
      }

      customTrainingPlan.generatedPlan = generatedPlan;
    } catch (aiError) {
      console.error('AI generation error:', aiError);
      // Continue without AI-generated plan - user can still save their custom parameters
    }

    // Save to database
    const savedPlan = await customTrainingPlan.save();

    res.status(201).json({
      success: true,
      message: 'Custom training plan created successfully',
      trainingPlan: savedPlan
    });

  } catch (error) {
    console.error('Error creating custom training plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create custom training plan',
      error: error.message
    });
  }
};

// Get all training plans for a user
const getUserTrainingPlans = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const plans = await CustomTrainingPlan.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      trainingPlans: plans
    });
  } catch (error) {
    console.error('Error fetching user training plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training plans',
      error: error.message
    });
  }
};

// Get a specific training plan
const getTrainingPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const plan = await CustomTrainingPlan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    res.json({
      success: true,
      trainingPlan: plan
    });
  } catch (error) {
    console.error('Error fetching training plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training plan',
      error: error.message
    });
  }
};

// Update training plan
const updateTrainingPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const updates = req.body;

    const plan = await CustomTrainingPlan.findByIdAndUpdate(
      planId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Training plan updated successfully',
      trainingPlan: plan
    });
  } catch (error) {
    console.error('Error updating training plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update training plan',
      error: error.message
    });
  }
};

// Delete training plan
const deleteTrainingPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const plan = await CustomTrainingPlan.findByIdAndDelete(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Training plan deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting training plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete training plan',
      error: error.message
    });
  }
};

// Get public training plans
const getPublicTrainingPlans = async (req, res) => {
  try {
    const { sport, difficulty, page = 1, limit = 10 } = req.query;
    
    const filter = { isPublic: true };
    if (sport) filter.sport = sport;
    if (difficulty) filter.difficulty = difficulty;

    const plans = await CustomTrainingPlan.find(filter)
      .populate('userId', 'fullname profilePhoto')
      .sort({ likes: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await CustomTrainingPlan.countDocuments(filter);

    res.json({
      success: true,
      trainingPlans: plans,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPlans: total
      }
    });
  } catch (error) {
    console.error('Error fetching public training plans:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch public training plans',
      error: error.message
    });
  }
};

// Like/Unlike training plan
const toggleLikeTrainingPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.user?.id || '507f1f77bcf86cd799439011';

    const plan = await CustomTrainingPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    const hasLiked = plan.likedBy.includes(userId);
    
    if (hasLiked) {
      // Unlike
      plan.likedBy.pull(userId);
      plan.likes = Math.max(0, plan.likes - 1);
    } else {
      // Like
      plan.likedBy.push(userId);
      plan.likes += 1;
    }

    await plan.save();

    res.json({
      success: true,
      message: hasLiked ? 'Training plan unliked' : 'Training plan liked',
      likes: plan.likes,
      hasLiked: !hasLiked
    });
  } catch (error) {
    console.error('Error toggling like on training plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle like',
      error: error.message
    });
  }
};

// Update session progress
const updateSessionProgress = async (req, res) => {
  try {
    const { planId } = req.params;
    const { sessionNumber, notes, rating } = req.body;

    const plan = await CustomTrainingPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    // Add session to history
    plan.progress.sessionHistory.push({
      sessionNumber,
      completedDate: new Date(),
      notes: notes || '',
      rating: rating || 3
    });

    // Update progress counters
    plan.progress.completedSessions += 1;
    plan.progress.lastSessionDate = new Date();
    
    // Calculate completed weeks
    const completedWeeks = Math.floor(plan.progress.completedSessions / plan.sessions.sessionsPerWeek);
    plan.progress.completedWeeks = completedWeeks;

    await plan.save();

    res.json({
      success: true,
      message: 'Session progress updated successfully',
      progress: plan.progress
    });
  } catch (error) {
    console.error('Error updating session progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update session progress',
      error: error.message
    });
  }
};

module.exports = {
  createCustomTrainingPlan,
  getUserTrainingPlans,
  getTrainingPlan,
  updateTrainingPlan,
  deleteTrainingPlan,
  getPublicTrainingPlans,
  toggleLikeTrainingPlan,
  updateSessionProgress
};
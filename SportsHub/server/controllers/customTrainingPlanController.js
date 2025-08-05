const CustomTrainingPlan = require('../models/CustomTrainingPlan');
const aiChatRouter = require('../services/aiChatRouter');

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

IMPORTANT: Provide your response in VALID JSON format. All arrays must contain simple strings only, not objects or nested structures.

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
      "warmUp": ["Light jogging for 5 minutes", "Arm circles forward and backward", "Dynamic leg swings"],
      "mainWorkout": ["Skill practice drills", "Conditioning exercises", "Sport-specific movements", "Strength training"],
      "coolDown": ["Static stretching for hamstrings", "Shoulder and arm stretches"]
    }
  ],
  "progression": {
    "week1-2": "Focus for initial weeks",
    "week3-4": "Focus for intermediate weeks",
    "week5+": "Focus for advanced weeks (adjust based on total duration)"
  },
  "equipment": ["Equipment from available list"],
  "safetyGuidelines": [
    "Always warm up before training sessions",
    "Stay hydrated throughout your workout",
    "Listen to your body and rest when needed"
  ],
  "nutritionTips": [
    "Eat a balanced meal 2-3 hours before training",
    "Stay hydrated before, during, and after exercise",
    "Include protein in post-workout meals for recovery"
  ],
  "recoveryGuidelines": [
    "Get 7-9 hours of quality sleep per night",
    "Include rest days in your training schedule",
    "Use active recovery like light walking or stretching"
  ],
  "additionalNotes": "Personalized motivational message and any specific advice based on custom notes"
}

CRITICAL REQUIREMENTS:
- warmUp, mainWorkout, coolDown must be arrays of simple strings describing exercises
- safetyGuidelines, nutritionTips, recoveryGuidelines must be arrays of simple strings
- Do NOT include nested objects or complex structures in any arrays
- Each string should be a complete, actionable instruction or tip
- Generate enough sessions to cover the total number of sessions (<<totalSessions>>)

Make the plan highly specific to the custom requirements, incorporating all the selected focus areas, utilizing the available equipment, and addressing the specific goals mentioned.
`;

// Create a new custom training plan
const createCustomTrainingPlan = async (req, res) => {
  // Validate request body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required',
      error: 'Empty request body'
    });
  }
  
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

    // Generate AI training plan using AI Chat Router
    try {
      const planData = {
        planName,
        sport,
        difficulty,
        weeks,
        totalDays,
        sessionsPerWeek,
        sessionDuration,
        totalSessions,
        restDays,
        goals: goals || [],
        focusAreas: focusAreas || [],
        equipment: equipment || [],
        customNotes: customNotes || ''
      };

      const generatedPlan = await aiChatRouter.generateCustomTrainingPlan(planData);
      
      if (generatedPlan && typeof generatedPlan === 'object') {
        // Sanitize the AI response to ensure it matches the schema
        const sanitizedPlan = sanitizeGeneratedPlan(generatedPlan);
        customTrainingPlan.generatedPlan = sanitizedPlan;
      } else {
        customTrainingPlan.generatedPlan = createFallbackPlan(planData);
      }
      
    } catch (aiError) {
      console.error('AI generation error:', aiError.message);
      customTrainingPlan.generatedPlan = createFallbackPlan({
        planName,
        sport,
        difficulty,
        weeks,
        totalDays,
        sessionsPerWeek,
        sessionDuration,
        totalSessions,
        restDays,
        goals: goals || [],
        focusAreas: focusAreas || [],
        equipment: equipment || [],
        customNotes: customNotes || ''
      });
    }

    // Save to database
    const savedPlan = await customTrainingPlan.save();

    res.status(201).json({
      success: true,
      message: 'Custom training plan created successfully',
      trainingPlan: savedPlan
    });

  } catch (error) {
    console.error('❌ Error creating custom training plan:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to create custom training plan',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
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

// Sanitize AI generated plan to match schema requirements
const sanitizeGeneratedPlan = (generatedPlan) => {
  try {
    const sanitized = { ...generatedPlan };
    
    // Sanitize session details
    if (sanitized.sessionDetails && Array.isArray(sanitized.sessionDetails)) {
      sanitized.sessionDetails = sanitized.sessionDetails.map(session => {
        const sanitizedSession = { ...session };
        
        // Convert warmUp to simple string array
        if (sanitizedSession.warmUp) {
          sanitizedSession.warmUp = extractStringArray(sanitizedSession.warmUp);
        }
        
        // Convert mainWorkout to simple string array
        if (sanitizedSession.mainWorkout) {
          sanitizedSession.mainWorkout = extractStringArray(sanitizedSession.mainWorkout);
        }
        
        // Convert coolDown to simple string array
        if (sanitizedSession.coolDown) {
          sanitizedSession.coolDown = extractStringArray(sanitizedSession.coolDown);
        }
        
        return sanitizedSession;
      });
    }
    
    // Sanitize other arrays
    if (sanitized.safetyGuidelines) {
      sanitized.safetyGuidelines = extractStringArray(sanitized.safetyGuidelines);
    }
    
    if (sanitized.nutritionTips) {
      sanitized.nutritionTips = extractStringArray(sanitized.nutritionTips);
    }
    
    if (sanitized.recoveryGuidelines) {
      sanitized.recoveryGuidelines = extractStringArray(sanitized.recoveryGuidelines);
    }
    
    if (sanitized.equipment) {
      sanitized.equipment = extractStringArray(sanitized.equipment);
    }
    
    return sanitized;
  } catch (error) {
    console.error('Error sanitizing plan:', error);
    return generatedPlan; // Return original if sanitization fails
  }
};

// Helper function to extract string arrays from complex structures
const extractStringArray = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => {
      if (typeof item === 'string') {
        return item;
      } else if (typeof item === 'object' && item !== null) {
        // Extract strings from object properties
        const strings = [];
        if (item.exercises && Array.isArray(item.exercises)) {
          strings.push(...item.exercises.filter(ex => typeof ex === 'string'));
        }
        // Extract other string properties
        Object.values(item).forEach(value => {
          if (typeof value === 'string' && value.length > 10) { // Only meaningful strings
            strings.push(value);
          }
        });
        return strings.length > 0 ? strings.join(', ') : 'Exercise or tip';
      }
      return String(item);
    }).filter(item => item && item.length > 0);
  } else if (typeof data === 'string') {
    return [data];
  } else if (typeof data === 'object' && data !== null) {
    // Extract strings from object
    const strings = [];
    Object.values(data).forEach(value => {
      if (typeof value === 'string' && value.length > 10) {
        strings.push(value);
      } else if (Array.isArray(value)) {
        strings.push(...value.filter(v => typeof v === 'string'));
      }
    });
    return strings.length > 0 ? strings : ['Exercise or tip'];
  }
  return ['Exercise or tip'];
};

// Create fallback training plan when AI generation fails
const createFallbackPlan = (planData) => {
  return {
    planTitle: `${planData.planName} - ${planData.sport} Training Plan`,
    overview: `A comprehensive ${planData.difficulty.toLowerCase()} level training plan for ${planData.sport} designed to help you achieve your fitness goals.`,
    weeklyStructure: {
      sessionsPerWeek: planData.sessionsPerWeek,
      totalWeeks: planData.weeks,
      restDays: 7 - planData.sessionsPerWeek
    },
    sessionDetails: [
      {
        sessionNumber: 1,
        title: `${planData.sport} Foundation Session`,
        duration: `${planData.sessionDuration} minutes`,
        focus: planData.focusAreas?.[0] || "General fitness",
        warmUp: ["5-minute light cardio", "Dynamic stretching", "Joint mobility exercises"],
        mainWorkout: ["Skill practice", "Conditioning exercises", "Sport-specific drills", "Strength training"],
        coolDown: ["Static stretching", "Breathing exercises"]
      },
      {
        sessionNumber: 2,
        title: `${planData.sport} Skill Development`,
        duration: `${planData.sessionDuration} minutes`,
        focus: planData.focusAreas?.[1] || "Technique improvement",
        warmUp: ["Light jogging", "Dynamic warm-up", "Sport-specific movements"],
        mainWorkout: ["Technical drills", "Coordination exercises", "Game simulation", "Endurance training"],
        coolDown: ["Cool-down stretches", "Relaxation techniques"]
      }
    ],
    progression: {
      "week1-2": "Foundation building and technique focus",
      "week3-4": "Intensity increase and skill development",
      "week5+": "Performance optimization and goal achievement"
    },
    equipment: planData.equipment?.map(eq => eq.name || eq) || ["Basic sports equipment"],
    safetyGuidelines: [
      "Always warm up before training sessions",
      "Stay hydrated throughout your workout",
      "Listen to your body and rest when needed",
      "Use proper form to prevent injuries"
    ],
    nutritionTips: [
      "Eat a balanced meal 2-3 hours before training",
      "Stay hydrated before, during, and after exercise",
      "Include protein in post-workout meals for recovery",
      "Consume complex carbohydrates for sustained energy"
    ],
    recoveryGuidelines: [
      "Get 7-9 hours of quality sleep per night",
      "Include rest days in your training schedule",
      "Use active recovery like light walking or stretching",
      "Consider massage or foam rolling for muscle recovery"
    ],
    additionalNotes: `Stay consistent with your ${planData.sport} training and track your progress! Remember that improvement takes time and dedication. ${planData.customNotes ? 'Personal note: ' + planData.customNotes : ''}`
  };
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
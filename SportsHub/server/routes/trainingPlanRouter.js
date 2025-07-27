const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const geminiApiKey = process.env.GEMINI_API_KEY_AI_GURU || process.env.GEMINI_API_KEY_PostureCorrector;
if (!geminiApiKey) {
  console.error("Error: No Gemini API Key found for training plans!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

const TRAINING_PLAN_PROMPT = `
You are an elite sports coach and training specialist. Your task is to create a comprehensive, personalized training plan based on the provided information.

## USER INFORMATION
**Name:** <<userName>>
**Age:** <<userAge>>
**Sport:** <<sport>>
**Difficulty Level:** <<difficulty>>
**Duration:** <<duration>>
**Sessions:** <<sessions>>
**User Details:** <<userDetails>>

## TRAINING PLAN REQUIREMENTS

Create a detailed training plan that includes:

1. **Plan Overview** - Brief description of the training focus
2. **Weekly Structure** - How sessions are distributed across weeks
3. **Session Details** - What each session contains
4. **Progression** - How difficulty increases over time
5. **Equipment Needed** - List of required equipment
6. **Safety Guidelines** - Important safety considerations
7. **Nutrition Tips** - Basic nutrition advice for this training
8. **Recovery Guidelines** - Rest and recovery recommendations

## DIFFICULTY LEVEL GUIDELINES

**Beginner:** Focus on fundamentals, basic techniques, and building fitness foundation
**Intermediate:** Combine technique refinement with moderate intensity training
**Advanced:** High-intensity training, complex techniques, and performance optimization

## RESPONSE FORMAT

Provide your response in JSON format with the following structure:

{
  "planTitle": "<<sport>> Training Plan - <<difficulty>> Level",
  "overview": "Brief description of the training plan focus and goals",
  "weeklyStructure": {
    "sessionsPerWeek": <<number>>,
    "totalWeeks": <<number>>,
    "restDays": <<number>>
  },
  "sessionDetails": [
    {
      "sessionNumber": 1,
      "title": "Session title",
      "duration": "45-60 minutes",
      "focus": "Main focus area",
      "warmUp": ["Warm-up exercise 1", "Warm-up exercise 2"],
      "mainWorkout": ["Main exercise 1", "Main exercise 2", "Main exercise 3"],
      "coolDown": ["Cool-down exercise 1", "Cool-down exercise 2"]
    }
  ],
  "progression": {
    "week1-2": "Focus for weeks 1-2",
    "week3-4": "Focus for weeks 3-4",
    "week5+": "Focus for remaining weeks"
  },
  "equipment": ["Equipment item 1", "Equipment item 2"],
  "safetyGuidelines": [
    "Safety tip 1",
    "Safety tip 2",
    "Safety tip 3"
  ],
  "nutritionTips": [
    "Nutrition tip 1",
    "Nutrition tip 2",
    "Nutrition tip 3"
  ],
  "recoveryGuidelines": [
    "Recovery tip 1",
    "Recovery tip 2",
    "Recovery tip 3"
  ],
  "additionalNotes": "Any additional important information or motivational message"
}

Make the plan specific to the sport and difficulty level. Ensure all exercises and recommendations are appropriate for the user's age and experience level.
`;

router.post('/generate', async (req, res) => {
  try {
    const { userInfo, sport, difficulty, duration, sessions } = req.body;
    
    console.log('📥 Received training plan request:', { userInfo, sport, difficulty, duration, sessions });
    
    // Construct the prompt with user information
    const fullPrompt = TRAINING_PLAN_PROMPT
      .replace(/<<userName>>/g, userInfo.name || 'Athlete')
      .replace(/<<userAge>>/g, userInfo.age || '25')
      .replace(/<<sport>>/g, sport)
      .replace(/<<difficulty>>/g, difficulty)
      .replace(/<<duration>>/g, duration)
      .replace(/<<sessions>>/g, sessions)
      .replace(/<<userDetails>>/g, userInfo.details || 'Looking to improve performance');

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(fullPrompt);
    
    let responseText = await result.response.text();
    console.log('Raw Gemini Response:', responseText);

    // Extract JSON from markdown code block if present
    const jsonMatch = responseText.match(/```json\n([\s\S]*)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      responseText = jsonMatch[1].trim();
    } else {
      responseText = responseText.trim();
    }

    let trainingPlan = {};
    try {
      trainingPlan = JSON.parse(responseText);
      
      // Validate required fields
      if (!trainingPlan.planTitle || !trainingPlan.overview || !trainingPlan.sessionDetails) {
        throw new Error("Missing required fields in training plan response");
      }
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", responseText, parseError);
      
      // Fallback training plan
      trainingPlan = {
        planTitle: `${sport} Training Plan - ${difficulty} Level`,
        overview: `A comprehensive ${difficulty.toLowerCase()} level training plan for ${sport} designed to improve your skills and performance over ${duration}.`,
        weeklyStructure: {
          sessionsPerWeek: Math.ceil(sessions / parseInt(duration.split(' ')[0])),
          totalWeeks: parseInt(duration.split(' ')[0]),
          restDays: 2
        },
        sessionDetails: [
          {
            sessionNumber: 1,
            title: `${sport} Fundamentals`,
            duration: "45-60 minutes",
            focus: "Basic technique and conditioning",
            warmUp: ["5-minute light jogging", "Dynamic stretching", "Sport-specific movements"],
            mainWorkout: ["Technique drills", "Skill practice", "Conditioning exercises"],
            coolDown: ["Static stretching", "Breathing exercises"]
          }
        ],
        progression: {
          "week1-2": "Focus on fundamentals and building base fitness",
          "week3-4": "Increase intensity and introduce advanced techniques",
          "week5+": "Performance optimization and competition preparation"
        },
        equipment: ["Basic sports equipment", "Training cones", "Water bottle"],
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
        additionalNotes: "Remember, consistency is key to improvement. Stay motivated and enjoy your training journey!"
      };
    }

    res.json({ trainingPlan });

  } catch (error) {
    console.error('Error generating training plan:', error);
    res.status(500).json({ 
      error: 'Failed to generate training plan. Please try again.',
      details: error.message 
    });
  }
});

module.exports = router;
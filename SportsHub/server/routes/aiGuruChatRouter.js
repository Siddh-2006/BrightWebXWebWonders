const express = require('express');
const router = express.Router(); 
const { GoogleGenerativeAI } = require('@google/generative-ai');

const geminiApiKey = process.env.GEMINI_API_KEY_AI_GURU; // Your specific key name
if (!geminiApiKey) {
  console.error("Error: GEMINI_API_KEY_AI_GURU is not set in the .env file or not accessible in aiGuruChatRouter.js!");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(geminiApiKey);
const AIGURU_PERSONA_AND_GUIDELINES = `
You are AI Guru, an expert and professional sports coach.

## ROLE & GOAL
Your mission is to provide clear, actionable, and expert answers to sports-related questions. Your tone should be knowledgeable and direct, yet encouraging. Avoid overly familiar or emotional language and stick to a professional, to-the-point style.

## USER CONTEXT
Use the following user details to personalize your advice and make it highly relevant.

Name: \${userName}

Age: \${userAge}

Sex: \${userSex}

Height: \${userHeight} cm

Weight: \${userWeight} kg

Preferred Sport: \${preferredSport}

Other Details: \${otherBioDetails || 'N/A'}

Conversation History: \${conversationHistoryFormatted}

Current Question: \${userQuestion}

## RESPONSE GUIDELINES
Follow these steps to structure your response:

Greeting: Start with a brief, professional greeting (e.g., "Hello, \${userName}").

Direct Answer: Immediately address the user's question. Explain the core concept clearly and simply, avoiding jargon.

Actionable Advice: Provide practical, step-by-step advice. Crucially, connect this advice back to the user's specific context, such as their preferred sport, age, or goals mentioned in "Other Details."

Concluding Prompt: End with a simple, encouraging question to invite follow-up (e.g., "What other questions do you have?" or "What would you like to focus on next?").

## FINAL INSTRUCTIONS

Language & Style: Respond in \${userLanguage}. Crucially, write in clear Indian English, using vocabulary and phrasing that are natural and relatable for an Indian audience.

Formatting: Use Markdown for readability (bolding, lists). Use LaTeX for scientific/mathematical notations ($...$ or $$...$$).

Length: Keep the entire response concise and under 200 words.
`;
router.post('/', async (req, res) => {
  try {
    const { chatMessages, userQuestion, userDetails, userLanguage } = req.body;
    const historyForGemini = chatMessages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    const conversationHistoryFormatted = chatMessages.length > 0
      ? chatMessages.map(msg => `${msg.role === 'user' ? 'User' : 'AI Guru'}: ${msg.text}`).join('\n')
      : 'No prior conversation.';
    const fullConstructedPrompt = AIGURU_PERSONA_AND_GUIDELINES
      .replace(/\${userName}/g, userDetails.userName)
      .replace(/\${userAge}/g, userDetails.userAge)
      .replace(/\${userSex}/g, userDetails.userSex)
      .replace(/\${userHeight}/g, userDetails.userHeight)
      .replace(/\${userWeight}/g, userDetails.userWeight)
      .replace(/\${preferredSport}/g, userDetails.preferredSport)
      .replace(/\${otherBioDetails || 'N\/A'}/g, userDetails.otherBioDetails || 'N/A')
      .replace(/\${conversationHistoryFormatted}/g, conversationHistoryFormatted)
      .replace(/\${userQuestion}/g, userQuestion)
      .replace(/\${userLanguage}/g, userLanguage);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const chat = model.startChat({
        history: historyForGemini
    });
    const result = await chat.sendMessage(fullConstructedPrompt);

    const response = await result.response;
    const text = response.text();

    res.json({ guruResponse: text });

  } catch (error) {
    console.error('Error in /api/ai-guru-chat:', error);
    if (error.response && error.response.data) {
        console.error('Gemini API detailed error:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to get response from AI Guru. Please try again.' });
  }
});
module.exports = router;
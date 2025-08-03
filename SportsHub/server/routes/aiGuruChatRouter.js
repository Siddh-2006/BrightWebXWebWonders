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
You are AI Guru, an expert and professional sports coach with a modern, engaging communication style.

## ROLE & GOAL
Your mission is to provide clear, actionable, and expert answers to sports-related questions. Your tone should be knowledgeable, encouraging, and visually appealing. Use modern formatting to make your responses look professional and easy to read.

## USER CONTEXT
Use the following user details to personalize your advice and make it highly relevant.

**Name:** <<userName>>
**Age:** <<userAge>>
**Sex:** <<userSex>>
**Height:** <<userHeight>> cm
**Weight:** <<userWeight>> kg
**Preferred Sport:** <<preferredSport>>
**Other Details:** <<otherBioDetails || 'N/A'>>

**Conversation History:** <<conversationHistoryFormatted>>

**Current Question:** <<userQuestion>>

## RESPONSE GUIDELINES
Structure your response with beautiful formatting:

**Greeting:** Start with a brief, professional greeting using the user's name.

**🎯 Direct Answer:** Use emojis and bold headers to make sections clear. Address the question immediately with clear explanations.

**💪 Action Plan:** Provide numbered steps or bullet points with specific, actionable advice. Connect this to the user's sport and profile.

**🚀 Next Steps:** End with an encouraging question or suggestion for follow-up.

## FORMATTING REQUIREMENTS

- Use **bold text** for important points and section headers
- Use emojis (🎯, 💪, 🏃‍♂️, ⚽, 🏀, 🎾, etc.) to make content engaging
- Use sign (=>) for step-by-step instructions
- Use bullet points (•) for tips and recommendations
- Use > blockquotes for key insights or motivational quotes
- Keep paragraphs short and scannable

## FINAL INSTRUCTIONS

**Language & Style:** Respond in <<userLanguage>>. Write in clear Indian English that's natural and relatable.

**Visual Appeal:** Make every response look like a professional sports coaching guide with proper formatting.

**Length:** Keep responses concise but comprehensive, around 200-300 words.

**Personalization:** Always reference the user's specific sport, age, or goals to make advice relevant.
`;
router.post('/', async (req, res) => {
  try {
    const { chatMessages, userQuestion, userDetails, userLanguage } = req.body;
    
    console.log('📥 Received chat messages:', JSON.stringify(chatMessages, null, 2));
    console.log('📥 User question:', userQuestion);
    
    // For the first message or empty history, start with empty history
    let historyForGemini = [];
    
    // Only add to history if there are previous user messages (not including the current question)
    if (chatMessages && chatMessages.length > 0) {
      console.log('🔍 Processing chat messages for Gemini history...');
      
      // Filter to only include user messages and exclude the current question
      // Handle both 'user' role and any other variations
      historyForGemini = chatMessages
        .filter(msg => {
          // Only include user messages (exclude AI/assistant/model messages)
          const isUserMessage = msg.role === 'user' || msg.type === 'user';
          // Exclude the current question
          const isNotCurrentQuestion = (msg.text || msg.message) !== userQuestion;
          
          console.log(`🔍 Message: "${(msg.text || msg.message)?.substring(0, 50)}..." | Role: ${msg.role} | Type: ${msg.type} | IsUser: ${isUserMessage} | NotCurrent: ${isNotCurrentQuestion}`);
          
          return isUserMessage && isNotCurrentQuestion;
        })
        .map(msg => ({
          role: 'user',
          parts: [{ text: msg.text || msg.message }]
        }));
    }
    
    console.log('📤 History for Gemini:', JSON.stringify(historyForGemini, null, 2));
    
    const conversationHistoryFormatted = chatMessages && chatMessages.length > 0
      ? chatMessages.map(msg => `${msg.role === 'user' ? 'User' : 'AI Guru'}: ${msg.text || msg.message}`).join('\n')
      : 'No prior conversation.';
    const fullConstructedPrompt = AIGURU_PERSONA_AND_GUIDELINES
      .replace(/<<userName>>/g, userDetails.userName)
      .replace(/<<userAge>>/g, userDetails.userAge)
      .replace(/<<userSex>>/g, userDetails.userSex)
      .replace(/<<userHeight>>/g, userDetails.userHeight)
      .replace(/<<userWeight>>/g, userDetails.userWeight)
      .replace(/<<preferredSport>>/g, userDetails.preferredSport)
      .replace(/<<otherBioDetails>>/g, userDetails.otherBioDetails || 'N/A')
      .replace(/<<conversationHistoryFormatted>>/g, conversationHistoryFormatted)
      .replace(/<<userQuestion>>/g, userQuestion)
      .replace(/<<userLanguage>>/g, userLanguage);

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
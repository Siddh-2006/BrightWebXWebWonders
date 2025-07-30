import { AI_GURU_API_ENDPOINT, API_BASE_URL } from '../config/api';

export const getAIGuruResponse = async ({ chat, userDetails }) => {
  try {
    console.log('🚀 Making API call to:', AI_GURU_API_ENDPOINT);
    
    // Get the last user message as userQuestion
    const lastUserMessage = chat.filter(msg => msg.role === 'user').pop();
    const userQuestion = lastUserMessage ? lastUserMessage.text : '';
    
    console.log('📝 User question:', userQuestion);
    
    // Format chat messages for backend (excluding the current question)
    const chatMessages = chat.slice(0, -1); // Remove the last message since it's sent as userQuestion
    
    // Map userDetails to match backend expectations
    const mappedUserDetails = {
      userName: userDetails.name,
      userAge: userDetails.age,
      userSex: userDetails.sex,
      userHeight: userDetails.height,
      userWeight: userDetails.weight,
      preferredSport: userDetails.sport,
      otherBioDetails: userDetails.details
    };

    const requestBody = {
      chatMessages,
      userQuestion,
      userDetails: mappedUserDetails,
      userLanguage: userDetails.language || 'en-IN'
    };
    
    console.log('📤 Request body:', requestBody);

    const response = await fetch(AI_GURU_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API response:', data);
    return data.guruResponse; // Backend returns 'guruResponse' not 'response'
  } catch (error) {
    console.error('❌ API call failed:', error);
    throw error;
  }
};
export const analyzePosture = async (postureData) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postureData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('❌ Posture analysis API call failed:', error);
    throw error;
  }
};
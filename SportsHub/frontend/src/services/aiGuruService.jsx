import { AI_GURU_API_ENDPOINT, API_BASE_URL } from '../config/api';

export const getAIGuruResponse = async ({ chat, userDetails }) => {
  try {
    
    // Get the last user message as userQuestion
    const lastUserMessage = chat.filter(msg => msg.role === 'user').pop();
    const userQuestion = lastUserMessage ? lastUserMessage.text : '';
    
    
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
    

    const response = await fetch(AI_GURU_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });


    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.guruResponse; // Backend returns 'guruResponse' not 'response'
  } catch (error) {
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
    throw error;
  }
};
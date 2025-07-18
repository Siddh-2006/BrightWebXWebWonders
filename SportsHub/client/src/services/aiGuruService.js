import { AI_GURU_API_ENDPOINT } from '../config/api';
import { formatChatHistoryForPrompt } from '../utils/chatHistoryFormatter';

export const getAIGuruResponse = async (chatHistory, userQuestion, userDetails, userLanguage) => {
  try {
    const response = await fetch(AI_GURU_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatHistory: formatChatHistoryForPrompt(chatHistory), 
        userQuestion,
        userDetails,
        userLanguage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result.text; 
  } catch (error) {
    console.error("Error in getAIGuruResponse service:", error);
    throw error;
  }
};
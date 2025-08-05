const TRAINING_PLAN_API_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL || 'https://sportshub-murex.vercel.app'}/api/training-plans`;

export const generateTrainingPlan = async ({ userInfo, sport, difficulty, duration, sessions }) => {
  try {
    
    const requestBody = {
      userInfo,
      sport,
      difficulty,
      duration,
      sessions
    };
    

    const response = await fetch(`${TRAINING_PLAN_API_ENDPOINT}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(requestBody)
    });


    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.trainingPlan;
  } catch (error) {
    
    // Provide more specific error messages
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the training plan service. Please check your internet connection and ensure the backend server is running.');
    } else if (error.message.includes('NetworkError')) {
      throw new Error('Network error occurred while generating training plan. Please try again.');
    } else if (error.message.includes('timeout')) {
      throw new Error('Request timed out. The server may be busy. Please try again in a moment.');
    }
    
    throw error;
  }
};
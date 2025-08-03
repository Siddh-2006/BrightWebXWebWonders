const TRAINING_PLAN_API_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/api/training-plans`;

export const generateTrainingPlan = async ({ userInfo, sport, difficulty, duration, sessions }) => {
  try {
    console.log('🚀 Making training plan API call to:', TRAINING_PLAN_API_ENDPOINT);
    
    const requestBody = {
      userInfo,
      sport,
      difficulty,
      duration,
      sessions
    };
    
    console.log('📤 Training plan request body:', requestBody);

    const response = await fetch(`${TRAINING_PLAN_API_ENDPOINT}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    console.log('📥 Training plan response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Training plan API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Training plan API response:', data);
    return data.trainingPlan;
  } catch (error) {
    console.error('❌ Training plan API call failed:', error);
    throw error;
  }
};
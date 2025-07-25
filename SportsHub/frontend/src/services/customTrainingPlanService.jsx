const CUSTOM_TRAINING_PLAN_API_ENDPOINT = 'http://localhost:3000/api/custom-training-plans';

// Create a new custom training plan
export const createCustomTrainingPlan = async (planData) => {
  try {
    console.log('🚀 Creating custom training plan:', planData);
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData)
    });

    console.log('📥 Custom training plan response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Custom training plan API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Custom training plan created:', data);
    return data;
  } catch (error) {
    console.error('❌ Custom training plan creation failed:', error);
    throw error;
  }
};

// Get user's training plans
export const getUserTrainingPlans = async () => {
  try {
    console.log('🚀 Fetching user training plans');
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/my-plans`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Get user plans API error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ User training plans fetched:', data);
    return data.trainingPlans;
  } catch (error) {
    console.error('❌ Failed to fetch user training plans:', error);
    throw error;
  }
};

// Get a specific training plan
export const getTrainingPlan = async (planId) => {
  try {
    console.log('🚀 Fetching training plan:', planId);
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Get training plan API error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Training plan fetched:', data);
    return data.trainingPlan;
  } catch (error) {
    console.error('❌ Failed to fetch training plan:', error);
    throw error;
  }
};

// Update a training plan
export const updateTrainingPlan = async (planId, updates) => {
  try {
    console.log('🚀 Updating training plan:', planId, updates);
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Update training plan API error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Training plan updated:', data);
    return data.trainingPlan;
  } catch (error) {
    console.error('❌ Failed to update training plan:', error);
    throw error;
  }
};

// Delete a training plan
export const deleteTrainingPlan = async (planId) => {
  try {
    console.log('🚀 Deleting training plan:', planId);
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Delete training plan API error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Training plan deleted:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to delete training plan:', error);
    throw error;
  }
};

// Get public training plans
export const getPublicTrainingPlans = async (filters = {}) => {
  try {
    console.log('🚀 Fetching public training plans with filters:', filters);
    
    const queryParams = new URLSearchParams();
    if (filters.sport) queryParams.append('sport', filters.sport);
    if (filters.difficulty) queryParams.append('difficulty', filters.difficulty);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);

    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/public/browse?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Get public plans API error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Public training plans fetched:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to fetch public training plans:', error);
    throw error;
  }
};

// Like/Unlike a training plan
export const toggleLikeTrainingPlan = async (planId) => {
  try {
    console.log('🚀 Toggling like for training plan:', planId);
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Toggle like API error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Like toggled:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to toggle like:', error);
    throw error;
  }
};

// Update session progress
export const updateSessionProgress = async (planId, sessionData) => {
  try {
    console.log('🚀 Updating session progress:', planId, sessionData);
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Update progress API error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Session progress updated:', data);
    return data.progress;
  } catch (error) {
    console.error('❌ Failed to update session progress:', error);
    throw error;
  }
};

// Get training plan statistics
export const getTrainingPlanStats = async (planId) => {
  try {
    console.log('🚀 Fetching training plan stats:', planId);
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}/stats`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Get stats API error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Training plan stats fetched:', data);
    return data.stats;
  } catch (error) {
    console.error('❌ Failed to fetch training plan stats:', error);
    throw error;
  }
};

// Duplicate a training plan
export const duplicateTrainingPlan = async (planId) => {
  try {
    console.log('🚀 Duplicating training plan:', planId);
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}/duplicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Duplicate plan API error:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Training plan duplicated:', data);
    return data.trainingPlan;
  } catch (error) {
    console.error('❌ Failed to duplicate training plan:', error);
    throw error;
  }
};
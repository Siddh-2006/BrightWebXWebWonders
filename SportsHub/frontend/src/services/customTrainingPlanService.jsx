const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const CUSTOM_TRAINING_PLAN_API_ENDPOINT = `${BACKEND_URL}/api/custom-training-plans`;


// Alternative endpoint for backward compatibility (singular)
const CUSTOM_TRAINING_PLAN_API_ENDPOINT_SINGULAR = `${BACKEND_URL}/api/custom-training-plan`;

// Create a new custom training plan (with fallback to singular endpoint)
export const createCustomTrainingPlan = async (planData) => {
  const endpoints = [
    `${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/create`,
    `${CUSTOM_TRAINING_PLAN_API_ENDPOINT_SINGULAR}/create`
  ];

  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    try {
      
      // Validate the endpoint URL
      if (!endpoint || endpoint === 'undefined/create' || endpoint.includes('undefined')) {
        continue;
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(planData)
      });


      if (!response.ok) {
        const errorText = await response.text();
        
        // If this is not the last endpoint, try the next one
        if (i < endpoints.length - 1) {
          continue;
        }
        
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`❌ Custom training plan creation failed (attempt ${i + 1}):`, error);
      console.error(`❌ Error details:`, {
        message: error.message,
        stack: error.stack,
        endpoint: endpoint
      });
      
      // If this is not the last endpoint, try the next one
      if (i < endpoints.length - 1) {
        continue;
      }
      
      throw error;
    }
  }
};

// Get user's training plans
export const getUserTrainingPlans = async () => {
  try {
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/my-plans`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.trainingPlans;
  } catch (error) {
    throw error;
  }
};

// Get a specific training plan
export const getTrainingPlan = async (planId) => {
  try {
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.trainingPlan;
  } catch (error) {
    throw error;
  }
};

// Update a training plan
export const updateTrainingPlan = async (planId, updates) => {
  try {
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.trainingPlan;
  } catch (error) {
    throw error;
  }
};

// Delete a training plan
export const deleteTrainingPlan = async (planId) => {
  try {
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Get public training plans
export const getPublicTrainingPlans = async (filters = {}) => {
  try {
    
    const queryParams = new URLSearchParams();
    if (filters.sport) queryParams.append('sport', filters.sport);
    if (filters.difficulty) queryParams.append('difficulty', filters.difficulty);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);

    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/public/browse?${queryParams}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Like/Unlike a training plan
export const toggleLikeTrainingPlan = async (planId) => {
  try {
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Update session progress
export const updateSessionProgress = async (planId, sessionData) => {
  try {
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(sessionData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.progress;
  } catch (error) {
    throw error;
  }
};

// Get training plan statistics
export const getTrainingPlanStats = async (planId) => {
  try {
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}/stats`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.stats;
  } catch (error) {
    throw error;
  }
};

// Duplicate a training plan
export const duplicateTrainingPlan = async (planId) => {
  try {
    
    const response = await fetch(`${CUSTOM_TRAINING_PLAN_API_ENDPOINT}/${planId}/duplicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.trainingPlan;
  } catch (error) {
    throw error;
  }
};
// services/quizService.jsx
import { API_BASE_URL } from '../config/api.js';

export const quizService = {
  // Generate quiz for user with selected sports (public access - no authentication required)
  generateQuiz: async (sports) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sports })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        
        // Handle the case where questions are being generated (status 202)
        if (response.status === 202) {
          const generatingError = new Error(errorData.message || 'Questions are being generated');
          generatingError.status = 'generating';
          generatingError.info = errorData.info;
          throw generatingError;
        }
        
        throw new Error(errorData.message || 'Failed to generate quiz');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw error;
    }
  },

  // Submit quiz results
  submitQuizResult: async (quizData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(quizData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit quiz result');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      throw error;
    }
  },


  // Get user's quiz results
  getUserQuizResults: async (userId, token, page = 1, limit = 10) => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz/results/${userId}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch quiz results');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      throw error;
    }
  }
};
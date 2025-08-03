import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const challengeService = {
  // Create a new challenge
  createChallenge: async (challengeData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/challenges`, challengeData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all challenges for the current user's club
  getChallenges: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/challenges`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get a single challenge by ID
  getChallenge: async (challengeId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/challenges/${challengeId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Accept a challenge
  acceptChallenge: async (challengeId) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/challenges/${challengeId}/accept`, {}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Decline a challenge
  declineChallenge: async (challengeId) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/challenges/${challengeId}/decline`, {}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get notifications for the current user
  getNotifications: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/challenges/notifications`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/challenges/notifications/${notificationId}/read`, {}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's club information
  getMyClub: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clubs/my-club`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
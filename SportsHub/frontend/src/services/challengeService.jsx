import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const challengeService = {
  // Create a new challenge
  createChallenge: async (challengeData) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await axios.post(`${API_BASE_URL}/challenges`, challengeData, {
        withCredentials: true,
        headers
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all challenges for the current user's club
  getChallenges: async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await axios.get(`${API_BASE_URL}/challenges`, {
        withCredentials: true,
        headers
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get a single challenge by ID
  getChallenge: async (challengeId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await axios.get(`${API_BASE_URL}/challenges/${challengeId}`, {
        withCredentials: true,
        headers
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Accept a challenge
  acceptChallenge: async (challengeId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await axios.patch(`${API_BASE_URL}/challenges/${challengeId}/accept`, {}, {
        withCredentials: true,
        headers
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Decline a challenge
  declineChallenge: async (challengeId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await axios.patch(`${API_BASE_URL}/challenges/${challengeId}/decline`, {}, {
        withCredentials: true,
        headers
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get notifications for the current user
  getNotifications: async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await axios.get(`${API_BASE_URL}/challenges/notifications`, {
        withCredentials: true,
        headers
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await axios.patch(`${API_BASE_URL}/challenges/notifications/${notificationId}/read`, {}, {
        withCredentials: true,
        headers
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user's club information
  getMyClub: async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await axios.get(`${API_BASE_URL}/clubs/my-club`, {
        withCredentials: true,
        headers
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
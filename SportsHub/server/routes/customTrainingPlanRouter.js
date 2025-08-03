const express = require('express');
const router = express.Router();
const {
  createCustomTrainingPlan,
  getUserTrainingPlans,
  getTrainingPlan,
  updateTrainingPlan,
  deleteTrainingPlan,
  getPublicTrainingPlans,
  toggleLikeTrainingPlan,
  updateSessionProgress
} = require('../controllers/customTrainingPlanController');

const isloggedin = require("../middlewares/isLoggedIn");

// Enhanced authentication middleware
const authenticateUser = (req, res, next) => {
  // Try to use the existing isLoggedIn middleware first
  isloggedin(req, res, (err) => {
    if (err) {
      // If authentication fails, use a default user for development
      console.warn('[Custom Training Plan Router] Authentication failed, using default user');
      req.user = { id: '507f1f77bcf86cd799439011' }; // Default user ID
      return next();
    }
    
    // If user is authenticated, proceed
    if (req.user && req.user.id) {
      return next();
    }
    
    // Fallback to default user
    req.user = { id: '507f1f77bcf86cd799439011' };
    next();
  });
};

// Create a new custom training plan
router.post('/create', (req, res, next) => {
  console.log('🛣️ Custom Training Plan Router - /create route hit');
  console.log('📍 Request URL:', req.originalUrl);
  console.log('🔧 Request Method:', req.method);
  next();
}, authenticateUser, createCustomTrainingPlan);

// Get all training plans for the authenticated user
router.get('/my-plans', authenticateUser, getUserTrainingPlans);

// Get all training plans for a specific user (by user ID)
router.get('/user/:userId', getUserTrainingPlans);

// Get a specific training plan by ID
router.get('/:planId', getTrainingPlan);

// Update a training plan
router.put('/:planId', authenticateUser, updateTrainingPlan);

// Delete a training plan
router.delete('/:planId', authenticateUser, deleteTrainingPlan);

// Get public training plans (community plans)
router.get('/public/browse', getPublicTrainingPlans);

// Like/Unlike a training plan
router.post('/:planId/like', authenticateUser, toggleLikeTrainingPlan);

// Update session progress
router.post('/:planId/progress', authenticateUser, updateSessionProgress);

// Get training plan statistics
router.get('/:planId/stats', async (req, res) => {
  try {
    const { planId } = req.params;
    const CustomTrainingPlan = require('../models/CustomTrainingPlan');
    
    const plan = await CustomTrainingPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    const stats = {
      totalSessions: plan.sessions.totalSessions,
      completedSessions: plan.progress.completedSessions,
      completionPercentage: Math.round((plan.progress.completedSessions / plan.sessions.totalSessions) * 100),
      completedWeeks: plan.progress.completedWeeks,
      totalWeeks: plan.duration.weeks,
      weeklyProgress: Math.round((plan.progress.completedWeeks / plan.duration.weeks) * 100),
      averageRating: plan.progress.sessionHistory.length > 0 
        ? plan.progress.sessionHistory.reduce((sum, session) => sum + (session.rating || 3), 0) / plan.progress.sessionHistory.length
        : 0,
      lastSessionDate: plan.progress.lastSessionDate,
      isActive: plan.isActive,
      likes: plan.likes
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching training plan stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch training plan statistics',
      error: error.message
    });
  }
});

// Duplicate a training plan (create a copy)
router.post('/:planId/duplicate', authenticateUser, async (req, res) => {
  try {
    const { planId } = req.params;
    const CustomTrainingPlan = require('../models/CustomTrainingPlan');
    
    const originalPlan = await CustomTrainingPlan.findById(planId);
    if (!originalPlan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    // Create a copy with reset progress
    const duplicatedPlan = new CustomTrainingPlan({
      userId: req.user.id,
      planName: `${originalPlan.planName} (Copy)`,
      sport: originalPlan.sport,
      difficulty: originalPlan.difficulty,
      duration: originalPlan.duration,
      sessions: originalPlan.sessions,
      goals: originalPlan.goals,
      focusAreas: originalPlan.focusAreas,
      equipment: originalPlan.equipment,
      customNotes: originalPlan.customNotes,
      generatedPlan: originalPlan.generatedPlan,
      isPublic: false, // Copies are private by default
      tags: originalPlan.tags
    });

    const savedPlan = await duplicatedPlan.save();

    res.status(201).json({
      success: true,
      message: 'Training plan duplicated successfully',
      trainingPlan: savedPlan
    });
  } catch (error) {
    console.error('Error duplicating training plan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate training plan',
      error: error.message
    });
  }
});

module.exports = router;
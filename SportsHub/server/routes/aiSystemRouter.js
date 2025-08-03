// SportsHub/server/routes/aiSystemRouter.js

const express = require('express');
const router = express.Router();
const aiChatRouter = require('../services/aiChatRouter');
const geminiApiManager = require('../utils/geminiApiManager');

/**
 * AI System Management Routes
 * Provides endpoints for monitoring and managing the AI Chat Router system
 */

// Get system status and API key information
router.get('/status', async (req, res) => {
  try {
    const systemStatus = aiChatRouter.getSystemStatus();
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      system: {
        status: 'operational',
        ...systemStatus
      }
    });
  } catch (error) {
    console.error('[AI System Router] Error getting system status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get system status',
      error: error.message
    });
  }
});

// Test AI functionality with a simple request
router.post('/test', async (req, res) => {
  try {
    const { testType = 'simple' } = req.body;
    
    let testResult;
    
    switch (testType) {
      case 'simple':
        testResult = await aiChatRouter.generateContent('Say "Hello, AI system is working!" in a friendly way.');
        break;
        
      case 'analysis':
        const mockProfile = {
          name: 'Test User',
          age: 25,
          height: 175,
          weight: 70,
          sport: 'football',
          goal: 'improve performance'
        };
        const mockLandmarks = [
          { name: 'nose', x: 0.5, y: 0.3, z: 0.1, score: 0.9 },
          { name: 'left_shoulder', x: 0.4, y: 0.4, z: 0.2, score: 0.8 }
        ];
        testResult = await aiChatRouter.generateAnalysis(mockProfile, 'image', mockLandmarks);
        break;
        
      case 'training_plan':
        const mockPlanData = {
          planName: 'Test Plan',
          sport: 'football',
          difficulty: 'beginner',
          weeks: 4,
          sessionsPerWeek: 3,
          sessionDuration: 60,
          goals: ['improve fitness'],
          focusAreas: ['endurance'],
          equipment: [{ name: 'football' }],
          customNotes: 'Test plan generation'
        };
        testResult = await aiChatRouter.generateCustomTrainingPlan(mockPlanData);
        break;
        
      case 'chat':
        const mockChatMessages = [];
        const mockUserDetails = {
          userName: 'Test User',
          userAge: 25,
          userSex: 'Male',
          userHeight: 175,
          userWeight: 70,
          preferredSport: 'football'
        };
        testResult = await aiChatRouter.handleAIGuruChat(
          mockChatMessages,
          'What are some basic football training tips?',
          mockUserDetails,
          'en'
        );
        break;
        
      default:
        throw new Error('Invalid test type. Use: simple, analysis, training_plan, or chat');
    }
    
    res.json({
      success: true,
      testType,
      timestamp: new Date().toISOString(),
      result: testResult,
      message: `${testType} test completed successfully`
    });
    
  } catch (error) {
    console.error(`[AI System Router] ${req.body.testType || 'simple'} test failed:`, error);
    res.status(500).json({
      success: false,
      testType: req.body.testType || 'simple',
      message: 'AI test failed',
      error: error.message
    });
  }
});

// Reset daily API key usage (admin function)
router.post('/reset-daily-usage', async (req, res) => {
  try {
    geminiApiManager.resetDailyKeyUsage();
    
    res.json({
      success: true,
      message: 'Daily API key usage has been reset',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[AI System Router] Error resetting daily usage:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset daily usage',
      error: error.message
    });
  }
});

// Get detailed API key statistics
router.get('/api-keys/stats', async (req, res) => {
  try {
    const systemStatus = aiChatRouter.getSystemStatus();
    
    // Additional statistics
    const stats = {
      overview: {
        totalKeys: systemStatus.totalKeys,
        availableKeys: systemStatus.availableKeys,
        disabledKeys: systemStatus.totalKeys - systemStatus.availableKeys,
        lastActivity: new Date(systemStatus.lastGenerationTimestamp).toISOString()
      },
      keyDetails: systemStatus.keyStatus,
      recommendations: []
    };
    
    // Add recommendations based on system state
    if (systemStatus.availableKeys === 0) {
      stats.recommendations.push({
        type: 'critical',
        message: 'No API keys are currently available. All keys may have exceeded rate limits.',
        action: 'Wait for rate limits to reset or add more API keys'
      });
    } else if (systemStatus.availableKeys < 2) {
      stats.recommendations.push({
        type: 'warning',
        message: 'Only one API key is available. Consider adding more keys for better reliability.',
        action: 'Add additional API keys to environment variables'
      });
    }
    
    if (systemStatus.modelsInitialized < systemStatus.totalKeys) {
      stats.recommendations.push({
        type: 'warning',
        message: 'Some API keys failed to initialize models.',
        action: 'Check API key validity and network connectivity'
      });
    }
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      statistics: stats
    });
    
  } catch (error) {
    console.error('[AI System Router] Error getting API key stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get API key statistics',
      error: error.message
    });
  }
});

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const systemStatus = aiChatRouter.getSystemStatus();
    
    const health = {
      status: systemStatus.availableKeys > 0 ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      checks: {
        apiKeysAvailable: {
          status: systemStatus.availableKeys > 0 ? 'pass' : 'fail',
          value: systemStatus.availableKeys,
          threshold: 1
        },
        modelsInitialized: {
          status: systemStatus.modelsInitialized > 0 ? 'pass' : 'fail',
          value: systemStatus.modelsInitialized,
          threshold: 1
        },
        recentActivity: {
          status: systemStatus.lastGenerationTimestamp > 0 ? 'pass' : 'warn',
          value: new Date(systemStatus.lastGenerationTimestamp).toISOString(),
          message: systemStatus.lastGenerationTimestamp > 0 ? 'Recent activity detected' : 'No recent activity'
        }
      }
    };
    
    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json({
      success: health.status === 'healthy',
      health
    });
    
  } catch (error) {
    console.error('[AI System Router] Health check failed:', error);
    res.status(503).json({
      success: false,
      health: {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      }
    });
  }
});

// Middleware to log all AI system requests
router.use((req, res, next) => {
  console.log(`[AI System Router] ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

module.exports = router;
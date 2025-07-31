import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Target, Clock, Calendar, Dumbbell, Star, Settings, 
  ChevronRight, ChevronLeft, Save, Zap, Award, Users, 
  TrendingUp, X, Check, AlertCircle, Heart, Copy, Trash2,
  Play, Pause, BarChart3, Trophy, BookOpen
} from 'lucide-react';
import { 
  createCustomTrainingPlan, 
  getUserTrainingPlans, 
  getPublicTrainingPlans,
  toggleLikeTrainingPlan,
  duplicateTrainingPlan,
  deleteTrainingPlan,
  getTrainingPlanStats
} from '../services/customTrainingPlanService';
import TrainingPlanModal from './TrainingPlanModal';

const CustomTrainingPlanCreator = ({ isDarkMode = true }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [userPlans, setUserPlans] = useState([]);
  const [publicPlans, setPublicPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    planName: '',
    sport: 'Football',
    difficulty: 'Beginner',
    weeks: 4,
    sessionsPerWeek: 3,
    sessionDuration: 60,
    goals: [],
    focusAreas: [],
    equipment: [],
    customNotes: '',
    isPublic: false,
    tags: []
  });

  const [newGoal, setNewGoal] = useState('');
  const [newTag, setNewTag] = useState('');

  const sports = [
    'Football', 'Basketball', 'Cricket', 'Tennis', 'Swimming', 'Athletics',
    'Golf', 'Baseball', 'Volleyball', 'Badminton', 'Hockey', 'Rugby',
    'Boxing', 'Wrestling', 'Cycling', 'Running', 'Weightlifting', 'Yoga',
    'Martial Arts', 'General Fitness'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  const focusAreaOptions = [
    'Strength', 'Endurance', 'Speed', 'Agility', 'Flexibility', 'Balance',
    'Coordination', 'Power', 'Technique', 'Mental Training', 'Recovery', 'Nutrition'
  ];

  const equipmentOptions = [
    { name: 'Dumbbells', required: false },
    { name: 'Resistance Bands', required: false },
    { name: 'Yoga Mat', required: false },
    { name: 'Pull-up Bar', required: false },
    { name: 'Kettlebells', required: false },
    { name: 'Medicine Ball', required: false },
    { name: 'Jump Rope', required: false },
    { name: 'Foam Roller', required: false },
    { name: 'Barbell', required: false },
    { name: 'Bench', required: false },
    { name: 'Treadmill', required: false },
    { name: 'Stationary Bike', required: false }
  ];

  useEffect(() => {
    if (activeTab === 'my-plans') {
      fetchUserPlans();
    } else if (activeTab === 'community') {
      fetchPublicPlans();
    }
  }, [activeTab]);

  const fetchUserPlans = async () => {
    try {
      const plans = await getUserTrainingPlans();
      setUserPlans(plans);
    } catch (error) {
      showNotification('Failed to fetch your training plans', 'error');
    }
  };

  const fetchPublicPlans = async () => {
    try {
      const data = await getPublicTrainingPlans({ limit: 20 });
      setPublicPlans(data.trainingPlans);
    } catch (error) {
      showNotification('Failed to fetch community training plans', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addGoal = () => {
    if (newGoal.trim() && !formData.goals.includes(newGoal.trim())) {
      setFormData(prev => ({
        ...prev,
        goals: [...prev.goals, newGoal.trim()]
      }));
      setNewGoal('');
    }
  };

  const removeGoal = (goalToRemove) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal !== goalToRemove)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const toggleFocusArea = (area) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const toggleEquipment = (equipment) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.find(eq => eq.name === equipment.name)
        ? prev.equipment.filter(eq => eq.name !== equipment.name)
        : [...prev.equipment, equipment]
    }));
  };

  const handleCreatePlan = async () => {
    if (!formData.planName.trim()) {
      showNotification('Please enter a plan name', 'error');
      return;
    }

    setIsCreating(true);
    try {
      const result = await createCustomTrainingPlan(formData);
      showNotification('Training plan created successfully!', 'success');
      
      // Show the generated plan
      setSelectedPlan(result.trainingPlan.generatedPlan);
      setShowPlanModal(true);
      
      // Reset form
      setFormData({
        planName: '',
        sport: 'Football',
        difficulty: 'Beginner',
        weeks: 4,
        sessionsPerWeek: 3,
        sessionDuration: 60,
        goals: [],
        focusAreas: [],
        equipment: [],
        customNotes: '',
        isPublic: false,
        tags: []
      });
      setCurrentStep(1);
      
      // Refresh user plans if on that tab
      if (activeTab === 'my-plans') {
        fetchUserPlans();
      }
    } catch (error) {
      showNotification('Failed to create training plan', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleShowPlan = (plan) => {
    setSelectedPlan(plan.generatedPlan);
    setShowPlanModal(true);
  };

  const handleLikePlan = async (planId) => {
    try {
      await toggleLikeTrainingPlan(planId);
      fetchPublicPlans(); // Refresh to show updated likes
    } catch (error) {
      showNotification('Failed to like plan', 'error');
    }
  };

  const handleDuplicatePlan = async (planId) => {
    try {
      await duplicateTrainingPlan(planId);
      showNotification('Plan duplicated successfully!', 'success');
      if (activeTab === 'my-plans') {
        fetchUserPlans();
      }
    } catch (error) {
      showNotification('Failed to duplicate plan', 'error');
    }
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this training plan?')) {
      try {
        await deleteTrainingPlan(planId);
        showNotification('Plan deleted successfully!', 'success');
        fetchUserPlans();
      } catch (error) {
        showNotification('Failed to delete plan', 'error');
      }
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: Target },
    { number: 2, title: 'Schedule', icon: Calendar },
    { number: 3, title: 'Goals & Focus', icon: Star },
    { number: 4, title: 'Equipment', icon: Dumbbell },
    { number: 5, title: 'Finalize', icon: Check }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Plan Name *
              </label>
              <input
                type="text"
                value={formData.planName}
                onChange={(e) => handleInputChange('planName', e.target.value)}
                placeholder="e.g., My Football Training Plan"
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  isDarkMode
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                } focus:outline-none`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sport *
                </label>
                <select
                  value={formData.sport}
                  onChange={(e) => handleInputChange('sport', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-white/10 border-white/20 text-white focus:border-orange-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                  } focus:outline-none`}
                >
                  {sports.map(sport => (
                    <option key={sport} value={sport} style={{ color: 'black' }}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Difficulty Level *
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-white/10 border-white/20 text-white focus:border-orange-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                  } focus:outline-none`}
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty} style={{ color: 'black' }}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Duration (weeks) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={formData.weeks}
                  onChange={(e) => handleInputChange('weeks', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                  } focus:outline-none`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sessions per week *
                </label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={formData.sessionsPerWeek}
                  onChange={(e) => handleInputChange('sessionsPerWeek', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                  } focus:outline-none`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Session duration (minutes) *
                </label>
                <input
                  type="number"
                  min="15"
                  max="180"
                  value={formData.sessionDuration}
                  onChange={(e) => handleInputChange('sessionDuration', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                  } focus:outline-none`}
                />
              </div>
            </div>

            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
              <h4 className="font-semibold mb-2 text-blue-500">Training Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total Sessions:</span>
                  <div className="font-bold">{formData.weeks * formData.sessionsPerWeek}</div>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total Hours:</span>
                  <div className="font-bold">{Math.round((formData.weeks * formData.sessionsPerWeek * formData.sessionDuration) / 60)}</div>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Rest Days/Week:</span>
                  <div className="font-bold">{7 - formData.sessionsPerWeek}</div>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total Days:</span>
                  <div className="font-bold">{formData.weeks * 7}</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Training Goals
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Add a training goal..."
                  onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                  } focus:outline-none`}
                />
                <button
                  onClick={addGoal}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.goals.map((goal, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm flex items-center space-x-2 ${
                      isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'
                    }`}
                  >
                    <span>{goal}</span>
                    <button onClick={() => removeGoal(goal)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Focus Areas
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {focusAreaOptions.map(area => (
                  <button
                    key={area}
                    onClick={() => toggleFocusArea(area)}
                    className={`p-3 rounded-lg border transition-all duration-300 text-left ${
                      formData.focusAreas.includes(area)
                        ? isDarkMode
                          ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                          : 'bg-orange-500/20 border-orange-500/50 text-orange-600'
                        : isDarkMode
                          ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{area}</span>
                      {formData.focusAreas.includes(area) && (
                        <Check className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Available Equipment
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {equipmentOptions.map(equipment => (
                  <button
                    key={equipment.name}
                    onClick={() => toggleEquipment(equipment)}
                    className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                      formData.equipment.find(eq => eq.name === equipment.name)
                        ? isDarkMode
                          ? 'bg-green-500/20 border-green-500/50 text-green-400'
                          : 'bg-green-500/20 border-green-500/50 text-green-600'
                        : isDarkMode
                          ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{equipment.name}</span>
                      {formData.equipment.find(eq => eq.name === equipment.name) && (
                        <Check className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Additional Notes
              </label>
              <textarea
                value={formData.customNotes}
                onChange={(e) => handleInputChange('customNotes', e.target.value)}
                placeholder="Any specific requirements, preferences, or notes for your training plan..."
                rows="4"
                className={`w-full px-4 py-3 rounded-xl border transition-colors resize-none ${
                  isDarkMode
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                } focus:outline-none`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Tags (Optional)
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                  } focus:outline-none`}
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm flex items-center space-x-2 ${
                      isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'
                    }`}
                  >
                    <span>#{tag}</span>
                    <button onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <label htmlFor="isPublic" className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Make this plan public (others can view and duplicate it)
              </label>
            </div>

            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20' : 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20'}`}>
              <h4 className="font-bold mb-4 text-orange-500">Plan Summary</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Plan Name:</span>
                  <div className="font-medium">{formData.planName || 'Untitled Plan'}</div>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Sport & Level:</span>
                  <div className="font-medium">{formData.sport} - {formData.difficulty}</div>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Duration:</span>
                  <div className="font-medium">{formData.weeks} weeks, {formData.sessionsPerWeek} sessions/week</div>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Session Length:</span>
                  <div className="font-medium">{formData.sessionDuration} minutes</div>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Goals:</span>
                  <div className="font-medium">{formData.goals.length} goals set</div>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Focus Areas:</span>
                  <div className="font-medium">{formData.focusAreas.length} areas selected</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              {notification.type === 'success' ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-orange-500' : 'bg-orange-500'}`}></div>
          <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${isDarkMode ? 'bg-red-500' : 'bg-amber-500'}`}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-600'
                  : 'bg-gradient-to-r from-orange-500 to-red-600'
              }`}>
                <Settings className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Custom <span className={`${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-400 to-red-500'
                  : 'bg-gradient-to-r from-orange-500 to-red-600'
              } bg-clip-text text-transparent`}>Training Plans</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Create personalized training plans tailored to your goals, schedule, and available equipment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`overflow-hidden rounded-3xl border ${
            isDarkMode 
              ? 'bg-white/5 backdrop-blur-md border-white/10' 
              : 'bg-black/5 backdrop-blur-md border-black/10'
          }`}>
            {/* Tab Navigation */}
            <div className="flex border-b border-current/10">
              {[
                { id: 'create', label: 'Create Plan', icon: Plus },
                { id: 'my-plans', label: 'My Plans', icon: BookOpen },
                { id: 'community', label: 'Community', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-6 px-4 transition-all duration-300 ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'bg-orange-500/20 text-orange-400 border-b-2 border-orange-400'
                        : 'bg-orange-500/20 text-orange-600 border-b-2 border-orange-500'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium hidden sm:block">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'create' && (
                <div className="space-y-8">
                  {/* Step Progress */}
                  <div className="flex items-center justify-between mb-8">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div className={`flex items-center justify-center w-7 h-7 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                          currentStep >= step.number
                            ? isDarkMode
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'bg-orange-500 border-orange-500 text-white'
                            : isDarkMode
                              ? 'border-white/20 text-gray-400'
                              : 'border-gray-300 text-gray-500'
                        }`}>
                          <step.icon className="w-5 h-5 sm:w-5 sm:h-5 " />
                        </div>
                        <div className="ml-3 w-4 hidden md:block">
                          <div className={`text-sm font-medium ${
                            currentStep >= step.number
                              ? isDarkMode ? 'text-orange-400' : 'text-orange-600'
                              : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Step {step.number}
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {step.title}
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-1 sm:w-8 h-0.5 mx-1 sm:mx-4 ${
                            currentStep > step.number
                              ? isDarkMode ? 'bg-orange-500' : 'bg-orange-500'
                              : isDarkMode ? 'bg-white/20' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step Content */}
                  <div className="min-h-[400px]">
                    {renderStepContent()}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-2 justify-between pt-8 border-t border-current/10">
                    <button
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                      className={`flex items-center space-x-2 px-2 py-1 sm:px-6 sm:py-3 rounded-xl transition-all duration-300 ${
                        currentStep === 1
                          ? isDarkMode
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : isDarkMode
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-black/10 text-gray-900 hover:bg-black/20'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    {currentStep < steps.length ? (
                      <button
                        onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                        className={`flex items-center space-x-2  px-2 py-1 sm:px-6 sm:py-3 rounded-xl transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                            : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                        } text-white shadow-lg hover:shadow-xl`}
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleCreatePlan}
                        disabled={isCreating || !formData.planName.trim()}
                        className={`flex items-center space-x-2 px-8 py-3 rounded-xl transition-all duration-300 ${
                          isCreating || !formData.planName.trim()
                            ? isDarkMode
                              ? 'bg-gray-600 cursor-not-allowed'
                              : 'bg-gray-400 cursor-not-allowed'
                            : isDarkMode
                              ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                              : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                        } text-white shadow-lg hover:shadow-xl`}
                      >
                        {isCreating ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            <span>Create Plan</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'my-plans' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">My Training Plans</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Manage and track your custom training plans
                    </p>
                  </div>

                  {userPlans.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No training plans yet. Create your first plan!
                      </p>
                      <button
                        onClick={() => setActiveTab('create')}
                        className={`mt-4 px-6 py-3 rounded-xl transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                            : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                        } text-white shadow-lg hover:shadow-xl`}
                      >
                        Create Plan
                      </button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userPlans.map((plan) => (
                        <div
                          key={plan._id}
                          className={`rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] ${
                            isDarkMode
                              ? 'bg-white/5 border-white/10 hover:bg-white/10'
                              : 'bg-black/5 border-black/10 hover:bg-black/10'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold mb-1">{plan.planName}</h4>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {plan.sport} • {plan.difficulty}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              plan.isActive
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {plan.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Duration:</span>
                              <div className="font-medium">{plan.duration.weeks} weeks</div>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Sessions:</span>
                              <div className="font-medium">{plan.sessions.sessionsPerWeek}/week</div>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Progress:</span>
                              <div className="font-medium">
                                {plan.progress.completedSessions}/{plan.sessions.totalSessions}
                              </div>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Created:</span>
                              <div className="font-medium">
                                {new Date(plan.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleShowPlan(plan)}
                              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                                isDarkMode
                                  ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white'
                                  : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
                              }`}
                            >
                              <div className="flex items-center justify-center space-x-2">
                                <Trophy className="w-4 h-4" />
                                <span className="text-sm font-medium">Show Plan</span>
                              </div>
                            </button>
                            <button
                              onClick={() => handleDeletePlan(plan._id)}
                              className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'community' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">Community Training Plans</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Discover and use training plans created by the community
                    </p>
                  </div>

                  {publicPlans.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No public training plans available yet.
                      </p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {publicPlans.map((plan) => (
                        <div
                          key={plan._id}
                          className={`rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] ${
                            isDarkMode
                              ? 'bg-white/5 border-white/10 hover:bg-white/10'
                              : 'bg-black/5 border-black/10 hover:bg-black/10'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold mb-1">{plan.planName}</h4>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {plan.sport} • {plan.difficulty}
                              </p>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                by {plan.userId?.fullname || 'Anonymous'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 text-red-400">
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{plan.likes}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Duration:</span>
                              <div className="font-medium">{plan.duration.weeks} weeks</div>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Sessions:</span>
                              <div className="font-medium">{plan.sessions.sessionsPerWeek}/week</div>
                            </div>
                          </div>

                          {plan.tags && plan.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {plan.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className={`px-2 py-1 rounded text-xs ${
                                    isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'
                                  }`}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleShowPlan(plan)}
                              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                                isDarkMode
                                  ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white'
                                  : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
                              }`}
                            >
                              <div className="flex items-center justify-center space-x-2">
                                <Trophy className="w-4 h-4" />
                                <span className="text-sm font-medium">Show Plan</span>
                              </div>
                            </button>
                            <button
                              onClick={() => handleLikePlan(plan._id)}
                              className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDuplicatePlan(plan._id)}
                              className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Training Plan Modal */}
      <TrainingPlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        trainingPlan={selectedPlan}
        isLoading={false}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default CustomTrainingPlanCreator;
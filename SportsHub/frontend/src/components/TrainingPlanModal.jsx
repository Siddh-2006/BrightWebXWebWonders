import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Clock, Target, Users, Dumbbell, Shield, Apple, 
  Heart, CheckCircle, ArrowRight, Calendar, Star, Award
} from 'lucide-react';

const TrainingPlanModal = ({ isOpen, onClose, trainingPlan, isLoading, isDarkMode = true }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border ${
            isDarkMode 
              ? 'bg-gray-900 border-white/10' 
              : 'bg-white border-black/10'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`sticky top-0 z-10 p-6 border-b ${
            isDarkMode 
              ? 'bg-gray-900/95 backdrop-blur-md border-white/10' 
              : 'bg-white/95 backdrop-blur-md border-black/10'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-orange-500 to-red-600'
                    : 'bg-gradient-to-r from-orange-500 to-red-600'
                }`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {isLoading ? 'Generating Training Plan...' : trainingPlan?.planTitle || 'Training Plan'}
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Personalized by AI Guru
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-xl transition-colors ${
                  isDarkMode
                    ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                    : 'hover:bg-black/10 text-gray-600 hover:text-gray-900'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Creating your personalized training plan...
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  This may take a few moments
                </p>
              </div>
            ) : trainingPlan ? (
              <div className="space-y-8">
                {/* Overview */}
                <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  <h3 className={`text-xl font-bold mb-3 flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Target className="w-5 h-5 text-orange-500" />
                    <span>Plan Overview</span>
                  </h3>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {trainingPlan.overview}
                  </p>
                </div>

                {/* Weekly Structure */}
                {trainingPlan.weeklyStructure && (
                  <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                    <h3 className={`text-xl font-bold mb-4 flex items-center space-x-2 text-blue-500`}>
                      <Calendar className="w-5 h-5" />
                      <span>Weekly Structure</span>
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">{trainingPlan.weeklyStructure.sessionsPerWeek}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sessions/Week</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">{trainingPlan.weeklyStructure.totalWeeks}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Weeks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">{trainingPlan.weeklyStructure.restDays}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rest Days/Week</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Session Details */}
                {trainingPlan.sessionDetails && trainingPlan.sessionDetails.length > 0 && (
                  <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-green-900/20' : 'bg-green-100'}`}>
                    <h3 className={`text-xl font-bold mb-4 flex items-center space-x-2 text-green-500`}>
                      <Dumbbell className="w-5 h-5" />
                      <span>Sample Training Sessions</span>
                    </h3>
                    <div className="space-y-6">
                      {trainingPlan.sessionDetails.slice(0, 3).map((session, index) => (
                        <div key={index} className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-white/70'}`}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {session.title}
                            </h4>
                            <span className={`text-sm px-3 py-1 rounded-full ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                              {session.duration}
                            </span>
                          </div>
                          <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <strong>Focus:</strong> {session.focus}
                          </p>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <h5 className={`font-medium mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Warm-up</h5>
                              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {session.warmUp?.map((item, i) => (
                                  <li key={i} className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className={`font-medium mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Main Workout</h5>
                              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {session.mainWorkout?.map((item, i) => (
                                  <li key={i} className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className={`font-medium mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Cool-down</h5>
                              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {session.coolDown?.map((item, i) => (
                                  <li key={i} className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progression */}
                {trainingPlan.progression && (
                  <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-100'}`}>
                    <h3 className={`text-xl font-bold mb-4 flex items-center space-x-2 text-purple-500`}>
                      <ArrowRight className="w-5 h-5" />
                      <span>Training Progression</span>
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(trainingPlan.progression).map(([period, description], index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {period.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/week/gi, 'Week')}
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipment */}
                {trainingPlan.equipment && trainingPlan.equipment.length > 0 && (
                  <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-100'}`}>
                    <h3 className={`text-xl font-bold mb-4 flex items-center space-x-2 text-yellow-500`}>
                      <Dumbbell className="w-5 h-5" />
                      <span>Equipment Needed</span>
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {trainingPlan.equipment.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-yellow-500" />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Safety Guidelines */}
                {trainingPlan.safetyGuidelines && trainingPlan.safetyGuidelines.length > 0 && (
                  <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-red-900/20' : 'bg-red-100'}`}>
                    <h3 className={`text-xl font-bold mb-4 flex items-center space-x-2 text-red-500`}>
                      <Shield className="w-5 h-5" />
                      <span>Safety Guidelines</span>
                    </h3>
                    <ul className="space-y-2">
                      {trainingPlan.safetyGuidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                            !
                          </div>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {guideline}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nutrition & Recovery */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Nutrition Tips */}
                  {trainingPlan.nutritionTips && trainingPlan.nutritionTips.length > 0 && (
                    <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-orange-900/20' : 'bg-orange-100'}`}>
                      <h3 className={`text-lg font-bold mb-4 flex items-center space-x-2 text-orange-500`}>
                        <Apple className="w-5 h-5" />
                        <span>Nutrition Tips</span>
                      </h3>
                      <ul className="space-y-2">
                        {trainingPlan.nutritionTips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {tip}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recovery Guidelines */}
                  {trainingPlan.recoveryGuidelines && trainingPlan.recoveryGuidelines.length > 0 && (
                    <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-cyan-900/20' : 'bg-cyan-100'}`}>
                      <h3 className={`text-lg font-bold mb-4 flex items-center space-x-2 text-cyan-500`}>
                        <Heart className="w-5 h-5" />
                        <span>Recovery Guidelines</span>
                      </h3>
                      <ul className="space-y-2">
                        {trainingPlan.recoveryGuidelines.map((guideline, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-cyan-500 mt-1">•</span>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {guideline}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                {trainingPlan.additionalNotes && (
                  <div className={`p-6 rounded-2xl border-2 border-dashed ${
                    isDarkMode ? 'border-orange-500/30 bg-orange-500/5' : 'border-orange-500/30 bg-orange-500/5'
                  }`}>
                    <h3 className={`text-lg font-bold mb-3 flex items-center space-x-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                      <Star className="w-5 h-5" />
                      <span>Coach's Note</span>
                    </h3>
                    <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {trainingPlan.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Failed to generate training plan. Please try again.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TrainingPlanModal;
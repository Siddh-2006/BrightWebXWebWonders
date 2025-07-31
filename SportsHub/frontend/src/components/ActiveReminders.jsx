import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Clock, Calendar, Trash2 } from 'lucide-react';
import reminderService from '../services/reminderService';

const ActiveReminders = ({ isDarkMode = false }) => {
  const [reminders, setReminders] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Load reminders on component mount
    loadReminders();

    // Set up interval to refresh reminders every minute
    const interval = setInterval(loadReminders, 60000);

    return () => clearInterval(interval);
  }, []);

  const loadReminders = () => {
    const activeReminders = reminderService.getAllReminders();
    setReminders(activeReminders);
  };

  const handleClearReminder = (matchKey) => {
    reminderService.clearReminder(matchKey);
    loadReminders();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all reminders?')) {
      reminderService.clearAllReminders();
      loadReminders();
    }
  };

  const formatTimeUntil = (scheduledFor) => {
    const now = new Date();
    const timeDiff = new Date(scheduledFor) - now;
    
    if (timeDiff <= 0) {
      return 'Expired';
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (reminders.length === 0) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-40 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl shadow-2xl border backdrop-blur-md ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-700' 
            : 'bg-white/90 border-gray-200'
        }`}
      >
        {/* Header */}
        <div 
          className={`p-4 cursor-pointer flex items-center justify-between rounded-t-2xl ${
            isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/50'
          } transition-colors`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-orange-500" />
            <span className="font-semibold">Active Reminders</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              isDarkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
            }`}>
              {reminders.length}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                {/* Clear All Button */}
                {reminders.length > 1 && (
                  <div className="p-3 border-b border-current/10">
                    <button
                      onClick={handleClearAll}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        isDarkMode 
                          ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' 
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Clear All Reminders
                    </button>
                  </div>
                )}

                {/* Reminders List */}
                <div className="max-h-80 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reminders.map((reminder) => (
                      <motion.div
                        key={reminder.matchKey}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 border-b border-current/10 last:border-b-0 ${
                          isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50/50'
                        } transition-colors bg-white rounded-xl shadow flex flex-col`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm mb-1 truncate">
                              {reminder.match.homeTeam} vs {reminder.match.awayTeam}
                            </div>
                            
                            <div className={`flex items-center space-x-3 text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{reminder.minutes}m before</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>in {formatTimeUntil(reminder.scheduledFor)}</span>
                              </div>
                            </div>
                            
                            <div className={`text-xs mt-1 ${
                              isDarkMode ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              {new Date(reminder.scheduledFor).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleClearReminder(reminder.matchKey)}
                            className={`ml-2 p-1 rounded-full transition-colors ${
                              isDarkMode 
                                ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/20' 
                                : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ActiveReminders;
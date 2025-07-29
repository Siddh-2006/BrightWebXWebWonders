import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Clock, Calendar, AlertCircle } from 'lucide-react';

const ReminderModal = ({ match, onClose, onSetReminder }) => {
  const [reminderTime, setReminderTime] = useState(15);
  const [customTime, setCustomTime] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [error, setError] = useState('');
  
  const predefinedTimes = [
    { value: 5, label: '5 minutes' },
    { value: 10, label: '10 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
    { value: 1440, label: '1 day' }
  ];

  const handleSetReminder = () => {
    setError('');
    
    let finalReminderTime = reminderTime;
    
    if (isCustom) {
      const customMinutes = parseInt(customTime);
      if (isNaN(customMinutes) || customMinutes <= 0) {
        setError('Please enter a valid number of minutes');
        return;
      }
      if (customMinutes > 10080) { // 1 week in minutes
        setError('Reminder time cannot exceed 1 week');
        return;
      }
      finalReminderTime = customMinutes;
    }

    // Check if reminder time is valid for the match
    if (match.date && match.time) {
      const now = new Date();
      const [hours, minutes] = match.time.split(':');
      const matchDate = new Date(match.date);
      matchDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      const reminderDate = new Date(matchDate.getTime() - finalReminderTime * 60 * 1000);
      
      if (reminderDate <= now) {
        setError('Reminder time has already passed. Please choose a shorter duration.');
        return;
      }
    }

    onSetReminder(finalReminderTime);
    onClose();
  };

  const formatMatchTime = () => {
    if (!match.date || !match.time) return 'Time TBD';
    
    const matchDate = new Date(match.date);
    const [hours, minutes] = match.time.split(':');
    matchDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    return matchDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 w-full max-w-md text-white border border-gray-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center">
              <Bell className="mr-3 text-orange-400" />
              Set Reminder
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-orange-400 mr-2" />
              <span className="text-sm text-gray-300">Match Details</span>
            </div>
            <p className="font-semibold text-lg mb-1">
              {match.homeTeam} vs {match.awayTeam}
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              {formatMatchTime()}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Notify me before the match starts:
            </label>
            
            <div className="space-y-3">
              {/* Predefined Times */}
              <div className="grid grid-cols-2 gap-2">
                {predefinedTimes.map((time) => (
                  <button
                    key={time.value}
                    onClick={() => {
                      setReminderTime(time.value);
                      setIsCustom(false);
                      setError('');
                    }}
                    className={`p-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                      !isCustom && reminderTime === time.value
                        ? 'bg-orange-500 border-orange-400 text-white'
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>

              {/* Custom Time Option */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    setIsCustom(true);
                    setError('');
                  }}
                  className={`w-full p-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                    isCustom
                      ? 'bg-orange-500 border-orange-400 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                  }`}
                >
                  Custom Time
                </button>
                
                {isCustom && (
                  <div className="mt-3 flex items-center space-x-2">
                    <input
                      type="number"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      placeholder="Enter minutes"
                      min="1"
                      max="10080"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-gray-400 text-sm">minutes</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center">
              <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {/* Notification Permission Info */}
          {!('Notification' in window) || Notification.permission !== 'granted' ? (
            <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Bell className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-blue-300 text-sm">
                  <p className="font-medium mb-1">Browser notifications disabled</p>
                  <p className="text-xs text-blue-200">
                    Reminders will still work and show in the app. Enable browser notifications for alerts even when the tab is closed.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-300 text-sm">
                  Browser notifications enabled - you'll get alerts even when the tab is closed!
                </span>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSetReminder}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
            >
              Set Reminder
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReminderModal;
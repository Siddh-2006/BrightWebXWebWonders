import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Clock, Users } from 'lucide-react';

const ReminderToast = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const handleReminderEvent = (event) => {
      const { match, minutes, message } = event.detail;
      
      const newReminder = {
        id: Date.now(),
        match,
        minutes,
        message,
        timestamp: new Date()
      };

      setReminders(prev => [...prev, newReminder]);

      // Auto-remove after 10 seconds
      setTimeout(() => {
        setReminders(prev => prev.filter(r => r.id !== newReminder.id));
      }, 10000);
    };

    window.addEventListener('sportsHubReminder', handleReminderEvent);
    
    return () => {
      window.removeEventListener('sportsHubReminder', handleReminderEvent);
    };
  }, []);

  const removeReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {reminders.map((reminder) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg shadow-2xl border border-orange-400 max-w-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-100" />
                <span className="font-bold text-sm">Match Reminder</span>
              </div>
              <button
                onClick={() => removeReminder(reminder.id)}
                className="text-orange-100 hover:text-white transition-colors p-1 rounded-full hover:bg-orange-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-orange-100" />
                <span className="font-semibold text-sm">
                  {reminder.match.homeTeam} vs {reminder.match.awayTeam}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-100" />
                <span className="text-sm text-orange-100">
                  Starting in {reminder.minutes} minutes!
                </span>
              </div>
            </div>

            <div className="text-xs text-orange-100 opacity-75">
              Don't miss the match!
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ReminderToast;
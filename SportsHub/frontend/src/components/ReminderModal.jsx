import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

const ReminderModal = ({ match, onClose, onSetReminder }) => {
  const [reminderTime, setReminderTime] = useState(15);

  const handleSetReminder = () => {
    onSetReminder(reminderTime);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-2xl p-8 w-full max-w-md text-white border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center">
              <Bell className="mr-3 text-blue-400" />
              Set a Reminder
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-300 mb-2">
              Get a notification before the match starts:
            </p>
            <p className="font-semibold text-lg">
              {match.homeTeam} vs {match.awayTeam}
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-400 mb-2">
              Notify me before
            </label>
            <select
              id="reminderTime"
              value={reminderTime}
              onChange={(e) => setReminderTime(parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            >
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
            </select>
          </div>

          <button
            onClick={handleSetReminder}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Set Reminder
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReminderModal;
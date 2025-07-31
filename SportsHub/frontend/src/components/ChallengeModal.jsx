import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Calendar, MapPin, DollarSign, Zap } from 'lucide-react';
import { challengeService } from '../services/challengeService';

const ChallengeModal = ({ isOpen, onClose, targetClub, isDarkMode }) => {
  const [formData, setFormData] = useState({
    sport: '',
    prizePool: '',
    location: '',
    date: '',
    time: '',
    liveStream: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sports = ['Football', 'Basketball', 'Cricket', 'Tennis', 'Volleyball', 'Badminton'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await challengeService.createChallenge({
        opponentId: targetClub._id,
        sport: formData.sport,
        prizePool: formData.prizePool,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        liveStream: formData.liveStream
      });

      // Reset form and close modal
      setFormData({
        sport: '',
        prizePool: '',
        location: '',
        date: '',
        time: '',
        liveStream: false,
        message: ''
      });
      onClose();
      
      // Show success message (you can implement a toast notification here)
      alert('Challenge sent successfully!');
    } catch (err) {
      setError(err.msg || 'Failed to send challenge');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`relative w-full max-w-md h-screen overflow-auto rounded-2xl p-6 ${
          isDarkMode 
            ? 'bg-gray-900/95 backdrop-blur-md border border-white/10' 
            : 'bg-white/95 backdrop-blur-md border border-black/10'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-orange-500/20' : 'bg-blue-500/20'
            }`}>
              <Trophy className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Challenge Club
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Challenge {targetClub?.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                : 'hover:bg-black/10 text-gray-600 hover:text-black'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Club Info */}
        <div className={`p-4 rounded-xl mb-6 ${
          isDarkMode ? 'bg-white/5' : 'bg-black/5'
        }`}>
          <div className="flex items-center space-x-3">
            {targetClub?.logo && (
              <img
                src={targetClub.logo}
                alt={targetClub.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {targetClub?.name}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {targetClub?.players?.length || 0} players
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sport Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Sport *
            </label>
            <select
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              required
              className={`w-full p-3 rounded-xl border transition-colors ${
                isDarkMode
                  ? 'bg-white/10 border-white/20 text-white focus:border-orange-500'
                  : 'bg-black/5 border-black/20 text-gray-900 focus:border-blue-500'
              } focus:outline-none`}
            >
              <option value="">Select a sport</option>
              {sports.map((sport) => (
                <option key={sport} value={sport} className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* Prize Pool */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <DollarSign className="w-4 h-4 inline mr-1" />
              Prize Pool (Optional)
            </label>
            <input
              type="text"
              name="prizePool"
              value={formData.prizePool}
              onChange={handleChange}
              placeholder="e.g., $5,000"
              className={`w-full p-3 rounded-xl border transition-colors ${
                isDarkMode
                  ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                  : 'bg-black/5 border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none`}
            />
          </div>

          {/* Location */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <MapPin className="w-4 h-4 inline mr-1" />
              Preferred Location (Optional)
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Central Stadium"
              className={`w-full p-3 rounded-xl border transition-colors ${
                isDarkMode
                  ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                  : 'bg-black/5 border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none`}
            />
          </div>

          {/* Date */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Calendar className="w-4 h-4 inline mr-1" />
              Preferred Date (Optional)
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border transition-colors ${
                isDarkMode
                  ? 'bg-white/10 border-white/20 text-white focus:border-orange-500'
                  : 'bg-black/5 border-black/20 text-gray-900 focus:border-blue-500'
              } focus:outline-none`}
            />
          </div>

          {/* Time */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Calendar className="w-4 h-4 inline mr-1" />
              Preferred Time (Optional)
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border transition-colors ${
                isDarkMode
                  ? 'bg-white/10 border-white/20 text-white focus:border-orange-500'
                  : 'bg-black/5 border-black/20 text-gray-900 focus:border-blue-500'
              } focus:outline-none`}
            />
          </div>

          {/* Live Stream */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="liveStream"
              checked={formData.liveStream}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className={`ml-2 block text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Request to live stream the match?
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                isDarkMode
                  ? 'bg-white/10 hover:bg-white/20 text-gray-300'
                  : 'bg-black/10 hover:bg-black/20 text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.sport}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                isDarkMode
                  ? 'bg-orange-500/20 hover:bg-orange-500/30 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/50 text-orange-300 hover:text-orange-200'
                  : 'bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-sm border border-blue-500/30 hover:border-blue-500/50 text-blue-600 hover:text-blue-700'
              } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Send Challenge</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChallengeModal;
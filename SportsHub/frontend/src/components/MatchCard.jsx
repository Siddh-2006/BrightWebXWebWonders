import React from 'react';
import { Radio, Users, MessageCircle, BarChart3, Clock, MapPin, Bell } from 'lucide-react';
import ReminderModal from './ReminderModal';
import useReminder from '../hooks/useReminder';

const MatchCard = ({ match }) => {
  const { reminder, setReminder, isModalOpen, openModal, closeModal } = useReminder(match);

  const handleReminderSet = (minutes) => {
    const result = setReminder(minutes);
    
    if (result.success) {
      // Show success message
      console.log(`✅ ${result.message}`);
    } else {
      // Show error message
      console.error(`❌ ${result.message}`);
      alert(`Failed to set reminder: ${result.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'upcoming': return 'bg-blue-500';
      case 'finished': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'upcoming': return 'UPCOMING';
      case 'finished': return 'FINISHED';
      default: return status.toUpperCase();
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
      {/* Match Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className={`${getStatusColor(match.status)} text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1`}>
            {match.status === 'live' && <Radio className="w-3 h-3" />}
            <span>{getStatusText(match.status)}</span>
          </span>
          <span className="text-gray-400 text-sm">{match.sport}</span>
        </div>
        <span className="text-gray-400 text-sm">{match.league}</span>
      </div>

      {/* Teams and Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {match.homeTeam.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="font-semibold">{match.homeTeam}</span>
          </div>
          <span className="text-2xl font-bold">{match.homeScore}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {match.awayTeam.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="font-semibold">{match.awayTeam}</span>
          </div>
          <span className="text-2xl font-bold">{match.awayScore}</span>
        </div>
      </div>

      {/* Match Info */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{match.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{match.venue}</span>
          </div>
        </div>
        {match.status === 'live' && (
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{match.viewers.toLocaleString()} watching</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        {match.status === 'live' ? (
          <>
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <Radio className="w-4 h-4" />
              <span>Watch Live</span>
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              <BarChart3 className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openModal}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Bell className="w-4 h-4" />
              <span>{reminder ? `Reminded for ${reminder} mins` : 'Set Reminder'}</span>
            </button>
            {isModalOpen && (
              <ReminderModal
                match={match}
                onClose={closeModal}
                onSetReminder={handleReminderSet}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Search } from 'lucide-react';
import axios from 'axios';

const BroadcastModal = ({ isOpen, onClose, club, isDarkMode }) => {
  const [selectedSport, setSelectedSport] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [allClubs, setAllClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState('');

  useEffect(() => {
    if (club?.sports?.length > 0) {
      setSelectedSport(club.sports[0]);
    }
    if (isOpen) {
      const fetchClubs = async () => {
        try {
          const res = await axios.get("http://localhost:3000/clubs", { withCredentials: true });
          if (res.status === 200) {
            setAllClubs(res.data.filter(c => c._id !== club._id));
            setFilteredClubs(res.data.filter(c => c._id !== club._id));
          }
        } catch (err) {
          console.error("Error fetching clubs:", err);
        }
      };
      fetchClubs();
    }
  }, [club, isOpen]);

  useEffect(() => {
    setFilteredClubs(
      allClubs.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, allClubs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/challenges", {
        opponentId: selectedOpponent,
        sport: selectedSport
      }, { withCredentials: true });
      if (res.status === 201) {
        console.log("Challenge sent successfully");
        onClose();
      }
    } catch (err) {
      console.error("Error sending challenge:", err);
    }
  };

  if (!club) return null;

  return (
    <AnimatePresence>
      {isOpen && (
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
            className={`relative rounded-2xl p-8 border w-full max-w-md ${
              isDarkMode
                ? 'bg-gray-900 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-6">Start Broadcasting</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Club Name</label>
                <input
                  type="text"
                  value={club.name}
                  disabled
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600'
                      : 'bg-gray-200 border-gray-300'
                  }`}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Sport to Broadcast</label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {club.sports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Search for Opponent</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for a club..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-600'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Opponent</label>
                <select
                  value={selectedOpponent}
                  onChange={(e) => setSelectedOpponent(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">Select a club</option>
                  {filteredClubs.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-3 rounded-xl"
              >
                <Send className="inline-block mr-2" />
                Send Challenge
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BroadcastModal;
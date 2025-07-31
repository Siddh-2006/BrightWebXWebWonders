import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { challengeService } from '../services/challengeService';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ShieldCheck, Trophy, Users, Mail, Phone } from 'lucide-react';

const ChallengeDetails = ({ isDarkMode }) => {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const data = await challengeService.getChallenge(challengeId);
        setChallenge(data);
      } catch (err) {
        setError('Failed to fetch challenge details');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!challenge) {
    return <div className="text-center p-8">Challenge not found.</div>;
  }

  const { challenger, opponent, sport, status, date, time, liveStream } = challenge;

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-4xl mx-auto rounded-2xl shadow-lg p-6 ${
          isDarkMode ? 'bg-gray-800/50 backdrop-blur-md border border-white/10' : 'bg-white/80 backdrop-blur-md border'
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b">
          <div className="flex items-center space-x-4">
            <Trophy className={`w-10 h-10 ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
            <div>
              <h1 className="text-3xl font-bold">Match Challenge</h1>
              <p className="text-lg">{sport}</p>
            </div>
          </div>
          <div className={`mt-4 sm:mt-0 px-4 py-2 rounded-full text-sm font-semibold ${
            status === 'accepted' ? 'bg-green-500/20 text-green-400' :
            status === 'declined' ? 'bg-red-500/20 text-red-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>

        {/* Teams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ClubCard club={challenger} isDarkMode={isDarkMode} />
          <ClubCard club={opponent} isDarkMode={isDarkMode} />
        </div>

        {/* Match Details */}
        <div className="space-y-4">
          <DetailItem icon={Calendar} label="Date & Time" value={`${new Date(date).toLocaleDateString()} at ${time}`} isDarkMode={isDarkMode} />
          <DetailItem icon={MapPin} label="Location" value={challenge.location || 'To be decided'} isDarkMode={isDarkMode} />
          <DetailItem icon={ShieldCheck} label="Live Stream" value={liveStream ? 'Yes' : 'No'} isDarkMode={isDarkMode} />
        </div>

        {/* Contact & Team Info */}
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-2xl font-bold mb-4">Contact & Team Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactCard club={challenger} isDarkMode={isDarkMode} />
            <ContactCard club={opponent} isDarkMode={isDarkMode} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ClubCard = ({ club, isDarkMode }) => (
  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
    <div className="flex items-center space-x-4">
      <img src={club.logo} alt={club.name} className="w-16 h-16 rounded-lg object-cover" />
      <div>
        <h3 className="text-xl font-semibold">{club.name}</h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{club.players?.length || 0} players</p>
      </div>
    </div>
  </div>
);

const DetailItem = ({ icon: Icon, label, value, isDarkMode }) => (
  <div className="flex items-center space-x-3">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-orange-500/10' : 'bg-blue-500/10'}`}>
      <Icon className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
    </div>
    <div>
      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const ContactCard = ({ club, isDarkMode }) => (
  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
    <h4 className="text-lg font-semibold mb-3">{club.name}</h4>
    <div className="space-y-2">
      <a href={`mailto:${club.email}`} className="flex items-center space-x-2 hover:underline">
        <Mail className="w-4 h-4" />
        <span>{club.email}</span>
      </a>
      <a href={`tel:${club.phone}`} className="flex items-center space-x-2 hover:underline">
        <Phone className="w-4 h-4" />
        <span>{club.phone}</span>
      </a>
      <div className="flex items-center space-x-2">
        <Users className="w-4 h-4" />
        <span>{club.sport} Team</span>
      </div>
    </div>
  </div>
);

export default ChallengeDetails;
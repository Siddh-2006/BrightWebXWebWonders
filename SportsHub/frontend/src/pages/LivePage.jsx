import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import io from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';


const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

const LivePage = () => {
  const {sport, match_id } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io('http://localhost:5000',{withCredentials:true,transports:["websocket"]});
    socket.emit('joinMatchRoom', { sport, matchId:match_id });

    socket.on('scoreUpdated', (data) => {
      setMatchData(data);
      setEvents((prev) => [...prev, ...data.timeline]);
      setLoading(false);
    });

    return () => {
      socket.off('scoreUpdated');
    };
  }, [sport, match_id]);

  if (loading || !matchData) return <Loader />;

  const { clubA, clubB, score, timeline } = matchData;

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
      <div className="text-center text-4xl font-bold mb-6">
        {clubA.name} vs {clubB.name}
        <span className="ml-4 px-3 py-1 bg-red-600 text-sm rounded-full animate-pulse">LIVE</span>
      </div>

      {/* Score section */}
      <div className="flex justify-center items-center gap-12 mb-6">
        <div className="text-center">
          <img src={clubA.logo} alt="Club A" className="h-16 mx-auto" />
          <div className="mt-2 text-xl">{clubA.name}</div>
        </div>

        <AnimatePresence>
          <motion.div
            key={score}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="text-5xl font-extrabold text-yellow-400"
          >
            {score}
          </motion.div>
        </AnimatePresence>

        <div className="text-center">
          <img src={clubB.logo} alt="Club B" className="h-16 mx-auto" />
          <div className="mt-2 text-xl">{clubB.name}</div>
        </div>
      </div>

      {/* Timeline / Event Feed */}
      <div className="max-w-2xl mx-auto bg-white/10 p-4 rounded-xl shadow-xl">
        <div className="text-lg mb-2 font-semibold">Match Timeline</div>
        <div className="space-y-3">
          {timeline.map((event, index) => (
            <motion.div
              key={index}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/20 rounded-md p-3 shadow-md"
            >
              <div className="flex justify-between text-sm text-gray-200">
                <span>
                  {event.team === 'clubA' ? clubA.name : clubB.name}
                </span>
                <span>{event.time}'</span>
              </div>
              <div className="mt-1 font-medium">
                ⚽ Goal by <span className="text-yellow-300">{event.playerId}</span>
                {event.assistBy && (
                  <span className="text-sm text-blue-300 ml-2">(Assist: {event.assistBy})</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LivePage;

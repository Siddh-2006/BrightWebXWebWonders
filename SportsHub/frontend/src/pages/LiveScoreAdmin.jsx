import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Change to your backend server

const LiveScoreAdmin = () => {
  const [sport, setSport] = useState('');
  const [matchId, setMatchId] = useState('');
  const [clubA, setClubA] = useState({ name: '', logo: '' });
  const [clubB, setClubB] = useState({ name: '', logo: '' });
  const [timeline, setTimeline] = useState([]);
  const [score, setScore] = useState('0 - 0');

  const [event, setEvent] = useState({
    team: 'clubA',
    playerId: '',
    assistBy: '',
    time: '',
  });

  const updateMatch = () => {
    const matchData = {
      clubA,
      clubB,
      score,
      timeline,
    };

    socket.emit('scoreUpdate', { sport, matchId, update: matchData });
    alert('Match data sent to viewers!');
  };

  const addEvent = () => {
    const updatedTimeline = [...timeline, event];
    setTimeline(updatedTimeline);

    const scoreParts = score.split(' - ').map(Number);
    if (event.team === 'clubA') scoreParts[0]++;
    else scoreParts[1]++;
    setScore(`${scoreParts[0]} - ${scoreParts[1]}`);

    // Reset input
    setEvent({ team: 'clubA', playerId: '', assistBy: '', time: '' });
  };

  return (
    <div className="min-h-screen pt-20 bg-transparent text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">Admin Match Dashboard</h1>

      {/* Match metadata */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto bg-gray-800 p-4 rounded-lg">
        <input
          type="text"
          className="p-2 rounded bg-gray-700"
          placeholder="Sport (e.g., football)"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        />
        <input
          type="text"
          className="p-2 rounded bg-gray-700"
          placeholder="Match ID"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
        />

        {/* Club A */}
        <input
          type="text"
          className="p-2 rounded bg-gray-700"
          placeholder="Club A Name"
          value={clubA.name}
          onChange={(e) => setClubA({ ...clubA, name: e.target.value })}
        />
        <input
          type="text"
          className="p-2 rounded bg-gray-700"
          placeholder="Club A Logo URL"
          value={clubA.logo}
          onChange={(e) => setClubA({ ...clubA, logo: e.target.value })}
        />

        {/* Club B */}
        <input
          type="text"
          className="p-2 rounded bg-gray-700"
          placeholder="Club B Name"
          value={clubB.name}
          onChange={(e) => setClubB({ ...clubB, name: e.target.value })}
        />
        <input
          type="text"
          className="p-2 rounded bg-gray-700"
          placeholder="Club B Logo URL"
          value={clubB.logo}
          onChange={(e) => setClubB({ ...clubB, logo: e.target.value })}
        />
      </div>

      {/* Add goal/event */}
      <div className="max-w-3xl mx-auto bg-gray-800 p-4 rounded-lg space-y-3">
        <h2 className="text-xl font-semibold">Add Goal/Event</h2>
        <select
          className="w-full p-2 bg-gray-700 rounded"
          value={event.team}
          onChange={(e) => setEvent({ ...event, team: e.target.value })}
        >
          <option value="clubA">{clubA.name || 'Club A'}</option>
          <option value="clubB">{clubB.name || 'Club B'}</option>
        </select>
        <input
          type="text"
          placeholder="Player Name"
          className="w-full p-2 bg-gray-700 rounded"
          value={event.playerId}
          onChange={(e) => setEvent({ ...event, playerId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Assist By (optional)"
          className="w-full p-2 bg-gray-700 rounded"
          value={event.assistBy}
          onChange={(e) => setEvent({ ...event, assistBy: e.target.value })}
        />
        <input
          type="text"
          placeholder="Time (e.g., 45+2)"
          className="w-full p-2 bg-gray-700 rounded"
          value={event.time}
          onChange={(e) => setEvent({ ...event, time: e.target.value })}
        />
        <button
          onClick={addEvent}
          className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          ➕ Add Event
        </button>
      </div>

      {/* Preview + Submit */}
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-xl mb-2">Current Score: {score}</h3>
        <button
          onClick={updateMatch}
          className="px-6 py-3 bg-green-600 rounded hover:bg-green-700 font-bold"
        >
          🚀 Send Live Update
        </button>
      </div>
    </div>
  );
};

export default LiveScoreAdmin;

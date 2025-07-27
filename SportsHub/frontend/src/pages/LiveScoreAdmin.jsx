// src/components/LiveScoreAdmin.jsx
import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router';
const LiveScoreAdmin = () => {
  const { sport,match_id } = useParams(); // Get match_id from route
  const [matchStatus, setMatchStatus] = useState("Ongoing");
  const [team1, setTeam1] = useState({ name: "Team A", score: 0 });
  const [team2, setTeam2] = useState({ name: "Team B", score: 0 });
  const [player, setPlayer] = useState({ name: "", runs: 0, wickets: 0 });

  const handleScoreUpdate = (teamSetter, field, value) => {
    teamSetter(prev => ({ ...prev, [field]: value }));
  };

  const handlePlayerChange = (field, value) => {
    setPlayer(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-4xl mx-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Live Score Admin Panel</h2>

      {/* Match Status */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Match Status</label>
        <select
          className="w-full p-2 rounded bg-gray-800"
          value={matchStatus}
          onChange={e => setMatchStatus(e.target.value)}
        >
          <option>Ongoing</option>
          <option>Paused</option>
          <option>Ended</option>
        </select>
      </div>

      {/* Teams Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[team1, team2].map((team, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Team {index + 1}</h3>
            <input
              className="w-full p-2 mb-2 rounded bg-gray-700"
              value={team.name}
              onChange={(e) => handleScoreUpdate(index === 0 ? setTeam1 : setTeam2, 'name', e.target.value)}
              placeholder="Team Name"
            />
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-700"
              value={team.score}
              onChange={(e) => handleScoreUpdate(index === 0 ? setTeam1 : setTeam2, 'score', parseInt(e.target.value))}
              placeholder="Score"
            />
          </div>
        ))}
      </div>

      {/* Player Info */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h3 className="text-lg font-bold mb-2">Player Update</h3>
        <input
          className="w-full p-2 mb-2 rounded bg-gray-700"
          placeholder="Player Name"
          value={player.name}
          onChange={(e) => handlePlayerChange("name", e.target.value)}
        />
        <input
          type="number"
          className="w-full p-2 mb-2 rounded bg-gray-700"
          placeholder="Runs"
          value={player.runs}
          onChange={(e) => handlePlayerChange("runs", parseInt(e.target.value))}
        />
        <input
          type="number"
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Wickets"
          value={player.wickets}
          onChange={(e) => handlePlayerChange("wickets", parseInt(e.target.value))}
        />
      </div>

      {/* Summary */}
      <div className="bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-bold mb-2">Live Summary</h3>
        <p><strong>Status:</strong> {matchStatus}</p>
        <p><strong>{team1.name}:</strong> {team1.score}</p>
        <p><strong>{team2.name}:</strong> {team2.score}</p>
        <p><strong>Player:</strong> {player.name} - {player.runs} Runs, {player.wickets} Wickets</p>
      </div>
    </div>
  );
};

export default LiveScoreAdmin;

import React, { useState, useEffect } from "react";

// Mock live score data
const mockScores = {
  Football: [
    { match: "Real Madrid vs Barcelona", score: "2 - 1", status: "HT" },
    { match: "Liverpool vs Man City", score: "0 - 0", status: "25'" },
  ],
  Cricket: [
    { match: "India vs Australia", score: "225/4 (35)", status: "LIVE" },
    { match: "ENG vs PAK", score: "145/2 (22)", status: "LIVE" },
  ],
  Basketball: [
    { match: "Lakers vs Celtics", score: "89 - 91", status: "Q4" },
    { match: "Warriors vs Heat", score: "102 - 99", status: "Q3" },
  ],
};

export default function LiveScores() {
  const [sport, setSport] = useState("Football");
  const [scores, setScores] = useState(mockScores[sport]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScores(mockScores[sport]); // Replace with API call in production
    }, 10000);
    return () => clearInterval(interval);
  }, [sport]);

  return (
    <div className="p-4 max-w-xl h-screen mx-auto bg-black text-white rounded-xl shadow-lg">
      <h2 className="text-2xl mt-12 font-bold mb-4 text-center text-orange-500">Live Scores</h2>

      {/* Sport Selector */}
      <div className="mb-4 flex justify-center">
        <select
          className="bg-black border border-orange-500 text-orange-400 px-4 py-2 rounded-md"
          value={sport}
          onChange={(e) => {
            setSport(e.target.value);
            setScores(mockScores[e.target.value]);
          }}
        >
          {Object.keys(mockScores).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Score Display */}
      <ul className="space-y-4">
        {scores.map((game, i) => (
          <li
            key={i}
            className="p-4 border border-orange-700 bg-zinc-900 rounded-md flex justify-between items-center hover:bg-orange-950 transition"
          >
            <div>
              <div className="font-semibold text-orange-300">{game.match}</div>
              <div className="text-sm text-gray-400">{game.status}</div>
            </div>
            <div className="text-lg font-bold text-orange-500">{game.score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

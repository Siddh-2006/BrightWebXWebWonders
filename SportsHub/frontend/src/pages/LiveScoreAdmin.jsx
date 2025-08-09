// Updated AdminLivePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { io } from "socket.io-client";
import axios from "axios";

const LiveScoreAdmin = () => {
  const { sport, matchId } = useParams();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(null);
  const [streamUrl, setStreamUrl] = useState("");
  const [scoreData, setScoreData] = useState({});
  const [statusMsg, setStatusMsg] = useState("");
  const [socket, setSocket] = useState(null);
  const [liveData, setLiveData] = useState({});
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/match/live/${matchId}/check-club-admin`,
          {
            withCredentials: true,
          }
        );
        setIsAdmin(res.data.success ? true : false);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAdminAccess();
  }, [matchId]);

  useEffect(() => {
    if (isAdmin !== true) return;

    const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
      withCredentials: true,
      transports: ["websocket"],
    });
    setSocket(socket);

    socket.on("error", (msg) => setStatusMsg(`Error: ${msg}`));
    socket.on("initialLiveData", (data) => {
      setLiveData(data);
      setScoreData(data.score || {});
    });

    return () => {
      socket.disconnect();
    };
  }, [matchId, isAdmin]);

  const updateScore = () => {
    const timestamp = new Date().toLocaleTimeString();
    setTimeline((prev) => [
      { time: timestamp, score: JSON.stringify(scoreData) },
      ...prev,
    ]);

    socket.emit("adminUpdateScore", {
      matchId,
      streamUrl,
      sport,
      scoreData,
    });

    setStatusMsg("Update sent!");
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const addScore = (field, delta, team = null) => {
    if (sport === "football") {
      setScoreData((prev) => ({
        ...prev,
        [field]: (prev[field] || 0) + delta,
      }));
    } else if (sport === "cricket" && team) {
      setScoreData((prev) => ({
        ...prev,
        [team]: {
          ...prev[team],
          [field]: (prev[team]?.[field] || 0) + delta,
        },
      }));
    }
  };

  if (isAdmin === null)
    return <div className="text-white text-center mt-10">Checking access...</div>;

  if (isAdmin === false)
    return (
      <div className="text-red-500 text-center mt-10 font-bold text-xl">
        Access Denied: You are not the admin of this match.
      </div>
    );

  return (
    <div className="p-6 max-w-3xl  pt-20 mx-auto text-white">

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Stream URL:</label>
        <input
          className="border border-gray-500 rounded p-2 w-full text-black"
          value={streamUrl}
          onChange={(e) => setStreamUrl(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="font-semibold mr-2">Sport:</label>
        <select value={sport} disabled className="p-2 rounded text-black">
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
        </select>
      </div>

      {sport === "football" && (
        <div className="space-y-4">
          {["teamAScore", "teamBScore"].map((key) => (
            <div key={key} className="flex items-center gap-3">
              <span className="w-32 font-semibold">{key}</span>
              <button
                className="bg-blue-600 px-3 py-1 rounded"
                onClick={() => addScore(key, 1)}
              >
                +1
              </button>
              <button
                className="bg-blue-600 px-3 py-1 rounded"
                onClick={() => addScore(key, -1)}
              >
                -1
              </button>
              <span className="text-lg">{scoreData[key] || 0}</span>
            </div>
          ))}
        </div>
      )}

      {sport === "cricket" && (
        ["teamA", "teamB"].map((team) => (
          <div key={team} className="mb-6">
            <h3 className="text-xl font-bold mb-2">{team}</h3>
            {["runs", "wickets"].map((stat) => (
              <div key={stat} className="flex items-center gap-3 mb-2">
                <span className="w-24 font-semibold">{stat}</span>
                {[1, 2, 4, 6].map((val) => (
                  <button      
                    key={val}
                    className="bg-blue-600 px-3 py-1 rounded"
                    onClick={() => addScore(stat, val, team)}
                  >
                    +{val}
                  </button>
                ))}
                {[-1, -2, -4, -6].map((val) => (
                  <button      
                    key={val}
                    className="bg-blue-600 px-3 py-1 rounded"
                    onClick={() => addScore(stat, val, team)}
                  >
                    -{val}
                  </button>
                ))}
                <span className="text-lg">{scoreData[team]?.[stat] || 0}</span>
              </div>
            ))}
          </div>
        ))
      )}

      <button
        onClick={updateScore}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Submit Update
      </button>

      {statusMsg && <div className="mt-2 text-green-400">{statusMsg}</div>}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Timeline</h2>
        <ul className="space-y-2 text-sm">
          {timeline.map((item, index) => (
            <li key={index} className="bg-gray-800 p-3 rounded">
              <strong>{item.time}</strong>: {item.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveScoreAdmin;

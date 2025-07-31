import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { io } from "socket.io-client";
import axios from "axios";

const AdminLivePage = () => {
  const { sport, matchId } = useParams();
  const navigate = useNavigate();
  
  const [isAdmin, setIsAdmin] = useState(null); // null = loading, false = denied, true = allowed
  const [streamUrl, setStreamUrl] = useState("");
  const [scoreData, setScoreData] = useState({});
  const [statusMsg, setStatusMsg] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
  const checkAdminAccess = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/match/live/${matchId}/check-club-admin`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Admin check failed", err?.response?.data || err.message);
      setIsAdmin(false);
    }
  };

  checkAdminAccess();
}, [matchId]);


  useEffect(() => {
    if (isAdmin !== true) return;

    const socket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
    });
    setSocket(socket);

    socket.on("error", (msg) => {
      setStatusMsg(`Error: ${msg}`);
    });

    return () => {
      socket.off("error");
    };
  }, [matchId, isAdmin]);

  const updateScore = () => {
    socket.emit("adminUpdateScore", {
      matchId,
      streamUrl,
      sport,
      scoreData,
    });

    setStatusMsg("Update sent!");
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleScoreChange = (field, value, team = null) => {
    if (sport === "football") {
      setScoreData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else if (sport === "cricket" && team) {
      setScoreData((prev) => ({
        ...prev,
        [team]: {
          ...prev[team],
          [field]: value,
        },
      }));
    }
  };

  if (isAdmin === null) {
    return <div className="text-white text-center mt-10">Checking access...</div>;
  }

  if (isAdmin === false) {
    return (
      <div className="text-red-500 text-center mt-10 font-bold text-xl">
        Access Denied: You are not the admin of this match.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto pt-50">
      <h1 className="text-white">{matchId}</h1>
      <h1 className="text-2xl font-bold mb-4">Admin Live Panel</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Stream URL:</label>
        <input
          className="border p-2 w-full"
          value={streamUrl}
          onChange={(e) => setStreamUrl(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold">Sport:</label>
        <select value={sport} disabled className="ml-2 p-1 border">
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
        </select>
      </div>

      {/* FOOTBALL SCORE INPUTS */}
      {sport === "football" && (
        <div className="space-y-2">
          <input
            placeholder="Team A Score"
            type="number"
            value={scoreData.teamAScore || ""}
            onChange={(e) =>
              handleScoreChange("teamAScore", parseInt(e.target.value))
            }
            className="border p-2 w-full"
          />
          <input
            placeholder="Team B Score"
            type="number"
            value={scoreData.teamBScore || ""}
            onChange={(e) =>
              handleScoreChange("teamBScore", parseInt(e.target.value))
            }
            className="border p-2 w-full"
          />
        </div>
      )}

      {/* CRICKET SCORE INPUTS */}
      {sport === "cricket" && (
        <div className="space-y-2">
          <label className="block font-semibold mt-2">Team A</label>
          <input
            placeholder="Runs"
            type="number"
            value={scoreData.teamA?.runs || ""}
            onChange={(e) =>
              handleScoreChange("runs", parseInt(e.target.value), "teamA")
            }
            className="border p-2 w-full"
          />
          <input
            placeholder="Wickets"
            type="number"
            value={scoreData.teamA?.wickets || ""}
            onChange={(e) =>
              handleScoreChange("wickets", parseInt(e.target.value), "teamA")
            }
            className="border p-2 w-full"
          />
          <input
            placeholder="Overs"
            value={scoreData.teamA?.overs || ""}
            onChange={(e) => handleScoreChange("overs", e.target.value, "teamA")}
            className="border p-2 w-full"
          />

          <label className="block font-semibold mt-2">Team B</label>
          <input
            placeholder="Runs"
            type="number"
            value={scoreData.teamB?.runs || ""}
            onChange={(e) =>
              handleScoreChange("runs", parseInt(e.target.value), "teamB")
            }
            className="border p-2 w-full"
          />
          <input
            placeholder="Wickets"
            type="number"
            value={scoreData.teamB?.wickets || ""}
            onChange={(e) =>
              handleScoreChange("wickets", parseInt(e.target.value), "teamB")
            }
            className="border p-2 w-full"
          />
          <input
            placeholder="Overs"
            value={scoreData.teamB?.overs || ""}
            onChange={(e) => handleScoreChange("overs", e.target.value, "teamB")}
            className="border p-2 w-full"
          />
        </div>
      )}

      <button
        onClick={updateScore}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Update
      </button>

      {statusMsg && <div className="mt-2 text-green-600">{statusMsg}</div>}
    </div>
  );
};

export default AdminLivePage;

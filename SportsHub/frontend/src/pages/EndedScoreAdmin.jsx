import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";

const socket = io(`${process.env.BACKEND_URL}`, {
  withCredentials: true,
  transports: ["websocket"],
});

const EndedScoreAdmin = () => {
  const { matchId } = useParams();

  const [winnerClub, setWinnerClub] = useState("");
  const [MVPPlayer, setMVPPlayer] = useState("");
  const [finalSummary, setFinalSummary] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("error", (msg) => {
      setError(`❌ ${msg}`);
      setStatusMsg("");
    });

    return () => {
      socket.off("error");
    };
  }, []);

  const handleSubmit = () => {
    if (!winnerClub || !MVPPlayer || !finalSummary) {
      setError("Please fill all fields before submitting.");
      return;
    }

    setError("");

    socket.emit("adminUpdateScore", {
      matchId,
      streamUrl: "", // Can be ignored in backend
      sport: "",     // Optional
      scoreData: {}, // Empty since we're only updating post-match
      postMatch: {
        winnerClub,
        MVPPlayer,
        finalSummary,
      },
    });

    setStatusMsg("✅ Post-match update sent!");
    setTimeout(() => setStatusMsg(""), 3000);
  };

  return (
    <div className="max-w-xl mx-auto p-4 pt-24">
      <h1 className="text-2xl font-bold mb-4">Post-Match Update Panel</h1>

      <input
        placeholder="🏆 Winner Club ID"
        value={winnerClub}
        onChange={(e) => setWinnerClub(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <input
        placeholder="⭐ MVP Player ID"
        value={MVPPlayer}
        onChange={(e) => setMVPPlayer(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <textarea
        placeholder="📝 Final Match Summary"
        value={finalSummary}
        onChange={(e) => setFinalSummary(e.target.value)}
        className="border p-2 w-full h-24 mb-4 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Post-Match Update
      </button>

      {statusMsg && <div className="mt-2 text-green-600">{statusMsg}</div>}
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
};

export default EndedScoreAdmin;

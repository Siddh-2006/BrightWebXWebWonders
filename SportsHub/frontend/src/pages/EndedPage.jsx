import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { motion } from "framer-motion";

const socket = io("http://localhost:5000", { withCredentials: true });

const EndedPage = ({ isDarkMode }) => {
  const { matchId, sport } = useParams();
  const [liveScore, setLiveScore] = useState(null);
  const [streamUrl, setStreamUrl] = useState(null);
  const [winnerClub, setWinnerClub] = useState(null);
  const [MVPPlayer, setMVPPlayer] = useState(null);
  const [finalSummary, setFinalSummary] = useState("");
  const [viewsCount, setViewsCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!matchId) return;

    socket.emit("joinMatchRoom", { matchId });

    socket.on("initialLiveData", (data) => {
      setLiveScore(data.liveScore);
      setStreamUrl(data.liveStreamUrl);
      setWinnerClub(data.winnerClub);
      setMVPPlayer(data.MVPPlayer);
      setFinalSummary(data.finalSummary);
      setViewsCount((prev) => prev + 1); // Local increment
    });

    socket.on("matchFinalized", (data) => {
      setWinnerClub(data.winnerClub);
      setMVPPlayer(data.MVPPlayer);
      setFinalSummary(data.finalSummary);
    });

    socket.on("error", (msg) => setError(msg));

    return () => {
      socket.off("initialLiveData");
      socket.off("matchFinalized");
      socket.off("error");
    };
  }, [matchId]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Match Summary - {sport?.toUpperCase()}
      </motion.h1>

      {error && (
        <div className="bg-red-200 text-red-800 p-3 rounded mb-4">{error}</div>
      )}

      {streamUrl && (
        <div className="mb-6">
          <iframe
            className="w-full h-64 rounded"
            src={streamUrl}
            title="Match Stream"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {liveScore && (
        <div className="bg-gray-800 text-white p-4 rounded-lg mb-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Final Score</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(liveScore, null, 2)}</pre>
        </div>
      )}

      {winnerClub && (
        <div className="flex items-center mb-4">
          {winnerClub.logo && (
            <img
              src={winnerClub.logo}
              alt={winnerClub.name}
              className="w-12 h-12 rounded-full mr-3"
            />
          )}
          <p className="text-lg font-medium">
            🏆 Winner: <span className="font-bold">{winnerClub.name}</span>
          </p>
        </div>
      )}

      {MVPPlayer && (
        <div className="flex items-center mb-4">
          {MVPPlayer.profilePic && (
            <img
              src={MVPPlayer.profilePic}
              alt={MVPPlayer.fullname}
              className="w-10 h-10 rounded-full mr-3"
            />
          )}
          <p className="text-lg font-medium">
            ⭐ MVP: <span className="font-semibold">{MVPPlayer.fullname}</span>
          </p>
        </div>
      )}

      {finalSummary && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">🧠 Match Summary</h3>
          <p className="text-base leading-relaxed">{finalSummary}</p>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">👁️ {viewsCount} views</p>
    </div>
  );
};

export default EndedPage;

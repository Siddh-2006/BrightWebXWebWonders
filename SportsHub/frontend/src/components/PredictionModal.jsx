import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { io } from "socket.io-client";
import { showCustomToast } from "../helper/CustomToast";
import {toast, ToastContainer } from "react-toastify";
const PredictionModal = ({ isOpen, onClose, matchId, clubAName, clubBName, isDarkMode }) => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({});

  const submitPrediction = () => {
    if (!selected || !socket) return;

    setLoading(true);
    socket.emit("submitPrediction", { matchId, predictedClub: selected });
    console.log("submitted")
    setTimeout(()=>{setLoading(false); onClose();showCustomToast("success","submitted successfuly")},800)
    
  };

  useEffect(() => {
    if (isOpen) {
      const socketInstance = io(`${import.meta.env.BACKEND_URL}`, {
        withCredentials: true,
        transports: ["websocket"],
      });
      setSocket(socketInstance);

      socketInstance.on("predictionUpdate", (data) => {
        console.log(data);
        setShowResult(true);
        setResult({
          clubA: `${data.clubA}%`,
          clubB: `${data.clubB}%`,
        });
      })

      socketInstance.on("error", (msg) => {
        setError(msg);
        setLoading(false);
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelected(null);
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-md rounded-3xl shadow-2xl transition-all transform ${isDarkMode
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
          : 'bg-white border border-gray-200'
        }`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-current/10">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
            🏆 Predict the Winner
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${isDarkMode
                ? 'text-gray-400 hover:text-white hover:bg-white/10'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className={`text-center text-lg font-medium mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Who do you think will win this match?
          </p>

          {/* Team Selection Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setSelected("clubA")}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${selected === "clubA"
                  ? isDarkMode
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {selected === "clubA" && <span className="text-xl">✨</span>}
                <span>{clubAName}</span>
              </div>
            </button>

            <button
              onClick={() => setSelected("clubB")}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${selected === "clubB"
                  ? isDarkMode
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {selected === "clubB" && <span className="text-xl">✨</span>}
                <span>{clubBName}</span>
              </div>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-500 text-sm font-medium text-center">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className={`${showResult ? "block" : "hidden"} mt-6`}>
            {result.clubA} {result.clubB}
          </div>
          <button
            onClick={submitPrediction}
            disabled={!selected || loading}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 ${!selected || loading
                ? isDarkMode
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isDarkMode
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>🎯</span>
                <span>Submit Prediction</span>
              </div>
            )}
          </button>

          {/* Info Text */}
          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Your prediction will be saved and used for match statistics
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;
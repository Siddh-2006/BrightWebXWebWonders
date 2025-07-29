import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { Bell } from "lucide-react";
import ReminderModal from "../components/ReminderModal";
import useReminder from "../hooks/useReminder";
import reminderService from "../services/reminderService";
import ActiveReminders from "../components/ActiveReminders";

const LivePage = () => {
  const { sport, matchId } = useParams();
  const [liveData, setLiveData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatMsg, setChatMsg] = useState("");
  const [socket, setSocket] = useState(null);
  
  // Mock match data for reminder functionality
  const mockMatch = {
    homeTeam: "Team A",
    awayTeam: "Team B",
    date: new Date().toISOString().split('T')[0],
    time: "20:00"
  };
  
  const { reminder, setReminder, isModalOpen, openModal, closeModal } = useReminder(mockMatch);

  const handleReminderSet = (minutes) => {
    const result = reminderService.scheduleReminder(mockMatch, minutes);
    
    if (result.success) {
      alert(`✅ ${result.message}\nScheduled for: ${result.scheduledFor.toLocaleString()}`);
      setReminder(minutes);
    } else {
      alert(`❌ Failed to set reminder: ${result.message}`);
    }
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    socketInstance.emit("joinMatchRoom", { matchId });

    socketInstance.on("initialLiveData", (data) => {
      console.log("Initial live data received:", data);
      setLiveData(data);
    });

    socketInstance.on("liveScoreUpdated", (data) => {
      setLiveData(data);
    });

    socketInstance.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

  }, [matchId]);

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    socket.emit("sendMessage", {
      matchId,
      username: localStorage.getItem("username") || "Guest",
      message: chatMsg,
    });
    setChatMsg("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const renderScore = () => {
    const score = liveData?.liveScore;
    if (!score) return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <p className="text-orange-600 text-center">No score available yet.</p>
      </div>
    );

    switch (sport) {
      case "football":
        return (
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 space-y-4 shadow-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 shadow-sm">
                <div className="text-sm text-orange-600 font-medium">TEAM A</div>
                <div className="text-3xl font-bold text-orange-800">{score.teamAScore}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 shadow-sm">
                <div className="text-sm text-orange-600 font-medium">TEAM B</div>
                <div className="text-3xl font-bold text-orange-800">{score.teamBScore}</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="font-semibold text-orange-800">Goals</span>
              </div>
              <div className="space-y-2">
                {score.goalDetails?.map((goal, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-orange-700 bg-orange-50 px-3 py-2 rounded-md">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    {goal}
                  </div>
                )) || <div className="text-orange-600 italic">No goals yet</div>}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="font-semibold text-orange-800">Match Timeline</span>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {score.timeline?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-orange-700 bg-orange-50 px-3 py-2 rounded-md">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    {item}
                  </div>
                )) || <div className="text-orange-600 italic">No events yet</div>}
              </div>
            </div>
          </div>
        );

      case "cricket":
        return (
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 space-y-4 shadow-lg">
            <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-orange-500">
              <div className="text-sm text-orange-600 font-medium mb-2">CURRENT INNING</div>
              <div className="text-2xl font-bold text-orange-800">{score.inning}</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-orange-600 font-medium mb-2">TEAM A</div>
                <div className="text-xl font-bold text-orange-800">
                  {score.teamA.runs}/{score.teamA.wickets}
                </div>
                <div className="text-sm text-orange-600">in {score.teamA.overs} overs</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-orange-600 font-medium mb-2">TEAM B</div>
                <div className="text-xl font-bold text-orange-800">
                  {score.teamB.runs}/{score.teamB.wickets}
                </div>
                <div className="text-sm text-orange-600">in {score.teamB.overs} overs</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="font-semibold text-orange-800">Match Timeline</span>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {score.timeline?.map((event, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-orange-700 bg-orange-50 px-3 py-2 rounded-md">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    {event}
                  </div>
                )) || <div className="text-orange-600 italic">No timeline events yet</div>}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <pre className="text-orange-800 text-sm overflow-auto">{JSON.stringify(score, null, 2)}</pre>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                </div>
                Live Match: {sport?.toUpperCase()}
              </h1>
              <div className="text-orange-100 mt-2">Match ID: {matchId}</div>
            </div>
            
            {/* Reminder Button */}
            <button
              onClick={openModal}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
            >
              <Bell className="w-5 h-5" />
              Set Reminder
            </button>
          </div>
        </div>

        {/* Live Stream */}
        {liveData?.liveStreamUrl && (
          <div className="mb-6">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-orange-800">Live Stream</span>
              </div>
              <iframe
                src={liveData.liveStreamUrl}
                title="Live Stream"
                className="w-full h-96 rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Live Score Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-orange-800">Live Score</h2>
          </div>
          {renderScore()}
        </div>

        {/* Live Chat Section */}
        <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h2 className="text-xl font-bold text-white">Live Chat</h2>
              <div className="ml-auto bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-black">
                {messages.length} messages
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="h-48 overflow-y-auto border border-orange-200 rounded-lg p-4 mb-4 bg-orange-50 space-y-2">
              {messages.length === 0 ? (
                <div className="text-center text-orange-600 italic">No messages yet. Start the conversation!</div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className="bg-white text-black rounded-lg p-3 shadow-sm border-l-4 border-orange-400">
                    <div className="font-semibold text-orange-800">{msg.username}</div>
                    <div className="text-orange-700 mt-1">{msg.message}</div>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex gap-3">
              <input
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-2 text-black border-orange-200 rounded-lg p-3 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!chatMsg.trim()}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reminder Modal */}
      {isModalOpen && (
        <ReminderModal
          match={mockMatch}
          onClose={closeModal}
          onSetReminder={handleReminderSet}
        />
      )}
      
      {/* Active Reminders */}
      <ActiveReminders isDarkMode={false} />
    </div>
  );
};

export default LivePage;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";

const EndedPage = ({ isDarkMode }) => {
  const { sport, matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [pollResults, setPollResults] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatMsg, setChatMsg] = useState("");
  const [socket, setSocket] = useState(null);

  const theme = {
    primary: isDarkMode ? "orange" : "blue",
    textPrimary: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    textAccent: isDarkMode ? "text-orange-400" : "text-blue-600",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-500",
    bgMain: isDarkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100",
    bgCard: isDarkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-white",
    bgSecondary: isDarkMode ? "bg-gray-700" : "bg-gray-50",
    bgAccent: isDarkMode ? "bg-gradient-to-r from-orange-600 to-red-600" : "bg-gradient-to-r from-blue-600 to-indigo-600",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    borderAccent: isDarkMode ? "border-orange-500" : "border-blue-500",
    input: isDarkMode 
      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600" 
      : "bg-white text-gray-900 placeholder-gray-500 border-gray-300",
    shadow: isDarkMode ? "shadow-2xl shadow-orange-500/20" : "shadow-2xl shadow-blue-500/20",
    glow: isDarkMode ? "shadow-lg shadow-orange-500/30" : "shadow-lg shadow-blue-500/30",
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"],
    });

    setSocket(socketInstance);
    socketInstance.emit("joinMatchRoom", { matchId });
    socketInstance.emit("sendEndedResults",{matchId});
    socketInstance.on("recieveEndedresults", (data) => {setMatchData(data);console.log(data); setPollResults(data.predictions)});
    socketInstance.on("pollResults", (data) => setPollResults(data));
    socketInstance.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketInstance.disconnect();
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
    if (e.key === "Enter") sendMessage();
  };

  const renderFinalScore = () => {
    const score = matchData?.liveScore;
    if (!score) {
      return (
        <div className={`${theme.bgCard} ${theme.border} border rounded-3xl p-12 ${theme.shadow} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full ${theme.bgAccent} animate-spin flex items-center justify-center`}>
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 animate-ping opacity-20"></div>
            </div>
            <div className="text-center">
              <h3 className={`${theme.textPrimary} text-2xl font-bold mb-2`}>Loading Match Results</h3>
              <p className={`${theme.textMuted} text-lg`}>Please wait while we fetch the final scores...</p>
            </div>
          </div>
        </div>
      );
    }

    if (sport === "football") {
      const winner = score.teamAScore > score.teamBScore ? "Team A" : 
                    score.teamBScore > score.teamAScore ? "Team B" : "Draw";
      
      return (
        <div className="space-y-8">
          {/* Final Result Banner */}
          <div className={`${theme.bgCard} border ${theme.border} rounded-3xl p-8 ${theme.shadow} relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-yellow-500 to-red-600"></div>
            
            <div className="text-center mb-8">
              <div className={`inline-block px-6 py-3 ${theme.bgAccent} rounded-2xl mb-4`}>
                <span className="text-white text-xl font-bold">🏆 MATCH ENDED</span>
              </div>
              <h3 className={`${theme.textPrimary} text-3xl font-black mb-2`}>
                {winner === "Draw" ? "IT'S A DRAW!" : `${winner.toUpperCase()} WINS!`}
              </h3>
              <div className={`w-32 h-1 ${theme.bgAccent} mx-auto`}></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Team A */}
              <div className="text-center lg:text-right space-y-4">
                <div className={`${theme.textMuted} text-sm font-bold tracking-widest uppercase`}>Team A</div>
                <div className="relative">
                  <div className={`${theme.textPrimary} text-7xl lg:text-8xl font-black relative z-10 ${score.teamAScore > score.teamBScore ? 'text-green-500' : ''}`}>
                    {score.teamAScore}
                  </div>
                  <div className={`absolute inset-0 ${theme.textAccent} text-7xl lg:text-8xl font-black opacity-20 blur-sm`}>
                    {score.teamAScore}
                  </div>
                </div>
                <div className={`w-16 h-1 ${score.teamAScore > score.teamBScore ? 'bg-green-500' : theme.bgAccent} mx-auto lg:ml-auto lg:mr-0`}></div>
              </div>

              {/* Final Divider */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className={`w-20 h-20 rounded-full ${winner === "Draw" ? 'bg-yellow-500' : theme.bgAccent} flex items-center justify-center ${theme.glow}`}>
                    <span className="text-white text-xl font-black">FINAL</span>
                  </div>
                  <div className="absolute -inset-4 rounded-full border-4 border-dashed border-gray-300 opacity-30"></div>
                </div>
              </div>

              {/* Team B */}
              <div className="text-center lg:text-left space-y-4">
                <div className={`${theme.textMuted} text-sm font-bold tracking-widest uppercase`}>Team B</div>
                <div className="relative">
                  <div className={`${theme.textPrimary} text-7xl lg:text-8xl font-black relative z-10 ${score.teamBScore > score.teamAScore ? 'text-green-500' : ''}`}>
                    {score.teamBScore}
                  </div>
                  <div className={`absolute inset-0 ${theme.textAccent} text-7xl lg:text-8xl font-black opacity-20 blur-sm`}>
                    {score.teamBScore}
                  </div>
                </div>
                <div className={`w-16 h-1 ${score.teamBScore > score.teamAScore ? 'bg-green-500' : theme.bgAccent} mx-auto lg:mr-auto lg:ml-0`}></div>
              </div>
            </div>
          </div>

          {/* Match Summary */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {["Goals Scored", "Match Highlights"].map((label, idx) => (
              <div key={label} className={`${theme.bgCard} border ${theme.border} rounded-2xl p-6 ${theme.shadow} hover:${theme.glow} transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`${theme.textPrimary} text-xl font-bold flex items-center gap-3`}>
                    <div className={`w-3 h-3 rounded-full ${theme.bgAccent}`}></div>
                    {label}
                  </h3>
                  <div className={`px-3 py-1 ${theme.bgSecondary} rounded-full text-xs ${theme.textMuted} font-semibold`}>
                    {(idx === 0 ? score.goalDetails : score.highlights)?.length || 0} items
                  </div>
                </div>
                
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {(idx === 0 ? score.goalDetails : score.highlights)?.map((item, i) => (
                    <div key={i} className={`${theme.bgSecondary} rounded-xl p-4 border-l-4 ${theme.borderAccent}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full ${theme.bgAccent} mt-2 flex-shrink-0`}></div>
                        <span className={`${theme.textSecondary} leading-relaxed`}>{item}</span>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-12">
                      <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${theme.bgSecondary} flex items-center justify-center`}>
                        <div className={`w-6 h-6 rounded-full ${theme.bgAccent} opacity-50`}></div>
                      </div>
                      <p className={`${theme.textMuted} text-lg`}>No {label.toLowerCase()} available</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (sport === "cricket") {
      const teamATotal = score?.teamA?.runs;
      const teamBTotal = score?.teamB?.runs;
      const winner = teamATotal > teamBTotal ? "Team A" : 
                    teamBTotal > teamATotal ? "Team B" : "Draw";
      
      return (
        <div className="space-y-8">
          {/* Final Result Banner */}
          <div className={`${theme.bgCard} border ${theme.border} rounded-3xl p-8 text-center ${theme.shadow} relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600"></div>
            
            <div className={`inline-block px-6 py-3 ${theme.bgAccent} rounded-2xl mb-4`}>
              <span className="text-white text-xl font-bold">🏏 MATCH ENDED</span>
            </div>
            <h3 className={`${theme.textPrimary} text-3xl font-black mb-4`}>
              {winner === "Draw" ? "IT'S A TIE!" : `${winner.toUpperCase()} WINS!`}
            </h3>
            <div className={`w-32 h-1 ${theme.bgAccent} mx-auto mb-6`}></div>
            <div className={`${theme.textMuted} text-lg font-semibold`}>Final Inning: {score.inning}</div>
          </div>

          {/* Teams Final Scores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[score.teamA, score.teamB].map((team, i) => (
              <div key={i} className={`${theme.bgCard} border ${theme.border} rounded-2xl p-8 ${theme.shadow} hover:${theme.glow} transition-all duration-300 group`}>
                <div className="text-center space-y-6">
                  <div className={`${theme.textMuted} text-sm font-bold tracking-widest uppercase`}>
                    Team {i === 0 ? "A" : "B"}
                    {((i === 0 && teamATotal > teamBTotal) || (i === 1 && teamBTotal > teamATotal)) && (
                      <span className="ml-2 text-green-500">👑 WINNER</span>
                    )}
                  </div>
                  
                  <div className="relative">
                    <div className={`${theme.textPrimary} text-5xl font-black ${((i === 0 && teamATotal > teamBTotal) || (i === 1 && teamBTotal > teamATotal)) ? 'text-green-500' : ''}`}>
                      {team?.runs}
                      <span className={`${theme.textAccent} text-3xl`}>/{team?.wickets}</span>
                    </div>
                  </div>
                  
                  <div className={`${theme.textSecondary} text-lg font-semibold`}>
                    in {team?.overs} overs
                  </div>
                  
                  <div className={`w-20 h-1 ${((i === 0 && teamATotal > teamBTotal) || (i === 1 && teamBTotal > teamATotal)) ? 'bg-green-500' : theme.bgAccent} mx-auto`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Match Summary */}
          <div className={`${theme.bgCard} border ${theme.border} rounded-2xl p-6 ${theme.shadow}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`${theme.textPrimary} text-xl font-bold flex items-center gap-3`}>
                <div className={`w-3 h-3 rounded-full ${theme.bgAccent}`}></div>
                Match Summary
              </h3>
            </div>
            
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {score.summary?.map((event, idx) => (
                <div key={idx} className={`${theme.bgSecondary} rounded-xl p-4 border-l-4 ${theme.borderAccent}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full ${theme.bgAccent} mt-2 flex-shrink-0`}></div>
                    <span className={`${theme.textSecondary} leading-relaxed`}>{event}</span>
                  </div>
                </div>
              )) || (
                <div className="text-center py-12">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${theme.bgSecondary} flex items-center justify-center`}>
                    <div className={`w-6 h-6 rounded-full ${theme.bgAccent} opacity-50`}></div>
                  </div>
                  <p className={`${theme.textMuted} text-lg`}>No summary available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`${theme.bgCard} border ${theme.border} rounded-2xl p-6 ${theme.shadow}`}>
        <pre className={`${theme.textSecondary} text-sm overflow-auto font-mono bg-gray-100 p-4 rounded-lg`}>
          {JSON.stringify(score, null, 2)}
        </pre>
      </div>
    );
  };

  const renderPollResults = () => {
    if (!pollResults) {
      return (
        <div className={`${theme.bgCard} ${theme.border} border rounded-3xl p-12 ${theme.shadow} relative overflow-hidden`}>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full ${theme.bgAccent} animate-pulse flex items-center justify-center`}>
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="text-center">
              <h3 className={`${theme.textPrimary} text-2xl font-bold mb-2`}>Loading Poll Results</h3>
              <p className={`${theme.textMuted} text-lg`}>Fetching voting data...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-xl mx-auto space-y-4 bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Poll Results</h2>
      {Object.entries(pollResults).map(([club,percent],index) => (
        <div key={index}>
          <div className="flex justify-between text-sm mb-1 text-white">
            <span>{club}</span>
            <span>{parseFloat(percent)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500`}
              style={{
                width: `${parseFloat(percent)}%`,
                background: `linear-gradient(to right, #4ade80, #22c55e)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
    );
  };

  return (
    <div className={`min-h-screen ${theme.bgMain} relative`}>
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div> */}

      <div className="relative z-10 px-4 py-8 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header Section */}
          <div className="text-center pt-20 space-y-8">
            <div className="relative inline-block">
              <h1 className={`${theme.textPrimary} text-5xl lg:text-7xl font-black tracking-tight relative z-10`}>
                MATCH ENDED
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text blur-sm opacity-30">
                MATCH ENDED
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className={`px-8 py-4 ${theme.bgCard} ${theme.border} border rounded-2xl ${theme.shadow} flex items-center gap-4`}>
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                <div className="text-left">
                  <div className={`${theme.textMuted} text-xs font-semibold uppercase tracking-wider`}>Sport</div>
                  <div className={`${theme.textPrimary} text-xl font-bold capitalize`}>{sport}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Score */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className={`${theme.textPrimary} text-4xl lg:text-5xl font-black mb-4`}>Final Score</h2>
              <div className={`w-32 h-1 ${theme.bgAccent} mx-auto`}></div>
            </div>
            {renderFinalScore()}
          </div>

          {/* Poll Results */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className={`${theme.textPrimary} text-4xl lg:text-5xl font-black mb-4`}>Poll Results</h2>
              <div className={`w-32 h-1 ${theme.bgAccent} mx-auto`}></div>
            </div>
            {renderPollResults()}
          </div>

          {/* Post-Match Chat */}
          <div className={`${theme.bgCard} border ${theme.border} rounded-3xl overflow-hidden ${theme.shadow}`}>
            <div className={`${theme.bgAccent} p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <h2 className="text-white text-2xl font-bold">Post-Match Discussion</h2>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full text-white text-sm font-bold">
                  {messages.length} messages
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className={`${theme.bgSecondary} rounded-2xl p-6 mb-8 h-80 overflow-y-auto space-y-4`}>
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className={`w-20 h-20 mx-auto rounded-full ${theme.bgAccent} flex items-center justify-center opacity-50`}>
                        <div className="w-10 h-10 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <h3 className={`${theme.textPrimary} text-xl font-bold mb-2`}>No discussion yet</h3>
                        <p className={`${theme.textMuted} text-lg`}>Share your thoughts about the match!</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div key={idx} className={`${theme.bgCard} rounded-xl p-4 border ${theme.border} hover:${theme.glow} transition-all duration-200`}>
                      <div className={`${theme.textAccent} font-bold text-sm mb-2`}>{msg.username}</div>
                      <div className={`${theme.textSecondary} leading-relaxed`}>{msg.message}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-4">
                <input
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts about the match..."
                  className={`flex-1 ${theme.input} border-2 rounded-2xl p-4 text-lg focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200`}
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatMsg.trim()}
                  className={`${theme.bgAccent} text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 ${theme.glow}`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndedPage;
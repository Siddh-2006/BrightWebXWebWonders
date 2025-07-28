const Match = require("../models/match-model");
const verifyClubOwnershipSocket = require("../utils/verifyClubOwnershipSocket");

module.exports = (io, socket) => {
  // User joins a match room
  socket.on("joinMatchRoom", async ({ matchId }) => {
    try {
      const match = await Match.findById(matchId);
      if (!match) return socket.emit("error", "Match not found");

      socket.join(matchId.toString());

      // Send initial data (stream + score)
      socket.emit("initialLiveData", {
        liveStreamUrl: match.liveStreamUrl || null,
        sport: match.sport,
        liveScore: match.liveScore || null,
      });
    } catch (err) {
      console.error("joinMatchRoom error:", err);
    }
  });

  // Admin updates stream + score
  socket.on("adminUpdateScore", async ({ matchId, streamUrl, sport, scoreData }) => {
    const clubInfo = await verifyClubOwnershipSocket(socket);
    if (!clubInfo) {
      return socket.emit("error", "Unauthorized: Not a club admin");
    }

    try {
      // Update the match in DB
      let final_score=buildScoreForSport(sport, scoreData)
      let clubA = 0;
      let clubB = 0;
      if(sport==="football"){
        clubA=Number(final_score.teamAScore);
        clubB=Number(final_score.teamBScore);
      }
      else if(sport==="cricket"){
        clubA=Number(final_score.teamA.runs); 
        clubB=Number(final_score.teamB.runs);
      }
      const updatedMatch = await Match.findByIdAndUpdate(
        matchId,
        {
          liveStreamUrl: streamUrl,
          liveScore: final_score,
          score:{clubA:clubA,clubB:clubB},
          
        },
        { new: true }
      );

      // Broadcast to all users in room
      io.to(matchId.toString()).emit("liveScoreUpdated", {
        sport,
        liveScore: updatedMatch.liveScore,
        liveStreamUrl: updatedMatch.liveStreamUrl,
      });
      console.log("Score updated successfully for match:",sport, updatedMatch.liveScore);
    } catch (err) {
      console.error("adminUpdateScore error:", err);
      socket.emit("error", "Update failed");
    }
  });

  // Live chat
  socket.on("sendMessage", ({ matchId, username, message }) => {
    io.to(matchId.toString()).emit("receiveMessage", {
      username,
      message,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
};

// Helper to structure score by sport
function buildScoreForSport(sport, data) {
  switch (sport) {
    case "football":
      console.log(data)
      return {
        teamAScore: data.teamAScore || 0,
        teamBScore: data.teamBScore || 0,
        goalDetails: data.goalDetails || [],
        timeline: data.timeline || [],
      };
    case "cricket":
      return {
        inning: data.inning || "1st",
        teamA: {
          runs: data.teamA?.runs || 0,
          wickets: data.teamA?.wickets || 0,
          overs: data.teamA?.overs || "0.0",
        },
        teamB: {
          runs: data.teamB?.runs || 0,
          wickets: data.teamB?.wickets || 0,
          overs: data.teamB?.overs || "0.0",
        },
        timeline:data.timeline || [],
      };
    // Add more sports as needed
    default:
      return data;
  }
}

const MatchChallenge = require("../models/match-challenge-model");
const Match = require("../models/match-model");

// 🔔 GET ALERTS FOR CLUB A (sender)
exports.getChallengeNotifications = async (req, res) => {
  try {
    const clubId = req.club._id;

    // Find all accepted challenges where Club A was the sender and hasn't seen notification
    const alerts = await MatchChallenge.find({
      fromClub: clubId,
      status: "accepted",
      notified: false,
    }).populate("toClub", "name").sort({ updatedAt: -1 });

    res.status(200).json({ alerts });
  } catch (err) {
    console.error("Error fetching challenge notifications", err);
    res.status(500).json({ message: "Server error while fetching alerts" });
  }
};

exports.markNotificationsSeen = async (req, res) => {
  try {
    const clubId = req.club._id;

    await MatchChallenge.updateMany(
      { fromClub: clubId, status: "accepted", notified: false },
      { $set: { notified: true } }
    );

    res.status(200).json({ message: "Notifications marked as seen" });
  } catch (err) {
    res.status(500).json({ message: "Error updating notifications" });
  }
};

// SEND CHALLENGE
exports.sendChallenge = async (req, res) => {
  try {
    const fromClub = req.club._id;
    const { toClub, sport, matchType, startTime, venueName, location, isPaid, viewerFee, streamURL, lineupA, lineupB } = req.body;

    const challenge = await MatchChallenge.create({
      fromClub,
      toClub,
      sport,
      matchType,
      startTime,
      venueName,
      location,
      isPaid,
      viewerFee,
      streamURL,
      lineupA,
      lineupB,
    });

    res.status(201).json({ message: "Challenge sent successfully", challenge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending challenge" });
  }
};

// VIEW RECEIVED CHALLENGES
exports.getReceivedChallenges = async (req, res) => {
  try {
    const clubId = req.club._id;

    const challenges = await MatchChallenge.find({
      toClub: clubId,
      status: "pending",
    })
      .populate("fromClub", "name logo")
      .sort({ createdAt: -1 });

    res.status(200).json({ challenges });
  } catch (error) {
    res.status(500).json({ message: "Error fetching challenges" });
  }
};

// ACCEPT CHALLENGE & CREATE MATCH
exports.acceptChallenge = async (req, res) => {
  try {
    const challengeId = req.params.id;
    const clubId = req.club._id;

    const challenge = await MatchChallenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    if (challenge.toClub.toString() != clubId) {
      return res.status(403).json({ message: "Unauthorized. Challenge not for this club." });
    }
    if (challenge.status !== "pending") {
      return res.status(400).json({ message: "Challenge already responded to" });
    }

    // Create Match
    const match = await Match.create({
      clubA: challenge.fromClub,
      clubB: challenge.toClub,
      sport: challenge.sport,
      matchType: challenge.matchType,
      startTime: challenge.startTime,
      venueName: challenge.venueName,
      location: challenge.location,
      isPaid: challenge.isPaid,
      viewerFee: challenge.viewerFee,
      streamURL: challenge.streamURL,
      lineupA: challenge.lineupA,
      lineupB: challenge.lineupB,
      createdBy: clubId,
    });

    // Update Challenge
    challenge.status = "accepted";
    challenge.notified = false; // So Club A sees alert
    await challenge.save();

    res.status(200).json({ message: "Challenge accepted. Match created!", match });
  } catch (error) {
    res.status(500).json({ message: "Error accepting challenge" });
  }
};

// REJECT CHALLENGE
exports.rejectChallenge = async (req, res) => {
  try {
    const challengeId = req.params.id;
    const clubId = req.club._id;

    const challenge = await MatchChallenge.findById(challengeId);

    if (!challenge || challenge.toClub.toString() !== clubId || challenge.status !== "pending") {
      return res.status(404).json({ message: "Challenge not found or unauthorized" });
    }

    challenge.status = "rejected";
    challenge.notified = false; // Club A will see it
    await challenge.save();

    res.status(200).json({ message: "Challenge rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting challenge" });
  }
};



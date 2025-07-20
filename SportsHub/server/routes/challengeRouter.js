const express = require("express");
const router = express.Router();
const challengeController = require("../controllers/challengeController");
const isLoggedIn= require("../middlewares/isLoggedIn");
const {verifyClubOwnership}=require("../middlewares/clubMiddleware")

// 🔔 Get notifications for Club A (alerts about accepted challenges)
router.get("/notifications", verifyClubOwnership, challengeController.getChallengeNotifications);

// ✅ Mark challenge alerts as seen
router.patch("/notifications/mark-seen",verifyClubOwnership,challengeController.markNotificationsSeen);


router.post("/", isLoggedIn,verifyClubOwnership, challengeController.sendChallenge);
router.get("/received", isLoggedIn, verifyClubOwnership,challengeController.getReceivedChallenges);
// 🟢 Accept challenge & create match
router.post("/:id/accept", isLoggedIn,verifyClubOwnership, challengeController.acceptChallenge);
router.post("/:id/reject", isLoggedIn,verifyClubOwnership, challengeController.rejectChallenge);

module.exports = router;
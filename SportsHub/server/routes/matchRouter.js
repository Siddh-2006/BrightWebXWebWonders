const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const isLoggedIn=require("../middlewares/isLoggedIn")

router.get('/live', matchController.getLiveMatches);
router.get('/upcoming', matchController.getUpcomingMatches);
router.get('/past', matchController.getPastMatches);
router.get("/live/:matchId/check-club-admin",isLoggedIn,matchController.checkIfUserIsMatchClubAdmin,async (req, res) => {
  // If it reaches here, user is either clubA or clubB admin
  return res.status(200).json({
    success: true,
    message: `User is an admin of ${req.clubRole} for this match`
  });
});
module.exports=router;
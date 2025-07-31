const mongoose = require("mongoose");
const Club = require("../models/club-model"); // adjust the path as needed

const videoLinks = [
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753888066/soccer-player-kicks-a-ball-on-stadium_xnjt0q.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753888220/men-engage-in-competitive-soccer-match-on-vibrant-field-in-sydney-australia_uszdjg.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753889644/batsman-playing-a-cover-drive-shot-in-a-cricket-match_b7asyb.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753890570/young-female-field-hockey-players-playing-on-field-taking-a-shot-and-scoring-goal_hvtahg.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753890645/ice-hockey-sports-event-and-team-goal-for-win-in-competition-cardio-fitness-in-sport-training_zexdkb.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753890926/ice-hockey-player-practicing-inside-the-skating-rink-seriously_chgjt0.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753891033/young-female-field-hockey-players-playing-on-field-taking-a-shot-and-scoring-goal_cdlwbw.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753891156/black-basketball-player-catching-a-ball-from-a-teammate-running-to-score-an-impressive-two_ry62gd.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753891215/cinematic-basketball-action-on-a-streaming-service-white-team-scores-a-beautiful-goal_ufuiss.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753891419/young-adults-playing-pickleball-on-a-public-court_yxpuzh.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753891505/asian-referee-monitoring-two-boxers-fighting-and-separating-them-when-they-engage-in-a-clinch_h8wcco.mp4",
  "https://res.cloudinary.com/dddwnvp4w/video/upload/v1753891662/male-relay-runners-passing-batons-on-track_pegdgu.mp4"
];

function getRandomFourVideos() {
  const shuffled = videoLinks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

const MONGODB_URI = "mongodb+srv://freny826:nrSPUbUDEZs1JctR@sportshub.pmpnhzh.mongodb.net/?retryWrites=true&w=majority&appName=SportsHub"; // replace with your URI

mongoose.connect(MONGODB_URI)
  .then(async () => {
    const clubs = await Club.find();

    for (const club of clubs) {
      const randomVideos = getRandomFourVideos();
      club.vlogs = randomVideos;

      await club.save();
      console.log(`✅ Updated ${club.name || club._id} with 4 vlogs.`);
    }

    console.log("🎉 All clubs updated with exactly 4 vlogs.");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    mongoose.disconnect();
  });

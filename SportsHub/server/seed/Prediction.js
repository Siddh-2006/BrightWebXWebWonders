const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Match = require("../models/match-model");

dotenv.config();

// 📌 Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected for match seeding"))
.catch(err => { console.error("❌ DB connection error:", err); process.exit(1); });

async function updateMatches() {
  try {
   
    // Update Ended Matches
    const endedMatches = await Match.find({ status: "Ended" });
    for (const match of endedMatches) {
      match.score = {
        clubA: Math.floor(Math.random() * 5), // random 0–4
        clubB: Math.floor(Math.random() * 5),
      };
      match.predictions = {
        clubA: Math.floor(Math.random() * 50 + 1), // random 1–50
        clubB: Math.floor(Math.random() * 50 + 1),
      };
      match.streamURL = `https://example.com/ended/stream/${match._id}`;
      await match.save();
      console.log(`🟣 Updated ENDED match: ${match._id}`);
    }

    // Update Not Started Matches
    const notStartedMatches = await Match.find({ status: "Not Started" });
    for (const match of notStartedMatches) {
      match.score = {
        clubA: 0,
        clubB: 0,
      };
      match.predictions = {
        clubA: 0,
        clubB: 0,
      };
      match.streamURL = "";
      await match.save();
      console.log(`🔵 Updated NOT STARTED match: ${match._id}`);
    }

    console.log("🎉 All updates done!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error updating matches:", err);
    mongoose.connection.close();
  }
}

updateMatches();

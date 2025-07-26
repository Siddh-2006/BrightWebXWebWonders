const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Match = require("../models/match-model");
const Club = require("../models/club-model");
const User = require("../models/user-model");

dotenv.config();

// 📌 Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected for match seeding"))
.catch(err => { console.error("❌ DB connection error:", err); process.exit(1); });

const seedMatches = async () => {
  try {
    // Fetch clubs & users
    const clubs = await Club.find();
    const users = await User.find();

    if (clubs.length < 2 || users.length < 2) {
      throw new Error("Need at least 2 clubs and 2 users for seeding matches");
    }

    // Random rotations
    const [cA, cB, cC, cD, cE] = clubs;

    const matches = [
      {
        sport: "football",
        matchType: "friendly",
        startTime: new Date(Date.now() + 1 * 3600000),
        venueName: "City Stadium",
        location: { city: "Surat", state: "Gujarat" },
        groundImage: "https://example.com/venue1.jpg",
        clubA: cA._id,
        clubB: cB._id,
        lineupA: cA.players,
        lineupB: cB.players,
        createdBy: cA._id
      },
      {
        sport: "cricket",
        matchType: "tournament",
        startTime: new Date(Date.now() + 2 * 3600000),
        venueName: "Gujarat College Ground",
        location: { city: "Surat", state: "Gujarat" },
        groundImage: "https://example.com/venue2.jpg",
        clubA: cC._id,
        clubB: cD._id,
        lineupA: cC.players,
        lineupB: cD.players,
        isPaid: true,
        viewerFee: 500,
        streamURL: "https://streaming.example.com/cricket1",
        createdBy: cC._id
      },
      {
        sport: "basketball",
        matchType: "friendly",
        startTime: new Date(Date.now() + 3 * 3600000),
        venueName: "College Gym",
        location: { city: "Surat", state: "Gujarat" },
        groundImage: "https://example.com/venue3.jpg",
        clubA: cB._id,
        clubB: cE._id,
        lineupA: cB.players,
        lineupB: cE.players,
        createdBy: cB._id
      },
      // ... add 7 more match objects rotating clubs
    ];

    // Create additional match slots
    for (let i = 4; i < 10; i++) {
      const a = clubs[i % clubs.length];
      const b = clubs[(i + 2) % clubs.length];
      matches.push({
        sport: ["football","cricket","tennis","basketball"][i % 4],
        matchType: i % 3 === 0 ? "tournament" : "friendly",
        startTime: new Date(Date.now() + (i + 1) * 3600000),
        venueName: `Venue ${i}`,
        location: { city: "Surat", state: "Gujarat" },
        groundImage: `https://example.com/venue${i}.jpg`,
        clubA: a._id,
        clubB: b._id,
        lineupA: a.players,
        lineupB: b.players,
        isPaid: i % 2 === 0,
        viewerFee: i % 2 === 0 ? 300 : 0,
        streamURL: i % 2 === 0 ? `https://stream.example.com/match${i}` : "",
        createdBy: a._id
      });
    }

    const inserted = await Match.insertMany(matches, { ordered: false });
    console.log(`✅ ${inserted.length} matches seeded successfully`);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding matches:", err);
    process.exit(1);
  }
};

seedMatches();

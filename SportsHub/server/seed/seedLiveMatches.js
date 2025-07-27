const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Match = require("../models/match-model");
const Club = require("../models/club-model");
const User = require("../models/user-model");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected for match seeding"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const seedMatches = async () => {
  try {

    const clubs = await Club.find({});
    const users = await User.find({});
    if (clubs.length < 3 || users.length < 3) {
      throw new Error("Not enough clubs or users found.");
    }

    const findClub = (name) => clubs.find((c) => c.name === name);
    const findUser = (email) => users.find((u) => u.email === email);

    const now = new Date();

    const matches = [
      // 1. Upcoming (starts in 1 hour)
      {
        sport: "football",
        matchType: "league",
        startTime: new Date(now.getTime() + 60 * 60 * 1000),
        status: "Not Started",
        isLive: false,
        venueName: "Echo Arena",
        location: { city: "Surat", state: "GJ" },
        clubA: findClub("SVNIT Falcons")._id,
        clubB: findClub("MNIT Panthers")._id,
        createdBy: findClub("SVNIT Falcons").createdBy,
      },
      // 2. Live (started 30 min ago)
      {
        sport: "cricket",
        matchType: "tournament",
        startTime: new Date(now.getTime() - 30 * 60 * 1000),
        status: "Live",
        isLive: true,
        venueName: "Wankhede Stadium",
        location: { city: "Mumbai", state: "MH" },
        clubA: findClub("Royal Edge Cricket Club")._id,
        clubB: findClub("SVNIT Thunderbolts")._id,
        createdBy: findClub("Royal Edge Cricket Club").createdBy,
      },
      // 3. Past (started 3 hours ago, so it should be 'Ended')
      {
        sport: "basketball",
        matchType: "semi-final",
        startTime: new Date(now.getTime() - 3 * 60 * 60 * 1000),
        status: "Ended",
        isLive: false,
        winnerClub: findClub("Neon Blaze Sports Club")._id,
        venueName: "Pune Indoor Stadium",
        location: { city: "Pune", state: "MH" },
        clubA: findClub("Neon Blaze Sports Club")._id,
        clubB: findClub("MNIT Panthers")._id,
        createdBy: findClub("Neon Blaze Sports Club").createdBy,
      },
      // 4. Will go LIVE in 2 minutes (ideal for cron test)
      {
        sport: "volleyball",
        matchType: "practice",
        startTime: new Date(now.getTime() + 2 * 60 * 1000),
        status: "Not Started",
        isLive: false,
        venueName: "SVNIT Sports Ground",
        location: { city: "Surat", state: "GJ" },
        clubA: findClub("SVNIT Thunderbolts")._id,
        clubB: findClub("Royal Edge Cricket Club")._id,
        createdBy: findClub("SVNIT Thunderbolts").createdBy,
      },
      // 5. Just ended match (started 2.1 hours ago)
      {
        sport: "tennis",
        matchType: "quarter-final",
        startTime: new Date(now.getTime() - 2.1 * 60 * 60 * 1000),
        status: "Live", // cron should change it to Ended
        isLive: true,
        winnerClub: findClub("Neon Blaze Sports Club")._id,
        venueName: "National Tennis Court",
        location: { city: "Delhi", state: "DL" },
        clubA: findClub("Neon Blaze Sports Club")._id,
        clubB: findClub("SVNIT Falcons")._id,
        createdBy: findClub("Neon Blaze Sports Club").createdBy,
      }
    ];

    const inserted = await Match.insertMany(matches, { ordered: false });
    console.log(`✅ ${inserted.length} matches seeded successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedMatches();

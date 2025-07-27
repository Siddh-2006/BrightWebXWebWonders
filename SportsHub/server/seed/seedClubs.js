const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Club = require("../models/club-model"); // adjust the path if needed
const User = require("../models/user-model"); // adjust the path if needed

dotenv.config();

// Connect to MongoDB using your existing URI
mongoose.connect("mongodb+srv://freny826:nrSPUbUDEZs1JctR@sportshub.pmpnhzh.mongodb.net/?retryWrites=true&w=majority&appName=SportsHub", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected for club seeding");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

const seedClubs = async () => {
  try {
    // Fetch existing users by email
    const fatima = await User.findOne({ email: "fatima.khan@universitysports.ac.in" });
    const riya = await User.findOne({ email: "riya.sharma@xyzcollege.edu" });
    const aditya = await User.findOne({ email: "aditya.verma@abcschool.org" });
    const neha = await User.findOne({ email: "neha.patel@sportsclub.in" });
    const imran = await User.findOne({ email: "imran.sheikh@collegesports.edu" });
    const sharad = await User.findOne({ email: "sharadjhawar12345@gmail.com" });

    if (!fatima || !riya || !aditya || !neha || !imran) {
      throw new Error("One or more seed users not found in DB.");
    }

    const clubData = [
      {
        name: "SVNIT Falcons",
        logo: "https://res.cloudinary.com/dddwnvp4w/image/upload/v1753183000/svnit-falcons-logo.png",
        description: "Pride of SVNIT, known for dominance in football and cricket.",
        approved: true,
        createdBy: fatima._id,
        players: [fatima._id, imran._id]
      },
      {
        name: "Pinky sports club",
        logo: "https://res.cloudinary.com/dddwnvp4w/image/upload/v1753183000/svnit-falcons-logo.png",
        description: "Pride of gandhinagar, known for dominance in chess.",
        approved: true,
        createdBy: sharad._id,
        players: [neha._id, fatima._id]
      },
      {
        name: "Neon Blaze Sports Club",
        logo: "https://res.cloudinary.com/dddwnvp4w/image/upload/v1753183050/neon-blaze-logo.png",
        description: "Elite private club grooming national-level athletes.",
        approved: true,
        createdBy: neha._id,
        players: [neha._id, riya._id]
      },
      {
        name: "Royal Edge Cricket Club",
        logo: "https://res.cloudinary.com/dddwnvp4w/image/upload/v1753183100/royal-edge-logo.png",
        description: "One of the top inter-college cricket teams in the region.",
        approved: true,
        createdBy: imran._id,
        players: [imran._id, fatima._id]
      },
      {
        name: "MNIT Panthers",
        logo: "https://res.cloudinary.com/dddwnvp4w/image/upload/v1753183150/abc-panthers-logo.png",
        description: "A vibrant school-level club for basketball and athletics.",
        approved: true,
        createdBy: aditya._id,
        players: [aditya._id]
      },
      {
        name: "SVNIT Thunderbolts",
        logo: "https://res.cloudinary.com/dddwnvp4w/image/upload/v1753183200/xyz-thunderbolts-logo.png",
        description: "Multi-sport club of SVNIT College specializing in volleyball.",
        approved: true,
        createdBy: riya._id,
        players: [riya._id, imran._id]
      }
    ];

    const inserted = await Club.insertMany(clubData, { ordered: false });
    console.log(`✅ ${inserted.length} clubs seeded successfully.`);
    process.exit(0);
  } catch (error) {
    if (error.writeErrors) {
      console.warn("⚠️ Some duplicate clubs skipped.");
    } else {
      console.error("❌ Seeding error:", error);
    }
    process.exit(1);
  }
};

seedClubs();

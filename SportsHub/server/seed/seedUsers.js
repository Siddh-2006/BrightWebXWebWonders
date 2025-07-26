const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user-model"); // adjust path as needed

dotenv.config();

const users = [
    {
    fullname: "Neha Patel",
    isAdmin: false,
    email: "neha.patel@sportsclub.in",
    password: "$2b$10$C/wQWu5dENDZ6ZwwGB4u6.yoARUVk8mR173pLXA.3a6Onf8Xtr23G",
    institutionType: "Club",
    points: 95,
    matchesPlayed: 11,
    clubs: [],
    achievements: [
      {
        title: "Club Debut",
        description: "Played first club match",
        date: new Date("2025-06-05")
      }
    ],
    rank: "Intermediate",
    activityChart: []
  },
  
];

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  seedUsers(); // ⬅ Start seeding after connection
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

const seedUsers = async () => {
  try {
    const inserted = await User.insertMany(users, { ordered: false });
    console.log(`✅ ${inserted.length} users inserted.`);
    process.exit();
  } catch (err) {
    if (err.writeErrors) {
      console.warn("⚠️ Skipped duplicates.");
    } else {
      console.error("❌ Error inserting users:", err);
    }
    process.exit(1);
  }
};

seedUsers();
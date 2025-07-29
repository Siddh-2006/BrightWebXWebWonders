const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Club = require("../models/club-model");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URI || "your-mongodb-uri",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ Connection failed:", err);
  process.exit(1);
});

// Generate social links
function generateSocialLinks(clubName) {
  const base = clubName.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
  return {
    instagram: `https://instagram.com/${base}_official`,
    twitter: `https://twitter.com/${base}_club`,
    youtube: `https://youtube.com/@${base}`,
    email: `${base}@gmail.com`
  };
}

// Random contact number
function generatePhoneNumber() {
  return "+91" + Math.floor(6000000000 + Math.random() * 4000000000);
}

// Generate website URL
function generateWebsite(clubName) {
  const base = clubName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
  return `https://www.${base}.sportshub.com`;
}

// Gallery images based on sports
function generateGalleryImages(sports = [], count = 3) {
  const keywords = sports.length > 0 ? sports : ["sports"];
  const images = [];
  for (let i = 0; i < count; i++) {
    const keyword = keywords[i % keywords.length].toLowerCase();
    images.push(`https://source.unsplash.com/800x600/?${encodeURIComponent(keyword)}&sig=${Math.floor(Math.random() * 10000)}`);
  }
  return images;
}

async function updateClubs() {
  try {
    const clubs = await Club.find();

    for (const club of clubs) {
      const socialLinks = generateSocialLinks(club.name);
      const contactNumber = generatePhoneNumber();
      const website = generateWebsite(club.name);
      const foundedYear = Math.floor(Math.random() * 41) + 1980;
      const gallery = generateGalleryImages(club.sports || []);

      await Club.findByIdAndUpdate(club._id, {
        $set: {
          foundedYear,
          socialLinks,
          contactNumber,
          website,
          gallery
        }
      });

      console.log(`✅ Updated: ${club.name}`);
    }

    mongoose.disconnect();
    console.log("🚪 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Update failed:", err);
    mongoose.disconnect();
  }
}

updateClubs();

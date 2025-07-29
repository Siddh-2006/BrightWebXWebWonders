const mongoose = require('mongoose');
require('dotenv').config();

const Club = require('../models/club-model');
const Post = require('../models/post-model');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Generalized sports-themed post samples
const postSamples = [
  {
    title: "🏆 Championship Victory!",
    text: "An incredible effort by the team led to a 3-2 win in the finals. Special shoutout to Rohan for that last-minute goal!",
  },
  {
    title: "📣 Registrations Open: Inter-College Tournament",
    text: "Get ready for the annual inter-college sports tournament. Registration deadline: August 10th.",
  },
  {
    title: "📅 Match Day: Friendly with NIT Surat",
    text: "We have a friendly match scheduled this Sunday at 4 PM. Make sure you're there to support the squad!",
  },
  {
    title: "🎖️ Player of the Month: Priya Singh",
    text: "With exceptional consistency and 4 goals this season, Priya earns the Player of the Month title. Congrats!",
  },
  {
    title: "🏋️‍♂️ Conditioning Session This Friday",
    text: "Join us at 6:30 AM for a fitness and conditioning session led by Coach Arvind. Mandatory for all team members.",
  },
  {
    title: "📸 Highlights Uploaded: Last Match Recap",
    text: "Catch the key moments from last weekend’s intense face-off — available now on the media wall.",
  },
  {
    title: "📝 Open Trials for New Players",
    text: "Trials for new team members will be held this Thursday at the main ground. Bring your ID card and water.",
  },
  {
    title: "🚑 Injury Update",
    text: "Ajay will be resting for 2 weeks due to a hamstring strain. We wish him a speedy recovery!",
  },
  {
    title: "🥅 Goalkeeping Workshop",
    text: "Special workshop for goalkeepers on Tuesday, 7 AM. Focus: reflexes, positioning, and communication.",
  },
  {
    title: "📊 Stats Update: Mid-Season Numbers",
    text: "So far: 6 wins, 2 losses, 18 goals scored. Let’s keep the momentum going into the next half!",
  },
  {
    title: "🌟 Rising Star: Tanvi Desai",
    text: "Tanvi’s outstanding debut performance has caught everyone’s eye — 2 goals in just her first match!",
  },
  {
    title: "🎥 Vlog Premiere: Journey to the Nationals",
    text: "Don't miss the premiere of our behind-the-scenes vlog capturing the road to the national tournament.",
  }
];

const getRandomPosts = (count) => {
  const shuffled = postSamples.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const createDummyPosts = async () => {
  try {
    await connectDB();

    const clubs = await Club.find();

    for (const club of clubs) {
      const randomCount = Math.floor(Math.random() * 3) + 2; // 2 to 4 posts
      const selectedPosts = getRandomPosts(randomCount);

      const createdPosts = [];

      for (const postData of selectedPosts) {
        const newPost = await Post.create({
          club: club._id,
          title: postData.title,
          text: postData.text,
          photos: [],
          reel: "",
          vlogType: "",
          vlogUrl: ""
        });

        createdPosts.push(newPost._id);
      }

      // Add posts to the club's 'posts' array
      club.posts.push(...createdPosts);
      await club.save();

      console.log(`✅ Added posts to club: ${club.name}`);
    }

    console.log("🎉 Dummy posts successfully added to all clubs.");
    process.exit();
  } catch (err) {
    console.error("❌ Error in creating dummy posts:", err);
    process.exit(1);
  }
};

createDummyPosts();

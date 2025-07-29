const Post = require("../models/post-model");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const createPost = async (req, res) => {
  try {
    const { title, text, vlogUrl } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Upload photos (if any)
    const photoUrls = [];
    if (req.files?.photos) {
      for (const file of req.files.photos) {
        const url = await uploadToCloudinary(file.buffer, "club_posts/photos");
        photoUrls.push(url);
      }
    }

    // Upload reels (if any)
    const reelUrls = [];
    if (req.files?.reel) {
      for (const file of req.files.reel) {
        const url = await uploadToCloudinary(file.buffer, "club_posts/reels");
        reelUrls.push(url);
      }
    }

    const newPost = new Post({
      club: req.club._id,
      title,
      text,
      photos: photoUrls,
      reel: reelUrls,
      vlogUrl,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createPost };

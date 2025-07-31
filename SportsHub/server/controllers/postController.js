const Post = require("../models/post-model");
const Club = require("../models/club-model");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const createPost = async (req, res) => {
  try {
    const { title, text, vlogUrl } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const photoUrls = [];
    if (req.files?.photos) {
      for (const file of req.files.photos) {
        const url = await uploadToCloudinary(file.buffer, "club_posts/photos");
        photoUrls.push(url);
      }
    }

    const vlogUrls = [];
    if (req.files?.vlogs) {
      for (const file of req.files.vlogs) {
        const url = await uploadToCloudinary(file.buffer, "club_posts/vlogs");
        vlogUrls.push(url);
      }
    }

    const finalVlogUrl = vlogUrls.length > 0 ? vlogUrls[0] : vlogUrl;

    const newPost = new Post({
      club: req.club._id,
      title,
      text,
      photos: photoUrls,
      vlogUrl: finalVlogUrl,
    });

    await newPost.save();

    if (finalVlogUrl) {
      await Club.findByIdAndUpdate(req.club._id, {
        $addToSet: { vlogs: finalVlogUrl },
      });
    }

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createPost };

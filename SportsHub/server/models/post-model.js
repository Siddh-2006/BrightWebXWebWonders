const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true,
  },
  title:{ 
    type: String,
    required: true,
  },
  text: {
    type: String,
    maxlength: 1000,
  },
  photos: [
    {
      type: String, // Path to uploaded images
    },
  ],
  reel:[ {
    type: String, // Path to uploaded reel video
  }],
  vlogType: {
    type: String,
  },
  vlogUrl: {
    type: String, // YouTube link or uploaded video path
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Post', postSchema);

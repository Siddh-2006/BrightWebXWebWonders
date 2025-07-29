const express = require("express");
const router = express.Router();

const { createPost } = require("../controllers/postController");
const upload = require("../config/multer-config"); // multer memoryStorage
const {verifyClubOwnership} = require("../middlewares/clubMiddleware"); // JWT auth for club
const isLoggedIn =require("../middlewares/isLoggedIn")

// Accept multiple photos and reels (video) in one post
const multerFields = upload.fields([
  { name: "photos", maxCount: 5 }, // up to 5 images
  { name: "reel", maxCount: 5 },   // up to 5 video files
]);

// Route: POST /api/posts/add
router.post("/add",isLoggedIn, verifyClubOwnership, multerFields, createPost);

module.exports = router;

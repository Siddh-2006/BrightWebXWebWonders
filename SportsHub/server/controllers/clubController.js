const Club = require('../models/club-model');
const JoinRequest = require('../models/join-request-model');
const User = require('../models/user-model');
const uploadToCloudinary = require('../utils/uploadToCloudinary'); // Cloudinary uploader

// @desc Register a club with logo upload
const registerClub = async (req, res) => {
  try {
    const { name, description, sports } = req.body;

    const existing = await Club.findOne({ name });
    if (existing) return res.status(400).json({ msg: 'Club already exists' });

    let logoUrl = '';
    if (req.file?.buffer) {
      logoUrl = await uploadToCloudinary(req.file.buffer, 'club_logos');
    }

    const club = await Club.create({
      name,
      description,
      logo: logoUrl,
      createdBy: req.user._id,
      approved: false, // default: admin has to approve
      sports: sports || []
    });

    res.status(201).json({
      msg: 'Club registered successfully. Awaiting admin approval.',
      club
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const approveClub = async (req, res) => {
  const { clubId } = req.params;
  await Club.findByIdAndUpdate(clubId, { approved: true });
  res.json({ msg: 'Club approved' });
};

const getPendingClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ approved: false });
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllClubs = async (req, res) => {
  const clubs = await Club.find({ approved: true }).populate('players', 'fullName');
  res.json(clubs);
};

const clubSendRequest = async (req, res) => {
  const { clubId, userId } = req.body;
  const existing = await JoinRequest.findOne({ club: clubId, user: userId });
  if (existing) return res.status(400).json({ msg: 'Request already exists' });

  const request = await JoinRequest.create({ club: clubId, user: userId, requestedBy: 'club' });
  res.status(201).json(request);
};

const userSendRequest = async (req, res) => {
  const { clubId } = req.body;
  const userId = req.user._id;

  const existing = await JoinRequest.findOne({ club: clubId, user: userId });
  if (existing) return res.status(400).json({ msg: 'Request already exists' });

  const request = await JoinRequest.create({ club: clubId, user: userId, requestedBy: 'user' });
  res.status(201).json(request);
};

const approveJoinRequest = async (req, res) => {
  const { requestId } = req.params;
  const request = await JoinRequest.findById(requestId);
  if (!request) return res.status(404).json({ msg: 'Request not found' });

  request.status = 'accepted';
  await request.save();

  await Club.findByIdAndUpdate(request.club, { $addToSet: { players: request.user } });

  res.json({ msg: 'Request approved and player added' });
};

const getMyClub = async (req, res) => {
  try {
    const club = await Club.findOne({ createdBy: req.user._id }).populate('players', 'fullName');
    if (!club) {
      return res.status(404).json({ msg: 'Club not found' });
    }
    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerClub,
  approveClub,
  getAllClubs,
  getPendingClubs,
  clubSendRequest,
  userSendRequest,
  approveJoinRequest,
  getMyClub
};

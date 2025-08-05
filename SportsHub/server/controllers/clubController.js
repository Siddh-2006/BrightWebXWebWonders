const Club = require('../models/club-model');
const JoinRequest = require('../models/join-request-model');
const User = require('../models/user-model');
const Notification = require('../models/notification-model');
const uploadToCloudinary = require('../utils/uploadToCloudinary'); // Cloudinary uploader

// Helper function to notify admins of new club registration
const notifyAdminsOfClubRegistration = async (club) => {
  try {
    // Find all admin users
    const admins = await User.find({ isAdmin: true });
    
    if (admins.length === 0) {
      console.log('No admin users found to notify');
      return;
    }

    // Create notification for each admin
    const notifications = admins.map(admin => ({
      recipient: admin._id,
      type: 'club_registration',
      title: 'New Club Registration',
      message: `Club "${club.name}" has been registered and requires approval.`,
      data: {
        clubId: club._id,
        clubName: club.name,
        createdBy: club.createdBy
      },
      actionUrl: `/admin/clubs/pending`
    }));

    await Notification.insertMany(notifications);
    console.log(`✅ Notified ${admins.length} admin(s) about new club registration: ${club.name}`);
  } catch (err) {
    console.error('Error notifying admins:', err);
  }
};

// @desc Register a club with logo upload
const registerClub = async (req, res) => {
  try {
    const {
      name,
      description,
      sports,
      foundedYear,
      officialEmail,
      contactNumber
    } = req.body;

    // Validate required fields - only name is required
    if (!name) {
      return res.status(400).json({ msg: 'Club name is required' });
    }

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
      sports: sports || [],
      foundedYear: foundedYear ? parseInt(foundedYear) : undefined,
      officialEmail: officialEmail || undefined,
      contactNumber: contactNumber || undefined
    });

    // ✅ Notify all admins about the new club registration
    await notifyAdminsOfClubRegistration(club);

    res.status(201).json({
      msg: 'Club registered successfully. Awaiting admin approval.',
      club
    });
  } catch (err) {
    console.error('Club registration error:', err);
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

const getClubPosts = async (req, res) => {
  try {
    const { clubId } = req.params;

    const club = await Club.findById(clubId)
      .populate({
        path: 'posts',
        options: { sort: { createdAt: -1 } } // Optional: newest first
      });

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json({ posts: club.posts });
  } catch (error) {
    console.error("Error fetching club posts:", error);
    res.status(500).json({ message: 'Internal Server Error' });
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
  getMyClub,
  getClubPosts
};

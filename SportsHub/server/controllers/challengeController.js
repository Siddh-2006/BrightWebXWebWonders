const MatchChallenge = require('../models/match-challenge-model');
const Club = require('../models/club-model');
const Notification = require('../models/notification-model');

const createChallenge = async (req, res) => {
  try {
    const { opponentId, sport, prizePool, location, date } = req.body;
    const club = await Club.findOne({ createdBy: req.user._id });
    if (!club) {
      return res.status(404).json({ msg: 'Club not found' });
    }
    const challengerId = club._id;

    // Get opponent club details
    const opponentClub = await Club.findById(opponentId);
    if (!opponentClub) {
      return res.status(404).json({ msg: 'Opponent club not found' });
    }

    const challenge = await MatchChallenge.create({
      challenger: challengerId,
      opponent: opponentId,
      sport
    });

    // Create notification for the opponent club owner
    await Notification.create({
      recipient: opponentClub.createdBy,
      recipientClub: opponentId,
      type: 'challenge_request',
      title: `Challenge Request from ${club.name}`,
      message: `${club.name} has challenged your team to a ${sport} match${prizePool ? ` with a ${prizePool} prize pool` : ''}. Review their team stats and decide.`,
      data: {
        challengeId: challenge._id,
        challengerClub: challengerId,
        opponentClub: opponentId,
        sport,
        prizePool: prizePool || '',
        location: location || '',
        date: date || ''
      },
      actionUrl: `/challenges/${challenge._id}`
    });

    res.status(201).json({
      msg: 'Challenge sent successfully.',
      challenge
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const acceptChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const challenge = await MatchChallenge.findById(challengeId).populate('challenger opponent');

    if (!challenge) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }

    // Ensure the user is the opponent
    const club = await Club.findOne({ createdBy: req.user._id });
    if (!club || challenge.opponent._id.toString() !== club._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to accept this challenge' });
    }

    challenge.status = 'accepted';
    await challenge.save();

    // Get challenger club details
    const challengerClub = await Club.findById(challenge.challenger);
    
    // Remove the original challenge request notification for the opponent (admin notification removal)
    await Notification.findOneAndDelete({
      recipient: req.user._id,
      'data.challengeId': challengeId,
      type: 'challenge_request'
    });

    // Get the original challenge notification to extract all details
    const originalNotification = await Notification.findOne({
      'data.challengeId': challengeId,
      type: 'challenge_request'
    });

    // Create notification for the challenger club owner with all information
    await Notification.create({
      recipient: challengerClub.createdBy,
      recipientClub: challenge.challenger,
      type: 'challenge_accepted',
      title: `Challenge Accepted by ${club.name}`,
      message: `${club.name} has accepted your challenge for the ${challenge.sport} match. Match details have been confirmed and you can now proceed with the match arrangements.`,
      data: {
        challengeId: challenge._id,
        challengerClub: challenge.challenger,
        opponentClub: club._id,
        sport: challenge.sport,
        prizePool: originalNotification?.data?.prizePool || '',
        location: originalNotification?.data?.location || '',
        date: originalNotification?.data?.date || '',
        acceptedBy: club.name,
        acceptedAt: new Date()
      },
      actionUrl: `/challenges/${challenge._id}`
    });

    res.json({
      msg: 'Challenge accepted successfully',
      challenge: {
        ...challenge.toObject(),
        challenger: challengerClub,
        opponent: club
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const declineChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const challenge = await MatchChallenge.findById(challengeId).populate('challenger opponent');

    if (!challenge) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }

    // Ensure the user is the opponent
    const club = await Club.findOne({ createdBy: req.user._id });
    if (!club || challenge.opponent._id.toString() !== club._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to decline this challenge' });
    }

    challenge.status = 'declined';
    await challenge.save();

    // Get challenger club details
    const challengerClub = await Club.findById(challenge.challenger);
    
    // Remove the original challenge request notification for the opponent
    await Notification.findOneAndDelete({
      recipient: req.user._id,
      'data.challengeId': challengeId,
      type: 'challenge_request'
    });

    // Get the original challenge notification to extract all details
    const originalNotification = await Notification.findOne({
      'data.challengeId': challengeId,
      type: 'challenge_request'
    });

    // Create notification for the challenger club owner with all information
    await Notification.create({
      recipient: challengerClub.createdBy,
      recipientClub: challenge.challenger,
      type: 'challenge_declined',
      title: `Challenge Declined by ${club.name}`,
      message: `${club.name} has declined your challenge for the ${challenge.sport} match. You can try challenging other clubs or modify your challenge terms.`,
      data: {
        challengeId: challenge._id,
        challengerClub: challenge.challenger,
        opponentClub: club._id,
        sport: challenge.sport,
        prizePool: originalNotification?.data?.prizePool || '',
        location: originalNotification?.data?.location || '',
        date: originalNotification?.data?.date || '',
        declinedBy: club.name,
        declinedAt: new Date()
      },
      actionUrl: `/challenges/${challenge._id}`
    });

    res.json({
      msg: 'Challenge declined successfully',
      challenge: {
        ...challenge.toObject(),
        challenger: challengerClub,
        opponent: club
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getChallenges = async (req, res) => {
  try {
    const club = await Club.findOne({ createdBy: req.user._id });
    if (!club) {
      return res.status(404).json({ msg: 'Club not found' });
    }

    // Get challenges where this club is either challenger or opponent
    const challenges = await MatchChallenge.find({
      $or: [
        { challenger: club._id },
        { opponent: club._id }
      ]
    })
    .populate('challenger', 'name logo')
    .populate('opponent', 'name logo')
    .sort({ createdAt: -1 });

    res.json(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate('data.challengerClub', 'name logo')
      .populate('data.opponentClub', 'name logo')
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }

    // Ensure the user owns this notification
    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    notification.read = true;
    await notification.save();

    res.json({ msg: 'Notification marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createChallenge,
  acceptChallenge,
  declineChallenge,
  getChallenges,
  getNotifications,
  markNotificationAsRead
};

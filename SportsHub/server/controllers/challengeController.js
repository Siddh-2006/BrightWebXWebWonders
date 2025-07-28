const MatchChallenge = require('../models/match-challenge-model');
const Club = require('../models/club-model');

const createChallenge = async (req, res) => {
  try {
    const { opponentId, sport } = req.body;
    const club = await Club.findOne({ createdBy: req.user._id });
    if (!club) {
      return res.status(404).json({ msg: 'Club not found' });
    }
    const challengerId = club._id;

    const challenge = await MatchChallenge.create({
      challenger: challengerId,
      opponent: opponentId,
      sport
    });

    // TODO: Implement notification system to alert the opponent

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
    const challenge = await MatchChallenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }

    // Ensure the user is the opponent
    const club = await Club.findOne({ createdBy: req.user._id });
    if (!club || challenge.opponent.toString() !== club._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to accept this challenge' });
    }

    challenge.status = 'accepted';
    await challenge.save();

    // TODO: Implement notification system to alert the admin

    res.json({ msg: 'Challenge accepted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const declineChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const challenge = await MatchChallenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ msg: 'Challenge not found' });
    }

    // Ensure the user is the opponent
    const club = await Club.findOne({ createdBy: req.user._id });
    if (!club || challenge.opponent.toString() !== club._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to decline this challenge' });
    }

    challenge.status = 'declined';
    await challenge.save();

    res.json({ msg: 'Challenge declined' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createChallenge,
  acceptChallenge,
  declineChallenge
};

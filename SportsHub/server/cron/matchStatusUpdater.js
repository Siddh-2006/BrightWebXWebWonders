const cron = require('node-cron');
const mongoose = require('mongoose');
const Match = require('../models/match-model');

// CRON to update match statuses every minute
const runMatchStatusCron = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hrs ago

    try {
      // Update Not Started → Live
      const liveMatches = await Match.updateMany(
        { startTime: { $lte: now }, status: 'Not Started' },
        { $set: { status: 'Live', isLive: true } }
      );

      // Update Live → Ended
      const endedMatches = await Match.updateMany(
        { startTime: { $lte: twoHoursAgo }, status: 'Live' },
        { $set: { status: 'Ended', isLive: false } }
      );

    } catch (err) {
      console.error('❌ CRON ERROR:', err);
    }
  });
};

module.exports = runMatchStatusCron;

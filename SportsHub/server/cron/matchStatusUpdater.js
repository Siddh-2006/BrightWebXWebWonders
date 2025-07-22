const cron = require('node-cron');
const Match = require('../models/match-model');

// ⏱ CRON JOB: Runs every minute to update match statuses
const runMatchStatusCron = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();

    try {
      // ➤ Set Not Started → Live
      await Match.updateMany(
        { startTime: { $lte: now }, status: 'Not Started' },
        { status: 'Live', isLive: true }
      );

      // ➤ Set Live → Ended (assuming match is 2 hours long)
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      await Match.updateMany(
        { startTime: { $lte: twoHoursAgo }, status: 'Live' },
        { status: 'Ended', isLive: false }
      );

      console.log('✅ Match status CRON ran at', now.toLocaleString());
    } catch (error) {
      console.error('❌ Error in match status CRON:', error.message);
    }
  });
};

module.exports = runMatchStatusCron;
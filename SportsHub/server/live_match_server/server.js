const Match = require('../models/match-model');
const sportsHandlers = {
  football: require('./football_controller'),
  //cricket: require('../controllers/liveScore/cricket'),
  //basketball: require('../controllers/liveScore/basketball'),
  // ...other sports
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('📡 New connection');

    // Join room
    socket.on('joinMatch', ({ sport, matchId }) => {
      const room =` ${sport}_${matchId}`;
      socket.join(room);
      console.log( `joined ${room}`);
    });

    // Admin triggers live update
    socket.on('scoreUpdate', async ({ sport, matchId, update, adminClubId }) => {
      const handler = sportsHandlers[sport];
      if (!handler) return;

      const match = await Match.findById(matchId).populate('playerStats.player');

      // 🔐 Optional: Ensure only clubA or clubB can update
      if (![match.clubA.toString(), match.clubB.toString()].includes(adminClubId)) return;

      await handler.processUpdate(match, update);
      await match.save();

      // Emit public data
      const publicData = handler.preparePublicData(match);
      io.to(`${sport}_${matchId}`).emit('scoreUpdated', publicData);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected');
    });
  });
};
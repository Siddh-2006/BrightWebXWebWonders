  const express = require('express');
  const app = express();
  const cookieParser = require("cookie-parser");
  const path = require('path');
  const db = require("./config/mongoose-connection");
  const flash = require("connect-flash");
  const cors = require('cors');
  const config = require("config");
  const http = require('http');
  const socketIO = require('socket.io');
  const session = require('express-session');
  require("dotenv").config();
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const runMatchStatusCron = require('./cron/matchStatusUpdater');
  const connectDB = require('./config/db');
  const commonMiddleware = require('./middlewares/commonMiddleware');
  const analysisRoutes = require('./routes/analysisRoutes');
  const customErrorHandler = require('./utils/customErrorHandler');
  const aiGuruChatRouter=require("./routes/aiGuruChatRouter");
  const quizRoutes = require('./routes/quizRoutes');
  const challengeRouter = require('./routes/challengeRouter');
  const usersRouter = require("./routes/usersRouter");
  const clubsRouter = require("./routes/clubsRouter");
  const initQuizCronJobs = require('./cron/quizCronJobs');


  const server = http.createServer(app);
  const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"]
  }
  });
  // runMatchStatusCron();
  // Connect to MongoDB
  connectDB();  

  // Apply common middleware
  commonMiddleware(app);

  // Routes
  // const adminsRouter=require("./routes/adminsRouter");
  // const matchRouter = require("./routes/matchRouter");
  // const indexRouter=require("./routes/index");

  // Routes
  // app.use("/",indexRouter);
  // Use the analysis routes under the /api base path
  app.use('/api', analysisRoutes);
  app.use("/api/ai-guru-chat", aiGuruChatRouter);
  app.use('/api/quiz', quizRoutes);
  // app.use("/match", matchRouter);
  app.use("/users", usersRouter);
  app.use("/clubs", clubsRouter);
  app.use('/challenges',challengeRouter);
  
  // app.use("/profile", verifyToken, getUserProfile);

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for score updates from admin/moderator
    socket.on('scoreUpdate', (data) => {
      // Broadcast to all clients
      io.emit('liveScore', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // initQuizCronJobs();

  // Error handling middleware (should be last middleware)
  app.use(customErrorHandler);

  // Start the server
const PORT = config.get("PORT") || 3000; // Port set back to 3000
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export app and server for testing if needed
module.exports = { app, server };
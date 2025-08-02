const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
require("dotenv").config();
const config = require("config");
 
// Import modular components
const connectDB = require('./config/db');
const commonMiddleware = require('./middlewares/commonMiddleware');
const analysisRoutes = require('./routes/analysisRoutes');
const customErrorHandler = require('./utils/customErrorHandler');
const aiGuruChatRouter = require("./routes/aiGuruChatRouter");
const quizRoutes = require('./routes/quizRoutes');
const challengeRouter = require('./routes/challengeRouter');
const postRouter=require("./routes/postRouter")
const usersRouter = require("./routes/usersRouter");
const clubsRouter = require("./routes/clubsRouter");
const trainingPlanRouter = require('./routes/trainingPlanRouter');
const customTrainingPlanRouter = require('./routes/customTrainingPlanRouter');
const groundRouter=require("./routes/groundRouter");
const sportsRouter=require('./routes/sportsRouter');
const cookieParser = require("cookie-parser");
const updateClubProfile=require("./routes/clubProfileRouter");
const path = require('path');
const flash = require("connect-flash");
const cors = require('cors');
const session = require('express-session');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const runMatchStatusCron = require('./cron/matchStatusUpdater');
const handleSocketConnection = require("./live_match_server/server");
const liveMatchRoomHandler = require("./socket/liveMatchRoomHandler");
const initQuizCronJobs = require('./cron/quizCronJobs');

const app = express();
const server = http.createServer(app);
app.use(cors({
  origin: `${process.env.FRONTEND_ORIGIN}`,
  credentials: true,
}));


const io = socketIO(server, {
  cors: {
    origin: `${process.env.FRONTEND_ORIGIN}`, // frontend URL
    methods: ["GET", "POST"],
    credentials: true ,
  }
});

//handel websocket server
// handleSocketConnection(io)

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  liveMatchRoomHandler(io, socket);
});
// start the server on port 5000
server.listen(3000, () => {
  console.log(`🚀 websocek running on 3000`);
});

runMatchStatusCron();

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Apply common middleware
    commonMiddleware(app);

    // Routes
    const matchRouter = require("./routes/matchRouter");

    app.use("/api/ai-guru-chat", aiGuruChatRouter);
    app.use('/api/quiz', quizRoutes);
    app.use("/match", matchRouter);
    app.use("/api/training-plans", trainingPlanRouter);
    app.use("/api/custom-training-plans", customTrainingPlanRouter);
    app.use("/posts", postRouter);
    app.use("/users", usersRouter);
    app.use("/clubs", clubsRouter);
    app.use('/challenges', challengeRouter);
    app.use('/api', analysisRoutes);
    app.use('/grounds',groundRouter);
    app.use('/sports',sportsRouter);
    app.use('/club-profile',updateClubProfile);

    // Initialize cron jobs after successful DB connection
    initQuizCronJobs();
    //runMatchStatusCron();

    // Error handling middleware (should be last middleware)
    app.use(customErrorHandler);

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Export app and server for testing if needed
module.exports = { app, server };
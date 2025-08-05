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
const aiSystemRouter = require("./routes/aiSystemRouter");
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
allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5175",
  "https://sportshub-murex.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


const io = socketIO(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  }
});

//handel websocket server
// handleSocketConnection(io)

io.on("connection", (socket) => {
  // console.log("User connected:", socket.id); // Commented out to reduce logs
  liveMatchRoomHandler(io, socket);
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

    // Simple request logging (only method and URL)
    app.use((req, res, next) => {
      // console.log(`${req.method} ${req.url}`);
      next();
    });

    app.use("/api/ai-guru-chat", aiGuruChatRouter);
    app.use("/api/ai-system", aiSystemRouter);
    app.use('/api/quiz', quizRoutes);
    app.use("/match", matchRouter);
    app.use("/api/training-plans", trainingPlanRouter);
    
    // Custom training plan routes - register both endpoints
    app.use("/api/custom-training-plans", customTrainingPlanRouter);
    app.use("/api/custom-training-plan", customTrainingPlanRouter);
    
    app.use("/posts", postRouter);
    app.use("/users", usersRouter);
    app.use("/clubs", clubsRouter);
    app.use('/challenges', challengeRouter);
    app.use('/api', analysisRoutes);
    app.use('/grounds',groundRouter);
    app.use('/sports',sportsRouter);
    app.use('/club-profile',updateClubProfile);

    // Error handling middleware (should be last middleware)
    app.use(customErrorHandler);

    // Start a single HTTP + WebSocket server (Vercel-compatible behind proxy)
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      // Server running
    });

    // Initialize cron jobs after successful DB connection
    initQuizCronJobs();

  } catch (error) {
    process.exit(1);
  }
};

startServer();

// Export app and server for testing if needed
module.exports = { app, server };
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
  const handleSocketConnection = require("./live_match_server/server");

  const server = http.createServer(app);
  const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"]
  }
  });

  //handel websocket server
  handleSocketConnection(io)
  // start the server on port 5000
  server.listen(5000, () => {
  console.log(`🚀[socketserver] Server running on http://localhost:5000`);
  });

  // runMatchStatusCron();
  



  // Routes
  // const adminsRouter=require("./routes/adminsRouter");
  const challengeRouter = require('./routes/challengeRouter');
  const usersRouter = require("./routes/usersRouter");
  const matchRouter = require("./routes/matchRouter");
  // const indexRouter=require("./routes/index");
  const clubsRouter = require("./routes/clubsRouter");
  const quizRoutes = require('./routes/quizRoutes');
  const aiGuruChatRouter=require("./routes/aiGuruChatRouter");

  // Cron Jobs
  const initQuizCronJobs = require('./cron/quizCronJobs');

  const geminiApiKey = process.env.GEMINI_API_KEY_AI_GURU; // Your specific key name
  if (!geminiApiKey) {
    console.error("Error: GEMINI_API_KEY_AI_GURU is not set in the .env file!");
    process.exit(1);
  }
  const genAI = new GoogleGenerativeAI(geminiApiKey);

  // View Engine & Middleware
  app.set('view engine', 'ejs');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true
  }));
  app.use(session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'your-super-secret-key',
  }));
  app.use(flash());
  app.use(express.static(path.join(__dirname, 'public')));


  // Routes
  // app.use("/",indexRouter);
  app.use("/api/ai-guru-chat", aiGuruChatRouter);
  app.use('/api/quiz', quizRoutes);
  app.use("/match", matchRouter);
  app.use("/users", usersRouter);
  app.use("/clubs", clubsRouter);
  app.use('/challenges',challengeRouter);
  
  // app.use("/profile", verifyToken, getUserProfile);



  db.once('open', () => {
    console.log('MongoDB connection is open');
    // initQuizCronJobs();
    const PORT = config.get("PORT") || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

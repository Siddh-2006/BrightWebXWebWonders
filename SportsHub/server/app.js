  const express = require('express');
  const app = express();
  const cookieParser = require("cookie-parser");
  const path = require('path');
  const db = require("./config/mongoose-connection");
  const flash = require("connect-flash");
  const cors = require('cors');
  const config = require("config");
  const session = require('express-session');
  require("dotenv").config();

  // Routes
  // const adminsRouter=require("./routes/adminsRouter");
  const usersRouter = require("./routes/usersRouter");
  // const indexRouter=require("./routes/index");
  const clubsRouter = require("./routes/clubsRouter");
  const quizRoutes = require('./routes/quizRoutes');

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
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
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
  app.use("/users", usersRouter);
  app.use("/clubs", clubsRouter);

  db.once('open', () => {
    console.log('MongoDB connection is open');
    initQuizCronJobs();
    const PORT = config.get("PORT") || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

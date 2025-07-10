const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const quizRoutes = require('./routes/quizRoutes');
const initQuizCronJobs = require('./cron/quizCronJobs'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/quiz', quizRoutes);

initQuizCronJobs();

app.get('/', (req, res) => {
    res.send('Quiz Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const quizRoutes = require('./routes/quizRoutes');
const videoUploadRoutes = require('./routes/video');
const videoStreamRoutes = require('./routes/stream');
const userRoutes = require('./routes/users');
const protectedRoutes = require('./routes/protected');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Middleware setup (body parser, CORS, etc.)

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/PrepJunction',{
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({limit: '50mb', extended: true}))
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizs', quizRoutes);
app.use('/api/users', userRoutes);
app.use('/api/video', videoUploadRoutes);
app.use('/api/stream', videoStreamRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/protected', protectedRoutes);

// Start the server
const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
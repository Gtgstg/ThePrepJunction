const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 
const bodyParser = require('body-parser')

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
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({limit: '50mb', extended: true}))
// Routes
app.use('/api', require('./routes/courseRoutes'));

// Start the server
const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
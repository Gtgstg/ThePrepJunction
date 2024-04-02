const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  // Add other fields like views, likes, etc. as needed
});

module.exports = mongoose.model('UserInteraction', userInteractionSchema);
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Other fields (e.g., instructor, duration, price, etc.)
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
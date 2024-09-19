const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  imgAlt:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
}, { timestamps: true });

courseSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Course', courseSchema);
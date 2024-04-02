const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  modules: [{
    title: String,
    lectures: [{
      title: String,
      videoUrl: String,
    }],
    quizzes: [{
      question: String,
      options: [String],
      correctAnswer: Number,
    }],
    assignments: [{
      title: String,
      description: String,
      deadline: Date,
    }],
  }],
}, { timestamps: true });

courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Course', courseSchema);
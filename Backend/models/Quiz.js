const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a single option
const optionSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true }
});

// Define the schema for a single question
const questionSchema = new Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  options: [optionSchema], // Array of options
  correctAnswerId: { type: String, required: true },
  timeLimit: { type: Number, required: true }
});

// Define the schema for a category of questions
const categorySchema = new Schema({
  questions: [questionSchema] // Array of questions
});

// Define the schema for the entire document
const quizSchema = new Schema({
  "1": categorySchema, // First category of questions
  "2": categorySchema  // Second category of questions
});

// Create and export the model
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
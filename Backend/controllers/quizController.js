const Quiz = require('../models/Quiz');

exports.getAllQuizs = async (req, res) => {
  try {
    const quizs = await Quiz.find();
    res.status(200).json(quizs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const { thumbnail, url, imgAlt, title, description } = req.body;
    const quiz = new Quiz({ thumbnail, url, imgAlt, title, description });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { title, description, modules } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, { title, description, modules }, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.searchQuizs = async (req, res) => {
  try {
    const query = req.query.q;
    const quizs = await Quiz.find({ $text: { $search: query } });
    res.json(quizs);
  } catch (error) {
    console.error('Error searching quizs:', error);
    res.status(500).json({ error: 'Error searching quizs' });
  }
};
const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.createCourse = async (req, res) => {
  try {
    console.log(req);
    const { title, description } = req.body;
    const newCourse = await Course.create({ title, description });
    res.status(201).json(newCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { thumbnail, url, imgAlt, title, description } = req.body;
    const course = new Course({ thumbnail, url, imgAlt, title, description });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, modules } = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, { title, description, modules }, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.searchCourses = async (req, res) => {
  try {
    const query = req.query.q;
    const courses = await Course.find({ $text: { $search: query } });
    res.json(courses);
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ error: 'Error searching courses' });
  }
};
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/courses', async (req, res) => {
  try {
    const query = req.query.q;
    const courses = await Course.find({ $text: { $search: query } });
    res.json(courses);
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ error: 'Error searching courses' });
  }
});

module.exports = router;
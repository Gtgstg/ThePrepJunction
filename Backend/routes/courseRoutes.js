const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/courses', courseController.getAllCourses);
router.post('/courses', courseController.createCourse);

module.exports = router;
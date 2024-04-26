const express = require('express');
const MockTestController = require('../controllers/mockTestController');

const router = express.Router();

router.post('/exams/createExam', MockTestController.createExam);
router.post('/exams/addMock', MockTestController.addMockTest);
router.post('/exams/getAllMockTests', MockTestController.getAllMockTests);
router.post('/exams/getExamsBasedOnTags', MockTestController.getExamsBasedOnTags);
router.get('/exams/getAllExams', MockTestController.getAllExams);


module.exports = router;
const express = require('express');
const QuestionController = require('../controllers/questionsController');

const router = express.Router();

router.get('/getAllTags', QuestionController.getAllTags);
router.post('/add', QuestionController.addQuestion);
router.put('/:id/options', QuestionController.addOptions);
router.put('/:id/tags', QuestionController.addTags);
router.post('/getQuestionsForTags', QuestionController.getQuestionsForTags);

module.exports = router;
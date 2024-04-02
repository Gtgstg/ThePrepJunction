const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/recommendations/:userId', recommendationController.generateRecommendations);

module.exports = router;
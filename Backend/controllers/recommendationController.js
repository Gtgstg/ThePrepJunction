const UserInteraction = require('../models/UserInteraction');
const Course = require('../models/Course');

exports.generateRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a parameter
    // Your recommendation logic here based on user interactions and course content
    // Example: Get courses that user interacted with recently
    const userInteractions = await UserInteraction.find({ userId }).sort({ createdAt: -1 }).limit(10);
    const recommendedCourses = await Course.find({ _id: { $in: userInteractions.map(interaction => interaction.courseId) } });
    res.json(recommendedCourses);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Error generating recommendations' });
  }
};
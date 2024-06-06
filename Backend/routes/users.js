const express = require('express');
const router = express.Router();

// Import User model
const User = require('../models/User');

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    // Extract googleId from the request parameters
    const googleId = req.params.id;

    // Find the user by googleId
    const user = await User.findOne({ googleId: googleId });

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user data
    res.json(user);
  } catch (error) {
    // Log the error and respond with a server error message
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to update an existing user
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id; // Extract googleId from the request parameters
    const tagIds = req.body.selectedTagIds; // Extract selectedTagIds from the request body

    // Find the user by their googleId and update their tags
    const updatedUser = await User.findOneAndUpdate(
        { googleId: id }, // Search condition
        { tags: tagIds }, // Update the user's tags
        { new: true } // Return the updated user document
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the updated user as the response
    res.json(updatedUser);
  } catch (error) {
    // Log the error and send a server error response
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to delete an existing user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
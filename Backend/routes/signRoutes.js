const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Sign = require('../models/Sign');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await Sign.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in the Sign schema
        const newUser = new Sign({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // Create a new user in the User schema using saved user's ID
        const newUserData = {
            googleId: savedUser._id, // Use saved user's ID as googleId
            displayName: name,
            email: email,
        };
        const newUserProfile = new User(newUserData);
        await newUserProfile.save();

        res.json({ message: 'User created successfully', userId: savedUser._id });
    } catch (error) {
        console.error('Error Signing up:', error);
        res.status(500).json({ error: 'Error Signing up' });
    }
});


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Sign.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.json({ userId: user._id }); // Send unique user ID back to the client

    } catch (error) {
        console.error('Error Signing in:', error);
        res.status(500).json({ error: 'Error Signing in' });
    }
})

module.exports = router;
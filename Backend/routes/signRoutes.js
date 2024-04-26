const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Sign = require('../models/Sign');

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

        // Create new user
        const newUser = new Sign({ name, email, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'User created successfully' });
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
const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/google'); // Redirect to Google OAuth login page
};

// Protected route
router.get('/protected-route', ensureAuthenticated, (req, res) => {
  res.send('You are authorized to access this route.');
});

module.exports = router;
const mongoose = require('mongoose');
const Tag = require('./Tag'); // Import the Tag model

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Reference to Tag model for user-specific tags
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],
});

module.exports = mongoose.model('User', userSchema);

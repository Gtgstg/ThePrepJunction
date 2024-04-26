const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    // Add any other fields you may need for the tags
});

module.exports = mongoose.model('Tag', tagSchema);
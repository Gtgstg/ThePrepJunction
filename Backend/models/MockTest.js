const mongoose = require('mongoose');
const Tag = require('./Tag'); // Import the Tag model

const mockTestSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true,
        unique: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    mockTests: [{
        testName: {
            type: String,
            required: true,
        },
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
        }],
    }],
});

module.exports = mongoose.model('MockTest', mockTestSchema);
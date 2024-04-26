const mongoose = require('mongoose');
const Tag = require('./Tag'); // Import the Tag model

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        enum: ['audio', 'video', 'text'],
        required: true,
    },
    options: [{
        option: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            enum: ['audio', 'video', 'text'],
            required: true,
        },
        isCorrect: {
            type: Boolean,
            default: false,
        },
    }],
    timeLimit: {
        type: Number,
        required: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true,
    }],
});

module.exports = mongoose.model('Question', questionSchema);

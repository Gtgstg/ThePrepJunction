const mongoose = require('mongoose');

const SignSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('Sign', SignSchema);
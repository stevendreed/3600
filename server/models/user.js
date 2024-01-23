const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique:true}, // data type is string, force uniqueness
    password: String,
}, {timestamps: true}); // provides us a created-at timestamp

module.exports = mongoose.model('user', userSchema);
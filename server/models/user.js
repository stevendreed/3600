const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique:true}, // data type is string, force uniqueness
    password: String,
    subscr_exp: Date, // date when paid subscription expires
}, {timestamps: true}); // provides us a created-at timestamp

// https://mongoosejs.com/docs/timestamps.html
// use .createdAt, .updatedAt to access timestamps easily

module.exports = mongoose.model('user', userSchema);
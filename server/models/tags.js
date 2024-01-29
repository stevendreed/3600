const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('tags', tagSchema);

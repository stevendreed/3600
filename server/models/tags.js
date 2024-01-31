const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  chatrooms: [{
    type: ObjectId,
    ref: 'chatroom'
  }]
});

module.exports = mongoose.model('tags', tagSchema);

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Schema } = mongoose;

const chatroomSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: ObjectId,
    ref: 'user'
  },
  tags: [{
    type: ObjectId,
    ref: 'tags'
  }],
  icon: String,
  activeUsers: [{
    type: ObjectId,
    ref: 'user'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 
  }
});

module.exports = mongoose.model('chatroom', chatroomSchema);

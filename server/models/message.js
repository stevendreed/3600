const { ObjectId } = require('mongodb'); // bypasses Schema.types
const mongoose = require('mongoose');
const { json } = require('stream/consumers');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: 'user',
    }, // maps to the username which sent the message
    content: {
      type: String,
      trim: true, // remove leading & trailing spaces
    },
    reaction: json, // key-val pairs of user:'some user', reaction:'👍'
    thread: {
      type: ObjectId,
      ref: 'message',
    },
    location: {
      type: ObjectId,
      ref: 'chatroom',
    }, // maps to a chatroom ID
  },
  {
    timestamps: true,
  }
); // provides us a created-at timestamp

// https://mongoosejs.com/docs/timestamps.html
// use .createdAt, .updatedAt to access timestamps easily

module.exports = mongoose.model('message', messageSchema);

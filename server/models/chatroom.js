const mongoose = require("mongoose");
const User = require("./user");
const Message = require("./message");
const { ObjectId } = mongoose.Types;

const chatroomSchema = new mongoose.Schema(
  {
    chatroom_id: {
      type: String, // we have to generate our own UUIDs: mongoose cannot stably store UUID
      unique: true,
    },
    users: [
      {
        type: ObjectId,
        ref: "user",
      }, // maps to the username which sent the message
    ],
    messages: [
      {
        type: String,
        ref: "message",
      }, // maps the message to the chatroom
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chatroom", chatroomSchema);

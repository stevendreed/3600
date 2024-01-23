const mongoose = require("mongoose");
const User = require("./user");
const Message = require("./message");

const chatroomSchema = new mongoose.Schema(
  {
    chatroom_id: {
      type: String,
      unique: true,
    },
    users: [
      {
        type: String,
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
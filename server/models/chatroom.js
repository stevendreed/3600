const mongoose = require("mongoose");

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
      },
    ],
    messages: [
      {
        type: String,
        ref: "message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chatroom", chatroomSchema);

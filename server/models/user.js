const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);

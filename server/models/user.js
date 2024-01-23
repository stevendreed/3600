const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true, // remove leading and trailing spaces
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    trim: true, // remove leading and trailing spaces
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    trim: true, // remove leading and trailing spaces
    unique: true,
  },
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("user", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  image: String,
});

const userdb = new mongoose.model("googleU", googleUserSchema);

module.exports = userdb;

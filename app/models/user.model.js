const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    dateofbirth: String,
    gender: String,
    phone_number: Number,
    Home_address: String,
    skills: String,
    work_experience: String,
  })
);

module.exports = User;
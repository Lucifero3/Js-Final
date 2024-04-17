// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  // Add other fields as necessary
});

module.exports = mongoose.model('User', userSchema);

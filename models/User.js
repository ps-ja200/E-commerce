// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true }); // Optional: add timestamps for createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);

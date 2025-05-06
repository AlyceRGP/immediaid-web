const mongoose = require('mongoose');

// Define the user schema with your data structure
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: null },  // Assuming profilePicture is a URL or null
  }, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;
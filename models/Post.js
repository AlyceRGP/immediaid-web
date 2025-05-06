const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  file: { type: String }, // Optional: Store the filename or URL if you're using file uploads
  timestamp: { type: String, required: true }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
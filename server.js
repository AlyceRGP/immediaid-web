const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/Post');
const User = require('./models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://alycergp:yce89@immediaid.rvnzs.mongodb.net/immediaid?retryWrites=true&w=majority')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log('MongoDB connection error:', err));

// Route to fetch users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create 'uploads' folder if not present
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// POST route with file upload
app.post('/api/posts', upload.single('file'), async (req, res) => {
  try {
    const { title, content, timestamp } = req.body;
    const filePath = req.file ? req.file.filename : ''; 

    const newPost = new Post({ title, content, file: filePath, timestamp });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // sort newest first
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the file from /uploads if it exists
    if (post.file) {
      const filePath = path.join(__dirname, 'uploads', post.file);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Failed to delete file:', err);
        else console.log('File deleted:', post.file);
      });
    }

    res.status(200).json({ message: 'Post and file deleted' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

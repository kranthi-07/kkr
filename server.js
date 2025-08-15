
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Signup route
app.post('/signup', async (req, res) => {
  try {
    console.log("Form Data:", req.body); // log incoming data

    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.redirect('/success.html');
  } catch (error) {
    console.error("Error signing up:", error); // detailed log
    res.status(500).send("Error signing up: " + error.message);
  }
});

// Login route
// LOGIN route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password (plain text here, but should be hashed)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
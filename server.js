const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  mobile: String,
  address: String
});
const User = mongoose.model("User", userSchema);

// SIGNUP
app.post("/signup", async (req, res) => {
  const { username, password, mobile, address } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.json({ message: "Username already exists" });
    }
    const newUser = new User({ username, password, mobile, address });
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    res.json({ message: "Signup failed", error: error.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.json({ message: "Invalid username or password" });
    }
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.json({ message: "Login failed", error: error.message });
  }
});

// UPDATE PROFILE
app.post("/update-profile", async (req, res) => {
  const { username, mobile, address } = req.body;
  try {
    const updated = await User.findOneAndUpdate(
      { username },
      { mobile, address },
      { new: true }
    );
    res.json({ message: "Profile updated successfully", user: updated });
  } catch (error) {
    res.json({ message: "Profile update failed", error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${ PORT }`));
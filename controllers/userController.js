// controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log("Starting registration");
    console.log(req.body); // Log incoming request body

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log("Step 1: Checked for existing user");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Step 2: Password hashed");

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    console.log("Step 3: User saved");

    // Create a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return success response
    res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Failed to register. Please try again later.' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.updateProfile = async (req, res) => {
  const userId = req.session.userId;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
  res.json(updatedUser);
};
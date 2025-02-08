const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User created' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user._id; // Set user ID in session
    res.json({ message: 'Logged in successfully' });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

const logout = (req, res) => {
  req.session.destroy(err => { 
    if (err) console.error(err); 
    res.json({ message: 'Logged out successfully' });
  });
};

// Email verification function
const verifyEmail = async (req, res) => {
  const { token } = req.body;
  // Logic to verify the email using the token
  res.json({ message: 'Email verified successfully' });
};

// Password reset function
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password reset successfully' });
  } else {
    res.status(400).json({ message: 'User not found' });
  }
};

module.exports = { register, login, logout, verifyEmail, resetPassword };

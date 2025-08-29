const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

// User Registration
router.post('/register', async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if email exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ error: 'Email already exists' });

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || 'user'
  });

  try {
    const savedUser = await user.save();
    const { password, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json({ 
      message: 'User registered successfully',
      user: userWithoutPassword 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'Email not found' });

  // Check if user is active
  if (!user.isActive) return res.status(400).json({ error: 'Account is deactivated' });
  // Check password
  const validPass = await user.comparePassword(req.body.password);
  if (!validPass) return res.status(400).json({ error: 'Invalid password' });

  // Update last login
  user.lastLogin = new Date();
  await user.save();
  // Create and assign token
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
  const { password, ...userWithoutPassword } = user.toObject();
  res.header('auth-token', token).json({ 
    token, 
    user: userWithoutPassword 
  });
});

// Verify token
router.get('/verify', async (req, res) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified._id).select('-password');
    if (!user) return res.status(400).json({ error: 'User not found' });
    
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
});

module.exports = router;
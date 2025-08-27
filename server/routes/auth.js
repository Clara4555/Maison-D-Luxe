const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { registerValidation, loginValidation } = require('../validation');

// Admin Registration
router.post('/register', async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if email exists
  const emailExists = await Admin.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ error: 'Email already exists' });

  // Create new admin
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedAdmin = await admin.save();
    res.status(201).json({ admin: savedAdmin._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Check if email exists
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).json({ error: 'Email not found' });

  // Check password
  const validPass = await admin.comparePassword(req.body.password);
  if (!validPass) return res.status(400).json({ error: 'Invalid password' });

  // Create and assign token
  const token = jwt.sign({ _id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.header('auth-token', token).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
});

module.exports = router;
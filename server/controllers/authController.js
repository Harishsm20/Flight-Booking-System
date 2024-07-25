// server.js or your main entry file
require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const EmployeeModel = require('../models/Employees');

const router = express.Router();

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};
// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const secretKey = generateSecretKey();
    const token = jwt.sign({ userId: user._id, secretKey }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Success', token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Protect your booking route
router.post('/confirmBook', authenticateToken, async (req, res) => {
  const { flightId, seats } = req.body;
  const userId = req.user.userId;

  try {
    const user = await EmployeeModel.findById(userId);
    const flight = await FlightModel.findById(flightId);

    if (!user || !flight) {
      return res.status(404).json({ message: 'User or Flight not found' });
    }

    const booking = new Booking({
      user: user._id,
      flight: flight._id,
      seats,
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token is required' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

module.exports = router;

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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const secretKey = generateSecretKey();
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    req.session.secret = secretKey;
    req.session.token = token;

    res.json({ message: 'Success' });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new EmployeeModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
  } catch (err) {
    console.error("Error saving employee:", err);
    res.status(500).json({ message: 'Error registering employee' });
  }
});

module.exports = router;

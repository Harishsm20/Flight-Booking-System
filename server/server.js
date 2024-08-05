const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EmployeeModel = require('../models/Employees');

const router = express.Router();

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(403).json({ message: 'Invalid password' });

    const userPayload = { userId: user._id, email: user.email };
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    req.session.token = accessToken;
    req.session.refreshToken = refreshToken;

    res.status(200).json({ accessToken, refreshToken, message: 'Success' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const userPayload = { userId: user.userId, email: user.email };
    const newAccessToken = generateAccessToken(userPayload);

    res.json({ accessToken: newAccessToken });
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Failed to log out' });
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;

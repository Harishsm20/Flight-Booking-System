const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const FlightModel = require('../models/Flights');
const EmployeeModel = require('../models/Employees');

const router = express.Router();

router.post('/confirmBook', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Retrieve token from Authorization header
  const { flightId, seats } = req.body;

  if (!token) {
    console.log('Token not found');
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;

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
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired:', error);
      return res.status(403).json({ message: 'Token expired' });
    }
    console.error(error);
    res.status(403).json({ message: 'Invalid token' });
  }
});

module.exports = router;

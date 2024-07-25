const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const FlightModel = require('../models/Flights');
const EmployeeModel = require('../models/Employees');

const router = express.Router();

router.post('/confirmBook', async (req, res) => {
  const token = req.headers['authorization'];
  const { flightId, seats, secretKey } = req.body;

  if (!token || !secretKey) {
    return res.status(403).json({ message: 'Token and secret key are required' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
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
    res.status(403).json({ message: 'Invalid token or secret key' });
  }
});

module.exports = router;

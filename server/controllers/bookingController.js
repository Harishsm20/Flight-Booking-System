// bookingController.js
const express = require('express');
const Booking = require('../models/Booking');
const FlightModel = require('../models/Flights');
const EmployeeModel = require('../models/Employees');
const authenticateToken = require('../middleware/middleware');

const router = express.Router();

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
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

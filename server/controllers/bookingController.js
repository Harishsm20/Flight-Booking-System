const express = require('express');

const Booking = require('../models/Booking');
const FlightModel = require('../models/Flights');
const EmployeeModel = require('../models/Employees');

const router = express.Router();


router.post('/confirmBook' ,async(req, res) => {
    const { userId, flightId, seats } = req.body;
  
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
  
  }
)

module.exports = router;
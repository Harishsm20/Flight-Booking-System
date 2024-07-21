const express = require('express');

const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const User = require('../models/User');

const router = express.Router();


router.post('/book' ,async(req, res) => {
    const { userId, flightId, seats } = req.body;
  
    try {
      const user = await User.findById(userId);
      const flight = await Flight.findById(flightId);
  
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

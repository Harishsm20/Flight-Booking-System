const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const FlightModel = require('../models/Flights');
const EmployeeModel = require('../models/Employees');

const router = express.Router();

router.post('/confirmBook', async (req, res) => {
  console.log("Reached booking");
  const token = req.session.token;
  const { flightId, seats } = req.body;

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
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
    res.status(403).json({ message: 'Invalid token' });
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
      name: name,
      email: email,
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

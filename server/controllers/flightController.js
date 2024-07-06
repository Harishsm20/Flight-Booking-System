const express = require('express');
const FlightModel = require('../models/Flights');
const router = express.Router();

// Endpoint to handle the search for airlines based on the provided destinations
router.get('/destinations/:destination', async (req, res) => {
  const { destination } = req.params;
  try {
    const airlines = await FlightModel.find({ destination });
    res.json(airlines);
  } catch (error) {
    console.error('Error fetching airlines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

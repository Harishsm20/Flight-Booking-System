const express = require('express');
const SearchData = require('../models/searchData');

const router = express.Router();

// Endpoint for searching flights (replace with your actual search logic)
router.post('/search', async (req, res) => {
  try {
    const searchData = new SearchData(req.body);
    await searchData.save();

    // Implement your search logic here based on searchData
    const results = await searchFlights(searchData); // Replace with your search function

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching flights' });
  }
});

module.exports = router;

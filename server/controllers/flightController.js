const express = require('express');
const FlightModel = require('../models/Flights');
const FlightDateModel = require('../models/flightDate');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { destination, travelDate, seats } = req.query;

  try {
    const airlines = await FlightModel.find({ destination });

    let results = [];

    if (airlines.length > 0) {
      const airline = airlines[0]; 
      const keys = Object.keys(airline.airline);

      // Iterate over each key to process the flights
      for (let key of keys) {

        // Find flights based on the airline key and departure date
        const flights = await FlightDateModel.find({
          airline: key,
          departureDate: seats
        });

        // Map the flights to a specific format
        const mappedFlights = flights.map(flight => ({
          id: flight._id,
          airline: flight.airline,
          flightNumber: flight.flightNumber,
          boardingTime: flight.boardingTime,
          arrivalTime: flight.arrivalTime,
          departureDate: seats,
        }));

        // Push the mapped data into results array if there are flights available
        if (mappedFlights.length > 0) {
          results.push({
            airline: {
              id: airline._id,
              airline: key, 
              flightNumber: airline.flightNumber,
              destination: airline.destination,
              price: airline.airline[key], 
            },
            flights: mappedFlights,
          });
        }
      }
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

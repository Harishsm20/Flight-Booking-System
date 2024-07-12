const express = require('express');
const FlightModel = require('../models/Flights');
const FlightDateModel = require('../models/flightDate');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { destination, travelDate, seats } = req.query;

  try {
    // Fetch airlines based on the destination
    const airlines = await FlightModel.find({ destination });
    console.log('Airlines found:', airlines);

    let results = [];

    if (airlines.length > 0) {
      const airline = airlines[0]; // Assuming there's only one entry per destination
      const keys = Object.keys(airline.airline);
      console.log('Keys found:', keys);

      // Iterate over each key to process the flights
      for (let key of keys) {
        console.log('Processing airline:', key);

        // Find flights based on the airline key and departure date
        const flights = await FlightDateModel.find({
          airline: key,
          departureDate: seats
        });
        console.log('Flights found for', key, ':', flights);

        // Map the flights to a specific format
        const mappedFlights = flights.map(flight => ({
          id: flight._id,
          airline: flight.airline,
          flightNumber: flight.flightNumber,
          boardingTime: flight.boardingTime,
          arrivalTime: flight.arrivalTime,
        }));

        // Push the mapped data into results array if there are flights available
        if (mappedFlights.length > 0) {
          results.push({
            airline: {
              id: airline._id,
              airline: key, // Use the key as the airline name
              flightNumber: airline.flightNumber,
              destination: airline.destination,
              price: airline.airline[key], // Use the value associated with the key
            },
            flights: mappedFlights,
          });
        }
      }
    }

    // Send the results as a response
    console.log('Final results:', results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

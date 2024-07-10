const express = require('express');
const FlightModel = require('../models/Flights');
const FlightDateModel = require('../models/flightDate');
const router = express.Router();

// Endpoint to handle the search for airlines based on the provided destinations
// router.get('/destinations/:destination', async (req, res) => {
//   const { destination } = req.params;
//   try {
//     const airlines = await FlightModel.find({ destination });
//     res.json(airlines);
//   } catch (error) {
//     console.error('Error fetching airlines:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.get('/search', async (req, res) => {
  const { destination, travelDate, seats } = req.query;

  try {
    const airlines = await FlightModel.find({ destination });

    // Prepare an array to store results
    let results = [];

    for (let airlineName of airlines) {
      const flights = await FlightDateModel.find({ airline: airlineName, departureDate: seats });

      // Map and structure the data as needed
      const mappedFlights = flights.map(flight => ({
        id: flight.id,
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        boardingTime: flight.boardingTime,
        arrivalTime: flight.arrivalTime,
        // Include other relevant fields as needed
      }));

      // Push the mapped data into results array
      results.push({
        airline: {
          id: airline.id,
          airline: airline.airline,
          flightNumber: airline.flightNumber,
          destination: airline.destination,
          departureTime: airline.departureTime,
          arrivalTime: airline.arrivalTime,
          price: airline.price,
          seatsAvailable: airline.seatsAvailable,
        },
        flights: mappedFlights,
      });
    }

    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

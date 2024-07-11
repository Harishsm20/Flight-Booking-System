const express = require('express');
const FlightModel = require('../models/Flights');
const FlightDateModel = require('../models/flightDate');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { destination, travelDate, seats } = req.query;

  console.log(`${destination} , ${travelDate}, ${seats}`);

  try {
    const airlines = await FlightModel.find({ destination });
    console.log(airlines)

    let results = [];
    const keys = Object.keys(airlines.airline); // Get keys (airline names) from airline object

    // Iterate over each airline object in the array
    for (let airline of airlines) {
      
      // Iterate over each key to process the flights
      for (let key of keys) {
        console.log(key)
        const flights = await FlightDateModel.find({
          airline: key,
          departureDate: seats
        });

        // console.log(await FlightDateModel.find({departureDate : seats}));

        const mappedFlights = flights.map(flight => ({
          id: flight._id,
          airline: flight.airline,
          flightNumber: flight.flightNumber,
          boardingTime: flight.boardingTime,
          arrivalTime: flight.arrivalTime,
        }));
        // console.log(mappedFlights)

        // Push the mapped data into results array if seats are available
        
          results.push({
            airline: {
              id: airline._id,
              airline: key, // Use the key as the airline name
              flightNumber: airline.flightNumber,
              destination: airline.destination,
              departureTime: airline.departureTime,
              arrivalTime: airline.arrivalTime,
              price: airline.airline[key], // Use the value associated with the key
              seatsAvailable: airline.seatsAvailable,
            },
            flights: mappedFlights,
          });
        
      }
    }

    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

// const mongoose = require('mongoose');
// const flightSchema = new mongoose.Schema({
//   id : String,
//   destinations : String,
//   airline : Object
// })


// module.exports = FlightModel


const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  id : String,
  airline: Object,
  flightNumber: String,
  destination: String,
  departureTime: Date,
  arrivalTime: Date,
  price: Number,
  seatsAvailable: Number,
  airline : Object,
  seats: [{ seatNumber: String, isBooked: Boolean }],
});
const FlightModel = mongoose.model("flights",flightSchema);
module.exports = FlightModel

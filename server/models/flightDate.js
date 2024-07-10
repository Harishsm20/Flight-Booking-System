const mongoose = require('mongoose');
const flightDateSchema = new mongoose.Schema({
  id : String,
  airline : String,
  departureDate: String,
  flightNumber : String,
  boardingTime : String,
  arraivalTime : String,
  
})

const FlightDateModel = mongoose.model("flightDate",flightDateSchema);
module.exports = FlightDateModel
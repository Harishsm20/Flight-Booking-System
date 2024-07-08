const mongoose = require('mongoose');
const flightDateSchema = new mongoose.Schema({
  id : String,
  airline : String,
  flightNumber : String,
  boardingTime : String,
  arraivalTime : String,
  
})

const FlightDateModel = mongoose.model("flights",flightDateSchema);
module.exports = FlightDateModel
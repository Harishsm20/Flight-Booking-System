const mongoose = require('mongoose');
const flightSchema = new mongoose.Schema({
  id : String,
  destinations : String,
  airline : Object
})

const FlightModel = mongoose.model("flights",flightSchema);
module.exports = FlightModel
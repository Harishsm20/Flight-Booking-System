const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  travelClass: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  airline: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
  },
  travelDate: {
    type: Date,
    required: true,
  },
  noOfSeats: {
    type: Number,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model('SearchData', searchSchema);

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  seats: {
    type: Number,
    required: true,
  },
});

const BookingModel = mongoose.model('Booking', BookingSchema);
module.exports = BookingModel;
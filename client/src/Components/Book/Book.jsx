// book.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import './book.css';

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight } = location.state || {};

  const handleConfirmBooking = async () => {
    try {
      const response = await axios.post('http://localhost:3001/book/confirmBooking', {
        userId: 'USER_ID',  // Replace with actual user ID
        flightId: flight._id,
        seats: 1,  // Replace with the actual number of seats
      });
      console.log('Booking confirmed:', response.data);
      navigate('/confirmation');  // Redirect to a confirmation page
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  function calculateArrivalTime(boardingTime) {
    const [hours, minutes, periods] = boardingTime.split(/[: ]/);
    let date = new Date();
    date.setHours(periods === 'PM' ? parseInt(hours) + 12 : parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setHours(date.getHours() - 2);

    const newHours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const newPeriod = date.getHours() >= 12 ? 'PM' : 'AM';
    const newMinutes = date.getMinutes().toString().padStart(2, '0');

    return `${newHours}:${newMinutes} ${newPeriod}`;
  }

  if (!flight) {
    return <Typography variant="h6">No flight details available.</Typography>;
  }

  return (
<div className="book-container m-20 flex font-serif">
  <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: '20px' }} className="flex-1 w-max">
    <CardContent className="flex-1 bg-cyan-900 card bg-gradient-to-br from-[#008B8B] via-[#6D6FB5] to-[#B74D73]">
      <Typography variant="h4" component="h2" gutterBottom className="head text-[#FFE7D4] text-5xl font-bold">
        Flight Details
      </Typography>
      <Typography variant="body1">Flight Number: {flight.flightNumber}</Typography>
      <Typography variant="body1">Boarding Time: {flight.boardingTime}</Typography>
      <Typography variant="body1">Arrival Time: {calculateArrivalTime(flight.boardingTime)}</Typography>
      <Typography variant="body1">Departure Date: {flight.departureDate}</Typography>
    </CardContent>
    <Button variant="contained" color="primary" fullWidth onClick={handleConfirmBooking}>
      Confirm Booking
    </Button>
  </Card>
</div>

  );
};

export default Book;

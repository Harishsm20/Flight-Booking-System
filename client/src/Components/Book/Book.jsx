import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import './book.css';

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight } = location.state || {};
  let token = sessionStorage.getItem('accessToken');
  console.log(token)

  const handleConfirmBooking = async () => {
    try {
      const seat = flight.departureDate === 2 ? 2 : 1;
      const flightId = flight.id;
      const seats = seat;

      // Retrieve the token from session storage


      // Make the booking request
      let response = await axios.post(
        'http://localhost:3001/book/confirmBook',
        { flightId, seats },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log('Booking confirmed:', response.data);
      // navigate('/confirmation');
    } catch (error) {
      if (error.response.status === 403 && error.response.data.message === 'Invalid token') {
        // Refresh the token if expired
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post('http://localhost:3001/auth/token', { token: refreshToken });
            sessionStorage.setItem('accessToken', refreshResponse.data.accessToken);
            // Retry the booking request with the new token
            await handleConfirmBooking();
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            navigate('/login'); 
          }
        } else {
          navigate('/login');
        }
      } else {
        console.error('Error confirming booking:', error);
      }
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

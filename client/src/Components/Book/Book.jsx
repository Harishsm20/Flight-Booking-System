import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
// import '../../Book.css';

const Book = () => {
  const location = useLocation();
  const { flight } = location.state || {};

  function calculateArraivalTime(boardingTime){
    const [hours , minutes, periods] = boardingTime.split(/[: ]/);
    let date = new Date();
    date.setHours(periods === 'PM' ? parseInt(hourse)+12 : parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setHours(date.getHours() - 2);
    
    const newHours = date.getHours() > 12 ? date.getHours() -12 : date.getHours()
    const newPeriod = date.getHours() >= 12 ? "PM" : "AM"
    const newMinutes = date.getMinutes().toString().padStart(2, '0')

    return `${newHours}:${newMinutes}:${newPeriod}`
  }

  if (!flight) {
    return <Typography variant="h6">No flight details available.</Typography>;
  }

  return (
    
    <div className="book-container ">
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: '20px' }}>
        <CardContent className="bg-slate-900">
          <Typography variant="h5" component="h2" gutterBottom>
            Flight Details
          </Typography>
          <Typography variant="body1">Flight Number: {flight.flightNumber}</Typography>
          <Typography variant="body1">Boarding Time: {flight.boardingTime}</Typography>
          <Typography variant="body1">Arrival Time: {calculateArraivalTime(flight.boardingTime)}</Typography>
          <Typography variant="body1">Departure Date: {flight.departureDate}</Typography>
          {/* Add more details as needed */}
        </CardContent>
        <Button variant="contained" color="primary" fullWidth>
          Confirm Booking
        </Button>
      </Card>
    </div>
  );
};

export default Book;

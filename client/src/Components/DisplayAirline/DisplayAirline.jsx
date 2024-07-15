import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { CgAirplane } from 'react-icons/cg';
import Widget from '../Widget/Widget';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material';
import '../../DisplayAirline.css';

const DisplayAirline = () => {
  const { destination } = useParams();
  const location = useLocation();
  const { travelDate, seats } = location.state || {};

  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        console.log('Fetching airlines with:', { destination, travelDate, seats });
        const response = await axios.get(
          `http://localhost:3001/airlines/search`, {
            params: {
              destination: destination,
              travelDate: travelDate,
              seats: seats,
            }
          }
        );
        console.log('Response data:', response.data);
        setAirlines(response.data);
      } catch (error) {
        console.error('Error fetching airlines:', error);
      }
    };

    if (destination && travelDate && seats) {
      fetchAirlines();
    }
  }, [destination, travelDate, seats]);

  return (
    <div className="section section-lg section-hero section-shaped">
      <div className="shape shape-style-1 shape-primary">
        <span className="span-150"></span>
        <span className="span-50"></span>
        <span className="span-50"></span>
        <span className="span-75"></span>
        <span className="span-100"></span>
        <span className="span-75"></span>
        <span className="span-50"></span>
        <span className="span-100"></span>
        <span className="span-50"></span>
        <span className="span-100"></span>
      </div>
      <div className="container shape-container d-flex align-items-center py-lg">
        <div className="col px-0">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-12">
              <Typography
                variant="h4"
                component="h1"
                align="center"
                gutterBottom
                className="display-airline-heading"
              >
                Airlines for {destination}
              </Typography>
              <div className="airlines-grid">
                {airlines.length > 0 ? (
                  airlines.map((airline, index) => (
                    <div key={`${airline.airline.id}-${index}`} className="airline-card-container">
                      <Typography variant="h5" component="h2" align="center">
                        {airline.airline.airline}
                      </Typography>
                      <Card
                        sx={{
                          width: '100%',
                          borderRadius: '16px',
                          outline: '1px solid',
                          outlineColor: 'divider',
                          backgroundColor: 'background.default',
                          margin: '10px 0',
                        }}
                      >
                        <CardContent>
                          <Widget
                            icon={<CgAirplane className="h-7 w-7" />}
                            title={airline.airline.airline}
                            subtitle={`Price: ${airline.airline.price}`}
                          />
                          <Typography variant="body2" color="textSecondary">
                            Flight Number: {airline.airline.flightNumber || 'N/A'}
                          </Typography>
                          {airline.flights.map((flight, flightIndex) => (
                            <div key={`${flight.id}-${flightIndex}`}>
                              <Typography variant="body2" color="textSecondary">
                                Boarding Time: {flight.boardingTime || 'N/A'}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Arrival Time: {flight.arrivalTime || 'N/A'}
                              </Typography>
                            </div>
                          ))}
                        </CardContent>
                        <CardActions>
                          <Button variant="contained" color="primary" fullWidth>
                            Book
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  ))
                ) : (
                  <Typography variant="h6" component="p" align="center">
                    No flights available for the selected destination and date.
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAirline;

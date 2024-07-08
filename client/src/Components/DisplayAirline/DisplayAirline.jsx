import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CgAirplane } from 'react-icons/cg';
import Widget from '../Widget/Widget';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material'; // Importing Material-UI components
import '../../DisplayAirline.css'; // Custom CSS for additional styling

const DisplayAirline = () => {
  const { destination } = useParams();
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/airlines/destinations/${destination}`
        );
        setAirlines(response.data);
      } catch (error) {
        console.error('Error fetching airlines:', error);
      }
    };

    fetchAirlines();
  }, [destination]);

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
                {airlines.map((airline, index) => (
                  <Card
                    key={airline._id}
                    sx={{
                      maxWidth: { sm: '100%', md: '50%' },
                      flexGrow: 1,
                      outline: '1px solid',
                      outlineColor: 'divider',
                      backgroundColor: 'background.default',
                      margin: '10px',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {airline.destination}
                      </Typography>
                      <div className="widgets-grid">
                        {Object.entries(airline.airline).map(
                          ([key, value], i) => (
                            <Widget
                              key={i}
                              icon={<CgAirplane className="h-7 w-7" />}
                              title={key}
                              subtitle={value}
                            />
                          )
                        )}
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" color="primary">
                        Book
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAirline;

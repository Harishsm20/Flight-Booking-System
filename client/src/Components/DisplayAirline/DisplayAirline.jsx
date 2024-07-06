import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CgAirplane } from "react-icons/cg";
import Widget from "../Widget/Widget"; // Importing the Widget component
import '../../DisplayAirline.css'; // Custom CSS for additional styling

const DisplayAirline = () => {
  const { destination } = useParams();
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/airlines/destinations/${destination}`);
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
            <div className="col-lg-6 text-center">
              <h1 className="display-airline-heading" data-aos="fade-down">Airlines for {destination}</h1>
              <div className="airlines-list">
                {airlines.map((airline, index) => (
                  <div key={airline._id} className="airline-card" data-aos="fade-up">
                    <h3 className="airline-destination">{airline.destination}</h3>
                    {Object.entries(airline.airline).map(([key, value], i) => (
                      <Widget // Using the Widget component
                        key={i}
                        icon={<CgAirplane className="h-7 w-7" />} // Icon as airplane
                        title={key} // Title as airline key
                        subtitle={value} // Subtitle as airline value
                      />
                    ))}
                  </div>
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RxCalendar } from 'react-icons/rx';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Search = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    from: '',
    travelDate: '',
    noOfSeats: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    
 
    if (name === 'travelDate') {
      const [year, month, day] = value.split('-').map(Number); 
      const parsedDate = new Date(year, month - 1, day); 
  
      // Check if the day component is even
      const seats = day % 2 === 0 ? 2 : 1;
      console.log(seats);
  
      setSearchData((prevState) => ({ ...prevState, noOfSeats: seats, travelDate: newValue }));
    } else {
      setSearchData((prevState) => ({ ...prevState, [name]: newValue }));
    }
  };

  // Update the submitSearch function to navigate to the correct route

  const submitSearch = async () => {
    try {
      if (!searchData.destination || !searchData.travelDate) {
        console.error('Destination and travel date are required');
        return;
      }
  
      const response = await axios.get('http://localhost:3001/airlines/search', {
        params: {
          destination: searchData.destination,
          travelDate: searchData.travelDate,
          seats: searchData.noOfSeats,
        },
      });
  
      const { flights, seats } = response.data;
      console.log('Flights:', flights);
      console.log('Seats:', seats);
  
      // Navigate to the destination page with flights and seats information
      navigate(`/destinations/${encodeURIComponent(searchData.destination)}`);    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);

  return (
    <div className="search container section">
      <div className="sectionContainer grid" data-aos="fade-up" data-aos-duration="2500">
        <div className="searchInputs flex">
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>From</h4>
              <input type="text" name="from" value={searchData.from} onChange={handleChange} placeholder="From" />
            </div>
          </div>
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Destination</h4>
              <select name="destination" value={searchData.destination} onChange={handleChange}>
                <option value="">Select Destination</option>
                <option value="Thailand">Thailand</option>
                <option value="UK">UK</option>
                <option value="Japan">Japan</option>
                <option value="Germany">Germany</option>
                {/* Add more destination options as needed */}
              </select>
            </div>
          </div>
          <div className="singleInput flex">
            <div className="iconDiv">
              <RxCalendar className="icon" />
            </div>
            <div className="texts">
              <h4>Travel Date</h4>
              <input type="date" name="travelDate" value={searchData.travelDate} onChange={handleChange} />
            </div>
          </div>
          <div className="singleInput flex">
            <div className="iconDiv"></div>
            <div className="texts">
              <h4>Number of Seats</h4>
              <input type="number" name="noOfSeats" value={searchData.noOfSeats} onChange={handleChange} min="1" />
            </div>
          </div>
        </div>
        <button className="btn btnBlock flex" onClick={submitSearch}>
          Search Flights
        </button>
      </div>
    </div>
  );
};

export default Search;

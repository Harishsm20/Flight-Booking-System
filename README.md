# Flight Booking Website

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Overview

This project is a flight booking website where users can search for flights, view available options, and book tickets. The website features a responsive design, providing a seamless experience across devices.

## Features

- Search for flights by destination, travel date, and number of seats
- View detailed information about available flights
- Book flights and see detailed ticket structure
- User authentication (login, register)
- Backend integration with MongoDB for data storage

## Tech Stack

- **Frontend:**
  - React.js
  - Material UI
  - React Router

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/flight-booking-website.git
   cd flight-booking-website
    ```
2. **Install frontend dependencies:**
   ``` bash
   cd client
   npm install
   ```
3. **Install backend dependencies:**
   ```bash
   cd ../server
   npm install
   ```
4. **Set up environment variables:**
   Create a .env file in the server directory and add your MongoDB connection string:
   ```bash
     MONGODB_URI=your_mongodb_connection_string
   ```
5. **Start the development servers:**
   1. **Front End:**
      ```bash
      cd client
      npm run dev
      ```
   2. **Back End:**
      ```bash
      cd server
      node server
      ```
6. Open your browser and navigate to http://localhost:3000 to see the application in action.

## Usage
1. Search Flights:
- On the homepage, fill in the 'FROM,' 'Destination,' 'Travel Date,' and 'No of seats' fields.
- Click the 'Search' button to view available flights.
  
2. View Flight Details:
- Browse through the list of available flights for the selected destination and date.
- Click the 'Book' button next to a flight to see the detailed ticket structure.

3. Book a Flight:
- On the detailed ticket structure page, review the flight details.
- Click 'Confirm Booking' to book the flight.

## Project Structure
```
flight-booking-website/
│
├── client/                  # Frontend code
│   ├── public/              # Public assets
│   ├── src/                 # React components and logic
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.js           # Main App component
│   │   ├── index.js         # Entry point for React
│   │   └── ...              # Other files
│   └── package.json         # Frontend dependencies
│
├── server/                  # Backend code
│   ├── controllers/         # API controllers
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   ├── app.js               # Express app setup
│   ├── server.js            # Entry point for backend
│   └── ...                  # Other files
│
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
└── package.json             # Backend dependencies

```


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const authController = require('./controllers/authController'); // Import auth controller
const flightController = require('./controllers/flightController'); // Import flight controller


const PORT = 3001;

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://Harish:IpcoahXz8yD2IibT@cluster0.p3yw9uj.mongodb.net/employee', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connect();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

// Use controllers for routing
app.use('/auth', authController); // Use authController for /auth routes
app.use('/airlines', flightController); // Use flightController for /flights routes

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
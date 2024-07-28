const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const authController = require('./controllers/authController'); 
const flightController = require('./controllers/flightController');
const bookController = require('./controllers/bookingController');

const session = require('express-session'); 

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

app.use(session({
  secret: 'placeholder_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Use controllers for routing
app.use('/auth', authController); 
app.use('/airlines', flightController); 
app.use('./book',bookController);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
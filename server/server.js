const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const session = require('express-session');

const authController = require('./controllers/authController');
const flightController = require('./controllers/flightController');
const bookController = require('./controllers/bookingController');

const app = express();
const PORT = 3001;

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.User}:${process.env.pswd}@cluster0.p3yw9uj.mongodb.net/${process.env.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connect();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

// Use controllers for routing
app.use('/auth', authController);
app.use('/airlines', flightController);
app.use('/book', bookController);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

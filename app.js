// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const authRoutes = require('./api/auth');
const productRoutes = require('./api/products');
const userRoutes = require('./api/users');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});

// Export the express app as a serverless function for Vercel
module.exports = app;

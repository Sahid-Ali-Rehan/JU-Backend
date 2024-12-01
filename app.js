const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
require('dotenv').config();

dotenv.config();
connectDB();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});



module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// Connect to database (Disabled for DB-Free Deployment)
// connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', require('./routes/contactRoute'));
app.use('/api/portfolio', require('./routes/portfolioRoute'));

app.get('/', (req, res) => {
    res.send({ message: 'API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export for Vercel Serverless deployment
module.exports = app;

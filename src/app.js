const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const errorHandler = require('./utils/errorHandler');
const userRoutes = require('./routes/userRoutes'); // Assuming you have user routes defined

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    logger.info('Connected to MongoDB');
})
.catch((error) => {
    logger.error('Could not connect to MongoDB:', error.message);
});

// Define routes
app.use('/api/users', userRoutes); // Mount user routes

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app for testing purposes

import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { info, error as _error } from './utils/logger.js';
import errorHandler from './utils/errorHandler.js';
import userRoutes from './routes/userRoutes.js'; // Assuming you have user routes defined

// Load environment variables from .env file
config();

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON requests
app.use(json());

// Connect to MongoDB
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    info('Connected to MongoDB');
})
.catch((error) => {
    _error('Could not connect to MongoDB:', error.message);
});

// Define routes
app.use('/api/users', userRoutes); // Mount user routes

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
    info(`Server is running on port ${PORT}`);
});

export default app; // Export the app for testing purposes

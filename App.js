const express = require('express'); // Import Express.js for building the server
const mongoose = require('mongoose'); // Import Mongoose for MongoDB connection and schema management
const cors = require('cors'); // Import CORS middleware to handle cross-origin requests
const dotenv = require('dotenv'); // Import dotenv to manage environment variables
const authRoutes = require('./routes/authRoutes'); // Import authentication routes

dotenv.config(); // Load environment variables from the .env file

const app = express(); // Initialize the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Middleware to enable CORS for cross-origin requests

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_system', {
    useNewUrlParser: true, // Use the new URL parser for MongoDB connection
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine
})
.then(() => console.log('Connected to MongoDB')) // Log success message if connection is successful
.catch((error) => console.error('MongoDB connection error:', error)); // Log error if connection fails

app.use('/api', authRoutes); // Mount authentication routes under the '/api' path

// Handle undefined routes with a 404 error response
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log the port the server is running on
    console.log(`Access the API at: http://localhost:${PORT}`); // Log the API base URL
});
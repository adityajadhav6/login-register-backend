const express = require('express'); // Import Express.js for routing
const { register, login, getProfile } = require('../controllers/authController'); // Import controller functions for authentication
const authenticateToken = require('../middleware/authMiddleware'); // Import middleware to authenticate JWT tokens

const router = express.Router(); // Create a new router instance

// Route for user registration
router.post('/register', register); // Maps POST requests to '/register' to the register controller

// Route for user login
router.post('/login', login); // Maps POST requests to '/login' to the login controller

// Route for retrieving the authenticated user's profile
router.get('/profile', authenticateToken, getProfile); // Maps GET requests to '/profile' to the getProfile controller, protected by the authenticateToken middleware

module.exports = router; // Export the router to be used in the main application
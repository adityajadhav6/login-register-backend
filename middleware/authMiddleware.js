const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for token verification
const User = require('../models/User'); // Import the User model for database operations

// Middleware to authenticate the JWT token
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']; // Extract the Authorization header
        const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header

        // If no token is provided, return an error
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access token required' });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

        // Find the user by ID in the database
        const user = await User.findById(decoded.userId).select('-password'); // Exclude the password field

        // If the user does not exist, return an error
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

module.exports = authenticateToken; // Export the middleware
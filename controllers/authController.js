const User = require('../models/User'); // Import the User model for database operations
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for token generation

// Function to generate a JWT token for a user
const generateToken = (userId) => {
    return jwt.sign(
        { userId }, // Payload: includes the user's ID
        process.env.JWT_SECRET || 'fallback_secret_key', // Secret key for signing the token
        { expiresIn: '7d' } // Token expiration time (7 days)
    );
};

// Controller for user registration
exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body; // Extract user details from the request body

        // Validate that all required fields are provided
        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User with this email already exists' });
        }

        // Create a new user instance and save it to the database
        const user = new User({ fullName, email, password });
        await user.save();

        // Generate a JWT token for the newly registered user
        const token = generateToken(user._id);

        // Send a success response with the user details and token
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { user: { id: user._id, fullName: user.fullName, email: user.email, createdAt: user.createdAt }, token }
        });
    } catch (error) {
        console.error('Error during registration:', error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal server error during registration' });
    }
};

// Controller for user login
exports.login = async (req, res) => {
    try {
        const { email, password, fullName } = req.body; // Extract login details from the request body

        // Validate that all required fields are provided
        if (!email || !password || !fullName) {
            return res.status(400).json({ success: false, message: 'Email, password, and full name are required' });
        }

        // Find the user by email in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email' });
        }

        // Check if the full name matches the stored full name
        if (user.fullName !== fullName) {
            return res.status(401).json({ success: false, message: 'Invalid full name' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Generate a JWT token for the authenticated user
        const token = generateToken(user._id);

        // Send a success response with the user details and token
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    createdAt: user.createdAt
                },
                token
            }
        });
    } catch (error) {
        console.error('Error during login:', error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal server error during login' });
    }
};

// Controller for retrieving the authenticated user's profile
exports.getProfile = async (req, res) => {
    res.json({
        success: true,
        message: 'Profile retrieved successfully',
        data: { user: req.user } // The user object is attached to the request by the authentication middleware
    });
};
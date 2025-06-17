const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '7d' });
};

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User with this email already exists' });
        }

        const user = new User({ fullName, email, password });
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { user: { id: user._id, fullName: user.fullName, email: user.email, createdAt: user.createdAt }, token }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error during registration' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: { user: { id: user._id, fullName: user.fullName, email: user.email, createdAt: user.createdAt }, token }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error during login' });
    }
};

exports.getProfile = async (req, res) => {
    res.json({
        success: true,
        message: 'Profile retrieved successfully',
        data: { user: req.user }
    });
};
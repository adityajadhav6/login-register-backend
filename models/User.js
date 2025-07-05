const mongoose = require('mongoose'); // Import Mongoose for database operations
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Define the User schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'], // Validation: Full name is required
        trim: true, // Remove whitespace from the beginning and end
        minlength: [2, 'Full name must be at least 2 characters long'] // Validation: Minimum length
    },
    email: {
        type: String,
        required: [true, 'Email is required'], // Validation: Email is required
        unique: true, // Ensure email is unique
        lowercase: true, // Convert email to lowercase
        trim: true, // Remove whitespace
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] // Validation: Email format
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // Validation: Password is required
        minlength: [6, 'Password must be at least 6 characters long'] // Validation: Minimum length
    }
}, {
    timestamps: true // Automatically add `createdAt` and `updatedAt` fields
});

// Pre-save middleware to hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
    const salt = await bcrypt.genSalt(12); // Generate a salt with 12 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password using the salt
    next(); // Proceed to save the user
});

// Method to compare a candidate password with the hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Return true if passwords match
};

module.exports = mongoose.model('User', userSchema); // Export the User model
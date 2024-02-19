// services/authService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * Registers a new user with hashed password.
 * @param {object} userData Object containing new user data.
 * @returns {Promise<object>} The saved user object without the password.
 */
const registerUser = async (userData) => {
    const { username, email, password } = userData;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new Error('User already exists with the given username or email.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Return the saved user without the password field
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    return userWithoutPassword;
};

/**
 * Authenticates a user by comparing the provided password with the stored hash.
 * @param {string} usernameOrEmail Username or email of the user trying to log in.
 * @param {string} password The password provided by the user.
 * @returns {Promise<object>} The authenticated user object without the password.
 */
const authenticateUser = async (usernameOrEmail, password) => {
    // Find the user by username or email
    const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    }).select('+password'); // Explicitly select the password field for comparison

    if (!user) {
        throw new Error('User not found.');
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password.');
    }

    // Return the user without the password field
    const { password: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};

module.exports = {
    registerUser,
    authenticateUser,
};

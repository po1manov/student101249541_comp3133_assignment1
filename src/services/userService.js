const User = require('../models/User');

/**
 * Fetches a user by their ID.
 * @param {string} userId The ID of the user to fetch.
 * @returns {Promise<object>} The user object.
 */
const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

/**
 * Updates a user's information.
 * @param {string} userId The ID of the user to update.
 * @param {object} userData The updated user data.
 * @returns {Promise<object>} The updated user object.
 */
const updateUser = async (userId, userData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};

/**
 * Deletes a user account.
 * @param {string} userId The ID of the user to delete.
 * @returns {Promise<object>} A success message.
 */
const deleteUser = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found.');
        }
        return { success: true, message: 'User deleted successfully.' };
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};

module.exports = {
    getUserById,
    updateUser,
    deleteUser,
};

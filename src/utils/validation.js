// utils/validation.js

/**
 * Validates email format.
 * @param {string} email The email to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
    const regex = /.+\@.+\..+/;
    return regex.test(email);
};

/**
 * Validates that a string is not empty and meets a minimum length requirement.
 * @param {string} str The string to validate.
 * @param {number} minLength The minimum length of the string.
 * @returns {boolean} True if the string meets the requirements, false otherwise.
 */
const validateString = (str, minLength = 1) => {
    return typeof str === 'string' && str.trim().length >= minLength;
};

/**
 * Validates a password. This is a simple example; you might want to include checks for complexity.
 * @param {string} password The password to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
const validatePassword = (password) => {
    return validateString(password, 6); // Example: a valid password must be at least 6 characters long
};

/**
 * Validates a salary to ensure it is a number and non-negative.
 * @param {number} salary The salary to validate.
 * @returns {boolean} True if the salary is valid, false otherwise.
 */
const validateSalary = (salary) => {
    return typeof salary === 'number' && salary >= 0;
};

/**
 * Validates gender to ensure it is one of the specified valid options.
 * @param {string} gender The gender to validate.
 * @returns {boolean} True if the gender is valid, false otherwise.
 */
const validateGender = (gender) => {
    const validGenders = ['Male', 'Female', 'Other'];
    return validGenders.includes(gender);
};

module.exports = {
    validateEmail,
    validateString,
    validatePassword,
    validateSalary,
    validateGender,
};
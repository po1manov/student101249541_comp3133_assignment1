const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema. The _id field is automatically added by Mongoose.
const userSchema = new mongoose.Schema({
    // Define username with type, required constraint, and uniqueness.
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Trims whitespace from the username
    },
    // Define email with type, required constraint, uniqueness, and a pattern to validate email addresses.
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Converts the email to lowercase before saving to the database
        match: [/.+\@.+\..+/, 'Please enter a valid email address'], // Validates the email format
    },
    // Define password with type and required constraint.
    password: {
        type: String,
        required: true,
        minlength: 6, // Ensures the password is at least 6 characters long
        select: false, // Ensures the password is not returned in any query unless explicitly requested
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

// Pre-save hook to hash the password before saving the user document to the database.
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) return next();

    // Generate a salt and use it to hash the user's password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Instance method to check if the provided password matches the stored hash.
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model from the schema to interact with the database.
const User = mongoose.model('User', userSchema);

module.exports = User;

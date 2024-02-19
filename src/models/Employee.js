const mongoose = require('mongoose');

// Define the Employee schema with fields according to your requirements
const employeeSchema = new mongoose.Schema({
    // The _id field is automatically managed by Mongoose, so it's not explicitly defined here

    // Define first_name as a required string
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },

    // Define last_name as a required string
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },

    // Define email as a string that must be unique
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true, // Convert email to lowercase
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Regex to validate the email address
    },

    // Define gender with an enum to ensure the value is one of the specified options
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: '{VALUE} is not supported',
        },
    },

    // Define salary as a number with required constraint
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        validate: {
            validator: function(v) {
                return v >= 0;
            },
            message: props => `${props.value} is not a valid salary amount. Salary must be non-negative.`,
        },
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

// Create the Employee model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

const User = require('../models/User');
const Employee = require('../models/Employee');

const queryResolvers = {
    // Resolver function for the 'login' operation
    // This example assumes that you have a separate authentication service to handle login logic
    login: async (_, { username, password }) => {
        // Placeholder for the authentication logic
        // You would replace this with your actual authentication logic
        const user = await User.findOne({ $or: [{ username }, { email: username }] }).select('+password');
        if (!user) {
            throw new Error('User not found');
        }

        const valid = await user.comparePassword(password);
        if (!valid) {
            throw new Error('Invalid password');
        }

        // Return some kind of authentication token or user object
        // In this example, we are simply returning the user details without a token
        return { user }; // Modify this part according to your authentication logic
    },

    // Resolver function to get all employees
    employees: async () => {
        try {
            const employees = await Employee.find({});
            return employees;
        } catch (error) {
            throw new Error(`Fetching employees failed: ${error.message}`);
        }
    },

    // Resolver function to get an employee by ID (eid)
    employee: async (_, { eid }) => {
        try {
            const employee = await Employee.findById(eid);
            if (!employee) {
                throw new Error(`Employee with id ${eid} not found`);
            }
            return employee;
        } catch (error) {
            throw new Error(`Fetching employee failed: ${error.message}`);
        }
    }
};

module.exports = queryResolvers;
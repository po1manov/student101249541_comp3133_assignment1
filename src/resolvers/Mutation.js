const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

const mutationResolvers = {
    // Mutation to handle user signup
    signup: async (_, { username, email, password }) => {
        try {
            // Check if the user already exists
            const userExists = await User.findOne({ $or: [{ username }, { email }] });
            if (userExists) {
                throw new Error('Username or email already exists');
            }

            // Create a new user with the hashed password
            const newUser = new User({
                username,
                email,
                password,
            });

            // Save the user to the database
            const savedUser = await newUser.save();

            // Normally, you would create a token and return it, but for simplicity, we'll return the user object
            return {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            };
        } catch (error) {
            throw new Error(`Signup failed: ${error.message}`);
        }
    },

    // Mutation to add a new employee
    addNewEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
        try {
            // Check if the employee already exists by email
            const employeeExists = await Employee.findOne({ email });
            if (employeeExists) {
                throw new Error('An employee with this email already exists');
            }

            // Create a new employee
            const newEmployee = new Employee({
                first_name,
                last_name,
                email,
                gender,
                salary,
            });

            // Save the employee to the database
            const savedEmployee = await newEmployee.save();

            return savedEmployee;
        } catch (error) {
            throw new Error(`Adding new employee failed: ${error.message}`);
        }
    },

    // Mutation to update an existing employee
    updateEmployee: async (_, { eid, first_name, last_name, email, gender, salary }) => {
        try {
            // Find the employee by id
            const employee = await Employee.findById(eid);
            if (!employee) {
                throw new Error(`Employee with id ${eid} not found`);
            }

            // Update the employee fields if provided
            employee.first_name = first_name || employee.first_name;
            employee.last_name = last_name || employee.last_name;
            employee.email = email || employee.email;
            employee.gender = gender || employee.gender;
            employee.salary = salary || employee.salary;

            // Save the updates to the database
            const updatedEmployee = await employee.save();

            return updatedEmployee;
        } catch (error) {
            throw new Error(`Updating employee failed: ${error.message}`);
        }
    },

    // Mutation to delete an employee
    deleteEmployee: async (_, { eid }) => {
        try {
            const deletedEmployee = await Employee.findByIdAndDelete(eid);
            if (!deletedEmployee) {
                throw new Error(`Employee with id ${eid} not found`);
            }

            // Return success message
            return {
                success: true,
                message: `Employee with id ${eid} was deleted successfully`,
            };
        } catch (error) {
            throw new Error(`Deleting employee failed: ${error.message}`);
        }
    },
};

module.exports = mutationResolvers;

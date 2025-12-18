const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to create a new user
const createUser = async (userData) => {
    const { username, email, password } = userData;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    return newUser;
};

// Function to find a user by email
const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Function to authenticate a user
const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};

// Function to update user details
const updateUser = async (userId, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
        throw new Error('User not found');
    }
    return updatedUser;
};

// Function to delete a user
const deleteUser = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new Error('User not found');
    }
    return deletedUser;
};

module.exports = {
    createUser,
    findUserByEmail,
    authenticateUser,
    updateUser,
    deleteUser,
};
import User from '../models/userModel.js';

import bcryptPkg from 'bcryptjs';
const { hash, compare } = bcryptPkg;

import pkg from 'jsonwebtoken';
const { sign } = pkg;

// Function to create a new user
const createUser = async (userData) => {
    const { username, email, password } = userData;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    // Hash the password before saving
    const hashedPassword = await hash(password, 10);

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
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    // Generate JWT token (example, adjust secret and options as needed)
    const token = sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { user, token };
};

export { createUser, findUserByEmail, authenticateUser };
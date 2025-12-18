const userService = require('../services/userService');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

jest.mock('../models/userModel');

describe('User Service', () => {
    describe('createUser', () => {
        it('should create a new user', async () => {
            User.findOne.mockResolvedValue(null); // No existing user
            User.prototype.save = jest.fn().mockResolvedValue({}); // Mock save method

            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            };

            const newUser = await userService.createUser(userData);
            expect(newUser).toBeDefined();
            expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
        });

        it('should throw an error if the user already exists', async () => {
            User.findOne.mockResolvedValue({}); // Mock existing user

            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            };

            await expect(userService.createUser(userData)).rejects.toThrow('User already exists with this email');
        });
    });

    // Additional tests for findUserByEmail, authenticateUser, etc.
});

const request = require('supertest');
const { app } = require('../config/server');
const userService = require('../services/userService');

jest.mock('../services/userService');

describe('User Controller', () => {
    describe('POST /register', () => {
        it('should register a user successfully', async () => {
            userService.createUser.mockResolvedValue({
                username: 'testuser',
                email: 'test@example.com',
            });

            const response = await request(app).post('/register').send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User created successfully');
        });

        it('should return an error if user already exists', async () => {
            userService.createUser.mockRejectedValue(new Error('User already exists'));

            const response = await request(app).post('/register').send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists');
        });
    });

    describe('POST /login', () => {
        it('should login a user successfully', async () => {
            userService.authenticateUser.mockResolvedValue({
                user: { username: 'testuser', email: 'test@example.com' },
                token: 'sampletoken',
            });

            const response = await request(app).post('/login').send({
                email: 'test@example.com',
                password: 'password123',
            });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.token).toBeDefined();
        });

        it('should return an error for invalid credentials', async () => {
            userService.authenticateUser.mockRejectedValue(new Error('Invalid email or password'));

            const response = await request(app).post('/login').send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid email or password');
        });
    });
});
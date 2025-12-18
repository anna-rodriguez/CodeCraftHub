import request from 'supertest';
import initServer from '../config/server.js';
import { createUser } from '../services/userService.js';

jest.mock('../services/userService');

const app = initServer();  // Initialize app here

describe('User Controller', () => {
    describe('POST /register', () => {
        it('should register a user successfully', async () => {
            createUser.mockResolvedValue({
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
            createUser.mockRejectedValue(new Error('User already exists'));

            const response = await request(app).post('/register').send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('User already exists');
        });
    });
});
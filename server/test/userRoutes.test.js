import request from 'supertest';
import app from '../app'; // Adjust the path according to your project structure
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// Mock User model methods if necessary

beforeAll(async () => {
    await mongoose.connect("mongodb+srv://aman:aman@cluster0.upajlbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User API Endpoints', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({
            userName: 'testUser',
            email: 'test@example.com',
            password: 'password123',
        });
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    test('POST /register should create a new user', async () => {
        const response = await request(app)
            .post('/api/v1/register')
            .send({
                userName: 'newUser',
                email: 'new@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toMatch(/Account created successfully/);
    });

    // Additional tests...
});

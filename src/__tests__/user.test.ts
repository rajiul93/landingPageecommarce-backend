import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { connectDB } from '../app/database';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/users', () => {
  it('should return success on user creation', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@mail.com`,
        password: '12345678',
        phone: '0123456789',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});

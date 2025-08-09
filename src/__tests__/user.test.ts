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


// describe('POST /api/users/all-user', () => {
//   let adminToken: string;

//   beforeAll(() => {
//     // টেস্টে আগে থেকে একটা অ্যাডমিন টোকেন জেনারেট বা মক করা উচিত
//     adminToken = generateAdminToken(); // তোমার টোকেন জেনারেটর ফাংশন
//   });

//   it('should allow admin to get all users', async () => {
//     const res = await request(app)
//       .post('/api/users/all-user')
//       .set('Cookie', `accessToken=${adminToken}`)  // cookie দিয়ে auth পাঠানো হচ্ছে
//       .send()
//       .expect(201);

//     expect(res.body).toMatchObject({
//       statusCode: 201,
//       success: true,
//       message: 'Get all user successfully!',
//     });

//     // data অবশ্যই Array হবে এবং প্রথম এলিমেন্টে অবজেক্ট থাকবে
//     expect(Array.isArray(res.body.data)).toBe(true);
//     expect(res.body.data.length).toBeGreaterThan(0);
//     expect(res.body.data[0]).toMatchObject({
//       _id: expect.any(String),
//       name: expect.any(String),
//       email: expect.any(String),
//       phone: expect.any(String),
//       userDetails: expect.any(String),
//     });
//   });
// });

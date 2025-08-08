// import mongoose from 'mongoose';
// import request from 'supertest';
// import app from '../app';
// import { connectDB } from '../app/database';
// import { Category } from '../app/modules/category/category.model';
// import { generateAdminToken } from '../app/utils/fakeTokenForTest';

// let adminToken: string;

// beforeAll(async () => {
//   await connectDB();

//   // এখানে তোমার admin JWT token generate বা mock করো
//   adminToken =generateAdminToken();
// });

// beforeEach(async () => {
//   await Category.deleteMany({});
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe('Category API', () => {
//   it('should create category and respond with success and empty data array', async () => {
//     const inputData = {
//       categories: [
//         { title: 'Electronics', value: 'electronics' },
//         { title: 'Books', value: 'books' },
//       ],
//     };

//     const res = await request(app)
//       .post('/api/categories')
//       .set('Cookie', `accessToken=${adminToken}`)  // <-- cookie সেট করা হয়েছে
//       .send(inputData)
//       .expect(201);

//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toBe('Category created successfully');
//     expect(Array.isArray(res.body.data)).toBe(true);
//     expect(res.body.data.length).toBe(0);
//   }, 15000);
// });

// // src/__tests__/loginAdmin.test.ts
// import mongoose from 'mongoose';
// import request from 'supertest';
// import app from '../app';
// import { connectDB } from '../app/database';


// beforeAll(async () => {
//   await connectDB();
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe('POST /api/auth/login-admin', () => {


//   it('should login admin and set cookie', async () => {
//     const res = await request(app)
//       .post('/api/auth/login-admin')
//       .send({
//         email: 'admin.test@gmai.com',
//         password: 'password123',
//       })
//       .expect(200);

//     expect(res.body).toMatchObject({
//       statusCode: 200,
//       success: true,
//       message: 'User logged in successfully!',
//       data: {
//         id: expect.any(String),
//         name: expect.any(String),
//         role: 'admin',
//         toke:expect.any(String)
//       },
//     }); 
//   });
// });


// describe('POST /api/auth/login', () => { 
//   it('should login user and set cookie', async () => {
//     const res = await request(app)
//       .post('/api/auth/login')
//       .send({
//         email: 'admin.test@gmai.com',
//         password: 'password123',
//       })
//       .expect(200);

//     expect(res.body).toMatchObject({
//       statusCode: 200,
//       success: true,
//       message: 'User logged in successfully!',
//       data: {
//         id: expect.any(String),
//         name: expect.any(String),
//         role: 'admin',
//         token: expect.any(String)
//       },
//     }); 
//   });
// });



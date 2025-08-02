import request from 'supertest';
import app from '../app';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('E-commerce backend running!');
  });
});

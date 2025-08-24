import request from 'supertest';
import app from '../../server.js'; // your Express app
import { readJSON, writeJSON } from '../../engine/Agents/RWJ.js';

// Mock readJSON/writeJSON for isolated tests
jest.mock('../../engine/Agents/RWJ.js');

describe('Auth Routes', () => {
  beforeEach(() => {
    writeJSON.mockClear();
    readJSON.mockClear();
  });

  test('POST /register-buyer - should create a buyer', async () => {
    const fakeBuyers = [];
    readJSON.mockResolvedValue(fakeBuyers);

    const userData = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      password: 'pass123',
      userType: 'buyer'
    };

    const response = await request(app)
      .post('/auth/register-buyer')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(userData.email);
    expect(writeJSON).toHaveBeenCalled();
  });

  test('POST /register-seller - should create a seller', async () => {
    const fakeSellers = [];
    readJSON.mockResolvedValue(fakeSellers);

    const userData = {
      firstname: 'Alice',
      lastname: 'Smith',
      email: 'alice@example.com',
      password: 'pass123',
      userType: 'seller'
    };

    const response = await request(app)
      .post('/auth/register-seller')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(userData.email);
    expect(writeJSON).toHaveBeenCalled();
  });

  test('GET /auth/:id - should return user if authenticated', async () => {
    const fakeUser = { userId: '123', email: 'test@example.com' };
    readJSON.mockResolvedValue([fakeUser]);

    const response = await request(app).get('/auth/123');

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe('123');
  });
});

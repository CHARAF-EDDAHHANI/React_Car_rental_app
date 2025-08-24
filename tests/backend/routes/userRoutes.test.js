import request from 'supertest';
import app from '../../server.js';
import { readJSON, writeJSON } from '../../engine/Agents/RWJ.js';

jest.mock('../../engine/Agents/RWJ.js');

describe('User Routes', () => {
  beforeEach(() => {
    writeJSON.mockClear();
    readJSON.mockClear();
  });

  const fakeUsers = [
    { userId: '1', email: 'user1@test.com', userType: 'buyer', firstname: 'User', lastname: 'One' }
  ];

  test('GET /users - should return all users', async () => {
    readJSON.mockResolvedValue(fakeUsers);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeUsers);
  });

  test('GET /users/:id - should return a single user', async () => {
    readJSON.mockResolvedValue(fakeUsers);

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe('1');
  });

  test('POST /users - should create a new user', async () => {
    readJSON.mockResolvedValue([]);
    const newUser = { firstname: 'New', lastname: 'User', email: 'new@test.com', password: '123', userType: 'buyer' };

    const response = await request(app).post('/users').send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(newUser.email);
    expect(writeJSON).toHaveBeenCalled();
  });

  test('PUT /users/:id - should update a user', async () => {
    readJSON.mockResolvedValue(fakeUsers);
    const updates = { firstname: 'Updated' };

    const response = await request(app).put('/users/1').send(updates);

    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe('Updated');
    expect(writeJSON).toHaveBeenCalled();
  });

  test('DELETE /users/:id - should delete a user', async () => {
    readJSON.mockResolvedValue(fakeUsers);

    const response = await request(app).delete('/users/1');

    expect(response.status).toBe(200);
    expect(writeJSON).toHaveBeenCalled();
  });

  test('POST /login - should login user', async () => {
    readJSON.mockResolvedValue(fakeUsers);
    const credentials = { email: 'user1@test.com', password: '123' };

    const response = await request(app).post('/login').send(credentials);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('user1@test.com');
  });

  test('POST /logout - should logout user', async () => {
    const response = await request(app).post('/logout');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged out');
  });
});

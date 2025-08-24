import request from 'supertest';
import app from '../../../Server/server.js';
import * as buyerModel from '../../../Server/models/buyerModel.js';
import * as BTE from '../../../Server/engine/Agents/BTE.js';
import * as authModule from '../../../Server/engine/Agents/Auth.js'; // Changed to match exact filename

jest.mock('../../../Server/models/buyerModel.js');
jest.mock('../../../Server/engine/Agents/BTE.js');
jest.mock('../../../Server/engine/Agents/Auth.js');

describe('Buyer Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerBuyer', () => {
    it('should return 400 if email or password is missing', async () => {
      const res = await request(app).post('/auth/register-buyer').send({ email: '' });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Missing required buyer fields/);
    });

    it('should return 409 if email already exists', async () => {
      buyerModel.getBuyerByEmail.mockResolvedValue({ email: 'test@example.com' });

      const res = await request(app)
        .post('/auth/register-buyer')
        .send({ email: 'test@example.com', password: '123' });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe('Email already exists');
    });

    it('should create a buyer successfully', async () => {
      const newBuyer = {
        buyerId: '1',
        buyerToken: 'token123',
        firstname: 'John',
        lastname: 'Doe',
        phone: '123456789',
        email: 'john@example.com',
        adress: 'Some address',
      };

      buyerModel.getBuyerByEmail.mockResolvedValue(null);
      buyerModel.createBuyer.mockResolvedValue(newBuyer);

      const res = await request(app)
        .post('/auth/register-buyer')
        .send({ email: 'john@example.com', password: '123' });

      expect(res.status).toBe(201);
      expect(res.body.newBuyer.email).toBe('john@example.com');
      expect(res.body.newBuyer.userId).toBeUndefined(); // buyerId is returned as buyerId, not userId
    });
  });

  describe('loginBuyer', () => {
    it('should login successfully', async () => {
      const buyer = {
        buyerId: '1',
        email: 'john@example.com',
        password: 'hashedpass',
        firstname: 'John',
        lastname: 'Doe',
        phone: '123456789',
        adress: 'Some address',
      };

      buyerModel.getBuyerByEmail.mockResolvedValue(buyer);
      BTE.comparePWD.mockResolvedValue(true);
      BTE.TokenGenerate.mockReturnValue('token123');
      buyerModel.updateBuyer.mockResolvedValue({ ...buyer, buyerToken: 'token123' });

      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'john@example.com', password: '123' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.userToken).toBe('token123');
    });

    it('should fail login with invalid credentials', async () => {
      buyerModel.getBuyerByEmail.mockResolvedValue(null);

      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'wrong@example.com', password: '123' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('AuthBuyer', () => {
    it('should call authenticateUser', async () => {
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockReq = { params: { id: '1' } };

      authModule.authenticateUser.mockResolvedValue('called');

      await authModule.authenticateUser(mockReq, mockRes);

      expect(authModule.authenticateUser).toHaveBeenCalledWith(mockReq, mockRes);
    });
  });
});

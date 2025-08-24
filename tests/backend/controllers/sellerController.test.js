import request from 'supertest';
import app from '../../server.js';
import * as sellerModel from '../../models/sellerModel.js';
import * as BTE from '../../engine/Agents/BTE.js';

jest.mock('../../models/sellerModel.js');
jest.mock('../../engine/Agents/BTE.js');

describe('Seller Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerSeller', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/auth/register-seller')
        .send({ email: '' });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Missing required seller fields/);
    });

    it('should return 409 if email already exists', async () => {
      sellerModel.getSellerByEmail.mockResolvedValue({ email: 'seller@example.com' });

      const res = await request(app)
        .post('/auth/register-seller')
        .send({ email: 'seller@example.com', password: '123' });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe('Email already exists');
    });

    it('should create a seller successfully', async () => {
      const newSeller = {
        sellerId: '123',
        sellerToken: 'token123',
        firstname: 'Alice',
        lastname: 'Smith',
        phone: '987654321',
        email: 'alice@example.com',
        adress: 'Company address',
        companyName: 'ACME Inc.',
        plan: 'premium'
      };

      sellerModel.getSellerByEmail.mockResolvedValue(null);
      sellerModel.createSeller.mockResolvedValue(newSeller);

      const res = await request(app)
        .post('/auth/register-seller')
        .send({ email: 'alice@example.com', password: '123' });

      expect(res.status).toBe(201);
      expect(res.body.newSeller.email).toBe('alice@example.com');
    });
  });

  describe('loginSeller', () => {
    it('should login successfully', async () => {
      const seller = {
        sellerId: '123',
        email: 'alice@example.com',
        password: 'hashedpassword',
        firstname: 'Alice',
        lastname: 'Smith',
        phone: '987654321'
      };

      sellerModel.getSellerByEmail.mockResolvedValue(seller);
      BTE.comparePWD.mockResolvedValue(true);
      BTE.TokenGenerate.mockReturnValue('token123');
      sellerModel.updateSeller.mockResolvedValue({ ...seller, sellerToken: 'token123' });

      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'alice@example.com', password: '123' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.userToken).toBe('token123');
    });

    it('should fail login with invalid credentials', async () => {
      sellerModel.getSellerByEmail.mockResolvedValue(null);

      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'wrong@example.com', password: '123' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});

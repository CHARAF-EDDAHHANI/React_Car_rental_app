// loginController.test.js
import { loginController } from './loginController.js';
import { loginBuyer } from './buyerController.js';
import { loginSeller } from './sellerController.js';

jest.mock('./buyerController.js', () => ({
  loginBuyer: jest.fn(),
}));

jest.mock('./sellerController.js', () => ({
  loginSeller: jest.fn(),
}));

describe('loginController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { email: 'test@example.com', password: 'password123' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should login successfully as a buyer', async () => {
    loginBuyer.mockResolvedValue({ success: true, user: { role: 'buyer' } });

    await loginController(req, res);

    expect(loginBuyer).toHaveBeenCalledWith(req, res, true);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, user: { role: 'buyer' } });
  });

  it('should login successfully as a seller if buyer fails', async () => {
    loginBuyer.mockRejectedValue(new Error('Buyer login failed'));
    loginSeller.mockResolvedValue({ success: true, user: { role: 'seller' } });

    await loginController(req, res);

    expect(loginBuyer).toHaveBeenCalledWith(req, res, true);
    expect(loginSeller).toHaveBeenCalledWith(req, res, true);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, user: { role: 'seller' } });
  });

  it('should return 401 if both buyer and seller login fail', async () => {
    loginBuyer.mockRejectedValue(new Error('Buyer login failed'));
    loginSeller.mockRejectedValue(new Error('Seller login failed'));

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });

  it('should return 500 if an unexpected error occurs', async () => {
    req = null; // simulate unexpected error

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Server error during login' });
  });
});

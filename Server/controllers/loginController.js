

import { loginBuyer } from './buyerController.js';
import { loginSeller } from './sellerController.js';

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Attempt buyer login first
    try {
      const buyerResult = await loginBuyer(req, res, true); // true = silent mode
      if (buyerResult.success) return res.status(200).json(buyerResult);
    } catch (buyerError) {
        console.error('Buyer login failed:', buyerError);
    }

    // Attempt seller login
    try {
      const sellerResult = await loginSeller(req, res, true); // true = silent mode
      if (sellerResult.success) return res.status(200).json(sellerResult);
    } catch (sellerError) {
      console.error('Seller login failed:', sellerError);
    }

    return res.status(401).json({ error: 'Invalid email or password' });

  } catch (err) {
    console.error('Universal login error:', err);
    return res.status(500).json({ error: 'Server error during login' });
  }
};

import { verifyToken } from './BTE.js';
import { getSellerById } from '../../models/sellerModel.js';
import { getBuyerById } from '../../models/buyerModel.js';

/**
 * Generic authentication middleware for both sellers and buyers
 */
export const authenticateUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const { userId, userType } = decoded;

    let user = null;

    if (userType === 'seller') {
      user = await getSellerById(userId);
    } else if (userType === 'buyer') {
      user = await getBuyerById(userId);
    } else {
      return res.status(400).json({ message: 'Unknown user type' });
    }

    if (!user) {
      return res.status(404).json({ message: `${userType} not found` });
    }

    const {
      firstname,
      lastname,
      phone,
      email,
      adress,
      companyName,
      companyAddress,
      companyPhone,
      companyEmail,
      plan,
    } = user;

    return res.status(200).json({
      message: 'Authenticated successfully',
      authenticated: true,
      user: {
        userType,
        userId: userType === 'seller' ? user.sellerId : user.buyerId,
        firstname,
        lastname,
        phone,
        email,
        adress,
        ...(userType === 'seller' && {
          companyName,
          companyAddress,
          companyPhone,
          companyEmail,
          plan,
        }),
      },
    });

  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(401).json({
      message: 'Invalid or expired token',
      authenticated: false,
      error: err.message,
    });
  }
};

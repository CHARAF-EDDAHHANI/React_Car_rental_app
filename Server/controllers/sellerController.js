import {
  createSeller,
  getSellerByEmail,
  getSellerById,
  updateSeller,
  deleteSeller,
} from '../models/sellerModel.js';
import { comparePWD, TokenGenerate} from '../engine/Agents/BTE.js';
import { authenticateUser } from '../engine/Agents/auth.js';
/**
 * Register seller
 */
export const registerSeller = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Missing required seller fields (email, password)' });
  }

  try {
    //  Check if seller already exists
    const existingSeller = await getSellerByEmail(email);
    if (existingSeller) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    //  Create new seller
    const newSeller = await createSeller(req.body);
    if (!newSeller) {
      return res.status(500).json({ message: 'Error creating seller' });
    }

    // Destructure and return only safe, necessary fields
    const {
      sellerId,
      sellerToken,
      firstname,
      lastname,
      phone,
      email: sellerEmail,
      adress,
      companyName,
      companyAddress,
      companyPhone,
      companyEmail,
      plan,
    } = newSeller;

    return res.status(201).json({
      message: 'Seller registered successfully',
      newSeller: {
        sellerId,
        sellerToken,
        firstname,
        lastname,
        phone,
        email: sellerEmail,
        adress,
        companyName,
        companyAddress,
        companyPhone,
        companyEmail,
        plan,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Error registering seller', error: err.message });
  }
};

/**
 * Login seller
 */
 export const loginSeller = async (req, res, silent = false) => {
  const { email, password } = req.body;

  try {
    // Validate input, find user from DB, check password, generate token
    const seller =  await getSellerByEmail(email);
    const isValidPassword = await comparePWD(password, seller.password);

    if (!seller || !isValidPassword) throw new Error();

    const token = TokenGenerate(seller.sellerId, seller.email, 'seller');
    await updateSeller(seller.sellerId, { sellerToken: token });

    const user = {
      userId: seller.sellerId,
      userToken: token,
      userType: 'seller',
      firstname: seller.firstname,
      lastname: seller.lastname,
      phone: seller.phone,
      email: seller.email,
      adress: seller.adress,
      companyName: seller.companyName,
      companyAddress: seller.companyAddress,
      companyPhone: seller.companyPhone,
      companyEmail: seller.companyEmail,
      plan: seller.plan,

    };

    if (silent) return { success: true, user };
    return res.status(200).json({ success: true, user });

  } catch (err) {
    if (silent) throw err;
    return res.status(401).json({ success: false, error: 'Invalid seller credentials' });
  }
};

/**
 * Get seller by token-authenticated ID
 */
export const AuthSeller = async (req, res) => {
  return authenticateUser(req, res);
};
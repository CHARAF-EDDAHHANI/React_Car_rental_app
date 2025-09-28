import * as userModel from '../models/userModel.js';
import * as sellerModel from '../models/sellerModel.js';
import * as buyerModel from '../models/buyerModel.js';

/** login (buyer or seller)
 */
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);
    console.log("Request body:", req.body);

    // Attempt buyer login first
    try {
      const buyerResult = await buyerModel.loginBuyer(req, res, true); // true = silent mode
      if (buyerResult.success) return res.status(200).json(buyerResult);
      console.log('Buyer login success, this is a Buyer');
    } catch (buyerError) {
        console.error('Buyer check for login failed, this is not Buyer:', buyerError);
    }
    // Attempt seller login
    try {
      const sellerResult = await sellerModel.loginSeller(req, res, true); // true = silent mode
      if (sellerResult.success) return res.status(200).json(sellerResult);
      console.log('Seller login success, this is a Seller');
    } catch (sellerError) {
      console.error('Seller check for login failed:', sellerError);
    }

    return res.status(401).json({ error: 'Invalid email or password' });

  } catch (err) {
    console.error('Universal login error:', err);
    return res.status(500).json({ error: 'Server error during login' });
  }
};

/**
 * Register ONLY Buyer
 */

export const registerBuyerController = async (req, res) => {
try {
    const newBuyer = await buyerModel.createBuyer(req);
    if (!newBuyer) {
      console.log('this is controller error creating buyer')
      return res.status(500).json({ message: 'Error creating buyer' });
    }

    const { buyerId, buyerToken, firstname, lastname, phone, email, adress } = newBuyer;

    return res.status(201).json({
      message: 'Buyer registered successfully',
      newBuyer: { buyerId, buyerToken, firstname, lastname, phone, email, adress },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error registering buyer', error: err.message });
  }
};

/**
 * Register ONLY seller
 */
export const registerSellerController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Missing required seller fields (email, password)' });
  }

  try {
    //  Check if seller already exists
    const existingSeller = await sellerModel.getSellerByEmail(email);
    if (existingSeller) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    //  Create new seller
    const newSeller = await sellerModel.createSeller(req.body);
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
 * Get user by email
 */
export const getUserByEmailController = async (req, res) => {
  const { email, userType } = req.params;
  try {
    const user = await userModel.getUserByEmail(email, userType);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

/**
 * Update user
 */
export const updateUserController = async (req, res) => {
  const { id, userType } = req.params;
  const updates = req.body;

  try {
    const updated = await userModel.updateUser(id, userType, updates);
    res.status(200).json({ message: 'User updated successfully', updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

/**
 * Delete user
 */
export const deleteUserController = async (req, res) => {
  const { id, userType } = req.params;

  try {
    await userModel.deleteUser(id, userType);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

export const getUserByIdController = async (req, res) => {
  const { userId, userType } = req.params;
  try {
    let user;
    if (userType === 'seller') {
      user = await sellerModel.getSellerById(userId);
    } else if (userType === 'buyer') {
      user = await buyerModel.getBuyerById(userId);
    } else {
      return res.status(400).json({ message: 'Invalid userType' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

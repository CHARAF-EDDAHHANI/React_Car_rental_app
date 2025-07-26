import { createBuyer, getBuyerByEmail, updateBuyer} from '../models/buyerModel.js';
import { comparePWD, TokenGenerate } from '../engine/Agents/BTE.js';
import { authenticateUser } from '../engine/Agents/auth.js';

export const registerBuyer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required buyer fields (email, password)' });
  }

  try {
    const existingBuyer = await getBuyerByEmail(email);
    if (existingBuyer) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newBuyer = await createBuyer(req.body);
    if (!newBuyer) {
      return res.status(500).json({ message: 'Error creating buyer' });
    }

    const { buyerId, buyerToken, firstname, lastname, phone, email: buyerEmail, adress } = newBuyer;

    return res.status(201).json({
      message: 'Buyer registered successfully',
      newBuyer: { buyerId, buyerToken, firstname, lastname, phone, email: buyerEmail, adress },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error registering buyer', error: err.message });
  }
};

// Login buyer
export const loginBuyer = async (req, res, silent = false) => {
  const { email, password } = req.body;

  try {
    // Validate input, find user from DB, check password, generate token
    const buyer =  await getBuyerByEmail(email);
    const isValidPassword = await comparePWD(password, buyer.password);

    if (!buyer || !isValidPassword) throw new Error();

    const token = TokenGenerate(buyer.buyerId, buyer.email, 'buyer');
    await updateBuyer(buyer.buyerId, { buyerToken: token });
    const user = {
      userId: buyer.buyerId,
      userToken: token,
      userType: 'buyer',
      firstname: buyer.firstname,
      lastname: buyer.lastname,
      phone: buyer.phone,
      email: buyer.email,
      adress: buyer.adress,
    };

    if (silent) return { success: true, user };
    return res.status(200).json({ success: true, user });

  } catch (err) {
    if (silent) throw err;
    return res.status(401).json({ success: false, error: 'Invalid buyer credentials' });
  }
};




export const AuthBuyer = async (req, res) => {
  return authenticateUser(req, res); // reuse generic auth function
};

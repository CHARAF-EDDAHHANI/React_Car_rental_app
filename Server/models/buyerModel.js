import { v4 as uuidv4 } from 'uuid';
import { Encryption, TokenGenerate } from '../engine/Agents/BTE.js';
import { readJSON, writeJSON } from '../engine/Agents/RWJ.js';
import { comparePWD } from '../engine/Agents/BTE.js';

const fileKey = 'buyers';

export const createBuyer = async (req) => {
  const { firstname = '', lastname = '', phone = '', email = '', password, adress = '' } = req.body;
  const buyers = await readJSON(fileKey);

  if (buyers.find(buyer => buyer.email === email)) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await Encryption(password);
  const buyerId = uuidv4();
  const buyerToken = TokenGenerate(buyerId, email, 'buyer'); 

  const newBuyer = {
    buyerId,
    buyerToken,
    firstname,
    lastname,
    phone,
    email,
    password: hashedPassword,
    adress,
    userType: 'buyer',
  };

  buyers.push(newBuyer);
  await writeJSON(fileKey, buyers);
  return newBuyer;
};

export const getBuyerByEmail = async (email) => {
  const buyers = await readJSON(fileKey);
  return buyers.find(buyer => buyer.email === email);
};

export const getBuyerById = async (userId) => {
  const buyers = await readJSON(fileKey);
  return buyers.find(buyer => buyer.buyerId === userId);
};


export const updateBuyer = async (buyerId, updates) => {
  const buyers = await readJSON(fileKey);
  const index = buyers.findIndex(buyer => buyer.buyerId === buyerId);
  if (index === -1) throw new Error('Buyer not found');
  buyers[index] = { ...buyers[index], ...updates };
  await writeJSON(fileKey, buyers);
  return buyers[index];
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

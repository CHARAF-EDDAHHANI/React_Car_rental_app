import { v4 as uuidv4 } from 'uuid';
import { Encryption, TokenGenerate } from '../engine/Agents/BTE.js';
import { comparePWD } from '../engine/Agents/BTE.js';
import { readJSON, writeJSON } from '../engine/Agents/RWJ.js';

const fileKey = 'sellers';

export const createSeller = async (userData) => {
  const {
    firstname= '',
    lastname = '',
    phone = '',
    email = '',
    password,
    adress = '',
    companyName = '',
    companyAddress = '',
    companyPhone = '',
    companyEmail = '',
    plan,
  } = userData;

  const sellers = await readJSON(fileKey);
  if (sellers.find(user => user.email === email)) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await Encryption(password);
  const sellerId = uuidv4();
  const sellerToken = TokenGenerate(sellerId, email, 'seller');
  const newSeller = {
    sellerId,
    sellerToken,
    firstname,
    lastname,
    phone,
    email,
    password: hashedPassword,
    adress,
    companyName,
    companyAddress,
    companyPhone,
    companyEmail,
    plan,
    userType:'seller',
  };

  sellers.push(newSeller);
  await writeJSON(fileKey, sellers);
  return newSeller;
};



export const getSellerByEmail = async (email) => {
  const sellers = await readJSON(fileKey);
  return sellers.find(seller => seller.email === email);
};




export const getSellerById = async (userId) => {
  const sellers = await readJSON(fileKey);
  return sellers.find(seller => seller.sellerId === userId);
};


export const updateSeller = async (sellerId, updates) => {
  const sellers = await readJSON(fileKey);
  const index = sellers.findIndex(seller => seller.sellerId === sellerId);
  if (index === -1) throw new Error('Seller not found');
  sellers[index] = { ...sellers[index], ...updates };
  await writeJSON(fileKey, sellers);
  return sellers[index];
};

export const deleteSeller = async (sellerId) => {
  const sellers = await readJSON(fileKey);
  const filtered = sellers.filter(seller => seller.sellerId === sellerId);
  await writeJSON(fileKey, filtered);
};

export const getAllSellers = async () => {
  return await readJSON(fileKey);
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
import { v4 as uuidv4 } from 'uuid';
import { Encryption, TokenGenerate } from '../engine/Agents/BTE.js';
import { readJSON, writeJSON } from '../engine/Agents/RWJ.js';

const fileKey = 'buyers';

export const createBuyer = async (userData) => {
  const { firstname = '', lastname = '', phone = '', email = '', password, adress = '' } = userData;
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
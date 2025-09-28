import { v4 as uuidv4 } from 'uuid';
import { Encryption } from '../engine/Agents/BTE.js';
import { readJSON, writeJSON } from '../engine/Agents/RWJ.js';

// Create User (buyer or seller)
export const createUser = async (userData) => {
  const {
    userType,
    firstname,
    lastname,
    phone,
    email,
    password,
    adress,
    companyName,
    companyAddress,
    companyPhone,
    companyEmail,
    plan,
  } = userData;

  const fileKey = userType === 'seller' ? 'sellers' : 'buyers';
  const users = await readJSON(fileKey);

  if (users.find((user) => user.email === email)) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await Encryption(password);
  const newUser = {
    userId: uuidv4(),
    firstname,
    lastname,
    phone,
    email,
    password: hashedPassword,
    adress: adress || '',
    companyName: companyName || '',
    companyAddress: companyAddress || '',
    companyPhone: companyPhone || '',
    companyEmail: companyEmail || '',
    plan: userType === 'seller' ? plan : null,
    userType,
  };

  users.push(newUser);
  await writeJSON(fileKey, users);
  return newUser;
};

export const getUserByEmail = async (email, userType) => {
  const users = await readJSON(userType === 'seller' ? 'sellers' : 'buyers');
  return users.find((user) => user.email === email);
};

export const updateUser = async (userId, userType, updates) => {
  const fileKey = userType === 'seller' ? 'sellers' : 'buyers';
  const users = await readJSON(fileKey);
  const index = users.findIndex((u) => u.userId === userId);

  if (index === -1) throw new Error('User not found');
  users[index] = { ...users[index], ...updates };

  await writeJSON(fileKey, users);
  return users[index];
};

export const deleteUser = async (userId, userType) => {
  const fileKey = userType === 'seller' ? 'sellers' : 'buyers';
  const users = await readJSON(fileKey);
  const filtered = users.filter((u) => u.userId !== userId);
  await writeJSON(fileKey, filtered);
};

export const getAllUsers = async (userType) => {
  const users = await readJSON(userType === 'seller' ? 'sellers' : 'buyers');
  return users;
};

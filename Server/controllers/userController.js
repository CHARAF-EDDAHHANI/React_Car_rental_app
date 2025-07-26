import {
  createUser as saveUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
} from '../models/userModel.js';

import { comparePWD, UserToken } from '../helpers/BTE.js';

/**
 * Register user (buyer or seller)
 */
export const registerUser = async (req, res) => {
  const userData = req.body;
  const { email, password, userType } = userData;

  if (!email || !password || !userType) {
    return res.status(400).json({ message: 'Missing required fields (email, password, userType)' });
  }

  try {
    const existingUser = await getUserByEmail(email, userType);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newUser = await saveUser(userData);
    const token = UserToken(newUser.userId, email);

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
      token,
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

/**
 * Login user
 */
export const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res.status(400).json({ message: 'Missing login fields (email, password, userType)' });
  }

  try {
    const user = await getUserByEmail(email, userType);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await comparePWD(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = UserToken(user.userId, email);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

/**
 * Logout (stateless)
 */
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'User logged out (stateless)' });
};

/**
 * Get user by ID
 */
export const getUserByIdController = async (req, res) => {
  const { id, userType } = req.params;
  try {
    const user = await getUserById(id, userType);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

/**
 * Get user by email
 */
export const getUserByEmailController = async (req, res) => {
  const { email, userType } = req.params;
  try {
    const user = await getUserByEmail(email, userType);
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
    const updated = await updateUser(id, userType, updates);
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
    await deleteUser(id, userType);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};
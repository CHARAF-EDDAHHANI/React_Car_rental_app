import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// User routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/email/:email', userController.getUserByEmail);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/contact', userController.createMessage);

// Auth routes
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
export default router;

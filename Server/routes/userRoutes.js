import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateUser } from '../engine/Agents/auth.js';

const router = express.Router();

// User routes
router.post('/login', userController.loginUserController);
router.post('/register-seller', userController.registerSellerController);
router.post('/register-buyer', userController.registerBuyerController);
router.get('/auth/:userId', authenticateUser);
router.get('/users/:userId/:userType', userController.getUserByIdController);
router.get('/users/email/:email', userController.getUserByEmailController);
router.put('/users/:userId', userController.updateUserController);
router.delete('/users/:userId', userController.deleteUserController);


export default router;


import express from 'express';
import * as sellerController from '../controllers/sellerController.js';
import * as buyerController from '../controllers/buyerController.js';
import { authenticateUser } from '../engine/Agents/auth.js';
import { loginController } from '../controllers/loginController.js';

const router = express.Router();

// Seller routes
router.post('/register-seller', sellerController.registerSeller);
router.post('/login', loginController);

// Buyer routes
router.post('/register-buyer', buyerController.registerBuyer);
// Generic authentication route
// This route can be used for both sellers and buyers
router.get('/auth/:id', authenticateUser);


export default router;

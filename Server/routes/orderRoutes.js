import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

// Order-related routes
router.get('/orders', orderController.getAllOrders); // Get all orders
router.get('/orders/:orderID', orderController.getOrderByID); // Get order by ID
router.post('/orders', orderController.createOrder); // Create a new order
router.put('/orders/:orderID', orderController.updateOrder); // Update an existing order
router.delete('/orders/:orderID', orderController.deleteOrder); // Delete an order

export default router;

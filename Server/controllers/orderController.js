import { createOrder } from '../models/orderModel.js';

/**
 * Create new order
 */
export const createOrderController = async (req, res) => {
  try {
  const orderData = req.body;
  console.log('Received order data:', orderData);
  const ticketConfirmationData = await createOrder(orderData);
  res.status(201).json({ message: 'Order created successfully', order: ticketConfirmationData });
  } catch (err) {
    console.log('error creating order SERVER CONTROLLER');
    console.error('Error creating order SERVER CONTROLLER:', err.message);
    res.status(500).json({ message: 'Server Error Failed to create order, Please Contact Support Loading Your desired Car Info ', error: err.message });
  }
};
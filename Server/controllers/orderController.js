import {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrder // if implemented later
} from '../models/orderModel.js';

/**
 * Create new order
 */
export const createOrderController = async (req, res) => {
  try {
    const orderData = req.body;

    const requiredFields = [
      'buyerId',
      'carId',
      'pickupLocation',
      'dropoffLocation',
      'startDate',
      'endDate'
    ];

    const missingFields = requiredFields.filter(field => !orderData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const newOrder = await createOrder(orderData);
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

/**
 * Get all orders
 */
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

/**
 * Get order by ID
 */
export const getOrderByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await getOrderById(id);
    res.status(200).json(order);
  } catch (err) {
    console.error('Error fetching order:', err.message);
    res.status(404).json({ message: err.message });
  }
};

/**
 * Delete order
 */
export const deleteOrderController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteOrder(id);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error deleting order:', err.message);
    res.status(404).json({ message: err.message });
  }
};

/**
 * Optional: Update order (if implemented)
 */
// export const updateOrderController = async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   try {
//     const updatedOrder = await updateOrder(id, updates);
//     res.status(200).json({ message: 'Order updated successfully', updatedOrder });
//   } catch (err) {
//     console.error('Error updating order:', err.message);
//     res.status(500).json({ message: 'Failed to update order', error: err.message });
//   }
// };

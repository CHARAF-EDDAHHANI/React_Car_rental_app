import { writeJSON, readJSON } from '../engine/Agents/RWJ.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new order
export const createOrder = async (orderData) => {
  const { pickupLocation, dropoffLocation, startDate, endDate, driver, carId, buyerId } = orderData;

  if (!pickupLocation || !dropoffLocation || !startDate || !endDate || !carId || !buyerId) {
    throw new Error('Failed to create order: missing required fields');
  }

  // Load all cars and users
  const cars = await readJSON('cars');
  const buyers = await readJSON('buyers');
  const sellers = await readJSON('sellers');

  // Find car by carId
  const car = cars.find(car => car.carId === carId);
if (!car) {
  throw new Error(`Car with ID ${carId} not found`);
}

// Select only necessary fields for order
const carInfo = {
  model: car.model,
  year: car.year,
  category: car.category,
  seats: car.seats,
  image: car.image,
  daily_price: car.daily_price
};

const buyer = buyers.find(buyer => buyer.buyerId === buyerId);
if (!buyer) {
  throw new Error(`Buyer with ID ${buyerId} not found`);
}
const buyerInfo = {
  firstname: buyer.firstname,
  lastname: buyer.lastname,
  phone: buyer.phone,
  email: buyer.email,
};
  // Find seller by carData.userId or sellerId field (you need to store it in car)
  const sellerData = sellers.find(seller => seller.sellerId === car.sellerId);
  if (!sellerData) {
    throw new Error(`Seller for car ID ${carId} not found`);
  }

  const newOrder = {
    orderId: uuidv4(),
    sellerId: sellerData.sellerId,
    buyerId: buyer.buyerId,
    carInfo,
    buyerInfo,
    orderDate: new Date().toISOString(),
    pickupLocation: String(pickupLocation),
    dropoffLocation: String(dropoffLocation),
    startDate: new Date(startDate).toISOString(),
    endDate: new Date(endDate).toISOString(),
    driver: driver || false,
  };

  const orders = await readJSON('orders');
  orders.push(newOrder);
  await writeJSON('orders', orders);

  return newOrder;
};


// Get all orders
export const getAllOrders = async () => {
  return await readJSON('orders');
};

// Get order by ID
export const getOrderById = async (orderId) => {
  const orders = await readJSON('orders');
  const order = orders.find(order => order.orderId === orderId);
  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`);
  }
  return order;
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const orders = await readJSON('orders');
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    if (orders.length === updatedOrders.length) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    await writeJSON('orders', updatedOrders);
    return { message: `Order with ID ${orderId} deleted successfully` };
  } catch (error) {
    console.error(`Error deleting order with ID ${orderId}:`, error.message);
    throw new Error(`Failed to delete order with ID ${orderId}`);
  }
};

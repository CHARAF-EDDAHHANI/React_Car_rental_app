import { writeJSON, readJSON } from '../engine/Agents/RWJ.js';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

// Create a new order
export const createOrder = async (orderData) => {
  const { pickupLocation, dropoffLocation, startDate, endDate, driver, carId, userId, userType } = orderData;

  // Load all DATA
  const cars = await readJSON('cars');
  const buyers = await readJSON('buyers');
  const sellers = await readJSON('sellers');

  // Find car by carId
  const car = cars.find(car => car.carId === carId);
  if (!car) {
    console.log(`Car with ID ${carId} not found`);
    throw new Error(`Car with ID ${carId} not found`);
  }

  // Select only necessary fields for order
  const carInfo = {
    carId: car.carId,
    sellerId: car.sellerId,
    model: car.model,
    year: car.year,
    category: car.category,
    seats: car.seats,
    image: car.image,
    location: car.location,
    daily_price: car.daily_price,
    weekly_price: car.weekly_price,
    monthly_price: car.monthly_price,
    driver_daily_price: car.driver_daily_price,
    driver_weekly_price: car.driver_weekly_price,
    driver_monthly_price: car.driver_monthly_price,
  };


  // Function to calculate driver cost using optimal pricing
  const numberOfDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

  const calculateDriverCost = (driver, numberOfDays, carInfo) => {
    if (!driver || driver === "NoDriver") return 0;

    const daily = Number(carInfo.driver_daily_price || 40);
    const weekly = Number(carInfo.driver_weekly_price || 230);
    const monthly = Number(carInfo.driver_monthly_price || 1000);

    let minCost = Infinity;

    for (let months = 0; months <= Math.floor(numberOfDays / 30); months++) {
      for (let weeks = 0; weeks <= Math.floor((numberOfDays - months * 30) / 7); weeks++) {
        const days = numberOfDays - (months * 30) - (weeks * 7);
        const cost = (months * monthly) + (weeks * weekly) + (days * daily);
        if (cost < minCost) minCost = cost;
      }
    }
    return minCost;
  };


  // Function to calculate car cost using optimal pricing
  const calculateCarCost = (carInfo, numberOfDays) => {
    const daily = Number(carInfo.daily_price);
    const weekly = Number(carInfo.weekly_price);
    const monthly = Number(carInfo.monthly_price);

    let minCost = Infinity;

    for (let months = 0; months <= Math.floor(numberOfDays / 30); months++) {
      for (let weeks = 0; weeks <= Math.floor((numberOfDays - months * 30) / 7); weeks++) {
        const days = numberOfDays - (months * 30) - (weeks * 7);
        const cost = (months * monthly) + (weeks * weekly) + (days * daily);
        if (cost < minCost) minCost = cost;
      }
    }
    return minCost;
  };


  // Calculate costs
  const driverCost = calculateDriverCost(driver, numberOfDays, carInfo);
  const carCost = calculateCarCost(carInfo, numberOfDays);
  const totalPrice = carCost + driverCost;

  // Find buyer or seller
  const findUser = () => {
    let user = null;
    if (userType === 'buyer') {
      user = buyers.find(b => b.buyerId === userId);
      if (!user) {
        console.log(`Buyer with ID ${userId} not found`);
        throw new Error(`Buyer with ID ${userId} not found`);
      }
    } else if (userType === 'seller') {
      user = sellers.find(s => s.sellerId === userId);
      if (!user) {
        console.log(`Seller with ID ${userId} not found`);
        throw new Error(`Seller with ID ${userId} not found`);
      }
    } else {
      throw new Error(`Unknown user type: ${userType}`);
    }
    return user;
  };

  const user = findUser();

  const buyerInfo = {
    userId: user.sellerId || user.buyerId,
    firstname: user.firstname,
    lastname: user.lastname,
    phone: user.phone,
    email: user.email,
  };

  //find seller phone and email
  const seller = sellers.find(s => s.sellerId === car.sellerId);
  if (!seller) {
    console.log(`Seller with ID ${car.sellerId} not found`);
    throw new Error(`Seller with ID ${car.sellerId} not found`);
  }
  const sellerInfo = {
    phone: seller.phone,
    email: seller.email,
    sellerId: seller.sellerId,
  };

 //generate universal orderId and date 
  const orderId = uuidv4();
  dayjs.extend(utc);
  const orderDate = dayjs().utc().format('YYYY-MM-DD [At] HH[h]mm[min]');
  // Create the new order object
  const newOrder = {
    numberOfDays: String(numberOfDays),
    totalPrice: String(totalPrice),
    orderId,
    orderDate,
    pickupLocation: String(pickupLocation),
    dropoffLocation: String(dropoffLocation),
    startDate: new Date(startDate).toISOString(),
    endDate: new Date(endDate).toISOString(),
    driver: driver || false,
    carInfo,
    buyerType: userType,
    buyerInfo,
    sellerInfo,
  };

  const orders = await readJSON('orders');
  orders.push(newOrder);
  await writeJSON('orders', orders);
  const ticketConfirmationData = {
    orderId: newOrder.orderId,
    orderDate: newOrder.orderDate,
    carName: newOrder.carInfo.model,
    carYear: newOrder.carInfo.year,
    carCategory: newOrder.carInfo.category,
    totalPrice: newOrder.totalPrice,
    startDate: newOrder.startDate,
    endDate: newOrder.endDate,
    driverCost: driverCost,
    carCost: carCost,
    numberOfDays: newOrder.numberOfDays,
    pickupLocation: newOrder.pickupLocation,
    dropoffLocation: newOrder.dropoffLocation,
    carAgencyPhone: newOrder.sellerInfo.phone,
    carAgencyEmail: newOrder.sellerInfo.email,
  };
  return ticketConfirmationData;
};

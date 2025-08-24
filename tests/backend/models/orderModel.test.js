import { jest } from '@jest/globals';
import * as OrderModel from '../../Server/models/orderModel.js';
import * as RWJ from '../../Server/engine/Agents/RWJ.js';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

jest.mock('../../Server/engine/Agents/RWJ.js');
jest.mock('uuid');

describe('Order Model', () => {
  const fakeCars = [];
  const fakeBuyers = [];
  const fakeSellers = [];
  const fakeOrders = [];

  beforeEach(() => {
    RWJ.readJSON.mockImplementation(async (file) => {
      if (file === 'cars') return fakeCars;
      if (file === 'buyers') return fakeBuyers;
      if (file === 'sellers') return fakeSellers;
      if (file === 'orders') return fakeOrders;
      return [];
    });
    RWJ.writeJSON.mockResolvedValue();
    uuidv4.mockReturnValue('fake-order-id');
    fakeCars.length = 0;
    fakeBuyers.length = 0;
    fakeSellers.length = 0;
    fakeOrders.length = 0;
  });

  test('createOrder should create a new order', async () => {
    fakeCars.push({ carId: 'car1', model: 'Toyota', year: 2023, category: 'SUV', seats: 5, location: 'NY', daily_price: 50, weekly_price: 300, monthly_price: 1000, driver_daily_price: 20, driver_weekly_price: 100, driver_monthly_price: 300, sellerId: 'seller1' });
    fakeBuyers.push({ buyerId: 'buyer1', firstname: 'John', lastname: 'Doe', phone: '123', email: 'john@example.com' });
    fakeSellers.push({ sellerId: 'seller1', firstname: 'Alice', phone: '456', email: 'alice@example.com' });

    const orderData = {
      pickupLocation: 'NY',
      dropoffLocation: 'NY',
      startDate: '2025-08-01',
      endDate: '2025-08-05',
      driver: true,
      carId: 'car1',
      userId: 'buyer1',
      userType: 'buyer'
    };

    const ticket = await OrderModel.createOrder(orderData);

    expect(ticket.orderId).toBe('fake-order-id');
    expect(ticket.carName).toBe('Toyota');
    expect(ticket.totalPrice).toBeDefined();
    expect(ticket.driverCost).toBeDefined();
    expect(ticket.carCost).toBeDefined();
    expect(ticket.numberOfDays).toBe('4');
  });

  test('createOrder should throw error if car not found', async () => {
    await expect(OrderModel.createOrder({ carId: 'notfound', userId: 'buyer1', userType: 'buyer', startDate: '2025-08-01', endDate: '2025-08-02' })).rejects.toThrow('Car with ID notfound not found');
  });

  test('createOrder should throw error if buyer not found', async () => {
    fakeCars.push({ carId: 'car1', model: 'Toyota', year: 2023, category: 'SUV', seats: 5, location: 'NY', daily_price: 50, weekly_price: 300, monthly_price: 1000, driver_daily_price: 20, driver_weekly_price: 100, driver_monthly_price: 300, sellerId: 'seller1' });
    await expect(OrderModel.createOrder({ carId: 'car1', userId: 'missing', userType: 'buyer', startDate: '2025-08-01', endDate: '2025-08-02' })).rejects.toThrow('Buyer with ID missing not found');
  });

  test('createOrder should throw error if seller not found', async () => {
    fakeCars.push({ carId: 'car1', model: 'Toyota', year: 2023, category: 'SUV', seats: 5, location: 'NY', daily_price: 50, weekly_price: 300, monthly_price: 1000, driver_daily_price: 20, driver_weekly_price: 100, driver_monthly_price: 300, sellerId: 'missingSeller' });
    await expect(OrderModel.createOrder({ carId: 'car1', userId: 'buyer1', userType: 'buyer', startDate: '2025-08-01', endDate: '2025-08-02' })).rejects.toThrow('Seller with ID missingSeller not found');
  });

  test('createOrder should throw error for unknown userType', async () => {
    fakeCars.push({ carId: 'car1', model: 'Toyota', year: 2023, category: 'SUV', seats: 5, location: 'NY', daily_price: 50, weekly_price: 300, monthly_price: 1000, driver_daily_price: 20, driver_weekly_price: 100, driver_monthly_price: 300, sellerId: 'seller1' });
    await expect(OrderModel.createOrder({ carId: 'car1', userId: 'user1', userType: 'unknown', startDate: '2025-08-01', endDate: '2025-08-02' })).rejects.toThrow('Unknown user type: unknown');
  });
});

import request from 'supertest';
import express from 'express';
import orderRouter from '../../Server/routes/orderRoutes.js';
import * as orderController from '../../Server/controllers/orderController.js';

jest.mock('../../Server/controllers/orderController.js');

const app = express();
app.use(express.json());
app.use('/api/orders', orderRouter);

describe('Order Routes', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /createOrder calls createOrderController', async () => {
    const mockResponse = { message: 'Order created successfully' };
    orderController.createOrderController.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post('/api/orders/createOrder')
      .send({
        pickupLocation: 'City A',
        dropoffLocation: 'City B',
        startDate: '2025-08-20',
        endDate: '2025-08-25',
        driver: true,
        carId: 'car123',
        userId: 'buyer123',
        userType: 'buyer'
      });

    expect(res.status).toBe(200);
    expect(orderController.createOrderController).toHaveBeenCalled();
  });

});

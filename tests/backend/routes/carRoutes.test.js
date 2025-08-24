import request from 'supertest';
import express from 'express';
import carRouter from '../../Server/routes/carRoutes.js';
import * as carController from '../../Server/controllers/carController.js';
import upload from '../../Server/engine/Agents/UPIFM.js';

// Mock controllers and upload middleware
jest.mock('../../Server/controllers/carController.js');
jest.mock('../../Server/engine/Agents/UPIFM.js');

const app = express();
app.use(express.json());
app.use('/api/cars', carRouter);

// Mock the file upload middleware to just pass through
upload.single = jest.fn(() => (req, res, next) => next());

describe('Car Routes', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /uploadCar calls createCarController', async () => {
    carController.createCarController.mockResolvedValue({ message: 'Car created' });

    const res = await request(app)
      .post('/api/cars/uploadCar')
      .attach('image', Buffer.from('fake image'), 'car.jpg')
      .field('model', 'Toyota');

    expect(res.status).toBe(200);
    expect(carController.createCarController).toHaveBeenCalled();
  });

  test('GET /allcars calls getAllCarsController', async () => {
    carController.getAllCarsController.mockResolvedValue([{ model: 'Toyota' }]);

    const res = await request(app).get('/api/cars/allcars');

    expect(res.status).toBe(200);
    expect(carController.getAllCarsController).toHaveBeenCalled();
  });

  test('GET /car/:carId calls getCarByIdController', async () => {
    carController.getCarByIdController.mockResolvedValue({ model: 'Toyota' });

    const res = await request(app).get('/api/cars/car/123');

    expect(res.status).toBe(200);
    expect(carController.getCarByIdController).toHaveBeenCalled();
  });

  test('GET /cars/:location calls getCarsByLocationController', async () => {
    carController.getCarsByLocationController.mockResolvedValue([{ model: 'Toyota' }]);

    const res = await request(app).get('/api/cars/cars/NewYork');

    expect(res.status).toBe(200);
    expect(carController.getCarsByLocationController).toHaveBeenCalled();
  });

});

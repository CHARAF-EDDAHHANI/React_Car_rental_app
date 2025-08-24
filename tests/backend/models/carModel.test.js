import { jest } from '@jest/globals';
import path from 'path';
import fs from 'fs/promises';
import * as CarModel from '../../Server/models/carModel.js';
import * as RWJ from '../../Server/engine/Agents/RWJ.js';
import { v4 as uuidv4 } from 'uuid';

jest.mock('../../Server/engine/Agents/RWJ.js');
jest.mock('uuid');

describe('Car Model', () => {
  const fakeCars = [];

  beforeEach(() => {
    RWJ.readJSON.mockResolvedValue(fakeCars);
    RWJ.writeJSON.mockResolvedValue();
    uuidv4.mockReturnValue('fake-car-id');
    fakeCars.length = 0;
  });

  test('createCar should create a new car', async () => {
    const carData = {
      sellerId: 'seller123',
      model: 'Toyota',
      year: 2023,
      category: 'SUV',
      availability: true,
      transmission_type: 'Automatic',
      seats: 5,
      daily_price: 50,
      weekly_price: 300,
      monthly_price: 1000,
      location: 'New York',
      description: 'Nice SUV',
      driver_daily_price: 20,
      driver_weekly_price: 100,
      driver_monthly_price: 300
    };

    const car = await CarModel.createCar(carData);

    expect(car.carId).toBe('fake-car-id');
    expect(car.sellerId).toBe('seller123');
    expect(fakeCars.length).toBe(1);
    expect(car.rating).toBeDefined();
    expect(car.numberOfReviews).toBeDefined();
  });

  test('createCar should throw error if sellerId is missing', async () => {
    await expect(CarModel.createCar({ model: 'Test' })).rejects.toThrow('Invalid or missing sellerId');
  });

  test('getCarById should return correct car', async () => {
    fakeCars.push({ carId: 'abc123', model: 'Test Car' });
    const car = await CarModel.getCarById('abc123');
    expect(car.model).toBe('Test Car');
  });

  test('getAllCars should return all cars', async () => {
    fakeCars.push({ carId: 'c1', model: 'Car1' });
    const cars = await CarModel.getAllCars();
    expect(cars.length).toBe(1);
    expect(cars[0].model).toBe('Car1');
  });

  test('updateCar should update car fields', async () => {
    fakeCars.push({ carId: 'u1', model: 'Old Model' });
    const updated = await CarModel.updateCar('u1', { model: 'New Model' });
    expect(updated.model).toBe('New Model');
    expect(fakeCars[0].model).toBe('New Model');
  });

  test('updateCar should throw error if car not found', async () => {
    await expect(CarModel.updateCar('notfound', { model: 'X' })).rejects.toThrow('Car not found');
  });

  test('deleteCar should remove car from array', async () => {
    fakeCars.push({ carId: 'del1', model: 'To Delete' });
    const result = await CarModel.deleteCar('del1');
    expect(result.message).toBe('Car deleted successfully');
  });

  test('getCarsByLocation should return cars in location', async () => {
    fakeCars.push({ carId: 'c1', location: 'New York' });
    const cars = await CarModel.getCarsByLocation('New York');
    expect(cars.length).toBe(1);
    expect(cars[0].location).toBe('New York');
  });

  test('getCarsByLocation should throw error if location invalid', async () => {
    await expect(CarModel.getCarsByLocation('')).rejects.toThrow('Invalid or missing location');
  });

  test('getCarsByLocation should throw error if no cars found', async () => {
    await expect(CarModel.getCarsByLocation('Paris')).rejects.toThrow('No cars found in this location');
  });
});

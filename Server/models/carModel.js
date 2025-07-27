import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { readJSON, writeJSON } from '../engine/Agents/RWJ.js';


const generateRating = () => (Math.random() * (5 - 3) + 3).toFixed(1);
const generateReviews = () => (Math.floor(Math.random() * 490 + 10)).toString();

export const createCar = async (carData) => {
  const {
    model,
    year,
    category,
    availability,
    transmission_type,
    seats,
    daily_price,
    weekly_price,
    monthly_price,
    location,
    description,
    sellerId
  } = carData;

  // Check if sellerId is provided and valid
  if (!sellerId || typeof sellerId !== 'string' || sellerId.trim() === '') {
    throw new Error('Invalid or missing sellerId');
  }
  const carId = uuidv4();

  const newCar = {
  carId,
  sellerId: sellerId.trim(),
  model: String(model),
  year: String(year),
  category,
  availability,
  transmission_type,
  seats: String(seats),
  daily_price: String(daily_price),
  weekly_price: String(weekly_price),
  monthly_price: String(monthly_price),
  location,
  description,
    rating: generateRating(),           
  numberOfReviews: generateReviews() 
};

  const cars = await readJSON('cars');
  cars.push(newCar);
  await writeJSON('cars', cars);
  return newCar;
};

export const getCarById = async (carId) => {
  const cars = await readJSON('cars');
  return cars.find((car) => car.carId === carId);
};

export const getAllCars = async () => {
  return await readJSON('cars');
};

export const updateCar = async (carId, updatedData) => {
  const cars = await readJSON('cars');
  const index = cars.findIndex(car => car.carId === carId);
  if (index === -1) throw new Error('Car not found');

  cars[index] = { ...cars[index], ...updatedData };
  await writeJSON('cars', cars);
  return cars[index];
};

export const deleteCar = async (carId) => {
  const cars = await readJSON('cars');
  const index = cars.findIndex(car => car.carId === carId);
  if (index === -1) throw new Error('Car not found');

  const carToDelete = cars[index];
  if (carToDelete.image) {
    const imagePath = path.join(uploadDir, path.basename(carToDelete.image));
    try {
      await fs.unlink(imagePath);
    } catch {}
  }

  cars.splice(index, 1);
  await writeJSON('cars', cars);
  return { message: 'Car deleted successfully' };
};

export const searchCars = async (searchParams) => {
  const cars = await getAllCars();
  return cars.filter(car => {
    return Object.keys(searchParams).every(key => {
      const val = searchParams[key];
      if (key === 'year' || key === 'seats') return car[key] === val;
      return car[key]?.toLowerCase().includes(val.toLowerCase());
    });
  });
};


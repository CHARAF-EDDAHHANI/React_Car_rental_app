
import * as carModel from '../models/carModel.js';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';



// go up one level from controllers directory
const uploadDir = path.join(process.cwd(), 'server', 'engine', 'uploadedImages');
if(!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir, { recursive: true});
}


export const createCarController = async (req, res) => {
  try {
    const carData = req.body;
    console.log('received car data :', carData);

    // First create the car (without image)
    const newCar = await carModel.createCar(carData);
    const carId = newCar.carId;

    // Handle image if provided
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const newFileName = `${carId}${ext}`;
      const newPath = path.join(uploadDir, newFileName);

      // Resize and save image
      await sharp(req.file.path)
        .resize(1000, 1000)
        .jpeg({ quality: 80 })
        .toFile(newPath);

      // Remove original file
      fs.unlinkSync(req.file.path);

      // Save image path in the car object
      newCar.image = `${newFileName}`;
      await carModel.updateCar(carId, { image: newCar.image });
    }

    res.status(201).json({ message: 'Car created successfully', car: newCar });
  } catch (err) {
    console.error('Error creating car:', err.message);
    res.status(500).json({ message: 'Failed to create car' });
  }
};


export const  getAllCarsController = async (req, res) => {
  try {
    const cars = await carModel.getAllCars();
    res.status(200).json(cars);
  } catch (err) {
    console.error('Error fetching all cars:', err.message);
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
}

export const getCarByIdController = async (req, res) => {
  const carId = req.params.carId;
  try {
    const car = await carModel.getCarById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (err) {
    console.error('Error fetching car by ID:', err.message);
    res.status(500).json({ message: 'Failed to fetch car' });
  }
}


export const getCarsByLocationController = async (req, res) => {
  const location = req.params.location;
  console.log('Location from request:', location);
  try {
    const cars = await carModel.getCarsByLocation(location);
    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: 'No cars found in this location' });
    }
    res.status(200).json(cars);
  } catch (err) {
    console.error('Error fetching cars by location:', err.message);
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
}
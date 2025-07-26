
import * as carModel from '../models/carModel.js';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const uploadDir = path.join('server', 'engine', 'uploadedImages');

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
      newCar.image = `/uploadedImages/${newFileName}`;
      await carModel.updateCar(carId, { image: newCar.image });
    }

    res.status(201).json({ message: 'Car created successfully', car: newCar });
  } catch (err) {
    console.error('Error creating car:', err.message);
    res.status(500).json({ message: 'Failed to create car' });
  }
};


// no handle for file(image) upload here ????
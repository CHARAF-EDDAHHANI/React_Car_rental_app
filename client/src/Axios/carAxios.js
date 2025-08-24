import { Message } from '@mui/icons-material';
import axios from 'axios';


export const fetchAllCars = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/allcars');
    console.log('Fetched cars:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching all cars:', error);
    throw error;
  }
}


//to add after in the upload car
export const uploadCar = async (carData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/uploadCar', carData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading car:', error);
    throw error;
  }
};

export const fetchCarById = async (carId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/car/${carId}`);
    console.log('Fetched car by ID:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching car by ID:', error);
    throw error;
  }
}

export const fetchCarsByLocation = async (location) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/cars/${location}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cars by location:', error);
    throw error;
  }
  return [];
};


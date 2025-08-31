import { Message } from '@mui/icons-material';
import axios from 'axios';

const API_BASE =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_LOCAL
    : import.meta.env.VITE_API_PROD;

export const fetchAllCars = async () => {
  try {
    const response = await axios.get(`${API_BASE}/allcars`);
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
    const response = await axios.post(`${API_BASE}/uploadCar`, carData, {
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
    const response = await axios.get(`${API_BASE}/car/${carId}`);
    console.log('Fetched car by ID:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching car by ID:', error);
    throw error;
  }
}

export const fetchCarsByLocation = async (location) => {
  try {
    const response = await axios.get(`${API_BASE}/cars/${location}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cars by location:', error);
    throw error;
  }
  return [];
};


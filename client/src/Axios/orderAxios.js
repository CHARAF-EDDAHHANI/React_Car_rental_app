import axios from 'axios';

const API_BASE =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_LOCAL
    : import.meta.env.VITE_API_PROD;
    
export const createOrder = async (orderData) => {
    try {
      console.log('Creating order in AXIOSORDER with data:', orderData);
    const response = await axios.post(`${API_BASE}/createOrder`, orderData);
    console.log('Response from createOrder:', response);
    console.log('Order created successfully');
    return response.data;
    }catch(error){
    console.error('Error during order creation :' , error);
    throw error;
    }
}
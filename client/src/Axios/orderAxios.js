import axios from 'axios';

export const createOrder = async (orderData) => {
    try {
    const response = await axios.post('http://localhost:5000/api/createOrder', orderData);
    console.log('Order created successfully');
    return response.data;
    }catch(error){
    console.error('Error during order creation :' , error);
    throw error;
    }
}
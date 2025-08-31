import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_LOCAL
    : import.meta.env.VITE_API_PROD;
    
//authentication
export const AuthenticateUser = async () => {
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  const id = credentials?.userId;
  const token = credentials?.userToken;
  if (!id || !token ) {
    throw new Error("please login first");
  }

  try {
    const response = await axios.get(`${API_BASE}/auth/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`}
    });
    return response.data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication failed, please contact support');
  }   
};


//login 
export const loginUserAxios = async (email, password) => {
  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const response = await axios.post(`${API_BASE}/login`, { email, password });
    const user = response.data.user;
    return user; // return the user so Login.jsx can navigate
  } catch (error) {
  const errorMsg = error.response?.data?.message || error.message || 'Login failed';
  setErrorMessage(errorMsg);
}
};

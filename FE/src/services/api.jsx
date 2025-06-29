import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL;
const API_URL = API_BASE_URL+'/api';

export const registerUser = async (registerData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, registerData, {
      withCredentials: true, // Ensures cookies are sent
    });
    return response.data;  
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData, {
      withCredentials: true, // Ensures cookies are sent and received
    });
    console.log(response); 
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:7000',
});

// Add the token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  console.log("Token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    console.log("token:",token);
    
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

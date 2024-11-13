import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    } else {
      // Clear any existing Authorization header if no token exists
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user data if token is invalid/expired
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    console.log('Raw login response:', response.data);
    
    // Check the structure of the response and handle it accordingly
    const userData = {
      token: response.data.token,
      _id: response.data._id || response.data.user?._id,
      email: response.data.email || response.data.user?.email,
      ...(response.data.user || response.data)
    };
    
    console.log('Processed user data:', userData);
    
    if (!userData.token || !userData._id) {
      throw new Error('Invalid response format from server');
    }
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
export const signup = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export const logout = () => {
  localStorage.removeItem('user');
};
export const getCurrentUser = () => {
  const userData = localStorage.getItem('user');
  console.log('Getting current user from localStorage:', userData);
  try {
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// User API calls
export const getUserProfile = () => api.get('/users/profile');
export const updateUserProfile = (userData) => api.put('/users/profile', userData);

// Homeowner API calls
export const createHomeowner = (homeownerData) => api.post('/homeowners', homeownerData);
export const getHomeowners = () => api.get('/homeowners');
export const getHomeownerById = (id) => api.get(`/homeowners/${id}`);
export const updateHomeowner = (homeownerData) => api.put('/homeowners', homeownerData);
export const deleteHomeowner = () => api.delete('/homeowners');

// Property API calls
export const createProperty = (propertyData) => api.post('/properties', propertyData);
export const getProperties = () => api.get('/properties');
export const getPropertyById = (id) => api.get(`/properties/${id}`);
export const updateProperty = (id, propertyData) => api.put(`/properties/${id}`, propertyData);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);

// Tax API calls
export const createTaxRecord = (taxData) => api.post('/taxes', taxData);
export const getTaxRecords = () => api.get('/taxes');
export const getTaxRecordById = (id) => api.get(`/taxes/${id}`);
export const updateTaxRecord = (id, taxData) => api.put(`/taxes/${id}`, taxData);
export const deleteTaxRecord = (id) => api.delete(`/taxes/${id}`);

export default api;

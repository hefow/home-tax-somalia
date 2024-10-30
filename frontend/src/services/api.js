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
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const login = (credentials) => api.post('/users/login', credentials);
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
  return JSON.parse(localStorage.getItem('user'));
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

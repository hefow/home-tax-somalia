import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token and user data on mount
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      // Check if we received user data
      if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid user data received');
      }

      // Check for token specifically
      if (!userData.token) {
        console.error('Response data:', userData);
        throw new Error('Authentication token not received from server');
      }
      
      // Store token
      localStorage.setItem('token', userData.token);
      
      // Store user data without sensitive information
      const userDataToStore = {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        phone_number: userData.phone_number
      };
      
      localStorage.setItem('userData', JSON.stringify(userDataToStore));
      setUser(userDataToStore);
      
      return userDataToStore; // Return the user data for additional handling if needed
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to process login');
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const updateUserData = (newData) => {
    try {
      const updatedUser = { ...user, ...newData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

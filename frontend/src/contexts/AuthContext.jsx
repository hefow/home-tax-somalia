import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.token) {
          localStorage.setItem('token', userData.token);
        }
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        clearAuthData();
      }
    }
  }, []);

    const clearAuthData = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('hasHomeownerProfile');
      localStorage.removeItem('pendingPayment');
      localStorage.removeItem('paymentSuccess');
    };

    const login = (userData) => {
      if (userData.token) {
        localStorage.setItem('token', userData.token);
      }
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
      clearAuthData();
      navigate('/login', { replace: true });
    };

    const isAuthenticated = () => {
      return !!user && !!localStorage.getItem('token');
    };

    const value = {
      user,
      login,
      logout,
      isAuthenticated
    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

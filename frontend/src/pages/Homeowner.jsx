import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import HomeownerForm from '../components/homeowner/HomeownerForm';
import { Navigate } from 'react-router-dom';

function Homeowner() {
  const { user } = useAuth();

  // If user is admin, they shouldn't be here
  if (user?.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  return <HomeownerForm />;
}

export default Homeowner;

import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Home as HomeIcon, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { user } = useAuth();

  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/homeowner" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-gradient flex items-center space-x-2">
        <HomeIcon className="h-8 w-8" />
        <span>Welcome to Home Tax Somalia</span>
      </h1>
      <p className="text-xl mb-8">Manage your property taxes with ease.</p>
      <div className="space-x-4 flex">
        <Link to="/login" className="btn btn-primary flex items-center space-x-1">
          <LogIn className="h-5 w-5" />
          <span>Login</span>
        </Link>
        <Link to="/signup" className="btn btn-secondary flex items-center space-x-1">
          <UserPlus className="h-5 w-5" />
          <span>Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;

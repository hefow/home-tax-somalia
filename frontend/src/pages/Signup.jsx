import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../contexts/AuthContext';
import { signup } from '../services/api';

function Signup() {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    try {
      await signup(userData);
      await login({ email: userData.email, password: userData.password });
      navigate('/homeowner');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Design Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Design with us</h1>
        <p className="text-xl mb-8">Access to thousands of design resources and templates</p>
        
        {/* Abstract Design */}
        <div className="relative h-64 w-64 mx-auto">
          <div className="absolute inset-0">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M10,10 L190,10 L100,190 Z"
              />
              <circle cx="10" cy="10" r="5" fill="currentColor" />
              <circle cx="190" cy="10" r="5" fill="currentColor" />
              <circle cx="100" cy="190" r="5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Dots */}
        <div className="flex space-x-2 mt-8 justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <SignupForm onSubmit={handleSignup} />
        </div>
      </div>
    </div>
  );
}

export default Signup;

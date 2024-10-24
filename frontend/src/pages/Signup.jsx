import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../contexts/AuthContext';
import { signup } from '../services/api';
import { UserPlus } from 'lucide-react';

function Signup() {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    try {
      await signup(userData);
      await login({ email: userData.email, password: userData.password });
      navigate('/homeowner'); // or '/admin' based on user role
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center space-x-2">
          <UserPlus className="h-6 w-6" />
          <span>Create a new account</span>
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <SignupForm onSubmit={handleSignup} />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in to existing account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

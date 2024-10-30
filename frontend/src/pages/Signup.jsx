import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SignupForm from '../components/auth/SignupForm';
import toast from 'react-hot-toast';

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      // Ensure we have a token before proceeding
      if (!data.token) {
        throw new Error('No authentication token received');
      }

      await login(data);
      toast.success('Registration successful!');
      navigate('/homeowner');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
    </div>
  );
}

export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import toast from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Registration successful!');
      
      // Navigate based on role
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/homeowner');
      }
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
    </div>
  );
}

export default Signup;

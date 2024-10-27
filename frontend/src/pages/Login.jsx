import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      toast.success('Successfully logged in!');
      navigate('/homeowner');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center space-x-2">
          <LogIn className="h-6 w-6" />
          <span>Log in to your account</span>
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}

export default Login;

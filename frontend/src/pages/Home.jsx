import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, LogIn, UserPlus, Building, FileText, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
      {!user ? (
        // Content for non-authenticated users
        <>
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
        </>
      ) : (
        // Content for authenticated users
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Welcome, {user.username}!</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Building className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Your Properties</h2>
              </div>
              <p className="text-gray-600 mb-4">Manage your registered properties and add new ones.</p>
              <Link to="/homeowner" className="btn btn-primary w-full">
                View Properties
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-semibold">Tax Records</h2>
              </div>
              <p className="text-gray-600 mb-4">View and manage your property tax records.</p>
              <Link to="/taxes" className="btn btn-primary w-full">
                View Records
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-6 w-6 text-yellow-600" />
                <h2 className="text-xl font-semibold">Payments</h2>
              </div>
              <p className="text-gray-600 mb-4">Make and track your tax payments.</p>
              <Link to="/payments" className="btn btn-primary w-full">
                View Payments
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

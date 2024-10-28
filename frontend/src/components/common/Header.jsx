import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from '../../pages/AdminDashboard';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span>Home Tax Somalia</span>
        </h1>
        <nav className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-gray-200 flex items-center space-x-1">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          {user ? (
            <>
              <Link to="/homeowner" className="hover:text-gray-200 flex items-center space-x-1">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/admin" className="hover:text-gray-200 flex items-center space-x-1">
                {/* <Home className="h-5 w-5" /> */}
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="hover:text-gray-200 flex items-center space-x-1"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 flex items-center space-x-1">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="hover:text-gray-200 flex items-center space-x-1">
                <UserPlus className="h-5 w-5" />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

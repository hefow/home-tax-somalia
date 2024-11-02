import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return user.role === 'admin' ? '/admin' : '/homeowner';
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white from-blue-500 to-teal-400 text-black p-4 shadow-md z-50">
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
            <Link 
              to={getDashboardLink()} 
              className="hover:text-gray-200 flex items-center space-x-1"
            >
              <Home className="h-5 w-5" />
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

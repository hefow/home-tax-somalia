import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  LogIn, 
  UserPlus, 
  LogOut, 
  Menu, 
  X, 
  DollarSign,
  Info,
  Phone,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return user.role === 'admin' ? '/admin' : '/homeowner';
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { 
      label: 'Home', 
      icon: Home, 
      path: '/',
      showAlways: true
    },
    { 
      label: 'About Us', 
      icon: Info, 
      path: '/about',
      showAlways: true
    },
    { 
      label: 'Services', 
      icon: Briefcase, 
      path: '/services',
      showAlways: true
    },
    { 
      label: 'Contact', 
      icon: Phone, 
      path: '/contact',
      showAlways: true
    },
    { 
      label: 'Pricing', 
      icon: DollarSign, 
      path: '/pricing',
      showAlways: true
    },
    ...(user
      ? [
          { 
            label: 'Dashboard', 
            icon: Home, 
            path: getDashboardLink(),
            showAlways: true
          },
          {
            label: 'Logout',
            icon: LogOut,
            onClick: handleLogout,
            className: 'text-red-500 hover:text-red-600',
            showAlways: true
          },
        ]
      : [
          { 
            label: 'Login', 
            icon: LogIn, 
            path: '/login',
            showAlways: true
          },
          { 
            label: 'Sign Up', 
            icon: UserPlus, 
            path: '/signup',
            showAlways: true
          },
        ]),
  ];

  const linkClasses = (isActivePath) => `
    flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors
    ${isActivePath 
      ? 'bg-white/10 text-white' 
      : 'hover:bg-white/5 hover:text-gray-200'}
  `;

  return (
<<<<<<< HEAD
    <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition-opacity"
          >
            <Home className="h-7 w-7" />
            <span className="hidden sm:inline">Home Tax Somalia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => (
              item.showAlways && (
                item.onClick ? (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className={`${linkClasses(false)} ${item.className || ''}`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={linkClasses(isActive(item.path))}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <nav className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  item.showAlways && (
                    item.onClick ? (
                      <motion.button
                        key={item.label}
                        onClick={() => {
                          item.onClick();
                          setIsMobileMenuOpen(false);
                        }}
                        whileHover={{ x: 5 }}
                        className={`${linkClasses(false)} ${item.className || ''}`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </motion.button>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={linkClasses(isActive(item.path))}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  )
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
=======
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
  
>>>>>>> 3b9eb8c0e5efc55ad7491cb983cd70ca88183fed
  );
}

export default Header;

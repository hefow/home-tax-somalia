import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Settings, LogOut, Building } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: Home },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Property', path: '/admin/property', icon: Building },
  { name: 'Homeowner', path: '/admin/homeowner', icon: Users }, 
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <h1 className="text-white text-xl font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors mt-auto"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default SideBar;

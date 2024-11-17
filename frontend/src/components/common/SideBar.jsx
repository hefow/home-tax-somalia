import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Settings, LogOut, Building, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const getMenuItems = (translations) => [
  {
    name: translations?.sidebar?.overview || 'Overview',
    path: '/admin',
    icon: Home,
    submenu: []
  },
  {
    name: translations?.sidebar?.users || 'Users',
    path: '/admin/users',
    icon: Users,
    submenu: [
      { name: translations?.sidebar?.allUsers || 'All Users', path: '/admin/users' }
    ]
  },
  {
    name: translations?.sidebar?.properties || 'Properties',
    path: '/admin/properties',
    icon: Building,
    submenu: [
      { name: translations?.sidebar?.allProperties || 'All Properties', path: '/admin/properties' }
    ]
  },
  {
    name: translations?.sidebar?.settings || 'Settings',
    path: '/admin/settings',
    icon: Settings,
    submenu: []
  }
];

function SideBar() {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState('');
  const { isDarkMode } = useTheme();
  const { translations } = useLanguage();

  const menuItems = getMenuItems(translations);

  const handleSubmenuClick = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? '' : menuName);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`w-64 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-800'
    } min-h-screen p-4 flex flex-col transition-colors duration-200`}>
      <div className="flex items-center mb-8">
        <h1 className="text-white text-xl font-bold">
          {translations?.sidebar?.title || 'Admin Panel'}
        </h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.submenu.length > 0 ? (
                <div>
                  <button
                    onClick={() => handleSubmenuClick(item.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors
                      ${isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      openSubmenu === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {openSubmenu === item.name && (
                    <ul className="ml-8 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={`block p-2 rounded-lg transition-colors ${
                              isActive(subItem.path)
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
        className="flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors mt-auto"
      >
        <LogOut className="h-5 w-5" />
        <span>{translations?.sidebar?.logout || 'Logout'}</span>
      </button>
    </div>
  );
}

export default SideBar;

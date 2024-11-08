// // Sidebar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Home, Users, ClipboardList } from 'lucide-react';

// const SideBar = () => {
//   return (
//     <aside className="w-64 bg-blue-400 text-white h-screen p-6 space-y-6">
//       <h2 className="text-2xl font-bold ">Admin Panel</h2>
//       <nav className="space-y-4">
//         <Link to="/admin" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
//           <Home className="h-5 w-5" />
//           <span className="text-white" >Dashboard Home</span>
//         </Link>
//         <Link to="/admin/homeowners" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
//           <Users className="h-5 w-5" />
//           <span className="text-white">Homeowners</span>
//         </Link>
//         <Link to="/admin/properties" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
//           <ClipboardList className="h-5 w-5" />
//           <span className="text-white">Properties</span>
//         </Link>
//       </nav>
//     </aside>
//   );
// };

// export default SideBar;
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Settings, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: Home },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Property', path: '/admin/property', icon: Home }, // Adjust icon as needed
  { name: 'Homeowner', path: '/admin/homeowner', icon: Users }, 
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function SideBar() {
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


// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, ClipboardList } from 'lucide-react';

const SideBar = () => {
  return (
    <aside className="w-64 bg-blue-400 text-white h-screen p-6 space-y-6">
      <h2 className="text-2xl font-bold ">Admin Panel</h2>
      <nav className="space-y-4">
        <Link to="/admin" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
          <Home className="h-5 w-5" />
          <span className="text-white" >Dashboard Home</span>
        </Link>
        <Link to="/admin/homeowners" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
          <Users className="h-5 w-5" />
          <span className="text-white">Homeowners</span>
        </Link>
        <Link to="/admin/properties" className="flex items-center space-x-2 hover:bg-blue-500 p-2 rounded">
          <ClipboardList className="h-5 w-5" />
          <span className="text-white">Properties</span>
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;

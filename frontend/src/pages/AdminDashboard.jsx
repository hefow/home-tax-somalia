// AdminDashboard.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SideBar from '../components/common/SideBar';
import Overview from '../components/admin/Overview';
import UserManage from '../components/admin/UserManage';
import PropertyManage from '../components/admin/PropertyManage';
import Settings from '../components/admin/Settings';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is inactive
    const lastActivity = localStorage.getItem('lastActivity');
    const inactiveTime = Date.now() - parseInt(lastActivity || 0);
    
    if (inactiveTime > 30 * 60 * 1000) {
      toast.error('Session expired due to inactivity');
      logout();
      return;
    }

    // Check if user is admin
    if (!user || user.role !== 'admin') {
      toast.error('Unauthorized access');
      navigate('/login');
    }
  }, [user, navigate, logout]);

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <SideBar />
      <div className={`flex-1 overflow-hidden ${isDarkMode ? 'dark bg-gray-800' : 'bg-white'}`}>
        <div className="h-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/users/*" element={<UserManage />} />
            <Route path="/properties/*" element={<PropertyManage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

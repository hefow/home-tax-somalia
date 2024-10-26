import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  LogOut, 
  Edit,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserProfileDropdown({ user, homeowner, isOpen, onClose, onEditProfile, onSettings }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
    >
      <div className="p-4">
        {/* Profile Header */}
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b">
          <div className="bg-blue-500 p-3 rounded-full">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {homeowner?.fullName || user?.name || 'User'}
            </h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Profile Details */}
        {homeowner && (
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="h-5 w-5" />
              <span>{homeowner.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{homeowner.address}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>{homeowner.age} years old</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2 pt-4 border-t">
          {homeowner && (
            <button
              onClick={onEditProfile}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Edit className="h-5 w-5" />
              <span>Edit Profile</span>
            </button>
          )}
          <button
            onClick={onSettings}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Account Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

UserProfileDropdown.propTypes = {
  user: PropTypes.object,
  homeowner: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
};

export default UserProfileDropdown;

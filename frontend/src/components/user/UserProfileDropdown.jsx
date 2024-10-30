import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  LogOut, 
  Edit,
  Phone,
  MapPin,
  Calendar,
  ChevronRight,
  Mail,
  Shield
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute right-0 mt-2 w-96 rounded-2xl shadow-xl bg-white ring-1 ring-black/5 z-50 overflow-hidden"
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-4 rounded-full">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {homeowner?.fullName || user?.username}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Mail className="h-4 w-4 text-white/80" />
                <p className="text-sm text-white/80">{user?.email}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white mt-2">
                <Shield className="h-3 w-3 mr-1" />
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        {homeowner && (
          <div className="p-4 border-b border-gray-100">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="flex-1">{homeowner.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MapPin className="h-5 w-5 text-green-500" />
                <span className="flex-1">{homeowner.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span className="flex-1">{homeowner.age} years old</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p-4">
          {homeowner && (
            <motion.button
              whileHover={{ x: 5 }}
              onClick={onEditProfile}
              className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Edit className="h-5 w-5 text-blue-500" />
                <span>Edit Profile</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ x: 5 }}
            onClick={onSettings}
            className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-gray-500" />
              <span>Account Settings</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </motion.button>
          
          <motion.button
            whileHover={{ x: 5 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
          >
            <div className="flex items-center space-x-3">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </div>
            <ChevronRight className="h-5 w-5 opacity-75" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
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

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home,
  FileText, 
  DollarSign,
  Bell,
  UserCircle,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Minus,
  Home as HomeIcon,
  Plus, // For adding property
  Receipt, // For tax payment
  FileCheck, // For documents
  History, // For tax history
  Clock, // For recent activity time
  CheckCircle, // For completed activities
  FilePlus, // For document upload
  CreditCard, // For payment processing
  LogOut, // For logout icon
} from 'lucide-react';
import { useState } from 'react';
import AddPropertyForm from '../components/property/AddPropertyForm';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HomeownerForm from '../components/homeowner/HomeownerForm';
import UserProfileDropdown from '../components/user/UserProfileDropdown';
import EditProfileForm from '../components/user/EditProfileForm';
import UserSettings from '../components/user/UserSettings';

function Homeowner() {
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [homeownerProfile, setHomeownerProfile] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showHomeownerForm, setShowHomeownerForm] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Add this function to handle homeowner profile creation
  const handleCreateHomeowner = async (formData) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login again');
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/homeowners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create profile');
      }

      const data = await response.json();
      setHomeownerProfile(data);
      setShowHomeownerForm(false);
      toast.success('Profile created successfully!');
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error(error.message || 'Failed to create profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Update the useEffect
  useEffect(() => {
    const checkHomeownerProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login again');
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/homeowners', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setHomeownerProfile(data);
          setShowHomeownerForm(false);
        } else if (response.status === 404) {
          setShowHomeownerForm(true);
        } else {
          const error = await response.json();
          throw new Error(error.message || 'Failed to check profile status');
        }
      } catch (error) {
        console.error('Error checking homeowner profile:', error);
        if (error.message === 'Failed to fetch') {
          toast.error('Unable to connect to server. Please check your connection.');
        } else {
          toast.error(error.message || 'Failed to check profile status');
        }
        // Don't navigate away on error, just show the error message
      }
    };

    checkHomeownerProfile();
  }, [navigate]);

  // Add a loading state while checking profile
  if (showHomeownerForm === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const stats = [
    { id: 1, name: 'Total Properties', value: '3', change: '+1', changeType: 'increase' },
    { id: 2, name: 'Pending Taxes', value: '$2,450', change: '2', changeType: 'decrease' },
    { id: 3, name: 'Total Value', value: '$650,000', change: '+12.5%', changeType: 'increase' },
    { id: 4, name: 'Tax Rate', value: '1.2%', change: '0%', changeType: 'neutral' },
  ];

  const quickActions = [
    { 
      name: 'Add Property', 
      icon: Plus,
      onClick: () => setShowAddProperty(true), 
      color: 'bg-blue-500' 
    },
    { 
      name: 'Pay Taxes', 
      icon: Receipt,
      onClick: () => navigate('/homeowner'), // Changed from /homeowner/payments
      color: 'bg-green-500' 
    },
    { 
      name: 'View Documents', 
      icon: FileCheck,
      onClick: () => navigate('/homeowner'), // Changed from /homeowner/documents
      color: 'bg-purple-500' 
    },
    { 
      name: 'Tax History', 
      icon: History,
      onClick: () => navigate('/homeowner'), // Changed from /homeowner/tax-history
      color: 'bg-orange-500' 
    },
  ];

  const recentActivities = [
    { id: 1, activity: 'Tax payment processed', date: '2 hours ago', type: 'payment' },
    { id: 2, activity: 'New property added', date: '1 day ago', type: 'property' },
    { id: 3, activity: 'Document uploaded', date: '3 days ago', type: 'document' },
  ];

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  // Add activity icons mapping
  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="h-5 w-5 text-green-500" />;
      case 'property':
        return <Plus className="h-5 w-5 text-blue-500" />;
      case 'document':
        return <FilePlus className="h-5 w-5 text-purple-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  // Update the handleAddProperty function
  const handleAddProperty = async (propertyData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login again');
        navigate('/login');
        return;
      }

      if (!homeownerProfile) {
        toast.error('Please wait while we set up your profile');
        return;
      }

      // Format the size data according to the new schema
      const formattedData = {
        address: propertyData.address,
        type: propertyData.type,
        size: {
          square: Number(propertyData.size),
          feet: Number(propertyData.sizeFt),
          total: Number(propertyData.totalSize)
        },
        value: Number(propertyData.value),
        yearBuilt: propertyData.yearBuilt ? Number(propertyData.yearBuilt) : undefined,
        description: propertyData.description,
        homeowner: homeownerProfile._id
      };

      console.log('Sending data:', formattedData); // For debugging

      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add property');
      }

      const result = await response.json();
      setShowAddProperty(false);
      toast.success('Property added successfully!');
      
      // Refresh the page or update the properties list
      window.location.reload();
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error(error.message || 'Failed to add property');
    }
  };

  // Add this function to handle profile updates
  const handleUpdateProfile = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login again');
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/homeowners', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      setHomeownerProfile(data);
      setShowEditProfile(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  // Update the handleLogout function
  const handleLogout = () => {
    try {
      logout(); // This will clear the token and user data
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  return (
    <>
      {showHomeownerForm ? (
        <HomeownerForm onSubmit={handleCreateHomeowner} isLoading={isLoading} />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50"
        >
          {/* New Header Design */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500">
            {/* Top Header */}
            <div className="border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                  <div className="flex items-center space-x-2">
                    <HomeIcon className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold">Home Tax Somalia</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link 
                      to="/" 
                      className="text-white/80 hover:text-white flex items-center space-x-1"
                    >
                      <HomeIcon className="h-5 w-5" />
                      <span>Home</span>
                    </Link>
                    <Link 
                      to="/homeowner" 
                      className="text-white/80 hover:text-white flex items-center space-x-1"
                    >
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white/80 hover:text-white flex items-center space-x-1"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                  <Link 
                    to="/homeowner" 
                    className="text-white font-medium hover:text-white/80"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/homeowner/payments" 
                    className="text-white/80 font-medium hover:text-white"
                  >
                    Payments
                  </Link>
                  <Link 
                    to="/homeowner/documents" 
                    className="text-white/80 font-medium hover:text-white"
                  >
                    Documents
                  </Link>
                  <Link 
                    to="/homeowner/tax-history" 
                    className="text-white/80 font-medium hover:text-white"
                  >
                    Tax History
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-white/10"
                  >
                    <Bell className="h-6 w-6 text-white" />
                  </motion.button>
                  <div className="relative">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className="p-2 rounded-full hover:bg-white/10"
                    >
                      <UserCircle className="h-6 w-6 text-white" />
                    </motion.button>
                    <UserProfileDropdown
                      user={user}
                      homeowner={homeownerProfile}
                      isOpen={showProfileDropdown}
                      onClose={() => setShowProfileDropdown(false)}
                      onEditProfile={() => {
                        setShowProfileDropdown(false);
                        setShowEditProfile(true);
                      }}
                      onSettings={() => {
                        setShowProfileDropdown(false);
                        setShowSettings(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the content stays the same */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Grid */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white/60 backdrop-blur-lg overflow-hidden rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-300"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-sm font-medium text-gray-600 truncate">{stat.name}</dt>
                    <dd className="mt-1 text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
                      {stat.value}
                    </dd>
                    <dd className={`mt-2 text-sm flex items-center space-x-1 ${
                      stat.changeType === 'increase' ? 'text-green-600' : 
                      stat.changeType === 'decrease' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {getChangeIcon(stat.changeType)}
                      <span>{stat.change}</span>
                    </dd>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 sm:mt-8"
            >
              <h2 className="text-lg font-bold text-blue-600 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="overflow-hidden"
                  >
                    <button
                      onClick={action.onClick}
                      className="w-full h-24 sm:h-32 relative rounded-xl bg-white shadow hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center space-y-2 sm:space-y-3"
                    >
                      <motion.div 
                        className={`${action.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </motion.div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        {action.name}
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 sm:mt-8"
            >
              <h2 className="text-lg font-bold text-blue-600 mb-4">
                Recent Activity
              </h2>
              <motion.div 
                className="bg-white rounded-xl shadow overflow-hidden"
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <ul role="list" className="divide-y divide-gray-200">
                  {recentActivities.map((activity, index) => (
                    <motion.li 
                      key={activity.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="px-4 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <motion.div 
                          className="flex items-center space-x-3"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {getActivityIcon(activity.type)}
                          </motion.div>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.activity}
                          </p>
                        </motion.div>
                        <motion.div 
                          className="mt-2 sm:mt-0 flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Clock className="h-4 w-4 text-gray-400" />
                          <p className="text-xs leading-5 text-gray-500">
                            {activity.date}
                          </p>
                        </motion.div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </main>

          {/* Modals */}
          {showAddProperty && (
            <AddPropertyForm
              onClose={() => setShowAddProperty(false)}
              onSubmit={handleAddProperty}
            />
          )}
          {showEditProfile && (
            <EditProfileForm
              homeowner={homeownerProfile}
              onClose={() => setShowEditProfile(false)}
              onSubmit={handleUpdateProfile}
              isLoading={isLoading}
            />
          )}
          {showSettings && (
            <UserSettings
              onClose={() => setShowSettings(false)}
            />
          )}
        </motion.div>
      )}
    </>
  );
}

export default Homeowner;

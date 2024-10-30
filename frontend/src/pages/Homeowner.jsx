import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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
  Settings,
  LogOut,
  Edit,
  Phone,
  MapPin,
  Calendar,
  ChevronRight,
  Mail,
  Shield,
  Save,
  Eye,
  EyeOff,
  X,
  User,
  Activity,
  Sparkles,
  ArrowUpRight,
  Zap,
  Target,
  Award,
  AlertCircle,
  Plus,
  Building
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AddPropertyForm from '../components/property/AddPropertyForm';
import PropertyDetail from '../components/property/PropertyDetail';
// import Header from '../components/common/Header';
import HomeownerForm from '../components/homeowner/HomeownerForm';
import UserProfileDropdown from '../components/user/UserProfileDropdown';
import EditProfileForm from '../components/user/EditProfileForm';
import UserSettings from '../components/user/UserSettings';
import toast from 'react-hot-toast';

function Homeowner() {
  const { user } = useAuth();
  const [showAddProperty, setShowAddProperty] = React.useState(false);
  const [properties, setProperties] = React.useState([]);
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const [showHomeownerForm, setShowHomeownerForm] = React.useState(false);
  const [hasHomeownerProfile, setHasHomeownerProfile] = React.useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [homeownerData, setHomeownerData] = useState(null);

  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  const [gradientAngle, setGradientAngle] = useState(45);
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    checkHomeownerProfile();
  }, []);

  React.useEffect(() => {
    if (hasHomeownerProfile) {
      fetchHomeownerData();
    }
  }, [hasHomeownerProfile]);

  const checkHomeownerProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/homeowners', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setHasHomeownerProfile(true);
      }
    } catch (error) {
      console.error('Error checking homeowner profile:', error);
    }
  };

  const fetchHomeownerData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/homeowners', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setHomeownerData(data);
      }
    } catch (error) {
      console.error('Error fetching homeowner data:', error);
    }
  };

  const handleAddHomeowner = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/homeowners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setHasHomeownerProfile(true);
        setShowHomeownerForm(false);
        toast.success('Homeowner profile created successfully!');
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create homeowner profile');
    }
  };

  const stats = [
    { id: 1, name: 'Total Properties', value: '3', change: '+1', changeType: 'increase' },
    { id: 2, name: 'Pending Taxes', value: '$2,450', change: '2', changeType: 'decrease' },
    { id: 3, name: 'Total Value', value: '$650,000', change: '+12.5%', changeType: 'increase' },
    { id: 4, name: 'Tax Rate', value: '1.2%', change: '0%', changeType: 'neutral' },
  ];

  const handleAddProperty = (propertyData) => {
    const newProperty = {
      id: Date.now(), // Temporary ID - should come from backend
      ...propertyData,
      size: {
        square: propertyData.size,
        feet: propertyData.sizeFt,
        total: propertyData.totalSize
      }
    };
    setProperties([...properties, newProperty]);
    setShowAddProperty(false);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const quickActions = [
    { 
      name: 'Add Property', 
      icon: Home, 
      onClick: () => setShowAddProperty(true), 
      color: 'bg-blue-500' 
    },
    { name: 'Pay Taxes', icon: DollarSign, href: '/payments', color: 'bg-green-500' },
    { name: 'View Documents', icon: FileText, href: '/documents', color: 'bg-purple-500' },
    { name: 'Tax History', icon: BarChart2, href: '/tax-history', color: 'bg-orange-500' },
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

  const renderContent = () => {
    if (!hasHomeownerProfile) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative overflow-hidden bg-white rounded-2xl shadow-xl p-8"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              style={{
                transform: `rotate(${gradientAngle}deg)`,
                transition: 'transform 0.05s linear'
              }}
            />
            
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
              className="relative z-10"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="bg-yellow-500/20 p-4 rounded-full"
                >
                  <Sparkles className="h-12 w-12 text-yellow-500" />
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Complete Your Profile
              </h2>
              <p className="text-lg text-center text-gray-600 mb-8 max-w-md mx-auto">
                Unlock all features and personalize your experience by completing your homeowner profile
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowHomeownerForm(true)}
                  className="group relative inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Complete Profile Now
                    <ArrowUpRight className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: Target,
                    title: "Personalized Dashboard",
                    description: "Get insights tailored to your properties"
                  },
                  {
                    icon: Activity,
                    title: "Real-time Updates",
                    description: "Stay informed with instant notifications"
                  },
                  {
                    icon: Award,
                    title: "Premium Features",
                    description: "Access exclusive homeowner tools"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-gray-200 hover:border-yellow-500/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-yellow-500/10 p-3 rounded-lg">
                        <feature.icon className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </span>
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className={`p-2 rounded-lg ${
                      stat.changeType === 'increase' ? 'bg-green-500/10' :
                      stat.changeType === 'decrease' ? 'bg-red-500/10' :
                      'bg-gray-500/10'
                    }`}
                  >
                    {getChangeIcon(stat.changeType)}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-baseline"
                >
                  <span className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                  <span className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' :
                    stat.changeType === 'decrease' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {action.href ? (
                  <Link
                    to={action.href}
                    className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 transform group-hover:scale-105 transition-transform duration-300" />
                    <div className="relative z-10">
                      <motion.div 
                        className={`${action.color} p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <action.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <span className="block text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.name}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={action.onClick}
                    className="group relative overflow-hidden w-full rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 transform group-hover:scale-105 transition-transform duration-300" />
                    <div className="relative z-10">
                      <motion.div 
                        className={`${action.color} p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <action.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <span className="block text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.name}
                      </span>
                    </div>
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Home className="h-5 w-5 mr-2 text-blue-500" />
              My Properties
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddProperty(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <motion.div
                key={property.id}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {property.address}
                    </h3>
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className="p-2 rounded-lg bg-blue-500/10"
                    >
                      <Home className="h-5 w-5 text-blue-500" />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{property.type}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                      <span className="font-medium">${property.value.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-blue-600"
                    >
                      <span className="text-sm font-medium mr-1">View Details</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-500" />
              Recent Activity
            </h2>
          </div>
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
          >
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <motion.li 
                  key={activity.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="group relative overflow-hidden hover:bg-gray-50 transition-colors"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'payment' ? 'bg-green-500/10' :
                          activity.type === 'property' ? 'bg-blue-500/10' :
                          'bg-purple-500/10'
                        }`}>
                          {activity.type === 'payment' ? (
                            <DollarSign className="h-5 w-5 text-green-500" />
                          ) : activity.type === 'property' ? (
                            <Home className="h-5 w-5 text-blue-500" />
                          ) : (
                            <FileText className="h-5 w-5 text-purple-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.activity}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </main>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* <Header /> */}
      
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="bg-white shadow"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Bell className="h-6 w-6 text-gray-500" />
              </motion.button>
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <UserCircle className="h-6 w-6 text-gray-500" />
                </motion.button>
                
                {showProfileDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setShowProfileDropdown(false)}
                    />
                    <UserProfileDropdown
                      user={user}
                      homeowner={homeownerData}
                      isOpen={showProfileDropdown}
                      onClose={() => setShowProfileDropdown(false)}
                      onEditProfile={() => {
                        setShowEditProfile(true);
                        setShowProfileDropdown(false);
                      }}
                      onSettings={() => {
                        setShowSettings(true);
                        setShowProfileDropdown(false);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {renderContent()}

      {showHomeownerForm && (
        <HomeownerForm
          onSubmit={handleAddHomeowner}
          onClose={() => setShowHomeownerForm(false)}
          isLoading={false}
        />
      )}

      {showAddProperty && hasHomeownerProfile && (
        <AddPropertyForm
          onClose={() => setShowAddProperty(false)}
          onSubmit={handleAddProperty}
        />
      )}

      {selectedProperty && hasHomeownerProfile && (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {showEditProfile && (
        <EditProfileForm
          homeowner={homeownerData}
          onClose={() => setShowEditProfile(false)}
          onSubmit={async (formData) => {
            try {
              const token = localStorage.getItem('token');
              const response = await fetch('http://localhost:5000/api/homeowners', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
              });

              if (response.ok) {
                toast.success('Profile updated successfully');
                fetchHomeownerData();
                setShowEditProfile(false);
              } else {
                const error = await response.json();
                throw new Error(error.message);
              }
            } catch (error) {
              toast.error(error.message || 'Failed to update profile');
            }
          }}
          isLoading={false}
        />
      )}

      {showSettings && (
        <UserSettings
          onClose={() => setShowSettings(false)}
        />
      )}
    </motion.div>
  );
}

export default Homeowner;


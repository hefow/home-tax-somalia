import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Home, Activity, DollarSign, 
  TrendingUp, Clock, AlertCircle,
  CheckCircle, XCircle, User, Plus,
  FileText, Settings, Download,
  ArrowUp, ArrowDown
} from 'lucide-react';
import { API_BASE_URL } from '../../config/constants';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

function Overview() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revenueTrends, setRevenueTrends] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [statsRes, activitiesRes, trendsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/dashboard-stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch(`${API_BASE_URL}/api/admin/homeowner-activities`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch(`${API_BASE_URL}/api/admin/revenue-trends`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      ]);

      if (!statsRes.ok || !activitiesRes.ok || !trendsRes.ok) 
        throw new Error('Failed to fetch data');
      
      const [statsData, activitiesData, trendsData] = await Promise.all([
        statsRes.json(),
        activitiesRes.json(),
        trendsRes.json()
      ]);

      setStats(statsData.stats);
      setActivities(activitiesData);
      setRevenueTrends(trendsData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  // Calculate percentage changes
  const calculateChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const userChange = calculateChange(stats?.totalUsers, stats?.totalUsers - stats?.newUsers);
  const propertyChange = calculateChange(stats?.totalProperties, stats?.totalProperties - stats?.newProperties);
  const revenueChange = calculateChange(stats?.monthlyRevenue, stats?.previousMonthRevenue);

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-400 opacity-20"></div>
          <Users className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold opacity-90">Total Users</h3>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
            <div className={`flex items-center text-sm ${userChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {userChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {Math.abs(userChange).toFixed(1)}%
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-green-400 opacity-20"></div>
          <Home className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold opacity-90">Properties</h3>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold">{stats?.totalProperties || 0}</p>
            <div className={`flex items-center text-sm ${propertyChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {propertyChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {Math.abs(propertyChange).toFixed(1)}%
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-purple-400 opacity-20"></div>
          <User className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold opacity-90">Homeowners</h3>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold">{stats?.totalHomeowners || 0}</p>
            <span className="text-sm bg-purple-400/30 px-2 py-1 rounded">
              Active
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-yellow-400 opacity-20"></div>
          <DollarSign className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold opacity-90">Monthly Revenue</h3>
          <div className="flex items-end justify-between mt-2">
            <p className="text-3xl font-bold">${stats?.monthlyRevenue?.toLocaleString() || 0}</p>
            <div className={`flex items-center text-sm ${revenueChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {revenueChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {Math.abs(revenueChange).toFixed(1)}%
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#6366f1' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4 max-h-[320px] overflow-y-auto">
            {activities.slice(0, 5).map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`p-2 rounded-full ${
                  activity.type === 'property' ? 'bg-blue-100 text-blue-500' :
                  activity.type === 'profile' ? 'bg-green-100 text-green-500' :
                  'bg-purple-100 text-purple-500'
                }`}>
                  {activity.type === 'property' ? <Home className="h-5 w-5" /> :
                   activity.type === 'profile' ? <User className="h-5 w-5" /> :
                   <DollarSign className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">{activity.activity}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-medium text-gray-800">System Online</h3>
              <p className="text-sm text-gray-500">All services running</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <Activity className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-medium text-gray-800">Performance</h3>
              <p className="text-sm text-gray-500">Optimal conditions</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="font-medium text-gray-800">Updates Available</h3>
              <p className="text-sm text-gray-500">2 system updates</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Overview; 
import { Home, Trash2, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';

function Overview(){
   const [activeTab, setActiveTab] = useState('overview');
   const [stats, setStats] = useState(null);
   const [users, setUsers] = useState([]);
   const [properties, setProperties] = useState([]);

   const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Sending token:', token); // Debug log
  
        if (!token) {
          toast.error('Authentication token not found');
          return;
        }
  
        const response = await fetch('http://localhost:5000/api/admin/dashboard-stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch dashboard data');
        }
        
        const data = await response.json();
        setStats(data.stats);
        setUsers(data.recentUsers);
        setProperties(data.recentProperties);
      } catch (error) {
        console.error('Dashboard data error:', error);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchDashboardData();
    }, []);
   return(
      <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-500 text-white rounded-lg p-6"
              >
                <Users className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-green-500 text-white rounded-lg p-6"
              >
                <Home className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Total Properties</h3>
                <p className="text-2xl font-bold">{stats?.totalProperties || 0}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-purple-500 text-white rounded-lg p-6"
              >
                <Users className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Total Homeowners</h3>
                <p className="text-2xl font-bold">{stats?.totalHomeowners || 0}</p>
              </motion.div>
            </div>

            {/* Recent Users and Properties tables */}
            <div className="space-y-6">
              {/* Recent Users */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Properties */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Properties</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Owner
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property._id}>
                          <td className="px-6 py-4 whitespace-nowrap">{property.address}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {property.owner?.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{property.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteProperty(property._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
   )
}

export default Overview
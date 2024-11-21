import React, { useState, useEffect } from "react";
import { 
  Home, Trash2, Search, Filter, 
  DollarSign, MapPin, Calendar,
  Download, RefreshCw, ChevronDown,
  Building, User, Activity
} from "lucide-react";
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../config/constants';

function PropertyManage() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [propertyStats, setPropertyStats] = useState({
    total: 0,
    occupied: 0,
    newThisMonth: 0,
    totalValue: 0
  });

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/properties`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch properties');
      
      const data = await response.json();
      
      setProperties(data.properties || []);

      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      setPropertyStats({
        total: data.properties?.length || 0,
        occupied: data.properties?.filter(property => property.owner)?.length || 0,
        newThisMonth: data.properties?.filter(property => new Date(property.createdAt) > thisMonth)?.length || 0,
        totalValue: data.properties?.reduce((sum, property) => sum + (property.value || 0), 0) || 0
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to delete property');

      toast.success('Property deleted successfully');
      fetchProperties();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = 
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.owner?.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || property.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'value-high') return b.value - a.value;
      if (sortBy === 'value-low') return a.value - b.value;
      return 0;
    });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="p-6 bg-gray-50">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Properties</p>
              <h3 className="text-2xl font-bold">{propertyStats.total}</h3>
            </div>
            <Building className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Occupied Properties</p>
              <h3 className="text-2xl font-bold">{propertyStats.occupied}</h3>
            </div>
            <User className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">New This Month</p>
              <h3 className="text-2xl font-bold">{propertyStats.newThisMonth}</h3>
            </div>
            <Activity className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Value</p>
              <h3 className="text-2xl font-bold">${propertyStats.totalValue.toLocaleString()}</h3>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500" />
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="value-high">Highest Value</option>
              <option value="value-low">Lowest Value</option>
            </select>

            <button
              onClick={() => fetchProperties()}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="h-5 w-5" />
            </button>

            <button
              onClick={() => {/* Implement export functionality */}}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="Export"
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <motion.tr 
                  key={property._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Home className="h-6 w-6 text-blue-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.address}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {property.owner?.username || 'No Owner'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.type === 'House' ? 'bg-green-100 text-green-800' :
                      property.type === 'Apartment' ? 'bg-blue-100 text-blue-800' :
                      property.type === 'Commercial' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {property.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${property.value?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteProperty(property._id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PropertyManage; 
import React from 'react';
import { Link } from 'react-router-dom';
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
  Minus
} from 'lucide-react';

function Homeowner() {
  const stats = [
    { id: 1, name: 'Total Properties', value: '3', change: '+1', changeType: 'increase' },
    { id: 2, name: 'Pending Taxes', value: '$2,450', change: '2', changeType: 'decrease' },
    { id: 3, name: 'Total Value', value: '$650,000', change: '+12.5%', changeType: 'increase' },
    { id: 4, name: 'Tax Rate', value: '1.2%', change: '0%', changeType: 'neutral' },
  ];

  const quickActions = [
    { name: 'Add Property', icon: Home, href: '/properties/new', color: 'bg-blue-500' },
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Top Header */}
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
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <UserCircle className="h-6 w-6 text-gray-500" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
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
          className="mt-8"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
                <Link
                  to={action.href}
                  className="relative rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center"
                >
                  <motion.div 
                    className={`${action.color} p-3 rounded-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <span className="mt-3 text-sm font-medium text-gray-900">{action.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <motion.div 
            className="bg-white shadow overflow-hidden sm:rounded-md"
            whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
          >
            <ul role="list" className="divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <motion.li 
                  key={activity.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.activity}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}

export default Homeowner;

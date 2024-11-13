import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

function TaxHistory({ taxRecords = [] }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Overdue':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tax Payment History</h2>
      
      {taxRecords.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tax payment history available
        </div>
      ) : (
        <div className="space-y-4">
          {taxRecords.map((record, index) => (
            <motion.div
              key={record._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <DollarSign className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Property: {record.property.address}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(record.datePaid || record.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold text-gray-800">
                      ${record.amount.toFixed(2)}
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      {getStatusIcon(record.status)}
                      <span className={`
                        ${record.status === 'Paid' && 'text-green-500'}
                        ${record.status === 'Pending' && 'text-yellow-500'}
                        ${record.status === 'Overdue' && 'text-red-500'}
                      `}>
                        {record.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaxHistory; 
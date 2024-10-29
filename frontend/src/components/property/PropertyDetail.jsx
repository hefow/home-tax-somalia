import React from 'react';
import { motion } from 'framer-motion';
import { Home, DollarSign, Calendar, MapPin, FileText } from 'lucide-react';
import PropTypes from 'prop-types';

function PropertyDetail({ property, onClose }) {
  if (!property) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Property Details</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="h-6 w-6 text-gray-400 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Address</h3>
              <p className="text-gray-600">{property.address}</p>
            </div>
          </div>

          {/* Property Type & Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Home className="h-6 w-6 text-gray-400 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Property Type</h3>
                <p className="text-gray-600">{property.type}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="h-6 w-6 text-gray-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">Size</h3>
                <p className="text-gray-600">
                  {property.size.square} sq × {property.size.feet} ft = {property.size.total} sq ft
                </p>
              </div>
            </div>
          </div>

          {/* Value & Year Built */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <DollarSign className="h-6 w-6 text-gray-400 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Property Value</h3>
                <p className="text-gray-600">${property.value.toLocaleString()}</p>
              </div>
            </div>
            {property.yearBuilt && (
              <div className="flex items-start space-x-3">
                <Calendar className="h-6 w-6 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Year Built</h3>
                  <p className="text-gray-600">{property.yearBuilt}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {property.description && (
            <div className="flex items-start space-x-3">
              <FileText className="h-6 w-6 text-gray-400 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Description</h3>
                <p className="text-gray-600">{property.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

PropertyDetail.propTypes = {
  property: PropTypes.shape({
    address: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.shape({
      square: PropTypes.number.isRequired,
      feet: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
    value: PropTypes.number.isRequired,
    yearBuilt: PropTypes.number,
    description: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default PropertyDetail;

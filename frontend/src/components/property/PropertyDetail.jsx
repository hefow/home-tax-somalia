import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, DollarSign, Calendar, MapPin, FileText, Ruler, X, Edit, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { updateProperty, deleteProperty } from '../../services/api';

function PropertyDetail({ property, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState(property);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const updatedProperty = await updateProperty(property._id, editedProperty);
      onUpdate(updatedProperty);
      setIsEditing(false);
      toast.success('Property updated successfully!');
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    toast((t) => (
      <div className="flex items-center space-x-4">
        <div>
          <p className="font-medium">Delete this property?</p>
          <p className="text-sm text-gray-500">This action cannot be undone.</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performDelete();
            }}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center',
      style: {
        background: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    });
  };

  const performDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProperty(property._id);
      onDelete(property._id);
      toast.success('Property deleted successfully!');
      onClose();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    } finally {
      setIsLoading(false);
    }
  };

  if (!property) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/20 p-3 rounded-lg"
                >
                  <Home className="h-6 w-6 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white">Property Details</h2>
              </div>
              <div className="flex items-center space-x-2">
                {!isEditing && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsEditing(true)}
                      className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                      disabled={isLoading}
                    >
                      <Edit className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDelete}
                      className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                      disabled={isLoading}
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 space-y-6"
          >
            {isEditing ? (
              // Edit Form with all fields
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
                {/* Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={editedProperty.address}
                    onChange={(e) => setEditedProperty({...editedProperty, address: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter address"
                  />
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Property Type</label>
                  <select
                    value={editedProperty.type}
                    onChange={(e) => setEditedProperty({...editedProperty, type: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                  </select>
                </div>

                {/* Size */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Square</label>
                    <input
                      type="number"
                      value={editedProperty.size?.square}
                      onChange={(e) => setEditedProperty({
                        ...editedProperty,
                        size: {
                          ...editedProperty.size,
                          square: Number(e.target.value),
                          total: Number(e.target.value) * (editedProperty.size?.feet || 0)
                        }
                      })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Square"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Feet</label>
                    <input
                      type="number"
                      value={editedProperty.size?.feet}
                      onChange={(e) => setEditedProperty({
                        ...editedProperty,
                        size: {
                          ...editedProperty.size,
                          feet: Number(e.target.value),
                          total: (editedProperty.size?.square || 0) * Number(e.target.value)
                        }
                      })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Feet"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Total Size</label>
                    <input
                      type="number"
                      value={editedProperty.size?.total}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-50"
                      placeholder="Total sq ft"
                    />
                  </div>
                </div>

                {/* Value */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Property Value ($)</label>
                  <input
                    type="number"
                    value={editedProperty.value}
                    onChange={(e) => setEditedProperty({...editedProperty, value: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter value"
                  />
                </div>

                {/* Year Built */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Year Built</label>
                  <input
                    type="number"
                    value={editedProperty.yearBuilt || ''}
                    onChange={(e) => setEditedProperty({...editedProperty, yearBuilt: Number(e.target.value)})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter year built"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={editedProperty.description || ''}
                    onChange={(e) => setEditedProperty({...editedProperty, description: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Enter property description"
                  />
                </div>
              </form>
            ) : (
              // Display Property Details
              <>
                {/* Property Grid */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Address */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50"
                  >
                    <MapPin className="h-6 w-6 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">{property.address}</p>
                    </div>
                  </motion.div>

                  {/* Property Type */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50"
                  >
                    <Home className="h-6 w-6 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Property Type</h3>
                      <p className="text-gray-600">{property.type}</p>
                    </div>
                  </motion.div>

                  {/* Size */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50"
                  >
                    <Ruler className="h-6 w-6 text-purple-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Size</h3>
                      <p className="text-gray-600">
                        {property.size?.square} sq × {property.size?.feet} ft = {property.size?.total} sq ft
                      </p>
                    </div>
                  </motion.div>

                  {/* Value */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50"
                  >
                    <DollarSign className="h-6 w-6 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Property Value</h3>
                      <p className="text-gray-600">${property.value?.toLocaleString()}</p>
                    </div>
                  </motion.div>

                  {/* Year Built */}
                  {property.yearBuilt && (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50"
                    >
                      <Calendar className="h-6 w-6 text-orange-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Year Built</h3>
                        <p className="text-gray-600">{property.yearBuilt}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Description */}
                {property.description && (
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50"
                  >
                    <FileText className="h-6 w-6 text-purple-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Description</h3>
                      <p className="text-gray-600">{property.description}</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 px-6 py-4 flex justify-end space-x-3"
          >
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

PropertyDetail.propTypes = {
  property: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.number,
    yearBuilt: PropTypes.number,
    description: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PropertyDetail;

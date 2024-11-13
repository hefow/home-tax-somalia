import React from 'react';
import { motion } from 'framer-motion';
import { X, Home, DollarSign, Ruler, Calendar, FileText, Info } from 'lucide-react';
import PropTypes from 'prop-types';
import { createProperty, getCurrentUser } from '../../services/api';
import toast from 'react-hot-toast';

export function AddPropertyForm({ onClose, onSubmit }) {
  const [formData, setFormData] = React.useState({
    address: '',
    type: 'House',
    size: {
      square: 0,
      feet: 0,
      total: 0
    },
    value: 0,
    yearBuilt: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const propertyData = {
        address: formData.address,
        type: formData.type,
        size: {
          square: Number(formData.size),
          feet: Number(formData.sizeFt),
          total: Number(formData.totalSize)
        },
        value: Number(formData.value),
        yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : undefined,
        description: formData.description || undefined
      };

      console.log('Submitting property data:', propertyData);
      
      await onSubmit(propertyData);

      // After successful property addition, create activity
      await fetch('http://localhost:5000/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'property',
          activity: `Added new property at ${propertyData.address}`
        })
      });
    } catch (error) {
      console.error('Error in form submission:', error);
      toast.error('Failed to add property. Please try again.');
    }
  };

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
        className="card w-full max-w-2xl bg-base-100 shadow-2xl"
      >
        {/* Card Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Add New Property</h2>
            </div>
            <button
              onClick={onClose}
              className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center space-x-2">
                  <Home className="h-4 w-4 text-blue-500" />
                  <span>Property Address</span>
                </span>
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="input input-bordered focus:input-primary"
                placeholder="Enter property address"
              />
            </div>

            {/* Property Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center space-x-2">
                  <Home className="h-4 w-4 text-blue-500" />
                  <span>Property Type</span>
                </span>
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="select select-bordered focus:select-primary"
              >
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>
            </div>

            {/* Size and Value Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center space-x-2">
                    <Ruler className="h-4 w-4 text-blue-500" />
                    <span>Size</span>
                  </span>
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      required
                      value={formData.size}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        const sqft = value * formData.sizeFt || 0;
                        setFormData({ 
                          ...formData, 
                          size: value,
                          totalSize: sqft 
                        });
                      }}
                      className="input input-bordered focus:input-primary w-full"
                      placeholder="Square"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      sq
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      required
                      value={formData.sizeFt}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        const sqft = formData.size * value || 0;
                        setFormData({ 
                          ...formData, 
                          sizeFt: value,
                          totalSize: sqft 
                        });
                      }}
                      className="input input-bordered focus:input-primary w-full"
                      placeholder="Feet"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      ft
                    </span>
                  </div>
                </div>
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    Total: {formData.totalSize || 0} sq ft
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span>Value ($)</span>
                  </span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  className="input input-bordered focus:input-primary"
                  placeholder="Value"
                />
              </div>
            </div>

            {/* Year Built */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>Year Built</span>
                </span>
              </label>
              <input
                type="number"
                value={formData.yearBuilt || ''}
                onChange={(e) => setFormData({ ...formData, yearBuilt: Number(e.target.value) })}
                className="input input-bordered focus:input-primary"
                placeholder="Year built (optional)"
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span>Property Description</span>
                </span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="textarea textarea-bordered focus:textarea-primary min-h-[120px] pl-10 w-full resize-y"
                  placeholder="Describe your property (e.g., features, condition, recent renovations)"
                />
              </div>
              <div className="mt-2 flex items-start space-x-2">
                <div className="flex-shrink-0 text-gray-400">
                  <Info className="h-4 w-4" />
                </div>
                
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-primary"
              >
                Add Property
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

AddPropertyForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddPropertyForm;

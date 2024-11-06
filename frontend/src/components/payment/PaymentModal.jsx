import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard } from 'lucide-react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function PaymentModal({ plan, onSuccess, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      console.log('Starting payment process for plan:', plan);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: plan.price,
          planId: plan.id,
          planName: plan.name
        })
      });

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout session');
      }

      const data = await response.json();

      if (data.success) {
        // Store payment details for success page
        localStorage.setItem('paymentSuccess', JSON.stringify({
          planName: plan.name,
          amount: plan.price,
          date: new Date().toISOString()
        }));
        
        // Close modal and navigate to success page
        onClose();
        navigate('/payment-success');
      } else if (data.url) {
        // For external payment processing
        localStorage.setItem('pendingPayment', JSON.stringify({
          planId: plan.id,
          planName: plan.name,
          amount: plan.price
        }));
        window.location.href = data.url;
      }
      
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('Failed to initialize payment: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden p-6"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Payment Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Plan Details */}
          <div className="mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{plan.name} Plan</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="text-2xl font-bold">${plan.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl text-white font-semibold
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            <span className="flex items-center justify-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>
                {isLoading ? 'Processing...' : 'Proceed to Payment'}
              </span>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

PaymentModal.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PaymentModal; 
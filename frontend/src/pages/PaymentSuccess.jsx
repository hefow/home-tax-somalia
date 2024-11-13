import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowRight } from 'lucide-react';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    paymentDetails: null,
    countdown: 5
  });

  useEffect(() => {
    // Get payment details from localStorage
    const paymentDetails = localStorage.getItem('paymentSuccess');
    if (paymentDetails) {
      try {
        const details = JSON.parse(paymentDetails);
        setState(prev => ({
          ...prev,
          paymentDetails: details
        }));
      } catch (error) {
        console.error('Error parsing payment details:', error);
      }
    }

    // Start countdown
    const timer = setInterval(() => {
      setState(prev => {
        if (prev.countdown <= 1) {
          clearInterval(timer);
          navigate('/homeowner', { replace: true });
          return prev;
        }
        return {
          ...prev,
          countdown: prev.countdown - 1
        };
      });
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(timer);
      localStorage.removeItem('paymentSuccess');
      localStorage.removeItem('pendingPayment');
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        {state.paymentDetails && (
          <div className="mb-8 text-gray-600">
            <p className="mb-2">You have successfully subscribed to:</p>
            <p className="text-xl font-semibold text-blue-600">
              {state.paymentDetails.planName} Plan
            </p>
            <p className="text-lg">
              ${state.paymentDetails.amount}/month
            </p>
          </div>
        )}

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/homeowner')}
            className="w-full py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-5 w-5" />
          </motion.button>
          
          <p className="text-sm text-gray-500">
            Redirecting to dashboard in {state.countdown} seconds...
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess; 
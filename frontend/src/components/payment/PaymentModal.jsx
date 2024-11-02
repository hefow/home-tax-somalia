import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, CreditCard, CheckCircle, AlertCircle, Check } from 'lucide-react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ plan, onSuccess, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('initial');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        setPaymentStatus('error');
        setErrorMessage(error.message);
        toast.error(error.message);
      } else {
        setPaymentStatus('success');
        onSuccess();
        toast.success('Payment processed successfully!');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      setPaymentStatus('error');
      setErrorMessage('Payment processing failed. Please try again.');
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium
          ${isProcessing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        <span className="flex items-center justify-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>
            {isProcessing ? 'Processing...' : `Pay $${plan.price.toFixed(2)}`}
          </span>
        </span>
      </motion.button>

      {paymentStatus === 'success' && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Payment successful!</span>
        </div>
      )}

      {paymentStatus === 'error' && (
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>Payment failed. Please try again.</span>
        </div>
      )}
    </form>
  );
}

function PaymentModal({ plan, onSuccess, onClose }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        console.log('Sending payment request:', {
          amount: plan.price,
          planId: plan.id,
          planName: plan.name
        }); // Debug log

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/create-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            amount: plan.price,
            planId: plan.id,
            planName: plan.name
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || data.error || 'Failed to create payment intent');
        }

        console.log('Payment intent created:', data); // Debug log
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error details:', err);
        setError(err.message);
        toast.error('Failed to initialize payment: ' + err.message);
      }
    };

    fetchPaymentIntent();
  }, [plan]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-red-600">Error</h3>
          <p>{error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

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
          className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {plan.name} Plan
                  </h2>
                  <p className="text-white/80">
                    ${plan.price}/month
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Plan Details */}
          <div className="p-6 border-b">
            <h3 className="font-semibold text-gray-900 mb-2">Plan Features:</h3>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Form */}
          <div className="p-6">
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm
                  plan={plan}
                  onSuccess={onSuccess}
                  onClose={onClose}
                />
              </Elements>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

CheckoutForm.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

PaymentModal.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PaymentModal; 
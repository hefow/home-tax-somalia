import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Home, Building, Building2, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentModal from '../components/payment/PaymentModal';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    icon: Home,
    price: 10,
    description: 'Perfect for single property owners',
    features: [
      'Single property management',
      'Basic tax calculations',
      'Email support',
      'Monthly reports',
      'Mobile app access',
    ],
    notIncluded: [
      'Multiple properties',
      'Priority support',
      'Tax planning tools',
      'Advanced analytics',
    ],
    color: 'blue',
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Building,
    price: 25,
    description: 'Ideal for multiple properties',
    features: [
      'Up to 5 properties',
      'Advanced tax calculations',
      'Priority email & phone support',
      'Real-time tax updates',
      'Mobile app access',
      'Tax planning tools',
      'Basic analytics',
    ],
    notIncluded: [
      'Unlimited properties',
      'Custom reports',
      'Advanced analytics',
    ],
    color: 'indigo',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Building2,
    price: 50,
    description: 'For large property portfolios',
    features: [
      'Unlimited properties',
      'Advanced tax calculations',
      '24/7 Priority support',
      'Real-time tax updates',
      'Mobile app access',
      'Advanced tax planning',
      'Custom reports',
      'Advanced analytics',
      'API access',
    ],
    notIncluded: [],
    color: 'purple',
    popular: false,
  },
];

function PricingCard({ plan, onSelectPlan }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlanSelect = () => {
    if (!user) {
      // If not logged in, redirect to signup
      navigate('/signup');
      return;
    }
    // If logged in, open payment modal
    onSelectPlan(plan);
  };

  const baseClasses = `relative rounded-2xl p-8 shadow-xl transition-transform duration-300
    ${plan.popular ? 'border-2 border-indigo-500' : 'border border-gray-200'}`;

  const buttonClasses = `
    w-full py-3 px-6 rounded-xl text-white font-semibold
    transition-all duration-200 transform hover:scale-105
    ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-800 hover:bg-gray-900'}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ translateY: -10 }}
      className={baseClasses}
    >
      {plan.popular && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <div className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center">
        <plan.icon className="w-12 h-12 mx-auto text-indigo-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="text-gray-600 mb-6">{plan.description}</div>
        <div className="flex items-center justify-center mb-8">
          <DollarSign className="w-6 h-6 text-gray-600" />
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          <span className="text-gray-600 ml-2">/month</span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
        {plan.notIncluded.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 opacity-50">
            <X className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handlePlanSelect}
        className={buttonClasses}
      >
        {user ? 'Select Plan' : 'Sign Up'}
      </button>
    </motion.div>
  );
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePaymentSuccess = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          planId: selectedPlan.id,
          planName: selectedPlan.name
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      toast.success(`Successfully subscribed to ${selectedPlan.name} plan!`);
      navigate('/homeowner');
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast.error('Failed to update subscription');
    } finally {
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Choose the perfect plan for your property tax management needs
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard 
              key={plan.id} 
              plan={plan} 
              onSelectPlan={setSelectedPlan}
            />
          ))}
        </div>

        {selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            onSuccess={handlePaymentSuccess}
            onClose={() => setSelectedPlan(null)}
          />
        )}

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-900 mb-10"
          >
            Frequently Asked Questions
          </motion.h2>
          {/* Add FAQ items here if needed */}
        </div>
      </div>
    </div>
  );
}

export default Pricing; 
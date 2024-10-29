import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Shield, Calculator, Clock, ArrowRight } from 'lucide-react';
import Header from '../components/common/Header';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Manage Your Property Tax with Ease
              </h1>
              <p className="text-xl text-gray-100">
                Streamline your property tax management with our comprehensive platform designed for Somali homeowners.
              </p>
              <div className="flex space-x-4">
                <Link 
                  to="/signup" 
                  className="btn bg-white text-blue-600 hover:bg-gray-100"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="btn bg-blue-700 text-white hover:bg-blue-800"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <img 
                src="/images/hero-image.png" 
                alt="Property Management" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-blue-600 rounded-2xl text-white p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of homeowners managing their property tax efficiently.
            </p>
            <Link 
              to="/signup" 
              className="inline-flex items-center btn bg-white text-blue-600 hover:bg-gray-100"
            >
              Create Account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <HomeIcon className="h-6 w-6 text-blue-500" />,
    title: "Property Management",
    description: "Easily manage multiple properties and track their tax status in one place."
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    title: "Secure Platform",
    description: "Your data is protected with enterprise-grade security measures."
  },
  {
    icon: <Calculator className="h-6 w-6 text-blue-500" />,
    title: "Tax Calculator",
    description: "Calculate your property tax accurately with our built-in calculator."
  }
];

const steps = [
  {
    title: "Create Account",
    description: "Sign up and verify your identity as a property owner."
  },
  {
    title: "Add Properties",
    description: "Add your properties with relevant details and documentation."
  },
  {
    title: "Track Taxes",
    description: "Monitor tax assessments and payment schedules."
  },
  {
    title: "Stay Updated",
    description: "Receive notifications about deadlines and policy changes."
  }
];

export default HomePage;

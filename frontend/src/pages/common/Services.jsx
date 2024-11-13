import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  DollarSign, 
  Shield, 
  Clock, 
  Smartphone,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

function Services() {
  const services = [
    {
      icon: Home,
      title: "Property Registration",
      description: "Diiwaangelinta guryaha iyo dhulalka si fudud oo digital ah.",
      color: "blue"
    },
    {
      icon: DollarSign,
      title: "Tax Payments",
      description: "Bixinta cashuurta si digital ah iyadoo la adeegsanayo habab kala duwan.",
      color: "green"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Maareynta dukumentiyada la xiriira guryaha iyo cashuurta.",
      color: "purple"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Platform ammaan ah oo lagu keydiyo xogta muhiimka ah.",
      color: "red"
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Helitaanka adeegyada 24-ka saac maalintii.",
      color: "yellow"
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description: "Isticmaalka adeegyada telefoonada casriga ah.",
      color: "indigo"
    },
    {
      icon: AlertCircle,
      title: "Issue Reporting",
      description: "Soo sheegista dhibaatooyinka la xiriira adeegyada.",
      color: "pink"
    },
    {
      icon: HelpCircle,
      title: "Support Services",
      description: "Adeegyo taageero oo 24/7 ah.",
      color: "teal"
    }
  ];

  const getColorClasses = (color) => {
    const classes = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      red: "bg-red-100 text-red-600",
      yellow: "bg-yellow-100 text-yellow-600",
      indigo: "bg-indigo-100 text-indigo-600",
      pink: "bg-pink-100 text-pink-600",
      teal: "bg-teal-100 text-teal-600"
    };
    return classes[color] || classes.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Waxaan bixinaa adeegyo kala duwan oo la xiriira maareynta cashuurta guryaha 
            iyo adeegyo kale oo la xiriira.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-block p-3 rounded-lg ${getColorClasses(service.color)} mb-4`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services; 
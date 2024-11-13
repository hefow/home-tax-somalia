import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Award, CheckCircle } from 'lucide-react';

function About() {
  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Home Tax Somalia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Waxaan nahay shirkad horumarinaysa habka cashuurta guryaha Soomaaliya, 
            iyadoo la adeegsanayo teknoolajiyada casriga ah.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              In aan fududeyno habka cashuur bixinta guryaha, iyadoo la adeegsanayo 
              teknoolajiyada casriga ah, si loo hubiyo in dadka guryaha leh ay si fudud 
              u bixin karaan cashuurtooda.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600">
              In aan noqono shirkadda ugu horeysa ee bixisa adeegyada casriyeynta 
              cashuur bixinta guryaha Soomaaliya, iyadoo la hubinayo in la helo 
              natiijooyin wanaagsan.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Customer First",
                description: "Waxaan mudnaanta siinaa baahiyaha macaamiisheena"
              },
              {
                icon: CheckCircle,
                title: "Integrity",
                description: "Waxaan ku shaqeynaa si daacad ah oo hufan"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Waxaan ku dadaalnaa in aan bixino adeeg tayo sare leh"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-center mb-4">
                  <value.icon className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About; 
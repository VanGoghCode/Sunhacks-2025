'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';

const WhoYouCanHelpSection = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'receive'>('donate');

  const donateInfo = {
    title: 'I Have Laptops to Donate',
    subtitle: 'Perfect for companies, government agencies, and individuals',
    features: [
      {
        icon: '🏢',
        title: 'Corporate Partners',
        description: 'Complete ESG compliance reports and CO₂ certificates for your annual reporting'
      },
      {
        icon: '🔒',
        title: 'Data Security Guaranteed', 
        description: 'Government-certified data wiping with SHA-256 verification and compliance reports'
      },
      {
        icon: '📊',
        title: 'Full Impact Transparency',
        description: 'See exactly which school received your laptops with photos and teacher feedback'
      },
      {
        icon: '🚚',
        title: 'Zero Hassle Pickup',
        description: 'We handle everything - from collection to refurbishment to final delivery'
      }
    ],
    cta: 'Donate Your Laptops'
  };

  const receiveInfo = {
    title: 'I Need Laptops for My School/NGO',
    subtitle: 'Verified educational institutions and registered NGOs',
    features: [
      {
        icon: '🎓',
        title: 'Educational Organizations',
        description: 'Schools, universities, and educational nonprofits with verified .edu or .org domains'
      },
      {
        icon: '🌍',
        title: 'NGOs & Charities',
        description: 'Registered nonprofits focused on education, digital literacy, and community development'
      },
      {
        icon: '💻',
        title: 'Quality Assured Devices',
        description: 'All laptops are professionally tested, refurbished, and come with basic warranty'
      },
      {
        icon: '📚',
        title: 'Learning Support',
        description: 'Optional digital literacy training and ongoing technical support included'
      }
    ],
    cta: 'Request Laptops'
  };

  const currentInfo = activeTab === 'donate' ? donateInfo : receiveInfo;

  return (
    <section id="who-you-can-help" className="py-20 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
              Who You Can Help
            </span>
          </h2>
          
          {/* Toggle Buttons */}
          <div className="inline-flex bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50">
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'donate'
                  ? 'bg-gradient-to-r from-green-600 to-forest-600 text-green-900 shadow-lg'
                  : 'text-green-600 hover:bg-green-50/50'
              }`}
            >
              I have laptops
            </button>
            <button
              onClick={() => setActiveTab('receive')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'receive'
                  ? 'bg-gradient-to-r from-green-600 to-forest-600 text-green-900 shadow-lg'
                  : 'text-green-600 hover:bg-green-50/50'
              }`}
            >
              I need laptops
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/50">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
              {currentInfo.title}
            </h3>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">
              {currentInfo.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {currentInfo.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white/50 rounded-2xl shadow-sm border border-white/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-forest-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-green-800 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-green-700">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg" className="px-12">
              {currentInfo.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoYouCanHelpSection;
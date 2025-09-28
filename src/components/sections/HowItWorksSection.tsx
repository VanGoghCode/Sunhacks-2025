'use client';

import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: '1',
      icon: '💻',
      title: 'Pick OS & Download Script',
      description: 'Choose your operating system and download our certified data wipe script. SHA-256 verified for security.',
      image: '/api/placeholder/300/200'
    },
    {
      number: '2', 
      icon: '🔄',
      title: 'Run Script & Schedule Pickup',
      description: 'Execute the wipe script overnight, mark devices as ready, and book a convenient pickup slot.',
      image: '/api/placeholder/300/200'
    },
    {
      number: '3',
      icon: '🎒',
      title: 'We Pick Up & Deliver',
      description: 'Our team collects, refurbishes, and delivers directly to schools. You get live updates and impact reports.',
      image: '/api/placeholder/300/200'
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-green-50/50 to-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-green-800 max-w-2xl mx-auto">
            Three simple steps to turn your old laptops into educational opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-forest-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                {step.number}
              </div>
              
              {/* Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-forest-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-green-700 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-forest-500 relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-forest-500 border-y-2 border-y-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
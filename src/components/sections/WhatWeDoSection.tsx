'use client';

import React from 'react';

const WhatWeDoSection = () => {
  const services = [
    {
      icon: '🔒',
      title: 'Government-Certified Data Wiping',
      description: 'Military-grade data destruction with certified compliance reports',
    },
    {
      icon: '🔧',
      title: 'Professional Refurbishment',  
      description: 'Expert hardware testing, repair, and performance optimization',
    },
    {
      icon: '🚚',
      title: 'Direct School Delivery',
      description: 'Hand-delivered to verified NGOs and schools with live tracking',
    },
  ];

  return (
    <section id="what-we-do" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
              What We Do
            </span>
          </h2>
          <p className="text-xl text-green-800 max-w-3xl mx-auto">
            We transform your end-of-life laptops into learning opportunities while ensuring complete data security and environmental responsibility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/50 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-forest-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">
                {service.title}
              </h3>
              <p className="text-green-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
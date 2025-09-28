'use client';

import React from 'react';

const SocialProofSection = () => {

  const stats = [
    { number: '12,847', label: 'Laptops Donated', suffix: '' },
    { number: '156,200', label: 'kg CO₂ Saved', suffix: '' },
    { number: '89', label: 'NGOs Connected', suffix: '+' },
    { number: '25,394', label: 'Kids Learning', suffix: '+' },
  ];

  return (
    <section id="social-proof" className="py-12 bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Stats Counter */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-sm text-green-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
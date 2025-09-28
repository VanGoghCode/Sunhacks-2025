'use client';

import React from 'react';

const SocialProofSection = () => {
  const badges = [
    { name: 'Government Certified', icon: '🏛️' },
    { name: 'ISO 27001', icon: '🔒' },
    { name: 'ESG Compliant', icon: '📊' },
    { name: 'Carbon Negative', icon: '🌱' },
  ];

  const stats = [
    { number: '12,847', label: 'Laptops Donated', suffix: '' },
    { number: '156,200', label: 'kg CO₂ Saved', suffix: '' },
    { number: '89', label: 'NGOs Connected', suffix: '+' },
    { number: '25,394', label: 'Kids Learning', suffix: '+' },
  ];

  return (
    <section id="social-proof" className="py-12 bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Proof Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/30"
            >
              <span className="text-lg">{badge.icon}</span>
              <span className="text-sm font-medium text-green-700">{badge.name}</span>
            </div>
          ))}
        </div>

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
'use client';

import React from 'react';
import { Button } from '../ui/Button';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🌱',
      title: 'Eco-Certified Products',
      description: 'Every product on our platform is verified for sustainability and environmental impact.',
      gradient: 'from-green-400 to-forest-500',
    },
    {
      icon: '🚚',
      title: 'Carbon-Neutral Delivery',
      description: 'All our shipments are carbon-neutral with recyclable packaging materials.',
      gradient: 'from-forest-400 to-green-500',
    },
    {
      icon: '🤝',
      title: 'Community Impact',
      description: 'Join a community of eco-warriors making real change in their local communities.',
      gradient: 'from-green-500 to-leaf-500',
    },
  ];

  const stats = [
    { number: '50K+', label: 'CO₂ Saved (kg)', icon: '🌍' },
    { number: '25K+', label: 'Trees Planted', icon: '🌳' },
    { number: '100+', label: 'Partner Brands', icon: '🤝' },
    { number: '15K+', label: 'Happy Customers', icon: '😊' },
  ];

  return (
    <section className="py-20 relative">
      {/* Additional subtle overlay for this section */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5"></div>
      
      {/* Features Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
              Why Choose Loop It?
            </span>
          </h2>
          <p className="text-xl text-green-800 max-w-2xl mx-auto">
            We&apos;re committed to making sustainable living accessible, affordable, and impactful for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/50"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-green-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/50">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
              Our Environmental Impact
            </h3>
            <p className="text-green-800 max-w-2xl mx-auto">
              Together, we&apos;re making a measurable difference in protecting our planet for future generations.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">
                  {stat.number}
                </div>
                <div className="text-green-700 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">
            Ready to Make a Difference?
          </h3>
          <p className="text-xl text-green-800 mb-8 max-w-2xl mx-auto">
            Join thousands of eco-conscious consumers making sustainable choices every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Start Shopping
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
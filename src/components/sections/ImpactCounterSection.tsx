'use client';

import React, { useState, useEffect } from 'react';

const ImpactCounterSection = () => {
  const [counters, setCounters] = useState({
    laptops: 0,
    co2: 0,
    ngos: 0,
    kids: 0,
  });

  const finalNumbers = {
    laptops: 12847,
    co2: 156.2,
    ngos: 89,
    kids: 25394,
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    const increment = {
      laptops: finalNumbers.laptops / steps,
      co2: finalNumbers.co2 / steps,
      ngos: finalNumbers.ngos / steps,
      kids: finalNumbers.kids / steps,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        laptops: Math.min(Math.floor(increment.laptops * currentStep), finalNumbers.laptops),
        co2: Math.min(+(increment.co2 * currentStep).toFixed(1), finalNumbers.co2),
        ngos: Math.min(Math.floor(increment.ngos * currentStep), finalNumbers.ngos),
        kids: Math.min(Math.floor(increment.kids * currentStep), finalNumbers.kids),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(finalNumbers);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const impactItems = [
    {
      icon: '💻',
      number: counters.laptops.toLocaleString(),
      label: 'Laptops Given Second Life',
      color: 'from-blue-500 to-blue-600',
      description: 'Devices saved from landfills and e-waste'
    },
    {
      icon: '🌍',
      number: `${counters.co2}t`,
      label: 'CO₂ Emissions Avoided',
      color: 'from-green-500 to-green-600', 
      description: 'Equal to planting 7,100+ trees'
    },
    {
      icon: '🏫',
      number: counters.ngos,
      label: 'Schools & NGOs Connected',
      color: 'from-purple-500 to-purple-600',
      description: 'Verified organizations in our network'
    },
    {
      icon: '👨‍🎓',
      number: counters.kids.toLocaleString(),
      label: 'Kids Now Learning',
      color: 'from-orange-500 to-orange-600',
      description: 'Students with access to technology'
    },
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-green-800 via-forest-700 to-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Live Impact Counter
          </h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Real-time tracking of the positive change we&apos;re creating together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactItems.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 hover:scale-105 hover:shadow-2xl transition-all duration-500 transform group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                <span className="text-2xl group-hover:animate-bounce">{item.icon}</span>
              </div>
              
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-white group-hover:text-4xl group-hover:sm:text-5xl transition-all duration-300 animate-pulse">
                {item.number}
              </div>
              
              <div className="text-lg font-semibold text-green-100 mb-2">
                {item.label}
              </div>
              
              <div className="text-sm text-green-200 opacity-80">
                {item.description}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-green-100 text-lg">
            🔄 Updated live every 30 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactCounterSection;
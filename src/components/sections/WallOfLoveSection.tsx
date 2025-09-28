'use client';

import React, { useState, useEffect } from 'react';

const WallOfLoveSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      text: "Amazing! Our 50 old laptops are now helping kids in rural Maharashtra learn coding. The whole process was seamless and we got beautiful photos of the impact.",
      author: "Sarah Chen",
      role: "CSR Manager, TechCorp India",
      company: "TechCorp",
      rating: 5,
      image: "/api/placeholder/60/60",
      impact: "50 laptops donated"
    },
    {
      id: 2,
      text: "The data wiping was government-certified and the ESG report helped us with our sustainability audit. Plus, seeing the kids' faces when they got the laptops was priceless!",
      author: "Marcus Johnson",
      role: "IT Director, GreenTech Solutions",
      company: "GreenTech",
      rating: 5,
      image: "/api/placeholder/60/60",
      impact: "120 laptops donated"
    },
    {
      id: 3,
      text: "Our school received 25 refurbished laptops that work perfectly. The digital literacy training included was fantastic. Our students are now learning Python!",
      author: "Priya Sharma",
      role: "Principal, Sunshine Public School",
      company: "Sunshine School",
      rating: 5,
      image: "/api/placeholder/60/60",
      impact: "25 laptops received"
    },
    {
      id: 4,
      text: "Professional service from pickup to delivery. The CO₂ certificate showed we avoided 5.2 tonnes of emissions. Perfect for our annual sustainability report.",
      author: "David Park",
      role: "Operations Manager, EcoStart",
      company: "EcoStart",
      rating: 5,
      image: "/api/placeholder/60/60",
      impact: "85 laptops donated"
    },
    {
      id: 5,
      text: "The kids were so excited! These laptops opened up a whole new world of learning for them. Thank you to the company that donated these amazing devices.",
      author: "Sister Maria",
      role: "Director, Hope Foundation",
      company: "Hope Foundation",
      rating: 5,
      image: "/api/placeholder/60/60",
      impact: "40 laptops received"
    }
  ];

  // Auto-rotate reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-green-50/50 to-white/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.6) 1px, transparent 0)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
              Wall of Love
            </span>
          </h2>
          <p className="text-xl text-green-800 max-w-2xl mx-auto">
            Real stories from companies that donated and schools that received laptops
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/50 max-w-4xl mx-auto hover:shadow-2xl hover:scale-105 transition-all duration-500">
            {/* Stars Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className="text-yellow-400 text-2xl hover:scale-125 hover:rotate-12 transition-transform duration-300 animate-pulse cursor-pointer"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  ⭐
                </span>
              ))}
            </div>

            {/* Review Text */}
            <blockquote className="text-xl text-green-800 text-center mb-8 leading-relaxed">
              &quot;{reviews[currentIndex].text}&quot;
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-forest-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {reviews[currentIndex].author.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-green-800">
                  {reviews[currentIndex].author}
                </div>
                <div className="text-green-600">
                  {reviews[currentIndex].role}
                </div>
                <div className="text-sm text-green-500">
                  {reviews[currentIndex].company}
                </div>
              </div>
            </div>

            {/* Impact Badge */}
            <div className="text-center">
              <span className="inline-block bg-gradient-to-r from-green-500 to-forest-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {reviews[currentIndex].impact}
              </span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-green-700 hover:bg-white transition-all duration-300 hover:shadow-xl"
          >
            ←
          </button>
          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-green-700 hover:bg-white transition-all duration-300 hover:shadow-xl"
          >
            →
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-green-600 w-8' 
                  : 'bg-green-300 hover:bg-green-400'
              }`}
            />
          ))}
        </div>

        {/* Social Proof Counter */}
        <div className="text-center mt-12">
          <p className="text-green-700 font-medium">
            📸 Join 500+ companies and 200+ schools sharing their impact stories
          </p>
        </div>
      </div>
    </section>
  );
};

export default WallOfLoveSection;
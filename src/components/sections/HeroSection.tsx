"use client";

import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Floating Glass Elements */}
      <div className="absolute inset-0">
        {/* Neon Green Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-float shadow-2xl shadow-green-400/20"></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-300/25 to-teal-400/15 rounded-full blur-3xl animate-float shadow-2xl shadow-green-300/15"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-lime-400/20 to-green-500/15 rounded-full blur-3xl animate-float shadow-2xl shadow-lime-400/10"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Additional Neon Effects */}
        <div
          className="absolute top-1/6 right-1/3 w-32 h-32 bg-gradient-to-br from-cyan-400/40 to-blue-300/25 rounded-full blur-2xl animate-float shadow-xl shadow-cyan-400/30"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/6 w-48 h-48 bg-gradient-to-br from-green-500/35 to-emerald-400/20 rounded-full blur-3xl animate-float shadow-xl shadow-green-500/25"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Subtle Neon Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.6) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Enhanced Glass Overlay with Neon Tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-green-50/10 to-white/20 backdrop-blur-[1px]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          {/* Main Heading with Staggered Animations */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight overflow-hidden">
            <span className="inline-block">
              <span className="inline-block animate-slide-up-delay-1 bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
                Close
              </span>
              <span className="inline-block animate-slide-up-delay-2 bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent mx-2">
                the
              </span>
              <span className="inline-block animate-slide-up-delay-3 bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
                Loop
              </span>
              <span className="inline-block animate-slide-up-delay-4 bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent mx-2">
                on
              </span>
              <span className="inline-block animate-slide-up-delay-5 bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
                E-Waste
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-green-800 mb-8 max-w-4xl mx-auto leading-relaxed">
            From your office to the classroom: certified data destruction, refurbishment, and donation reporting in one service.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ConnectedNGOsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const ngoLogos = [
    { name: 'TechCorps', logo: '🏫', state: 'California' },
    { name: 'Digital Divide', logo: '💻', state: 'Texas' },
    { name: 'Computers 4 Kids', logo: '📚', state: 'New York' },
    { name: 'World Computer Exchange', logo: '🎓', state: 'Florida' },
    { name: 'Tech Goes Home', logo: '✏️', state: 'Massachusetts' },
    { name: 'Digital Wish', logo: '🧠', state: 'Illinois' },
    { name: 'EveryoneOn', logo: '🌐', state: 'Washington' },
    { name: 'National Cristina Foundation', logo: '📖', state: 'Connecticut' },
  ];

  // NGOs with actual available images
  const connectedNGOs = [
    { name: 'Bright Minds', logo: 'bright-minds.png' },
    { name: 'Education and Power', logo: 'education-and-power.png' },
    { name: 'Education First', logo: 'education-first.png' },
    { name: 'Future Leaders', logo: 'Future-leaders.png' },
    { name: 'Learn and Grow', logo: 'learn-and-grow.png' },
    { name: 'Nurturing Minds and Growth', logo: 'nurturin-minds-and-growth.png' },
    { name: 'Roots and Knowledge', logo: 'roots-and-kowledge.png' },
    { name: 'Roshan E Taleem', logo: 'roshan-e-taleem.png' },
    { name: 'Tech4All', logo: 'tech4all.png' },
    { name: 'Bright Minds Academy', logo: 'bright-minds.png' },
    { name: 'Education and Power Foundation', logo: 'education-and-power.png' },
    { name: 'Education First Trust', logo: 'education-first.png' },
    { name: 'Future Leaders Institute', logo: 'Future-leaders.png' },
    { name: 'Learn and Grow Society', logo: 'learn-and-grow.png' },
  ];

  const ngosByState = {
    'California': [
      { name: 'TechCorps Bay Area', location: 'San Francisco', students: 650, verified: '2023' },
      { name: 'Silicon Valley Education Foundation', location: 'San Jose', students: 480, verified: '2022' },
      { name: 'LA Digital Academy', location: 'Los Angeles', students: 520, verified: '2023' },
    ],
    'Texas': [
      { name: 'Digital Divide Dallas', location: 'Dallas', students: 580, verified: '2023' },
      { name: 'Austin Tech Alliance', location: 'Austin', students: 420, verified: '2022' },
      { name: 'Houston Learning Hub', location: 'Houston', students: 390, verified: '2023' },
    ],
    'New York': [
      { name: 'NYC Computer Access Center', location: 'New York City', students: 720, verified: '2023' },
      { name: 'Buffalo Digital Initiative', location: 'Buffalo', students: 340, verified: '2022' },
      { name: 'Albany Tech Foundation', location: 'Albany', students: 280, verified: '2023' },
    ],
    'Florida': [
      { name: 'Miami Digital Bridge', location: 'Miami', students: 460, verified: '2023' },
      { name: 'Orlando Tech Education', location: 'Orlando', students: 350, verified: '2022' },
      { name: 'Tampa Learning Center', location: 'Tampa', students: 320, verified: '2023' },
    ],
    'Massachusetts': [
      { name: 'Boston Tech Initiative', location: 'Boston', students: 540, verified: '2023' },
      { name: 'Cambridge Digital Lab', location: 'Cambridge', students: 380, verified: '2022' },
      { name: 'Worcester Education Hub', location: 'Worcester', students: 290, verified: '2023' },
    ],
    'Illinois': [
      { name: 'Chicago Digital Academy', location: 'Chicago', students: 620, verified: '2023' },
      { name: 'Rockford Tech Center', location: 'Rockford', students: 240, verified: '2022' },
      { name: 'Peoria Learning Foundation', location: 'Peoria', students: 310, verified: '2023' },
    ],
    'Washington': [
      { name: 'Seattle Tech Alliance', location: 'Seattle', students: 580, verified: '2023' },
      { name: 'Spokane Digital Hub', location: 'Spokane', students: 220, verified: '2022' },
      { name: 'Tacoma Education Center', location: 'Tacoma', students: 350, verified: '2023' },
    ],
    'Connecticut': [
      { name: 'Hartford Tech Foundation', location: 'Hartford', students: 380, verified: '2023' },
      { name: 'New Haven Digital Center', location: 'New Haven', students: 290, verified: '2022' },
      { name: 'Bridgeport Learning Lab', location: 'Bridgeport', students: 260, verified: '2023' },
    ],
  };

  // Auto-rotate carousel (showing 6 NGOs at a time, moving one by one)
  useEffect(() => {
    if (connectedNGOs.length <= 6 || isCarouselPaused) return;
    
    const timer = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % connectedNGOs.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [connectedNGOs.length, isCarouselPaused]);

  const openModal = (state?: string) => {
    setSelectedState(state || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedState(null);
  };

  const handleManualNavigation = (newIndex: number) => {
    setCurrentCarouselIndex(newIndex);
    setIsCarouselPaused(true);
    // Resume auto-rotation after 3 seconds
    setTimeout(() => setIsCarouselPaused(false), 3000);
  };

  return (
    <section id="ngos" className="py-20 bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-700 via-forest-600 to-green-800 bg-clip-text text-transparent">
              Connected NGOs & Schools
            </span>
          </h2>
          <p className="text-xl text-green-800 max-w-2xl mx-auto mb-8">
            89+ verified educational organizations across India ready to receive your laptop donations
          </p>
          
          {/* Horizontal NGO Logo Carousel */}
          <div 
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-green-800">Connected Organizations:</h3>
              </div>
              {connectedNGOs.length > 6 && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      const newIndex = (currentCarouselIndex - 1 + connectedNGOs.length) % connectedNGOs.length;
                      handleManualNavigation(newIndex);
                    }}
                    className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-green-600">‹</span>
                  </button>
                  <button
                    onClick={() => {
                      const newIndex = (currentCarouselIndex + 1) % connectedNGOs.length;
                      handleManualNavigation(newIndex);
                    }}
                    className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-green-600">›</span>
                  </button>
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentCarouselIndex * (100 / 6)}%)`,
                }}
              >
                {/* Create extended array for seamless looping */}
                {[...connectedNGOs, ...connectedNGOs.slice(0, 6)].map((ngo, index) => (
                  <div 
                    key={`${ngo.name}-${index}`}
                    className="flex flex-col items-center text-center flex-shrink-0 px-2"
                    style={{ width: `${100 / 6}%` }}
                  >
                    {/* NGO Logo */}
                    <div className="w-18 h-18 mb-3 bg-white rounded-xl shadow-md flex items-center justify-center overflow-hidden group hover:shadow-lg transition-all duration-300 mx-auto">
                      <Image 
                        src={`/ngos/${ngo.logo}`} 
                        alt={ngo.name}
                        width={40}
                        height={40}
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        onLoad={() => {
                          console.log(`✅ Image loaded successfully: ${ngo.logo}`);
                        }}
                        onError={() => {
                          console.log(`❌ Image failed to load: ${ngo.logo}`);
                        }}
                      />
                    </div>
                    {/* NGO Name */}
                    <p className="text-xs font-medium text-green-700 text-center leading-tight px-1">
                      {ngo.name.length > 18 ? ngo.name.substring(0, 15) + '...' : ngo.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Carousel Dots - Only show if there are more than 6 NGOs */}
            {connectedNGOs.length > 6 && (
              <div className="flex justify-center mt-6 space-x-1">
                {connectedNGOs.slice(0, Math.min(connectedNGOs.length, 10)).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleManualNavigation(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === (currentCarouselIndex % connectedNGOs.length) 
                        ? 'bg-green-600 w-6' 
                        : 'bg-green-300 hover:bg-green-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logo Cloud */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-8">
          {ngoLogos.map((ngo, index) => (
            <button
              key={index}
              onClick={() => openModal(ngo.state)}
              className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50 text-center"
            >
              {/* Logo - replace with actual images from public/ngos/ */}
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-400 to-forest-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {/* Future: <img src={`/ngos/${ngo.name.toLowerCase().replace(/\s+/g, '-')}.png`} alt={ngo.name} className="w-8 h-8" /> */}
                <span className="text-xl text-white">{ngo.logo}</span>
              </div>
              <div className="text-sm font-semibold text-green-800 mb-1">
                {ngo.name}
              </div>
              <div className="text-xs text-green-600">
                {ngo.state}
              </div>
            </button>
          ))}
        </div>
        {/* Live Status */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-100/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-medium">Live: 12 new requests this week</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-4xl max-h-[80vh] overflow-y-auto shadow-2xl border border-white/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-green-800">
                {selectedState ? `NGOs in ${selectedState}` : 'All Connected Organizations'}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300"
              >
                ✕
              </button>
            </div>

            {selectedState && ngosByState[selectedState as keyof typeof ngosByState] ? (
              <div className="space-y-4">
                {ngosByState[selectedState as keyof typeof ngosByState].map((ngo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/30"
                  >
                    <div>
                      <div className="font-semibold text-green-800">{ngo.name}</div>
                      <div className="text-green-600">{ngo.location}</div>
                    </div>
                    <div className="text-right text-sm text-green-700">
                      <div>{ngo.students} students</div>
                      <div>Verified {ngo.verified}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(ngosByState).map(([state, ngos]) => (
                  <div key={state} className="bg-white/50 rounded-2xl p-6 border border-white/30">
                    <h4 className="font-bold text-green-800 mb-4 text-lg">{state}</h4>
                    <div className="space-y-3">
                      {ngos.slice(0, 3).map((ngo, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-green-700">{ngo.name}</div>
                            <div className="text-sm text-green-600">{ngo.location}</div>
                          </div>
                          <div className="text-xs text-green-600">
                            {ngo.students} students
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedState(state)}
                      className="mt-4 text-sm text-green-600 hover:text-green-800 font-medium"
                    >
                      View all in {state} →
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-green-700 mb-4">
                Want to add your organization? 
              </p>
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300">
                Apply to Join Network
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConnectedNGOsSection;
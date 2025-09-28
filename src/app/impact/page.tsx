export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section with trusted by */}
      <div className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-4">Trusted by:</p>
            <div className="flex justify-center items-center space-x-8 opacity-50">
              <div className="w-16 h-8 bg-gray-300 rounded"></div>
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
              <div className="w-16 h-8 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Title section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-green-600 mb-6">
            Our Environmental Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Together we are Building a more sustainable future through device reuse and responsible recycling
          </p>
        </div>

        {/* Impact metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {/* Device Certified */}
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Devices Certified</h3>
            <p className="text-gray-600 leading-relaxed">
              Each device is carefully quality verified, ensuring safe reuse instead of waste
            </p>
          </div>

          {/* CO2 Emission Saved */}
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">2.5K</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Tons CO2 Saved</h3>
            <p className="text-gray-600 leading-relaxed">
              Through reuse, We've Prevented thousands of tons of Carbon emissions
            </p>
          </div>

          {/* Devices Donated */}
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">15K+</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Devices Donated</h3>
            <p className="text-gray-600 leading-relaxed">
              Extending life cycles, empowering communities
            </p>
          </div>

          {/* Communities Served */}
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Communities Served</h3>
            <p className="text-gray-600 leading-relaxed">
              Supporting Organizations and NGOs worldwide
            </p>
          </div>
        </div>

        {/* Environmental Impact Story */}
        <div className="bg-white rounded-2xl shadow-sm p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Environmental Journey</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Since our founding, we've been committed to transforming the way the world handles electronic waste. 
              Our innovative approach to device reuse and recycling has created a measurable impact on environmental sustainability.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Circular Economy</h3>
                <p className="text-gray-600">Extending device lifecycles through responsible refurbishment and reuse programs.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Security</h3>
                <p className="text-gray-600">Ensuring complete data sanitization before any device enters our reuse program.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Impact Tracking</h3>
                <p className="text-gray-600">Real-time monitoring of environmental benefits and carbon footprint reduction.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Timeline */}
        <div className="bg-white rounded-2xl shadow-sm p-12">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Our Impact Timeline</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2020</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Loop IT Founded</h3>
                  <p className="text-gray-600">Started with a mission to reduce e-waste through device reuse and responsible recycling.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2021</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">First 1,000 Devices</h3>
                  <p className="text-gray-600">Successfully processed and certified our first 1,000 devices for reuse, preventing 50 tons of e-waste.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2022</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Partnerships</h3>
                  <p className="text-gray-600">Launched partnerships with 50+ NGOs and schools, donating 5,000 devices to underserved communities.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2023</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Carbon Neutral Operations</h3>
                  <p className="text-gray-600">Achieved carbon neutral operations while processing 25,000+ devices and saving 1,250 tons of CO2.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2024</div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Expansion</h3>
                  <p className="text-gray-600">Expanded to serve 200+ communities worldwide, with plans to reach 1 million devices by 2025.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50">
        {/* Background decorative elements */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-green-100 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute right-0 top-1/4 transform -translate-x-1/4 w-80 h-80 bg-green-100 rounded-full opacity-40 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
          {/* Main headline */}
          <h1 className="text-6xl md:text-8xl font-bold text-green-600 text-center mb-8 leading-tight">
            Close The Loop on E-Waste
          </h1>
          
          {/* Central device visualization */}
          <div className="relative mt-16 mb-16">
            {/* Device frame */}
            <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-200 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-b from-blue-400 to-green-500 rounded-2xl w-80 h-60 md:w-96 md:h-72 relative overflow-hidden">
                {/* Landscape background */}
                <div className="absolute inset-0">
                  {/* Sky gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-400"></div>
                  
                  {/* Hills */}
                  <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-green-600 to-green-500 rounded-t-full"></div>
                  <div className="absolute bottom-0 left-1/4 w-32 h-20 bg-gradient-to-t from-green-700 to-green-600 rounded-t-full"></div>
                  <div className="absolute bottom-0 right-1/4 w-24 h-16 bg-gradient-to-t from-green-800 to-green-700 rounded-t-full"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    {/* Top section */}
                    <div className="flex justify-between items-start">
                      <div className="text-white text-xs opacity-90">Reports &gt; Overview</div>
                      <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-lg px-3 py-1">
                        <select className="bg-transparent text-white text-xs">
                          <option>All Regions (33) ▼</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Middle section */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white text-4xl font-bold mb-2">78%</div>
                        <div className="text-white text-sm opacity-90">Efficiency Improvements</div>
                      </div>
                    </div>
                    
                    {/* Bottom chart */}
                    <div className="flex justify-between items-end h-16">
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-white bg-opacity-80 rounded-t h-8 mb-1"></div>
                        <div className="text-white text-xs">2021</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-white bg-opacity-80 rounded-t h-12 mb-1"></div>
                        <div className="text-white text-xs">2022</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-white bg-opacity-80 rounded-t h-16 mb-1"></div>
                        <div className="text-white text-xs">2023</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 bg-white bg-opacity-80 rounded-t h-20 mb-1"></div>
                        <div className="text-white text-xs">2024</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-8">
            <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors shadow-md">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Trusted by section */}
          <div className="text-center mb-16">
            <p className="text-gray-500 text-sm mb-4">Trusted by:</p>
            <div className="flex justify-center items-center space-x-8 opacity-50">
              <div className="w-16 h-8 bg-gray-300 rounded"></div>
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
              <div className="w-16 h-8 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
              <div className="w-20 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Main title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-green-600 mb-6">
              Our Environmental Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Together we are Building a more sustainable future through device reuse and responsible recycling
            </p>
          </div>

          {/* Impact metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Device Certified */}
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
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
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
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
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
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
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
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

          {/* Environmental Journey */}
          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Our Environmental Journey</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
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
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Circular Economy</h4>
                  <p className="text-gray-600">Extending device lifecycles through responsible refurbishment and reuse programs.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Data Security</h4>
                  <p className="text-gray-600">Ensuring complete data sanitization before any device enters our reuse program.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Impact Tracking</h4>
                  <p className="text-gray-600">Real-time monitoring of environmental benefits and carbon footprint reduction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See the Big Picture Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="flex-1 bg-white p-12 rounded-2xl shadow-sm">
              <h2 className="text-5xl font-bold text-black mb-8">See the Big Picture</h2>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                Area turns your data into clear, vibrant visuals that show you exactly what's happening in each region.
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-green-600">01</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-2">Spot Trends in Seconds</h3>
                    <p className="text-gray-600">No more digging through numbers.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-green-600">02</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-2">Get Everyone on the Same Page</h3>
                    <p className="text-gray-600">Share easy-to-understand reports with your team.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-green-600">03</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-2">Make Presentations Pop</h3>
                    <p className="text-gray-600">Interactive maps and dashboards keep your audience engaged.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-green-600">04</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-2">Your Global Snapshot</h3>
                    <p className="text-gray-600">Get a quick, clear overview of your entire operation.</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors shadow-md">
                Discover More
              </button>
            </div>
            
            {/* Right Visual */}
            <div className="flex-1 bg-green-50 p-12 rounded-2xl flex items-center justify-center">
              <div className="relative">
                {/* 3D Cylinders */}
                <div className="absolute -left-8 -top-4 w-16 h-24 bg-green-200 rounded-full shadow-md transform rotate-12"></div>
                <div className="absolute left-4 -top-2 w-12 h-20 bg-green-200 rounded-full shadow-md transform -rotate-6"></div>
                <div className="absolute -left-4 top-8 w-20 h-16 bg-green-200 rounded-full shadow-md transform rotate-6"></div>
                <div className="absolute left-8 top-12 w-24 h-12 bg-green-200 rounded-full shadow-md transform -rotate-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Area Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Area?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We provide comprehensive solutions for your data visualization and environmental impact tracking needs.
          </p>
          <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors shadow-md mb-16">
            Learn More
          </button>

          {/* Comparison Table */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Area</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Advanced Analytics</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Real-time Monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Custom Dashboards</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Why Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Expert Team</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">24/7 Support</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Proven Results</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Your View</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Clear Insights</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Easy Understanding</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Actionable Data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left - Image */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto mb-4"></div>
                    <div className="text-gray-600">Abstract Sculpture</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right - Quote */}
            <div className="flex-1">
              <blockquote className="text-2xl text-gray-800 leading-relaxed mb-6">
                "Loop IT's data visualizations have transformed how we understand our environmental impact. 
                The insights are clear, actionable, and have helped us make better decisions for our sustainability goals."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AS
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Anna Smith</div>
                  <div className="text-gray-600">CEO of Area</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Your Success Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Map Your Success</h2>
            <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors shadow-md">
              Learn More
            </button>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">01</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Get Found</h3>
              <p className="text-gray-600">Discover devices ready for reuse through our comprehensive marketplace.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">02</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Create and Configure</h3>
              <p className="text-gray-600">Set up your account and configure your environmental impact tracking.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">03</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Gain True Reviews</h3>
              <p className="text-gray-600">Build trust through verified environmental impact reports and testimonials.</p>
            </div>
          </div>

          {/* Aerial Image */}
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl h-64 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🏔️</div>
              <div className="text-xl font-semibold">Aerial View of Green Hills</div>
              <div className="text-green-100">Sustainable landscapes, sustainable future</div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect with Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Connect with us</h2>
          <p className="text-lg text-gray-600 mb-8">
            Ready to start your environmental impact journey? Get in touch with our team to learn more about our solutions.
          </p>
          <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors shadow-md">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
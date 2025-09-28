export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Content Section */}
      <div className="flex-1 bg-white p-16 flex flex-col justify-center shadow-sm">
        <div className="max-w-lg">
          {/* Main Heading */}
          <h1 className="text-5xl font-bold text-black mb-8 leading-tight">
            See the Big Picture
          </h1>
          
          {/* Introductory Paragraph */}
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Area turns your data into clear, vibrant visuals that show you exactly what's happening in each region.
          </p>
          
          {/* Feature List */}
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
          
          {/* Call-to-Action Button */}
          <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors shadow-md">
            Discover More
          </button>
        </div>
      </div>
      
      {/* Right Visual Section */}
      <div className="flex-1 bg-green-50 relative flex items-center justify-center">
        {/* 3D Cylinders */}
        <div className="relative">
          {/* Back-left cylinder (tallest) */}
          <div className="absolute -left-8 -top-4 w-16 h-24 bg-green-200 rounded-full shadow-md transform rotate-12"></div>
          
          {/* Back-right cylinder (medium) */}
          <div className="absolute left-4 -top-2 w-12 h-20 bg-green-200 rounded-full shadow-md transform -rotate-6"></div>
          
          {/* Front-left cylinder (shorter, wider) */}
          <div className="absolute -left-4 top-8 w-20 h-16 bg-green-200 rounded-full shadow-md transform rotate-6"></div>
          
          {/* Front-right cylinder (shortest, widest) */}
          <div className="absolute left-8 top-12 w-24 h-12 bg-green-200 rounded-full shadow-md transform -rotate-3"></div>
        </div>
      </div>
    </div>
  );
}

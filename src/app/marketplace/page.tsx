"use client";

import { useEffect, useState } from 'react';
import { getUserSession, User } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNavbar from '@/components/DashboardNavbar';
import { Search, Heart, ShoppingCart, Star, MapPin } from 'lucide-react';

export default function MarketplacePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const featuredDevices = [
    {
      id: 1,
      title: 'ThinkPad T480 - Refurbished',
      description: 'Perfect for students and professionals',
      price: 'Free for NGOs',
      image: '💻',
      organization: 'Amazon',
      location: 'Seattle, WA',
      rating: 4.8,
      specs: ['Intel i5', '8GB RAM', '256GB SSD']
    },
    {
      id: 2,
      title: 'MacBook Air 2019 - Certified Clean',
      description: 'Ideal for creative work and education',
      price: 'Free for Schools',
      image: '💻',
      organization: 'LoopIT',
      location: 'Phoenix, AZ',
      rating: 4.9,
      specs: ['Intel i5', '8GB RAM', '128GB SSD']
    },
    {
      id: 3,
      title: 'Dell OptiPlex 7070 - Desktop',
      description: 'Great for computer labs',
      price: 'Available',
      image: '🖥️',
      organization: 'Microsoft',
      location: 'Redmond, WA',
      rating: 4.7,
      specs: ['Intel i7', '16GB RAM', '512GB SSD']
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50/30">
        <DashboardNavbar 
          title="Marketplace" 
          userName={user?.name} 
          userEmail={user?.email} 
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              Welcome to the Device Marketplace, {user?.name}!
            </h2>
            <p className="text-blue-600">
              Discover certified, secure devices donated by organizations for your cause.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for laptops, desktops, monitors..."
                className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Featured Devices */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-6">Featured Devices</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDevices.map((device) => (
                <div
                  key={device.id}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-shadow"
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{device.image}</div>
                    <h4 className="font-bold text-blue-800 mb-2">{device.title}</h4>
                    <p className="text-sm text-blue-600 mb-2">{device.description}</p>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-blue-700">{device.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {device.specs.map((spec, index) => (
                      <div key={index} className="text-xs bg-blue-50/50 rounded px-2 py-1 text-blue-700">
                        {spec}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-xs text-blue-600 mb-4">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{device.location}</span>
                    <span className="mx-2">•</span>
                    <span>by {device.organization}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="primary" size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Request
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Browse by Category</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start">
                💻 Laptops
              </Button>
              <Button variant="outline" className="justify-start">
                🖥️ Desktops
              </Button>
              <Button variant="outline" className="justify-start">
                �️ Monitors
              </Button>
              <Button variant="outline" className="justify-start">
                🖱️ Accessories
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

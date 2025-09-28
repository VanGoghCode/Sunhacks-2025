"use client";

import { useEffect, useState } from 'react';
import { getUserSession, clearUserSession, User } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import ProtectedRoute from '@/components/ProtectedRoute';
import { LogOut, Settings, Users, BarChart3, Shield, Recycle } from 'lucide-react';

export default function LoopITDashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const handleLogout = () => {
    clearUserSession();
    window.location.href = '/';
  };

  const stats = [
    { label: 'Devices Wiped', value: '1,247', icon: Shield, color: 'text-blue-600' },
    { label: 'Certificates Issued', value: '892', icon: BarChart3, color: 'text-green-600' },
    { label: 'CO₂ Saved', value: '24,800 kg', icon: Recycle, color: 'text-purple-600' },
    { label: 'Partner NGOs', value: '45', icon: Users, color: 'text-orange-600' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-forest-50/30">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-green-200/50 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-green-800">LoopIT</h1>
                </div>
                <div className="ml-4">
                  <span className="text-sm text-green-600">Organization Dashboard</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-green-800">{user?.name}</p>
                  <p className="text-xs text-green-600">{user?.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-2">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-green-600">
              Manage your device lifecycle and sustainability impact.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-green-800">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-green-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Start Device Wipe
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Partners
                </Button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-green-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-800">
                      Device wiped successfully
                    </p>
                    <p className="text-xs text-green-600">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-800">
                      Certificate issued
                    </p>
                    <p className="text-xs text-green-600">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-800">
                      New NGO partnership
                    </p>
                    <p className="text-xs text-green-600">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h3 className="text-xl font-bold text-green-800 mb-4">Organization Settings</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Settings className="w-4 h-4 mr-2" />
                General Settings
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="w-4 h-4 mr-2" />
                User Management
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
"use client";

import { useEffect, useState } from 'react';
import { getUserSession, User } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardNavbar from '@/components/DashboardNavbar';
import { Settings, Package, TrendingUp, Shield, Recycle } from 'lucide-react';

export default function AmazonDashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const stats = [
    { label: 'Devices Processed', value: '15,842', icon: Package, color: 'text-blue-600' },
    { label: 'Compliance Rate', value: '99.7%', icon: Shield, color: 'text-green-600' },
    { label: 'Cost Savings', value: '$2.4M', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Environmental Impact', value: '450 tons CO₂', icon: Recycle, color: 'text-orange-600' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50/30">
        <DashboardNavbar 
          title="Amazon Dashboard" 
          userName={user?.name} 
          userEmail={user?.email} 
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-orange-800 mb-2">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-orange-600">
              Manage your enterprise device lifecycle and compliance reporting.
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
                    <p className="text-sm text-orange-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-orange-800">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-orange-800 mb-4">Enterprise Actions</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full justify-start bg-orange-600 hover:bg-orange-700">
                  <Package className="w-4 h-4 mr-2" />
                  Bulk Device Processing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Compliance Audit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  ESG Reporting
                </Button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-orange-800 mb-4">Recent Operations</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-orange-50/50 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-orange-800">
                      Batch #A247 processed
                    </p>
                    <p className="text-xs text-orange-600">342 devices • 5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50/50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-orange-800">
                      Compliance report generated
                    </p>
                    <p className="text-xs text-orange-600">Q4 2024 • 30 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50/50 rounded-lg">
                  <Recycle className="w-5 h-5 text-orange-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-orange-800">
                      Carbon offset calculated
                    </p>
                    <p className="text-xs text-orange-600">125 tons CO₂ • 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Settings */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h3 className="text-xl font-bold text-orange-800 mb-4">Enterprise Management</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Security & Compliance
              </Button>
              <Button variant="outline" className="justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics & Insights
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
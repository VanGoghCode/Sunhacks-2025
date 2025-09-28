"use client";
import React from "react";
import Image from "next/image";
import {
  LineChart,
  PieChart,
  BarChart,
  Award,
  TreePine,
  GanttChartSquare,
  Users,
  Download,
  Upload,
  Settings,
  Menu,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { Button } from "../../components/ui/Button";

const DashboardPage = () => {
  // Mock data
  const topMetrics = [
    {
      title: "Devices Certified",
      value: "1,234",
      change: "+12%",
      icon: <Award className="w-6 h-6 text-green-600" />,
    },
    {
      title: "CO₂ Saved",
      value: "246,800 kg",
      subtext: "≈ 1,234 trees",
      icon: <TreePine className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Devices Donated",
      value: "892",
      change: "+8%",
      icon: <GanttChartSquare className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Communities Served",
      value: "45",
      change: "+5",
      icon: <Users className="w-6 h-6 text-green-600" />,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Certificate Issued",
      device: "Dell Latitude 7490",
      time: "5 minutes ago",
      icon: <Download className="w-4 h-4 text-green-600" />,
    },
    {
      id: 2,
      action: "Batch Donated",
      device: "25 Devices to TechEd NGO",
      time: "2 hours ago",
      icon: <Upload className="w-4 h-4 text-blue-600" />,
    },
    // Add more activities as needed
  ];

  const ngoRequests = [
    {
      id: 1,
      name: "TechEd Foundation",
      location: "Mumbai, India",
      needs: "15 Laptops",
      logo: "/images/ngos/education-first.png",
      deadline: "Oct 15, 2023",
    },
    {
      id: 2,
      name: "Digital Literacy Now",
      location: "Nairobi, Kenya",
      needs: "30 Desktops",
      logo: "/images/ngos/learn-and-grow.png",
      deadline: "Oct 20, 2023",
    },
    // Add more NGO requests as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Organization Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back! Here's what's happening with your devices.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">
                    {metric.value}
                  </h3>
                  {metric.change && (
                    <p className="text-sm font-medium text-green-600 mt-1">
                      {metric.change} this month
                    </p>
                  )}
                  {metric.subtext && (
                    <p className="text-sm text-gray-500 mt-1">
                      {metric.subtext}
                    </p>
                  )}
                </div>
                <div className="p-3 bg-green-50 rounded-lg">{metric.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Devices Over Time
            </h3>
            {/* Add your line chart component here */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              Line Chart Placeholder
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Device Mix
            </h3>
            {/* Add your bar chart component here */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              Bar Chart Placeholder
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              CO₂ Avoided by Device Type
            </h3>
            {/* Add your pie chart component here */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              Pie Chart Placeholder
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Destination Breakdown
            </h3>
            {/* Add your pie chart component here */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              Pie Chart Placeholder
            </div>
          </div>
        </div>

        {/* Recent Activity & NGO Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">{activity.device}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NGO Requests */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  NGO Requests
                </h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {ngoRequests.map((ngo) => (
                  <div
                    key={ngo.id}
                    className="p-4 bg-gray-50 rounded-lg space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={ngo.logo}
                        alt={ngo.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {ngo.name}
                        </h4>
                        <p className="text-sm text-gray-600">{ngo.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-600">
                        {ngo.needs}
                      </p>
                      <p className="text-xs text-gray-500">
                        Due {ngo.deadline}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="primary" size="lg" className="w-full">
                  List Devices for Donation
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 py-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Compliant with NIST 800-88 standard for data sanitization
            </p>
            <a
              href="/contact"
              className="text-sm text-green-600 hover:text-green-700"
            >
              Contact Support
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardPage;

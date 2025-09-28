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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
import { Button } from "../../components/ui/Button";

const DashboardPage = () => {
  // Chart Data
  const devicesOverTimeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Devices Certified",
        data: [120, 150, 180, 250, 300, 280, 350, 400, 450],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
      },
      {
        label: "Devices Donated",
        data: [90, 120, 140, 200, 250, 220, 280, 320, 380],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        padding: 12,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 13,
        },
        usePointStyle: true,
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };
  const deviceMixData = {
    labels: ["Laptops", "Desktops", "Servers", "Monitors", "Phones"],
    datasets: [
      {
        label: "Number of Devices",
        data: [450, 320, 180, 250, 150],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(34, 197, 94, 0.5)",
          "rgba(34, 197, 94, 0.4)",
        ],
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const co2AvoidedData = {
    labels: ["Laptops", "Desktops", "Servers", "Monitors", "Phones"],
    datasets: [
      {
        data: [120000, 85000, 65000, 25000, 15000],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(34, 197, 94, 0.5)",
          "rgba(34, 197, 94, 0.4)",
        ],
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const destinationData = {
    labels: ["Reused Locally", "Donated Internationally", "Recycled"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(34, 197, 94, 0.4)",
        ],
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
    },
  };

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
      deadline: "Oct 15, 2025",
    },
    {
      id: 2,
      name: "Digital Literacy Now",
      location: "Nairobi, Kenya",
      needs: "30 Desktops",
      logo: "/images/ngos/learn-and-grow.png",
      deadline: "Oct 20, 2025",
    },
    {
      id: 3,
      name: "Bright Minds Academy",
      location: "Lagos, Nigeria",
      needs: "25 Laptops",
      logo: "/images/ngos/bright-minds.png",
      deadline: "Oct 25, 2025",
    },
    {
      id: 4,
      name: "Future Leaders Tech",
      location: "Accra, Ghana",
      needs: "20 Tablets",
      logo: "/images/ngos/Future-leaders.png",
      deadline: "Oct 30, 2025",
    },
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Devices Over Time
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Donated</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <Line data={devicesOverTimeData} options={lineChartOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Device Mix
            </h3>
            <div className="h-64 rounded-lg overflow-hidden p-4">
              <Bar data={deviceMixData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              CO₂ Avoided by Device Type
            </h3>
            <div className="h-64 rounded-lg overflow-hidden p-4">
              <Pie data={co2AvoidedData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Destination Breakdown
            </h3>
            <div className="h-64 rounded-lg overflow-hidden p-4">
              <Pie data={destinationData} options={chartOptions} />
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

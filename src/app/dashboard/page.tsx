"use client";

import { useEffect, useState } from "react";
import { getUserSession, User } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
const inventoryStatus = {
  total: 1700,
  available: 600,
  sanitized: 500,
  sold: 600,
  inProcess: 100,
};

const inventoryByLocation = [
  {
    name: "Main Warehouse",
    available: 450,
    sanitized: 380,
    sold: 520,
    inProcess: 75,
  },
  {
    name: "East Facility",
    available: 220,
    sanitized: 185,
    sold: 245,
    inProcess: 25,
  },
  {
    name: "West Facility",
    available: 180,
    sanitized: 160,
    sold: 160,
    inProcess: 25,
  },
];

const inventoryTrends = [
  { month: "Jan", incoming: 220, processed: 185, sold: 165 },
  { month: "Feb", incoming: 245, processed: 225, sold: 195 },
  { month: "Mar", incoming: 280, processed: 265, sold: 235 },
  { month: "Apr", incoming: 310, processed: 290, sold: 270 },
  { month: "May", incoming: 345, processed: 320, sold: 295 },
  { month: "Jun", incoming: 380, processed: 350, sold: 330 },
];

const deviceInventory = [
  {
    category: "Laptops",
    total: 1200,
    available: 400,
    sanitized: 350,
    sold: 450,
  },
  {
    category: "Smartphones",
    total: 800,
    available: 250,
    sanitized: 225,
    sold: 325,
  },
  { category: "Tablets", total: 300, available: 125, sanitized: 100, sold: 75 },
  { category: "Desktops", total: 200, available: 75, sanitized: 50, sold: 75 },
];

const COLORS = {
  primary: "#0088FE",
  secondary: "#00C49F",
  accent: "#FFBB28",
  warning: "#FF8042",
  info: "#8884d8",
  success: "#82ca9d",
  error: "#ff7878",
  purple: "#9988FF",
  teal: "#4FD1C5",
};
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardNavbar from "@/components/DashboardNavbar";
import {
  Settings,
  Users,
  BarChart3,
  Shield,
  Recycle,
  TrendingUp,
  Calendar,
  Laptop,
  Globe,
  Award,
  Package,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
  HardDrive,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Bar,
  BarChart,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
} from "recharts";
import { Card, Title, DonutChart } from "@tremor/react";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const inventoryStatus = {
    total: 2500,
    available: 850,
    sanitized: 725,
    sold: 925,
    inProcess: 125,
  };

  const inventoryByLocation = [
    {
      name: "Main Warehouse",
      available: 450,
      sanitized: 380,
      sold: 520,
      inProcess: 75,
    },
    {
      name: "East Facility",
      available: 220,
      sanitized: 185,
      sold: 245,
      inProcess: 25,
    },
    {
      name: "West Facility",
      available: 180,
      sanitized: 160,
      sold: 160,
      inProcess: 25,
    },
  ];

  const inventoryTrends = [
    { month: "Jan", incoming: 220, processed: 185, sold: 165 },
    { month: "Feb", incoming: 245, processed: 225, sold: 195 },
    { month: "Mar", incoming: 280, processed: 265, sold: 235 },
    { month: "Apr", incoming: 310, processed: 290, sold: 270 },
    { month: "May", incoming: 345, processed: 320, sold: 295 },
    { month: "Jun", incoming: 380, processed: 350, sold: 330 },
  ];

  const deviceInventory = [
    {
      category: "Laptops",
      total: 1200,
      available: 400,
      sanitized: 350,
      sold: 450,
    },
    {
      category: "Tablets",
      total: 300,
      available: 125,
      sanitized: 100,
      sold: 75,
    },
    {
      category: "Desktops",
      total: 200,
      available: 75,
      sanitized: 50,
      sold: 75,
    },
  ];

  const monthlyData = [
    {
      name: "Jan",
      devices: 65,
      certificates: 45,
      impact: 12,
      energySaved: 2800,
      ewaste: 450,
      trees: 24,
    },
    {
      name: "Feb",
      devices: 78,
      certificates: 52,
      impact: 15,
      energySaved: 3200,
      ewaste: 520,
      trees: 28,
    },
    {
      name: "Mar",
      devices: 92,
      certificates: 61,
      impact: 18,
      energySaved: 3600,
      ewaste: 610,
      trees: 32,
    },
    {
      name: "Apr",
      devices: 105,
      certificates: 85,
      impact: 22,
      energySaved: 4200,
      ewaste: 850,
      trees: 38,
    },
    {
      name: "May",
      devices: 120,
      certificates: 95,
      impact: 25,
      energySaved: 4800,
      ewaste: 950,
      trees: 42,
    },
    {
      name: "Jun",
      devices: 135,
      certificates: 105,
      impact: 28,
      energySaved: 5400,
      ewaste: 1050,
      trees: 48,
    },
  ];

  const deviceTypes = [
    { name: "Laptops", value: 55, totalDevices: 560 },
    { name: "Tablets", value: 25, totalDevices: 187 },
    { name: "Desktops", value: 20, totalDevices: 125 },
  ];

  const impactMetrics = [
    { subject: "E-waste Reduction", A: 120, B: 110, fullMark: 150 },
    { subject: "Energy Saved", A: 98, B: 130, fullMark: 150 },
    { subject: "CO2 Reduced", A: 86, B: 130, fullMark: 150 },
    { subject: "Trees Saved", A: 99, B: 100, fullMark: 150 },
    { subject: "Water Saved", A: 85, B: 90, fullMark: 150 },
    { subject: "NGO Impact", A: 65, B: 85, fullMark: 150 },
  ];

  const ngoDistribution = [
    { name: "Education First", value: 30, impact: "High", beneficiaries: 1200 },
    { name: "Tech4All", value: 25, impact: "High", beneficiaries: 950 },
    { name: "Future Leaders", value: 20, impact: "Medium", beneficiaries: 800 },
    { name: "Bright Minds", value: 15, impact: "Medium", beneficiaries: 600 },
    { name: "Learn & Grow", value: 10, impact: "Medium", beneficiaries: 450 },
  ];

  const newRequests = [
    {
      id: "REQ-001",
      organization: "Education First",
      date: "2025-09-25",
      product: "Laptops",
      quantity: 50,
      status: "New",
      priority: "High",
    },
    {
      id: "REQ-002",
      organization: "Tech4All",
      date: "2025-09-26",
      product: "Desktops",
      quantity: 30,
      status: "Under Review",
      priority: "Medium",
    },
    {
      id: "REQ-003",
      organization: "Future Leaders",
      date: "2025-09-27",
      product: "Tablets",
      quantity: 45,
      status: "New",
      priority: "High",
    },
    {
      id: "REQ-004",
      organization: "Bright Minds",
      date: "2025-09-28",
      product: "Laptops",
      quantity: 25,
      status: "New",
      priority: "Medium",
    },
  ];

  const COLORS = {
    primary: "#0088FE",
    secondary: "#00C49F",
    accent: "#FFBB28",
    warning: "#FF8042",
    info: "#8884d8",
    success: "#82ca9d",
    error: "#ff7878",
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name.includes("Energy")
                ? `${formatNumber(entry.value)} kWh`
                : entry.name.includes("CO2")
                ? `${entry.value} tons`
                : entry.name.includes("Trees")
                ? `${entry.value} trees`
                : entry.name.includes("waste")
                ? `${entry.value} kg`
                : formatNumber(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const stats = [
    {
      label: "Devices Wiped",
      value: "1,247",
      icon: Shield,
      color: "text-blue-600",
    },
    {
      label: "Certificates Issued",
      value: "892",
      icon: BarChart3,
      color: "text-green-600",
    },
    {
      label: "CO₂ Saved",
      value: "24.8 tons",
      icon: Recycle,
      color: "text-purple-600",
    },
    {
      label: "Partner NGOs",
      value: "45",
      icon: Users,
      color: "text-orange-600",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-forest-50/30">
        <DashboardNavbar
          title="Dashboard"
          userName={user?.name}
          userEmail={user?.email}
        />

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
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-green-800">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Advanced Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Device Processing Trends */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <Laptop className="w-6 h-6 mr-2" />
                Device Processing Trends
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0, 0, 0, 0.1)"
                    />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="devices"
                      name="Processed Devices"
                      fill={COLORS.primary}
                      stroke={COLORS.primary}
                      fillOpacity={0.3}
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="certificates"
                      name="Certificates"
                      fill={COLORS.secondary}
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="ewaste"
                      name="E-waste Reduced (kg)"
                      stroke={COLORS.accent}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Environmental Impact Radar */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                Environmental Impact Matrix
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={impactMetrics}>
                    <PolarGrid gridType="polygon" />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar
                      name="Current Month"
                      dataKey="A"
                      stroke={COLORS.primary}
                      fill={COLORS.primary}
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Previous Month"
                      dataKey="B"
                      stroke={COLORS.secondary}
                      fill={COLORS.secondary}
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* NGO Impact and Device Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* NGO Impact */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                NGO Impact Distribution
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ngoDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill={COLORS.primary}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ngoDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={Object.values(COLORS)[index]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={<CustomTooltip />}
                      formatter={(value: any, name: any, props: any) => [
                        `${value} (${props.payload.impact})`,
                        `${props.payload.name} - ${props.payload.beneficiaries} beneficiaries`,
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Type Distribution */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <Laptop className="w-6 h-6 mr-2" />
                Device Type Distribution
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deviceTypes} barSize={40}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0, 0, 0, 0.1)"
                    />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      content={<CustomTooltip />}
                      formatter={(value: any, name: any, props: any) => [
                        `${value}% (${props.payload.totalDevices} devices)`,
                        props.payload.name,
                      ]}
                    />
                    <Bar
                      dataKey="value"
                      fill={COLORS.info}
                      radius={[4, 4, 0, 0]}
                    >
                      {deviceTypes.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={Object.values(COLORS)[index]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Environmental Impact Timeline */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <Recycle className="w-6 h-6 mr-2" />
              Environmental Impact Timeline
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0, 0, 0, 0.1)"
                  />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="energySaved"
                    name="Energy Saved (kWh)"
                    fill={COLORS.success}
                    stroke={COLORS.success}
                    fillOpacity={0.3}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="trees"
                    name="Trees Equivalent"
                    fill={COLORS.accent}
                    stroke={COLORS.accent}
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Inventory Management Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
              <Package className="w-6 h-6 mr-2" />
              Inventory Management
            </h2>

            {/* Inventory Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {[
                {
                  label: "Total Devices",
                  value: inventoryStatus.total,
                  icon: HardDrive,
                  color: COLORS.primary,
                },
                {
                  label: "Available",
                  value: inventoryStatus.available,
                  icon: Package,
                  color: COLORS.info,
                },
                {
                  label: "Sanitized",
                  value: inventoryStatus.sanitized,
                  icon: Shield,
                  color: COLORS.success,
                },
                {
                  label: "Sold",
                  value: inventoryStatus.sold,
                  icon: ShoppingCart,
                  color: COLORS.accent,
                },
                {
                  label: "In Process",
                  value: inventoryStatus.inProcess,
                  icon: Recycle,
                  color: COLORS.warning,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon
                      className="w-6 h-6"
                      style={{ color: stat.color }}
                    />
                    <span className="text-xs font-medium text-gray-500">
                      {stat.label}
                    </span>
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Inventory Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Device Category Distribution */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <Laptop className="w-6 h-6 mr-2" />
                  Device Category Status
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deviceInventory} barGap={0}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="available"
                        name="Available"
                        fill={COLORS.info}
                        stackId="a"
                      />
                      <Bar
                        dataKey="sanitized"
                        name="Sanitized"
                        fill={COLORS.success}
                        stackId="a"
                      />
                      <Bar
                        dataKey="sold"
                        name="Sold"
                        fill={COLORS.accent}
                        stackId="a"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Inventory Trends */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Inventory Flow
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={inventoryTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="incoming"
                        name="Incoming Devices"
                        stroke={COLORS.primary}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="processed"
                        name="Processed"
                        stroke={COLORS.success}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sold"
                        name="Sold"
                        stroke={COLORS.accent}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Location-wise Inventory */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                Inventory by Location
              </h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inventoryByLocation} barGap={0}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="available"
                      name="Available"
                      fill={COLORS.info}
                    />
                    <Bar
                      dataKey="sanitized"
                      name="Sanitized"
                      fill={COLORS.success}
                    />
                    <Bar dataKey="sold" name="Sold" fill={COLORS.accent} />
                    <Bar
                      dataKey="inProcess"
                      name="In Process"
                      fill={COLORS.warning}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
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
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Recent Activity
              </h3>
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

          {/* New Requests Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-green-800 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                New Requests This Week
              </h3>
              <Button variant="outline" className="text-sm">
                View All Requests
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-green-100">
                    <th className="py-3 text-left text-sm font-semibold text-green-800">
                      Request ID
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-green-800">
                      Organization
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-green-800">
                      Date
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-green-800">
                      Product
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-green-800">
                      Quantity
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-green-800">
                      Status
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-green-800">
                      Priority
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-green-800">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-green-50 hover:bg-green-50/30 transition-colors"
                    >
                      <td className="py-3 text-sm text-green-800">
                        {request.id}
                      </td>
                      <td className="py-3 text-sm text-green-800">
                        {request.organization}
                      </td>
                      <td className="py-3 text-sm text-green-700">
                        {new Date(request.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-sm text-green-800">
                        {request.product}
                      </td>
                      <td className="py-3 text-sm text-green-800">
                        {request.quantity}
                      </td>
                      <td className="py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {request.priority}
                        </span>
                      </td>
                      <td className="py-3 text-sm">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2 py-1"
                          >
                            Review
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2 py-1"
                          >
                            Process
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-blue-50/50 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium">
                  Total New Requests
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {newRequests.length}
                </p>
              </div>
              <div className="bg-green-50/50 rounded-lg p-4">
                <p className="text-sm text-green-800 font-medium">
                  Total Devices Requested
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {newRequests.reduce((sum, req) => sum + req.quantity, 0)}
                </p>
              </div>
              <div className="bg-yellow-50/50 rounded-lg p-4">
                <p className="text-sm text-yellow-800 font-medium">
                  High Priority
                </p>
                <p className="text-2xl font-bold text-yellow-900">
                  {newRequests.filter((req) => req.priority === "High").length}
                </p>
              </div>
              <div className="bg-purple-50/50 rounded-lg p-4">
                <p className="text-sm text-purple-800 font-medium">
                  Organizations
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {new Set(newRequests.map((req) => req.organization)).size}
                </p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              Organization Settings
            </h3>
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

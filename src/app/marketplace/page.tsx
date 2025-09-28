"use client";

import { useEffect, useState } from "react";
import { getUserSession, User } from "@/lib/auth";
import { CartProvider } from "@/contexts/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";
import { Device, Filter } from "@/types/marketplace";
import CartSidebar from "@/components/sections/CartSidebar";
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  MapPin,
  Filter as FilterIcon,
  Grid3X3,
  List,
  Laptop,
  Monitor,
  Tablet,
  HardDrive,
  Award,
  Truck,
  Shield
} from "lucide-react";

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: "relevance", label: "Most Relevant" },
  { value: "rating", label: "Highest Rated" },
  { value: "condition", label: "Best Condition" },
  { value: "newest", label: "Newest First" },
  { value: "name", label: "Name A-Z" }
];

const filterOptions = {
  condition: [
    { value: "A", label: "Grade A - Excellent", color: "bg-green-100 text-green-800" },
    { value: "B", label: "Grade B - Good", color: "bg-yellow-100 text-yellow-800" },
    { value: "C", label: "Grade C - Fair", color: "bg-orange-100 text-orange-800" }
  ],
  ram: ["4GB", "8GB", "16GB", "32GB", "64GB"],
  storage: ["128GB", "256GB", "512GB", "1TB", "2TB+"],
  screenSize: ["11-13 inch", "14-15 inch", "16-17 inch", "18+ inch", "24+ inch", "27+ inch"],
  organizations: [
    "Amazon", "Microsoft", "Intel", "Arizona State University", "Wells Fargo", 
    "Google", "Apple", "IBM", "Cisco", "Oracle", "Meta", "Tesla", "Netflix",
    "University of Arizona", "Northern Arizona University", "Phoenix College",
    "Honeywell", "American Express", "PayPal", "Uber", "Airbnb"
  ]
};

// Comprehensive realistic device data
const sampleDevices: Device[] = [
  // LAPTOPS - Business Grade
  {
    id: "LP001",
    title: "ThinkPad T14 Gen 4",
    description: "Enterprise-grade business laptop with AMD Ryzen 7 PRO processor. Military-grade tested for durability. Includes Windows 11 Pro, perfect for business applications and coding.",
    image: "💻",
    organization: "Amazon",
    location: "Phoenix, AZ",
    rating: 4.8,
    specs: {
      screenSize: "14-15 inch",
      ram: "16GB",
      storage: "512GB",
      processor: "AMD Ryzen 7 PRO 7840U"
    },
    condition: "A",
    quantity: 12,
    price: "Free"
  },
  {
    id: "LP002",
    title: "Dell Latitude 5430",
    description: "Reliable business laptop with Intel vPro technology. Features excellent keyboard, long battery life, and robust security features. Ideal for students and professionals.",
    image: "💻",
    organization: "Intel",
    location: "Tempe, AZ",
    rating: 4.7,
    specs: {
      screenSize: "14-15 inch",
      ram: "16GB",
      storage: "256GB",
      processor: "Intel Core i5-1245U"
    },
    condition: "A",
    quantity: 8,
    price: "Free"
  },
  {
    id: "LP003",
    title: "MacBook Pro 14-inch M2",
    description: "Apple Silicon M2 Pro chip delivers exceptional performance for creative work. Liquid Retina XDR display perfect for design, video editing, and development.",
    image: "💻",
    organization: "Apple",
    location: "Cupertino, CA → Phoenix, AZ",
    rating: 4.9,
    specs: {
      screenSize: "14-15 inch",
      ram: "16GB",
      storage: "512GB",
      processor: "Apple M2 Pro"
    },
    condition: "A",
    quantity: 6,
    price: "Free"
  },
  {
    id: "LP004",
    title: "HP EliteBook 840 G9",
    description: "Premium business ultrabook with collaboration features. Bang & Olufsen audio, AI-based noise cancellation, and enterprise security. Great for remote learning.",
    image: "💻",
    organization: "Wells Fargo",
    location: "Mesa, AZ",
    rating: 4.6,
    specs: {
      screenSize: "14-15 inch",
      ram: "32GB",
      storage: "1TB",
      processor: "Intel Core i7-1260P"
    },
    condition: "A",
    quantity: 4,
    price: "Free"
  },
  {
    id: "LP005",
    title: "Surface Laptop 5",
    description: "Microsoft's flagship laptop with precision touchpad and vibrant PixelSense touchscreen. Optimized for Microsoft 365 and Teams. Perfect for hybrid learning.",
    image: "💻",
    organization: "Microsoft",
    location: "Redmond, WA → Phoenix, AZ",
    rating: 4.5,
    specs: {
      screenSize: "11-13 inch",
      ram: "8GB",
      storage: "256GB",
      processor: "Intel Core i5-1235U"
    },
    condition: "B",
    quantity: 15,
    price: "Free"
  },
  
  // LAPTOPS - Budget & Student Focused
  {
    id: "LP006",
    title: "Lenovo ThinkPad E15 Gen 4",
    description: "Affordable business laptop with solid performance for everyday tasks. Spill-resistant keyboard and all-day battery life. Excellent for students starting their tech journey.",
    image: "💻",
    organization: "Arizona State University",
    location: "Tempe, AZ",
    rating: 4.4,
    specs: {
      screenSize: "14-15 inch",
      ram: "8GB",
      storage: "256GB",
      processor: "AMD Ryzen 5 5625U"
    },
    condition: "B",
    quantity: 25,
    price: "Free"
  },
  {
    id: "LP007",
    title: "Acer Aspire 5",
    description: "Student-friendly laptop with modern AMD processing power. Full HD display and numeric keypad. Perfect for coursework, research, and light programming.",
    image: "💻",
    organization: "University of Arizona",
    location: "Tucson, AZ",
    rating: 4.2,
    specs: {
      screenSize: "14-15 inch",
      ram: "8GB",
      storage: "512GB",
      processor: "AMD Ryzen 5 5500U"
    },
    condition: "B",
    quantity: 18,
    price: "Free"
  },
  {
    id: "LP008",
    title: "HP Pavilion 15",
    description: "Versatile multimedia laptop with dedicated graphics. Great for content creation, casual gaming, and STEM coursework. Includes fast charging technology.",
    image: "💻",
    organization: "Honeywell",
    location: "Phoenix, AZ",
    rating: 4.3,
    specs: {
      screenSize: "14-15 inch",
      ram: "16GB",
      storage: "512GB",
      processor: "Intel Core i5-1135G7"
    },
    condition: "B",
    quantity: 12,
    price: "Free"
  },

  // LAPTOPS - Chromebooks
  {
    id: "LP009",
    title: "Google Pixelbook Go",
    description: "Premium Chromebook with excellent battery life and lightweight design. Chrome OS perfect for web-based learning and Google Workspace productivity.",
    image: "💻",
    organization: "Google",
    location: "Mountain View, CA → Phoenix, AZ",
    rating: 4.6,
    specs: {
      screenSize: "11-13 inch",
      ram: "8GB",
      storage: "128GB",
      processor: "Intel Core i5-8200Y"
    },
    condition: "A",
    quantity: 20,
    price: "Free"
  },

  // MONITORS - Professional Displays
  {
    id: "MN001",
    title: "Dell UltraSharp U2723QE",
    description: "27-inch 4K USB-C hub monitor with 95% DCI-P3 color coverage. Daisy-chainable with ethernet and KVM switch. Perfect for design work and multi-device setups.",
    image: "🖥️",
    organization: "Intel",
    location: "Chandler, AZ",
    rating: 4.9,
    specs: {
      screenSize: "27+ inch",
      ram: "N/A",
      storage: "N/A",
      processor: "N/A"
    },
    condition: "A",
    quantity: 8,
    price: "Free"
  },
  {
    id: "MN002",
    title: "LG 27UP850-W",
    description: "4K UHD monitor with USB-C connectivity and 65W power delivery. HDR10 support and height-adjustable stand. Ideal for MacBook users and content creators.",
    image: "🖥️",
    organization: "Meta",
    location: "Menlo Park, CA → Phoenix, AZ",
    rating: 4.7,
    specs: {
      screenSize: "27+ inch",
      ram: "N/A",
      storage: "N/A",
      processor: "N/A"
    },
    condition: "A",
    quantity: 15,
    price: "Free"
  },
  {
    id: "MN003",
    title: "ASUS ProArt Display PA278QV",
    description: "Professional-grade monitor with factory pre-calibration. 100% sRGB and Rec. 709 color spaces. Perfect for graphic design, photography, and video editing courses.",
    image: "🖥️",
    organization: "Adobe Systems",
    location: "San Jose, CA → Scottsdale, AZ",
    rating: 4.8,
    specs: {
      screenSize: "27+ inch",
      ram: "N/A",
      storage: "N/A",
      processor: "N/A"
    },
    condition: "A",
    quantity: 6,
    price: "Free"
  },
  {
    id: "MN004",
    title: "Samsung M7 32-inch Smart Monitor",
    description: "All-in-one smart monitor with built-in streaming apps and wireless DeX support. Can work standalone without a PC. Great for presentations and entertainment.",
    image: "🖥️",
    organization: "Tesla",
    location: "Austin, TX → Phoenix, AZ",
    rating: 4.5,
    specs: {
      screenSize: "27+ inch",
      ram: "N/A",
      storage: "N/A",
      processor: "N/A"
    },
    condition: "B",
    quantity: 10,
    price: "Free"
  },

  // MONITORS - Standard Office Displays
  {
    id: "MN005",
    title: "HP E24 G5 FHD Monitor",
    description: "24-inch Full HD business monitor with anti-glare screen. Ergonomic design with tilt, swivel, and height adjustment. Perfect for everyday computing tasks.",
    image: "🖥️",
    organization: "Wells Fargo",
    location: "Charlotte, NC → Mesa, AZ",
    rating: 4.4,
    specs: {
      screenSize: "24+ inch",
      ram: "N/A",
      storage: "N/A",
      processor: "N/A"
    },
    condition: "B",
    quantity: 35,
    price: "Free"
  },
  {
    id: "MN006",
    title: "Lenovo ThinkVision S22e-20",
    description: "Affordable 22-inch monitor with slim bezels and VESA mount compatibility. Energy-efficient LED backlighting. Great for dual-monitor student setups.",
    image: "🖥️",
    organization: "IBM",
    location: "Armonk, NY → Phoenix, AZ",
    rating: 4.2,
    specs: {
      screenSize: "18+ inch",
      ram: "N/A",
      storage: "N/A",
      processor: "N/A"
    },
    condition: "C",
    quantity: 50,
    price: "Free"
  },

  {
    id: "DT002",
    title: "HP Z2 Mini G9 Workstation",
    description: "Compact workstation with professional graphics. Whisper-quiet operation and tool-free serviceability. Ideal for design labs and space-constrained environments.",
    image: "🖥️",
    organization: "Oracle",
    location: "Redwood City, CA → Phoenix, AZ",
    rating: 4.6,
    specs: {
      screenSize: "N/A",
      ram: "16GB",
      storage: "512GB",
      processor: "Intel Core i7-12700"
    },
    condition: "A",
    quantity: 8,
    price: "Free"
  },

  // DESKTOPS - Business PCs
  {
    id: "DT003",
    title: "Lenovo ThinkCentre M70q Tiny",
    description: "Ultra-small form factor PC with enterprise management features. Energy-efficient and VESA mountable. Perfect for computer labs and office environments.",
    image: "🖥️",
    organization: "American Express",
    location: "New York, NY → Phoenix, AZ",
    rating: 4.5,
    specs: {
      screenSize: "N/A",
      ram: "16GB",
      storage: "256GB",
      processor: "Intel Core i5-11400T"
    },
    condition: "A",
    quantity: 20,
    price: "Free"
  },
  {
    id: "DT004",
    title: "HP EliteDesk 800 G9 Mini",
    description: "Compact business desktop with enterprise security features. Remote management capabilities and extensive connectivity. Great for shared workspaces.",
    image: "🖥️",
    organization: "PayPal",
    location: "San Jose, CA → Chandler, AZ",
    rating: 4.4,
    specs: {
      screenSize: "N/A",
      ram: "8GB",
      storage: "256GB",
      processor: "Intel Core i5-12500T"
    },
    condition: "B",
    quantity: 25,
    price: "Free"
  },

  // TABLETS - Professional
  {
    id: "TB001",
    title: "iPad Pro 12.9-inch (6th gen)",
    description: "Apple's most advanced tablet with M2 chip and Liquid Retina XDR display. Apple Pencil support for digital art and note-taking. Perfect for creative coursework.",
    image: "📱",
    organization: "Apple",
    location: "Cupertino, CA → Phoenix, AZ",
    rating: 4.9,
    specs: {
      screenSize: "12.9 inch",
      ram: "16GB",
      storage: "512GB",
      processor: "Apple M2"
    },
    condition: "A",
    quantity: 3,
    price: "Free"
  }
];

function MarketplaceContent() {
  const [user, setUser] = useState<User | null>(null);
  const [devices] = useState<Device[]>(sampleDevices);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(sampleDevices);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Filter>({
    screenSize: [],
    ram: [],
    storage: [],
    condition: [],
    quantity: 1
  });
  
  const { state: cartState, dispatch } = useCart();

  // Helper functions to calculate statistics
  const getTotalQuantity = (deviceList: Device[]) => {
    return deviceList.reduce((total, device) => total + device.quantity, 0);
  };

  const getUniqueOrganizations = (deviceList: Device[]) => {
    return new Set(deviceList.map(device => device.organization)).size;
  };

  const getAverageRating = (deviceList: Device[]) => {
    if (deviceList.length === 0) return 0;
    const totalRating = deviceList.reduce((sum, device) => sum + device.rating, 0);
    return (totalRating / deviceList.length).toFixed(1);
  };

  const getCategoryCount = (categoryId: string, deviceList: Device[]) => {
    const filtered = deviceList.filter(device => {
      const title = device.title.toLowerCase();
      switch (categoryId) {
        case "laptops": return title.includes("laptop") || title.includes("thinkpad") || title.includes("macbook") || title.includes("surface");
        case "monitors": return title.includes("monitor") || title.includes("ultrasharp");
        case "desktops": return title.includes("desktop") || title.includes("elitedesk");
        case "tablets": return title.includes("ipad") || title.includes("tablet");
        case "phones": return title.includes("phone") || title.includes("smartphone");
        default: return false;
      }
    });
    return getTotalQuantity(filtered);
  };

  // Dynamic categories with real counts
  const categories = [
    { id: "laptops", name: "Laptops", icon: Laptop, count: getCategoryCount("laptops", devices) },
    { id: "monitors", name: "Monitors", icon: Monitor, count: getCategoryCount("monitors", devices) },
    { id: "desktops", name: "Desktops", icon: HardDrive, count: getCategoryCount("desktops", devices) },
    { id: "tablets", name: "Tablets", icon: Tablet, count: getCategoryCount("tablets", devices) }
  ];

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...devices];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(device => 
        device.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.specs.processor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(device => {
        const title = device.title.toLowerCase();
        switch (selectedCategory) {
          case "laptops": return title.includes("laptop") || title.includes("thinkpad") || title.includes("macbook") || title.includes("surface");
          case "monitors": return title.includes("monitor") || title.includes("ultrasharp");
          case "desktops": return title.includes("desktop") || title.includes("elitedesk");
          case "tablets": return title.includes("ipad") || title.includes("tablet");
          case "phones": return title.includes("phone") || title.includes("smartphone");
          default: return true;
        }
      });
    }

    // Apply filters
    if (filters.condition.length > 0) {
      filtered = filtered.filter(device => filters.condition.includes(device.condition));
    }
    if (filters.ram.length > 0) {
      filtered = filtered.filter(device => filters.ram.includes(device.specs.ram));
    }
    if (filters.storage.length > 0) {
      filtered = filtered.filter(device => filters.storage.includes(device.specs.storage));
    }
    if (filters.screenSize.length > 0) {
      filtered = filtered.filter(device => filters.screenSize.includes(device.specs.screenSize));
    }

    // Sort
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "condition":
        filtered.sort((a, b) => a.condition.localeCompare(b.condition));
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // relevance
        break;
    }

    setFilteredDevices(filtered);
  }, [devices, searchQuery, selectedCategory, filters, sortBy]);

  const handleAddToCart = (device: Device) => {
    dispatch({ type: "ADD_TO_CART", payload: device });
  };

  const toggleFavorite = (deviceId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(deviceId)) {
      newFavorites.delete(deviceId);
    } else {
      newFavorites.add(deviceId);
    }
    setFavorites(newFavorites);
  };

  const handleFilterChange = (filterType: keyof Filter, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      screenSize: [],
      ram: [],
      storage: [],
      condition: [],
      quantity: 1
    });
  };

  const getConditionColor = (condition: "A" | "B" | "C") => {
    switch (condition) {
      case "A": return "bg-green-100 text-green-800";
      case "B": return "bg-yellow-100 text-yellow-800";
      case "C": return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <DashboardNavbar
        title="Device Marketplace"
        userName={user?.name}
        userEmail={user?.email}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || "User"}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Discover high-quality devices donated by leading organizations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Monthly Quota: {cartState.usedQuota}/{cartState.monthlyQuota}
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowCart(!showCart)}
                className="relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cartState.items.length})
                {cartState.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartState.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Laptop className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Available Devices</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalQuantity(devices)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Partner Organizations</p>
                  <p className="text-2xl font-bold text-gray-900">{getUniqueOrganizations(devices)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{getAverageRating(devices)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Free Shipping</p>
                  <p className="text-sm font-bold text-green-600">All Orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Categories */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by device name, brand, specs, or organization..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-green-700 shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-green-700 shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <FilterIcon className="w-4 h-4 mr-2" />
                Filters
                {(filters.condition.length + filters.ram.length + filters.storage.length + filters.screenSize.length) > 0 && (
                  <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {filters.condition.length + filters.ram.length + filters.storage.length + filters.screenSize.length}
                  </span>
                )}
              </Button>
              
              {(filters.condition.length + filters.ram.length + filters.storage.length + filters.screenSize.length) > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="text-red-600 hover:text-red-700">
                  Clear All
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm text-gray-600">
                {getTotalQuantity(filteredDevices)} of {getTotalQuantity(devices)} devices available
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Condition Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Condition</h4>
                  <div className="space-y-2">
                    {filterOptions.condition.map((condition) => (
                      <label key={condition.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.condition.includes(condition.value as "A" | "B" | "C")}
                          onChange={() => handleFilterChange("condition", condition.value)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${condition.color}`}>
                          {condition.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* RAM Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">RAM</h4>
                  <div className="space-y-2">
                    {filterOptions.ram.map((ram) => (
                      <label key={ram} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.ram.includes(ram)}
                          onChange={() => handleFilterChange("ram", ram)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{ram}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Storage Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Storage</h4>
                  <div className="space-y-2">
                    {filterOptions.storage.map((storage) => (
                      <label key={storage} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.storage.includes(storage)}
                          onChange={() => handleFilterChange("storage", storage)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{storage}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Screen Size Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Screen Size</h4>
                  <div className="space-y-2">
                    {filterOptions.screenSize.map((size) => (
                      <label key={size} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.screenSize.includes(size)}
                          onChange={() => handleFilterChange("screenSize", size)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              className={`bg-white/95 backdrop-blur-sm flex flex-col justify-between rounded-2xl shadow-md border border-gray-200/50 hover:shadow-xl hover:scale-[1.02] hover:bg-white hover:border-blue-200/60 transition-all duration-300 ease-out ${
                viewMode === "list" ? "flex items-center p-6" : "p-6"
              }`}
            >
              {viewMode === "grid" ? (
                // Grid View
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{device.image}</div>
                    <button
                      onClick={() => toggleFavorite(device.id)}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.has(device.id)
                          ? "text-red-500 bg-red-50"
                          : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(device.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">{device.title}</h3>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">{device.description}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-800 ml-1">{device.rating}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getConditionColor(device.condition)}`}>
                        Grade {device.condition}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      {device.specs.processor !== "N/A" && (
                        <div className="text-xs bg-gray-100 rounded-md px-3 py-1.5 text-gray-800 font-medium border border-gray-200">
                          🔧 {device.specs.processor}
                        </div>
                      )}
                      <div className="flex gap-2">
                        {device.specs.ram !== "N/A" && (
                          <div className="text-xs bg-blue-100 rounded-md px-3 py-1.5 text-blue-800 font-medium border border-blue-200">
                            💾 {device.specs.ram}
                          </div>
                        )}
                        {device.specs.storage !== "N/A" && (
                          <div className="text-xs bg-green-100 rounded-md px-3 py-1.5 text-green-800 font-medium border border-green-200">
                            💿 {device.specs.storage}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-gray-600 mb-4 bg-gray-50 rounded-md px-3 py-2 border border-gray-200">
                      <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                      <span className="font-medium">{device.location}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="font-medium text-blue-700">{device.organization}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm">
                      <span className="text-xl font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{device.price}</span>
                      {device.quantity > 1 && (
                        <div className="text-xs text-gray-600 mt-1 font-medium">{device.quantity} available</div>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(device)}
                      className="flex items-center shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </>
              ) : (
                // List View
                <>
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-4xl">{device.image}</div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 mb-1 leading-tight">{device.title}</h3>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-1 leading-relaxed">{device.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                          <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                          <span className="font-semibold text-gray-800">{device.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                          <span className="font-medium">{device.location}</span>
                        </div>
                        <span className="font-medium text-blue-700">{device.organization}</span>
                        <span className={`px-3 py-1 rounded-full font-semibold shadow-sm ${getConditionColor(device.condition)}`}>
                          Grade {device.condition}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{device.price}</div>
                        {device.quantity > 1 && (
                          <div className="text-xs text-gray-600 mt-1 font-medium">{device.quantity} available</div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFavorite(device.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.has(device.id)
                              ? "text-red-500 bg-red-50"
                              : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${favorites.has(device.id) ? "fill-current" : ""}`} />
                        </button>
                        
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAddToCart(device)}
                          className="flex items-center shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDevices.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No devices found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find more devices
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Our Marketplace?</h2>
            <p className="text-gray-600">Trusted by organizations and educational institutions nationwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Verified Quality</h3>
              <p className="text-sm text-gray-600">All devices are professionally tested and graded for quality assurance</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">Completely free delivery to educational institutions and NGOs</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Trusted Partners</h3>
              <p className="text-sm text-gray-600">Devices donated by Fortune 500 companies and top universities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
      />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <CartProvider>
      <ProtectedRoute>
        <MarketplaceContent />
      </ProtectedRoute>
    </CartProvider>
  );
}

"use client";

import { useState, useEffect } from "react";
import { getUserSession, User } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import DashboardNavbar from "@/components/DashboardNavbar";
import FilterSidebar from "@/components/sections/FilterSidebar";
import CartSidebar from "@/components/sections/CartSidebar";
import { useCart } from "@/contexts/CartContext";
import { Device, Filter } from "@/types/marketplace";
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  MapPin,
  Info,
  ChevronRight,
} from "lucide-react";
import ViewOptions from "@/components/sections/ViewOptions";

const getConditionColor = (condition: "A" | "B" | "C") => {
  switch (condition) {
    case "A":
      return "bg-green-100 text-green-800";
    case "B":
      return "bg-yellow-100 text-yellow-800";
    case "C":
      return "bg-orange-100 text-orange-800";
  }
};

export const MarketplaceContent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "condition">("name");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Filter>({
    screenSize: [],
    ram: [],
    storage: [],
    condition: [],
    quantity: 1,
  });

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const allDevices: Device[] = [
    {
      id: "1",
      title: "ThinkPad T480 - Refurbished",
      description:
        "Perfect for students and professionals, includes educational software suite",
      price: "Free for NGOs",
      image: "💻",
      organization: "Amazon",
      location: "Seattle, WA",
      rating: 4.8,
      specs: {
        screenSize: '14"',
        ram: "8GB",
        storage: "256GB",
        processor: "Intel i5",
      },
      condition: "A",
      quantity: 10,
    },
    {
      id: "2",
      title: "MacBook Air 2019 - Certified Clean",
      description:
        "Ideal for creative work and education, perfect for digital arts programs",
      price: "Free for Schools",
      image: "💻",
      organization: "LoopIT",
      location: "Phoenix, AZ",
      rating: 4.9,
      specs: {
        screenSize: '13"',
        ram: "8GB",
        storage: "128GB",
        processor: "Intel i5",
      },
      condition: "B",
      quantity: 5,
    },
    {
      id: "3",
      title: "Dell OptiPlex 7070 - Desktop",
      description: "Great for computer labs and STEM education centers",
      price: "Available",
      image: "🖥️",
      organization: "Microsoft",
      location: "Redmond, WA",
      rating: 4.7,
      specs: {
        screenSize: '24"',
        ram: "16GB",
        storage: "512GB",
        processor: "Intel i7",
      },
      condition: "A",
      quantity: 15,
    },
    {
      id: "4",
      title: "iPad Pro 2020 - Like New",
      description: "Perfect for digital learning and interactive education",
      price: "Free for Educational Institutions",
      image: "📱",
      organization: "Apple Education",
      location: "Cupertino, CA",
      rating: 4.9,
      specs: {
        screenSize: '12.9"',
        ram: "6GB",
        storage: "256GB",
        processor: "A12Z Bionic",
      },
      condition: "A",
      quantity: 8,
    },
    {
      id: "5",
      title: "Chromebook Flex 5 - Education Edition",
      description: "Ideal for remote learning and classroom activities",
      price: "Free for Schools",
      image: "💻",
      organization: "Google",
      location: "Mountain View, CA",
      rating: 4.6,
      specs: {
        screenSize: '13.3"',
        ram: "8GB",
        storage: "128GB",
        processor: "Intel i3",
      },
      condition: "B",
      quantity: 20,
    },
    {
      id: "6",
      title: "Surface Pro 7 - Certified Refurbished",
      description: "Versatile device for both teaching and learning",
      price: "Available for NGOs",
      image: "📱",
      organization: "Microsoft Education",
      location: "Redmond, WA",
      rating: 4.8,
      specs: {
        screenSize: '12.3"',
        ram: "16GB",
        storage: "512GB",
        processor: "Intel i7",
      },
      condition: "A",
      quantity: 12,
    },
    {
      id: "7",
      title: 'iMac 27" - Creative Studio Edition',
      description: "Perfect for multimedia labs and design education",
      price: "Free for Art Schools",
      image: "🖥️",
      organization: "Apple Creative",
      location: "Cupertino, CA",
      rating: 4.9,
      specs: {
        screenSize: '27"',
        ram: "32GB",
        storage: "1TB",
        processor: "Intel i7",
      },
      condition: "B",
      quantity: 6,
    },
    {
      id: "8",
      title: "ThinkCentre M720 - Learning Lab Setup",
      description: "Complete computer lab solution with educational software",
      price: "Available for Schools",
      image: "🖥️",
      organization: "Lenovo EDU",
      location: "Beijing, China",
      rating: 4.7,
      specs: {
        screenSize: '24"',
        ram: "16GB",
        storage: "512GB",
        processor: "Intel i5",
      },
      condition: "A",
      quantity: 25,
    },
  ];

  // Filter and sort devices
  const filterDevices = (devices: Device[]) => {
    return devices.filter((device) => {
      const matchesSearch =
        device.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesScreenSize =
        filters.screenSize.length === 0 ||
        filters.screenSize.includes(device.specs.screenSize);

      const matchesRam =
        filters.ram.length === 0 || filters.ram.includes(device.specs.ram);

      const matchesStorage =
        filters.storage.length === 0 ||
        filters.storage.includes(device.specs.storage);

      const matchesCondition =
        filters.condition.length === 0 ||
        filters.condition.includes(device.condition);

      const matchesQuantity = device.quantity >= filters.quantity;

      return (
        matchesSearch &&
        matchesScreenSize &&
        matchesRam &&
        matchesStorage &&
        matchesCondition &&
        matchesQuantity
      );
    });
  };

  const sortDevices = (devices: Device[]) => {
    return [...devices].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "rating":
          return b.rating - a.rating;
        case "condition":
          return a.condition.localeCompare(b.condition);
        default:
          return 0;
      }
    });
  };

  const filteredAndSortedDevices = sortDevices(filterDevices(allDevices));

  // Handle device actions
  const handleAddToCart = (device: Device) => {
    dispatch({ type: "ADD_TO_CART", payload: device });
    setIsCartOpen(true);
  };

  const handleToggleFavorite = (deviceId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(deviceId)) {
      newFavorites.delete(deviceId);
    } else {
      newFavorites.add(deviceId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50/30">
      <DashboardNavbar
        title="Marketplace"
        userName={user?.name}
        userEmail={user?.email}
        rightContent={
          <Button
            variant="outline"
            onClick={() => setIsCartOpen(true)}
            className="ml-4"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            Welcome to the Device Marketplace, {user?.name}!
          </h2>
          <p className="text-blue-600">
            Discover certified, secure devices donated by organizations for your
            cause.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-80 shrink-0">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Devices Grid */}
          <div className="flex-1">
            {/* Search and View Options */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for laptops, desktops, tablets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <ViewOptions
                viewMode={viewMode}
                sortBy={sortBy}
                onViewModeChange={setViewMode}
                onSortChange={setSortBy}
                totalDevices={filteredAndSortedDevices.length}
              />
            </div>

            {/* Devices Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredAndSortedDevices.map((device) => (
                <div
                  key={device.id}
                  className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl ${
                    viewMode === "grid" ? "p-6" : "p-4"
                  } shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-300 hover:border-blue-300 hover:bg-white/90 hover:transform hover:-translate-y-1`}
                >
                  {/* Floating Grade Badge */}
                  <div
                    className={`absolute top-4 right-4 z-10 ${getConditionColor(
                      device.condition
                    )} rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm border border-white/50`}
                  >
                    Grade {device.condition}
                  </div>

                  <div className={viewMode === "grid" ? "block" : "flex gap-6"}>
                    {/* Image Section */}
                    <div
                      className={`${
                        viewMode === "grid"
                          ? "text-center mb-4"
                          : "flex-shrink-0"
                      }`}
                    >
                      <div
                        className={`relative group-hover:scale-110 transition-transform duration-300 ${
                          viewMode === "grid" ? "text-7xl" : "text-6xl"
                        } bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 shadow-inner`}
                      >
                        {device.image}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1">
                      <div className={viewMode === "grid" ? "text-center" : ""}>
                        <h4 className="text-lg font-bold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {device.title}
                        </h4>
                        <p className="text-sm text-blue-600/90 mb-3 leading-relaxed">
                          {device.description}
                        </p>
                      </div>

                      {/* Specs */}
                      <div
                        className={`grid ${
                          viewMode === "grid"
                            ? "grid-cols-2 gap-3"
                            : "grid-cols-2 gap-4"
                        } mb-4 bg-blue-50/50 rounded-xl p-3`}
                      >
                        <div className="flex items-center text-sm text-blue-700 bg-white/80 rounded-lg p-2 shadow-sm">
                          <div className="w-6 h-6 mr-2 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                            🖥️
                          </div>
                          {device.specs.processor}
                        </div>
                        <div className="flex items-center text-sm text-blue-700 bg-white/80 rounded-lg p-2 shadow-sm">
                          <div className="w-6 h-6 mr-2 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                            📱
                          </div>
                          {device.specs.screenSize} Display
                        </div>
                        <div className="flex items-center text-sm text-blue-700 bg-white/80 rounded-lg p-2 shadow-sm">
                          <div className="w-6 h-6 mr-2 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                            💾
                          </div>
                          {device.specs.ram} RAM
                        </div>
                        <div className="flex items-center text-sm text-blue-700 bg-white/80 rounded-lg p-2 shadow-sm">
                          <div className="w-6 h-6 mr-2 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                            💽
                          </div>
                          {device.specs.storage} Storage
                        </div>
                      </div>

                      {/* Info Bar */}
                      <div
                        className={`flex items-center ${
                          viewMode === "grid" ? "justify-between" : ""
                        } text-sm text-blue-600 mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl`}
                      >
                        <div className="flex items-center px-2 py-1 bg-white/80 rounded-lg shadow-sm">
                          <MapPin className="w-4 h-4 mr-1.5 text-blue-500" />
                          <span>{device.location}</span>
                        </div>
                        <div className="flex items-center px-2 py-1 bg-white/80 rounded-lg shadow-sm">
                          <Star className="w-4 h-4 mr-1.5 text-yellow-500 fill-current" />
                          <span className="font-medium">{device.rating}</span>
                        </div>
                        <div className="px-2 py-1 bg-white/80 rounded-lg shadow-sm">
                          by{" "}
                          <span className="font-medium text-blue-700">
                            {device.organization}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 mt-6">
                        <Button
                          variant="primary"
                          size="sm"
                          className={`flex-1 shadow-lg transform transition-all duration-200 hover:scale-102 ${
                            device.quantity > 0
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-green-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                          onClick={() => handleAddToCart(device)}
                          disabled={device.quantity === 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {device.quantity > 0
                            ? `Request (${device.quantity} available)`
                            : "Out of Stock"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFavorite(device.id)}
                          className={`shadow-lg transform transition-all duration-200 hover:scale-102 ${
                            favorites.has(device.id)
                              ? "bg-red-50 border-red-300 hover:bg-red-100"
                              : "hover:bg-blue-50"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.has(device.id)
                                ? "fill-red-500 text-red-500"
                                : "text-blue-400"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Info */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-blue-600 via-blue-600/95 to-blue-600/90 text-white rounded-b-2xl transition-all duration-300 backdrop-blur-sm ${
                      viewMode === "grid"
                        ? "translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                        : "hidden"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-white/20 rounded-full p-1.5 mr-2">
                          <Info className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">
                          View Details
                        </span>
                      </div>
                      <div className="bg-white/20 rounded-full p-1.5 group-hover:translate-x-1 transition-transform duration-300">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

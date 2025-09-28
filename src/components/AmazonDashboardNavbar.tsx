"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/Button";
import { LogOut, BarChart3, Package, Award, Settings } from "lucide-react";
import { clearUserSession } from "@/lib/auth";

interface AmazonDashboardNavbarProps {
  title: string;
  userName?: string;
  userEmail?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AmazonDashboardNavbar({ 
  title, 
  userName, 
  userEmail, 
  activeTab, 
  onTabChange 
}: AmazonDashboardNavbarProps) {
  const handleLogout = () => {
    clearUserSession();
    window.location.href = '/';
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'devices', label: 'Devices', icon: Package },
    { id: 'certificates', label: 'Certificates & Badges', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Main Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/Loop_it.png"
                alt="Loop It"
                width={120}
                height={40}
                className="h-6 w-auto"
                priority
              />
            </Link>

            {/* Title */}
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold text-orange-800">{title}</h1>
            </div>
            
            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              {userName && (
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-orange-800">{userName}</p>
                  {userEmail && <p className="text-xs text-orange-600">{userEmail}</p>}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2 border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white/90 backdrop-blur-md border-b border-orange-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-3">
            <nav className="flex space-x-1 bg-orange-100/50 rounded-xl p-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`
                    flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === item.id 
                      ? 'bg-white text-orange-700 shadow-sm font-semibold' 
                      : 'text-orange-600 hover:text-orange-700 hover:bg-white/60'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
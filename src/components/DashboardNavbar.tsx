"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/Button";
import { LogOut } from "lucide-react";
import { clearUserSession } from "@/lib/auth";

interface DashboardNavbarProps {
  title: string;
  userName?: string;
  userEmail?: string;
  rightContent?: React.ReactNode;
}

export default function DashboardNavbar({
  title,
  userName,
  userEmail,
  rightContent,
}: DashboardNavbarProps) {
  const handleLogout = () => {
    clearUserSession();
    window.location.href = "/";
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-green-200/50 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/Loop_it_1.png"
              alt="Loop It"
              width={120}
              height={40}
              className="h-6 w-auto"
              priority
            />
          </Link>

          {/* Title */}
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-green-800">{title}</h1>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            {userName && (
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-green-800">{userName}</p>
                {userEmail && (
                  <p className="text-xs text-green-600">{userEmail}</p>
                )}
              </div>
            )}
            {rightContent}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

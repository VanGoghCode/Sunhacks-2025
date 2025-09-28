"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { getUserSession, clearUserSession, User } from "@/lib/auth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setUser(getUserSession());
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      
      // Check if we're on the home page
      if (pathname === '/') {
        // We're on home page, scroll to the element
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // We're on a different page, navigate to home with hash
        router.push(`/${href}`);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    clearUserSession();
    setUser(null);
    router.push('/');
  };

  const navItems = [
    { label: 'What we do', href: '#what-we-do' },
    { label: 'Impact', href: '#impact' },
    { label: 'NGOs', href: '#ngos' },
    { label: 'Our story', href: '/about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-500 ease-out
        ${
          isScrolled
            ? "bg-white/85 backdrop-blur-lg shadow-xl shadow-green-500/15 border-b border-white/20"
            : "bg-white/20 backdrop-blur-sm"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/images/Loop_it.png"
              alt="Loop It"
              width={180}
              height={60}
              className="h-7 w-auto transform group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-2 text-green-700 hover:text-green-800 font-medium rounded-xl transition-all duration-300 hover:bg-green-50/50 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-forest-500 transition-all duration-300 group-hover:w-3/4 transform -translate-x-1/2 rounded-full"></span>
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-green-700 hover:text-green-800 font-medium rounded-xl transition-all duration-300 hover:bg-green-50/50 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-forest-500 transition-all duration-300 group-hover:w-3/4 transform -translate-x-1/2 rounded-full"></span>
                </Link>
              )
            ))}
          </div>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  href={user.dashboardRoute}
                  className="text-green-700 hover:text-green-800 font-medium px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/50"
                >
                  Dashboard
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-green-700 hover:text-green-800 font-medium px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-green-700 hover:text-green-800 font-medium px-4 py-2 rounded-xl transition-all duration-300 hover:bg-green-50/50"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="icon"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <div className="w-6 h-6 relative flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-0.5"
                    : "-translate-y-1"
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-0.5"
                    : "translate-y-1"
                }`}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-out
          ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-green-200/50 px-4 py-6 space-y-4">
          {navItems.map((item) => (
            item.href.startsWith('#') ? (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-3 text-green-700 hover:text-green-800 font-medium rounded-xl transition-all duration-300 hover:bg-green-50/70"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-green-700 hover:text-green-800 font-medium rounded-xl transition-all duration-300 hover:bg-green-50/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
          <div className="pt-4 space-y-3">
            {user ? (
              <>
                <Link
                  href={user.dashboardRoute}
                  className="block px-4 py-3 text-green-700 hover:text-green-800 font-medium rounded-xl transition-all duration-300 hover:bg-green-50/70"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-green-700 hover:text-green-800 font-medium rounded-xl transition-all duration-300 hover:bg-green-50/70"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-3 text-green-700 hover:text-green-800 font-medium rounded-xl transition-all duration-300 hover:bg-green-50/70"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-3 text-green-700 hover:text-green-800 font-medium rounded-xl transition-all duration-300 hover:bg-green-50/70"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

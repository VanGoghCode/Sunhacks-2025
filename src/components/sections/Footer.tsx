'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    products: [
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Eco Products', href: '/marketplace?category=eco' },
      { label: 'Technology', href: '/marketplace?category=tech' },
      { label: 'Lifestyle', href: '/marketplace?category=lifestyle' },
    ],
    support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Help Center', href: '/help' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Sustainability', href: '/sustainability' },
    ],
  };

  const socialLinks = [
    { label: 'Twitter', href: '#', icon: '🐦' },
    { label: 'Instagram', href: '#', icon: '📷' },
    { label: 'LinkedIn', href: '#', icon: '💼' },
    { label: 'Facebook', href: '#', icon: '📘' },
  ];

  return (
    <footer className="bg-gradient-to-br from-green-800 via-forest-700 to-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="relative">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Stay Updated with Sustainable Living Tips
              </h3>
              <p className="text-green-200 mb-8 max-w-2xl mx-auto">
                Join our newsletter and get the latest eco-friendly products, sustainability tips, 
                and exclusive offers delivered to your inbox.
              </p>
              
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                />
                <Button variant="secondary" size="md">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-forest-500 rounded-xl flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-full opacity-90"></div>
                </div>
                <span className="text-2xl font-bold">Loop It</span>
              </Link>
              
              <p className="text-green-200 mb-6 leading-relaxed">
                Creating a sustainable future through innovative technology and 
                community-driven solutions. Join us in making a positive impact 
                on our planet.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-green-200 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Products</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-green-200 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-green-200 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-green-200 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-green-300 text-sm">
                © 2025 Loop It. All rights reserved. Building a sustainable future, one loop at a time.
              </p>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-green-300 text-sm">
                  <span className="text-green-400">🌱</span>
                  <span>Carbon Neutral Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-green-300 text-sm">
                  <span className="text-blue-400">♻️</span>
                  <span>100% Recyclable Packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'What we do', href: '/what-we-do' },
      { label: 'Impact', href: '/impact' },
      { label: 'Our Story', href: '/about' },
      { label: 'Careers', href: '/careers' },
    ],
    services: [
      { label: 'Donate Laptops', href: '/donate' },
      { label: 'Request Laptops', href: '/request' },
      { label: 'Data Wiping', href: '/data-security' },
      { label: 'ESG Reports', href: '/esg-reports' },
    ],
    support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Help Center', href: '/help' },
      { label: 'Pickup Schedule', href: '/pickup' },
      { label: 'Track Impact', href: '/track' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Data Security', href: '/data-security' },
      { label: 'Compliance', href: '/compliance' },
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
                Stay Connected
              </h3>
              <p className="text-green-200 mb-8 max-w-2xl mx-auto">
                Get monthly impact reports, new NGO partnerships, and stories from the classrooms 
                your laptops are helping to transform.
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
              <Link href="/" className="flex items-center space-x-2 mb-6 group">
                <Image
                  src="/images/Loop_it.png"
                  alt="Loop It"
                  width={160}
                  height={53}
                  className="h-6 w-auto transform group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              <p className="text-green-200 mb-6 leading-relaxed">
                Closing the loop on e-waste by connecting corporate laptop donations 
                with schools and NGOs. Government-certified data security, full impact 
                transparency, and zero cost to do good.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
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

              {/* WhatsApp Support */}
              <div className="bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">💬</span>
                  <span className="font-semibold text-green-100">24/7 WhatsApp Support</span>
                </div>
                <p className="text-green-200 text-sm mb-3">
                  Humans answer in 30 minutes. No bots, just real help.
                </p>
                <a
                  href="https://wa.me/1234567890"
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
                >
                  <span>💬</span>
                  <span>Start Chat</span>
                </a>
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

            {/* Services Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
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
                © 2025 Loopit. All rights reserved. Closing the loop on e-waste, one laptop at a time.
              </p>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-green-300 text-sm">
                  <span className="text-green-400">🔒</span>
                  <span>Government Certified Data Wiping</span>
                </div>
                <div className="flex items-center space-x-2 text-green-300 text-sm">
                  <span className="text-blue-400">📊</span>
                  <span>Full ESG Compliance</span>
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
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary rounded-xl p-2">
                  <Leaf className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">EcoTech</span>
              </div>
              <p className="text-background/70 leading-relaxed">
                Revolutionizing tech sustainability through certified refurbished devices and community impact.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="text-background/70 hover:text-background hover:bg-background/10 rounded-xl"
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "Marketplace", "About Us", "Our Impact", "Partners", "Blog", "Careers"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-background/70 hover:text-background transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {["Help Center", "Contact Us", "Warranty", "Returns", "Shipping", "FAQ", "Live Chat"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-background/70 hover:text-background transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
              <p className="text-background/70 mb-4">
                Get the latest updates on new arrivals and our environmental impact.
              </p>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-xl"
                  />
                  <Button variant="secondary" size="icon" className="rounded-xl">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-background/50">By subscribing, you agree to our Privacy Policy.</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Contact Info */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-background/70">hello@ecotech.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-background/70">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-background/70">San Francisco, CA</span>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/70 text-sm">© 2025 EcoTech. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a key={link} href="#" className="text-background/70 hover:text-background transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

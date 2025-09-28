"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Mail, Lock, User, Copy, Check } from "lucide-react";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [copiedItem, setCopiedItem] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // In a real app, you would:
    // 1. Validate the email format
    // 2. Check password strength
    // 3. Make an API call to create the account
    // 4. Handle the response and errors
    // 5. Set authentication cookies/tokens
    // 6. Redirect to the dashboard

    // For now, just redirect to home
    window.location.href = "/";
  };

  const handleCopy = async (text: string, itemId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedItem(itemId);
    setTimeout(() => setCopiedItem(""), 2000); // Reset after 2 seconds
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 transform hover:scale-[1.01] transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join Loop IT and start making an impact
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm text-red-700 rounded-xl text-sm border border-red-200/50">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Choose a strong password"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="block text-sm text-gray-600 leading-relaxed"
              >
                I agree to the{" "}
                <Link
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-green-700 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
              size="lg"
            >
              Create Account
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-200/50">
            <h3 className="text-sm font-semibold text-red-700 mb-3">CREDENTIALS:</h3>
            <div className="space-y-2 text-xs text-red-600">
              <div className="flex items-center justify-between">
                <span><strong>Admin:</strong> test@loopit.org</span>
                <button 
                  onClick={() => handleCopy('test@loopit.org', 'admin')}
                  className={`p-1 hover:bg-red-100 rounded transition-all duration-200 transform ${
                    copiedItem === 'admin' ? 'scale-110 bg-green-100' : ''
                  }`}
                  title={copiedItem === 'admin' ? 'Copied!' : 'Copy email'}
                >
                  {copiedItem === 'admin' ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span><strong>Organization:</strong> test@amazon.com</span>
                <button 
                  onClick={() => handleCopy('test@amazon.com', 'org')}
                  className={`p-1 hover:bg-red-100 rounded transition-all duration-200 transform ${
                    copiedItem === 'org' ? 'scale-110 bg-green-100' : ''
                  }`}
                  title={copiedItem === 'org' ? 'Copied!' : 'Copy email'}
                >
                  {copiedItem === 'org' ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span><strong>Marketplace:</strong> test@gmail.com</span>
                <button 
                  onClick={() => handleCopy('test@gmail.com', 'marketplace')}
                  className={`p-1 hover:bg-red-100 rounded transition-all duration-200 transform ${
                    copiedItem === 'marketplace' ? 'scale-110 bg-green-100' : ''
                  }`}
                  title={copiedItem === 'marketplace' ? 'Copied!' : 'Copy email'}
                >
                  {copiedItem === 'marketplace' ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-red-200">
                <span><strong>Common password:</strong> Test@1234</span>
                <button 
                  onClick={() => handleCopy('Test@1234', 'password')}
                  className={`p-1 hover:bg-red-100 rounded transition-all duration-200 transform ${
                    copiedItem === 'password' ? 'scale-110 bg-green-100' : ''
                  }`}
                  title={copiedItem === 'password' ? 'Copied!' : 'Copy password'}
                >
                  {copiedItem === 'password' ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Your data is protected with end-to-end encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Mail, Lock, Copy, Check } from "lucide-react";
import { authenticateUser, setUserSession } from "@/lib/auth";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedItem, setCopiedItem] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, any password is accepted if email domain is valid
    if (password.length < 3) {
      setError("Password must be at least 3 characters");
      setIsLoading(false);
      return;
    }

    const user = authenticateUser(email);

    if (user) {
      setUserSession(user);
      window.location.href = user.dashboardRoute;
    } else {
      setError("Authentication failed");
    }
    
    setIsLoading(false);
  };

  const handleCopy = async (text: string, itemId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedItem(itemId);
    setTimeout(() => setCopiedItem(""), 2000); // Reset after 2 seconds
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 transform hover:scale-[1.01] transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue to Loop IT</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm text-red-700 rounded-xl text-sm border border-red-200/50">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-green-700 font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
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
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

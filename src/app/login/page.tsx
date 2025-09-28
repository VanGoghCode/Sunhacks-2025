"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { authenticateUser, setUserSession } from "@/lib/auth";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-green-600/80">Sign in to your Loop IT account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-green-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-green-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-green-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
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
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-green-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/login"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-green-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-green-700 hover:text-green-600"
              >
                Sign up now
              </Link>
            </p>
          </div>

          {/* Test Credentials */}
          <div className="mt-8 p-4 bg-green-50/50 rounded-xl">
            <p className="text-sm text-green-700 font-medium mb-2">
              Demo Accounts:
            </p>
            <div className="space-y-1 text-xs text-green-600">
              <p><strong>LoopIT Dashboard:</strong> admin@loopit.org or admin@loopit.com</p>
              <p><strong>Amazon Dashboard:</strong> user@amazon.com</p>
              <p><strong>Marketplace:</strong> Any other email (e.g., user@gmail.com)</p>
              <p className="mt-2 text-green-500"><em>Use any password (minimum 3 characters)</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

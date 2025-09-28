"use client";

import { useEffect, useState } from "react";
import { getUserSession, User } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Impact } from "@/types/marketplace";
import { Download, Users, LeafyGreen, DollarSign } from "lucide-react";

export default function ImpactPage() {
  const [user, setUser] = useState<User | null>(null);
  const [impact, setImpact] = useState<Impact>({
    co2Avoided: 2500, // kg
    moneySaved: 15000, // €
    pupilsImpacted: 250,
    certificateUrl: "/certificates/impact-2025.pdf",
  });

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const handleDownloadCertificate = () => {
    // TODO: Implement certificate download
    console.log("Downloading certificate");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50/30">
        <DashboardNavbar
          title="Impact Report"
          userName={user?.name}
          userEmail={user?.email}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              Your Impact Report
            </h2>
            <p className="text-blue-600">
              See how your device requests have made a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* CO2 Avoided */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <LeafyGreen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">
                  CO₂ Avoided
                </h3>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {impact.co2Avoided.toLocaleString()} kg
              </div>
              <p className="text-sm text-blue-600">
                Of CO₂ emissions prevented through device reuse
              </p>
            </div>

            {/* Money Saved */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Money Saved
                </h3>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">
                €{impact.moneySaved.toLocaleString()}
              </div>
              <p className="text-sm text-blue-600">
                Total savings compared to new device purchases
              </p>
            </div>

            {/* Pupils Impacted */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Pupils Impacted
                </h3>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {impact.pupilsImpacted.toLocaleString()}
              </div>
              <p className="text-sm text-blue-600">
                Students benefiting from received devices
              </p>
            </div>
          </div>

          {/* Impact Certificate */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  Impact Certificate
                </h3>
                <p className="text-blue-600">
                  Download your impact certificate for donor reports and
                  documentation
                </p>
              </div>
              <Button
                variant="primary"
                onClick={handleDownloadCertificate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Certificate
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

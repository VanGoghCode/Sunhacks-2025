"use client";

import { useEffect, useState } from "react";
import { getUserSession, User } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Request } from "@/types/marketplace";
import { Download, Package, FileCheck, Truck, CheckCircle } from "lucide-react";

export default function RequestsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      devices: [
        {
          id: "1",
          title: "ThinkPad T480",
          description: "Perfect for students",
          image: "💻",
          organization: "Amazon",
          location: "Seattle, WA",
          rating: 4.8,
          specs: {
            screenSize: '14"',
            ram: "8GB",
            storage: "256GB",
            processor: "Intel i5",
          },
          condition: "A",
          price: "Free for NGOs",
          quantity: 5,
        },
      ],
      status: "Shipped",
      requestDate: "2025-09-25",
      approvalDate: "2025-09-26",
      shippingDate: "2025-09-27",
      waybillNumber: "WB123456789",
    },
  ]);

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const getStatusIcon = (status: Request["status"]) => {
    switch (status) {
      case "Requested":
        return <Package className="w-5 h-5" />;
      case "Approved":
        return <FileCheck className="w-5 h-5" />;
      case "Shipped":
        return <Truck className="w-5 h-5" />;
      case "Received":
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Request["status"]) => {
    switch (status) {
      case "Requested":
        return "bg-blue-100 text-blue-800";
      case "Approved":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Received":
        return "bg-green-100 text-green-800";
    }
  };

  const handlePrintWaybill = (requestId: string) => {
    // TODO: Implement waybill printing
    console.log("Printing waybill for request:", requestId);
  };

  const handleSubmitFeedback = (requestId: string) => {
    // TODO: Navigate to feedback form
    console.log("Submitting feedback for request:", requestId);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50/30">
        <DashboardNavbar
          title="My Requests"
          userName={user?.name}
          userEmail={user?.email}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              My Device Requests
            </h2>
            <p className="text-blue-600">
              Track and manage your device requests
            </p>
          </div>

          {/* Status Pipeline */}
          <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex justify-between">
              {["Requested", "Approved", "Shipped", "Received"].map(
                (status, index) => (
                  <div
                    key={status}
                    className="flex flex-col items-center w-1/4"
                  >
                    <div
                      className={`rounded-full p-3 ${getStatusColor(
                        status as Request["status"]
                      )}`}
                    >
                      {getStatusIcon(status as Request["status"])}
                    </div>
                    <div className="mt-2 text-sm font-medium text-blue-800">
                      {status}
                    </div>
                    {index < 3 && (
                      <div className="h-0.5 w-full bg-blue-200 mt-4" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {getStatusIcon(request.status)}
                        <span>{request.status}</span>
                      </span>
                      <span className="text-sm text-gray-500">
                        Request ID: {request.id}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {request.devices.map((device) => (
                        <div
                          key={device.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="text-4xl">{device.image}</div>
                          <div>
                            <h4 className="font-semibold text-blue-800">
                              {device.title}
                            </h4>
                            <p className="text-sm text-blue-600">
                              {device.specs.processor}, {device.specs.ram},{" "}
                              {device.specs.storage}
                            </p>
                            <p className="text-sm text-gray-500">
                              Quantity: {device.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                      <div>
                        Requested:{" "}
                        {new Date(request.requestDate).toLocaleDateString()}
                      </div>
                      {request.approvalDate && (
                        <div>
                          Approved:{" "}
                          {new Date(request.approvalDate).toLocaleDateString()}
                        </div>
                      )}
                      {request.shippingDate && (
                        <div>
                          Shipped:{" "}
                          {new Date(request.shippingDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {request.waybillNumber && request.status === "Shipped" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handlePrintWaybill(request.id)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Print Waybill
                      </Button>
                    )}
                    {request.status === "Received" && !request.feedback && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => handleSubmitFeedback(request.id)}
                      >
                        <FileCheck className="w-4 h-4 mr-2" />
                        Submit Feedback
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

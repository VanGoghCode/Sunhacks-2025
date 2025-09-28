"use client";

import { useState } from "react";

interface GenerateScriptResponse {
  script: string;
  logPreview: string;
}

interface AnalyzeLogResponse {
  status: "SUCCESS" | "FAILURE";
  issues: string[];
}

export default function Home() {
  const [api1Response, setApi1Response] = useState<GenerateScriptResponse | null>(null);
  const [api2Response, setApi2Response] = useState<AnalyzeLogResponse | null>(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error1, setError1] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);

  const callApi1 = async () => {
    setLoading1(true);
    setError1(null);
    setApi1Response(null);

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          os: "linux",
          driveType: "ssd",
          operator: "Test User",
          modelInfo: "Test Laptop",
          dummySizeMB: 10,
          passes: 3,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GenerateScriptResponse = await response.json();
      setApi1Response(data);
    } catch (err) {
      setError1(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading1(false);
    }
  };

  const callApi2 = async () => {
    setLoading2(true);
    setError2(null);
    setApi2Response(null);

    try {
      const response = await fetch("/api/analyze-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logContent: `=== Demo Wipe Operation Log ===
Generated: 2024-01-15 10:30:00
Operator: Test User
Model: Test Laptop
Drive Type: ssd
Dummy Size: 10MB
Passes: 3
=====================================
Created dummy_file_1.dat (10 MB)
Created dummy_file_2.dat (10 MB)
Wipe Pass 1: Started
Overwritten dummy_file_1.dat
Overwritten dummy_file_2.dat
Wipe Pass 1: Completed
Deleted dummy_file_1.dat
Deleted dummy_file_2.dat
Demo directory removed
=====================================
Demo wipe operation completed successfully`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AnalyzeLogResponse = await response.json();
      setApi2Response(data);
    } catch (err) {
      setError2(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Demo Wipe Assistant API Tester
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API 1 - Generate Script */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              API 1: Generate Script
            </h2>
            <button
              onClick={callApi1}
              disabled={loading1}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {loading1 ? "Loading..." : "Call Generate Script API"}
            </button>

            {error1 && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 rounded-lg">
                <strong>Error:</strong> {error1}
              </div>
            )}

            {api1Response && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 rounded-lg">
                  <strong>Success!</strong> Script generated successfully.
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Generated Script:</h3>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                    {api1Response.script}
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Log Preview:</h3>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                    {api1Response.logPreview}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* API 2 - Analyze Log */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              API 2: Analyze Log
            </h2>
            <button
              onClick={callApi2}
              disabled={loading2}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {loading2 ? "Loading..." : "Call Analyze Log API"}
            </button>

            {error2 && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 rounded-lg">
                <strong>Error:</strong> {error2}
              </div>
            )}

            {api2Response && (
              <div className="mt-4 space-y-4">
                <div className={`p-4 border rounded-lg ${
                  api2Response.status === "SUCCESS" 
                    ? "bg-green-100 dark:bg-green-900 border-green-400 text-green-700 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900 border-red-400 text-red-700 dark:text-red-300"
                }`}>
                  <strong>Status:</strong> {api2Response.status}
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Issues Found:</h3>
                  {api2Response.issues.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No issues found!</p>
                  ) : (
                    <ul className="list-disc list-inside space-y-1">
                      {api2Response.issues.map((issue, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                          {issue}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p>Click the buttons above to test the API endpoints and see their responses.</p>
        </div>
      </div>
    </div>
  );
}

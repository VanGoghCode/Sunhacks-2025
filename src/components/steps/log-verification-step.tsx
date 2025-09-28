"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle, Circle, Upload, Loader2 } from "lucide-react"

interface LogVerificationStepProps {
  isCompleted: boolean
  isActive: boolean
  onComplete: () => void
}

interface VerificationResult {
  status: "success" | "failed" | null
  message: string
}

export function LogVerificationStep({ isCompleted, isActive, onComplete }: LogVerificationStepProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [verificationResult, setVerificationResult] = useState<VerificationResult>({
    status: null,
    message: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleLogVerification = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)

    // Simulate AI verification
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Random success/failure for demo
    const isSuccess = Math.random() > 0.3

    setVerificationResult({
      status: isSuccess ? "success" : "failed",
      message: isSuccess
        ? "Log verification successful. Device has been securely wiped according to industry standards."
        : "Log verification failed. Incomplete wipe detected. Please retry the wipe process.",
    })

    if (isSuccess) {
      onComplete()
    }

    setIsProcessing(false)
  }

  return (
    <Card className={`transition-all duration-500 ${isActive ? "ring-2 ring-primary/20" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-primary" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground" />
          )}
          Step 2: Log Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isCompleted ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="logFile">Upload Log File</Label>
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input type="file" id="logFile" accept=".log,.txt" onChange={handleFileUpload} className="hidden" />
                <label htmlFor="logFile" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {uploadedFile ? uploadedFile.name : "Click to upload log file"}
                  </p>
                </label>
              </div>
            </div>

            {uploadedFile && (
              <Button onClick={handleLogVerification} className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying with AI...
                  </>
                ) : (
                  "Verify Log File"
                )}
              </Button>
            )}

            {verificationResult.status && (
              <div
                className={`p-4 rounded-lg border ${
                  verificationResult.status === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {verificationResult.status === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {verificationResult.status === "success" ? "Verification Successful" : "Verification Failed"}
                  </span>
                </div>
                <p className="text-sm">{verificationResult.message}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Log verification completed successfully</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

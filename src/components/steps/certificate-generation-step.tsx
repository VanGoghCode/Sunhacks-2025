"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Shield, FileText, Loader2 } from "lucide-react"

interface CertificateGenerationStepProps {
  isCompleted: boolean
  isActive: boolean
  formData: {
    osType: string
    hddType: string
    diskIdentifier: string
  }
  onComplete: () => void
}

export function CertificateGenerationStep({
  isCompleted,
  isActive,
  formData,
  onComplete,
}: CertificateGenerationStepProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const generateCertificate = async () => {
    setIsProcessing(true)

    // Simulate certificate generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onComplete()
    setIsProcessing(false)

    // Trigger download
    const certificateContent = `
DEVICE SECURITY CERTIFICATE
============================

Device Information:
- OS Type: ${formData.osType}
- HDD Type: ${formData.hddType}
- Disk Identifier: ${formData.diskIdentifier}

Verification Status: PASSED
Wipe Method: Secure Zero-Fill
Compliance: DoD 5220.22-M Standard

Certificate ID: CERT-${Date.now()}
Generated: ${new Date().toISOString()}

This certificate confirms that the above device has been securely wiped
and meets all industry security standards.
`

    const blob = new Blob([certificateContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `security-certificate-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
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
          Step 3: Certificate Generation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isCompleted ? (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Generate Security Certificate</h3>
              <p className="text-muted-foreground mb-6">
                Create an official certificate confirming the secure wipe process
              </p>
            </div>

            <Button onClick={generateCertificate} className="w-full" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Certificate...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Certificate
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Certificate generated successfully</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Process Complete
            </Badge>
            <p className="text-sm text-muted-foreground">Your security certificate has been downloaded automatically</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

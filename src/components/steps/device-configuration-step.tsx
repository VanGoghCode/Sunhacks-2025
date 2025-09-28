"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Circle, Download, Loader2 } from "lucide-react"

interface DeviceConfigurationStepProps {
  isCompleted: boolean
  isActive: boolean
  onComplete: (script: string) => void
}

interface FormData {
  osType: string
  hddType: string
  diskIdentifier: string
  deviceCondition: string
}

export function DeviceConfigurationStep({ isCompleted, isActive, onComplete }: DeviceConfigurationStepProps) {
  const [formData, setFormData] = useState<FormData>({
    osType: "",
    hddType: "",
    diskIdentifier: "",
    deviceCondition: "",
  })
  const [generatedScript, setGeneratedScript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const script = `#!/bin/bash
# Device Wipe Script
# OS Type: ${formData.osType}
# HDD Type: ${formData.hddType}
# Disk Identifier: ${formData.diskIdentifier}
# Device Condition: ${formData.deviceCondition}

echo "Starting secure wipe process..."
dd if=/dev/zero of=${formData.diskIdentifier} bs=1M status=progress
echo "Wipe completed successfully"
`

    setGeneratedScript(script)
    setIsProcessing(false)
    onComplete(script)
  }

  const downloadScript = () => {
    const blob = new Blob([generatedScript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "wipe-script.sh"
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
          Step 1: Device Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isCompleted ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="osType">Operating System Type</Label>
                <Select value={formData.osType} onValueChange={(value) => setFormData({ ...formData, osType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select OS Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="windows">Windows</SelectItem>
                    <SelectItem value="macos">macOS</SelectItem>
                    <SelectItem value="linux">Linux</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hddType">HDD Type</Label>
                <Select
                  value={formData.hddType}
                  onValueChange={(value) => setFormData({ ...formData, hddType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select HDD Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssd">SSD</SelectItem>
                    <SelectItem value="hdd">Traditional HDD</SelectItem>
                    <SelectItem value="nvme">NVMe</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deviceCondition">Device Condition</Label>
                <Select
                  value={formData.deviceCondition}
                  onValueChange={(value) => setFormData({ ...formData, deviceCondition: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diskIdentifier">Disk Identifier</Label>
                <Input
                  id="diskIdentifier"
                  value={formData.diskIdentifier}
                  onChange={(e) => setFormData({ ...formData, diskIdentifier: e.target.value })}
                  placeholder="/dev/sda1"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                !formData.osType ||
                !formData.hddType ||
                !formData.diskIdentifier ||
                !formData.deviceCondition ||
                isProcessing
              }
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Script...
                </>
              ) : (
                "Generate Wipe Script"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Configuration completed successfully</span>
            </div>
            {generatedScript && (
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Generated Script:</span>
                  <Button variant="outline" size="sm" onClick={downloadScript}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">{generatedScript}</pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

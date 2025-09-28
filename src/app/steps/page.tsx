"use client"

import { useState } from "react"
import { DeviceConfigurationStep } from "@/components/steps/device-configuration-step"
import { LogVerificationStep } from "@/components/steps/log-verification-step"
import { CertificateGenerationStep } from "@/components/steps/certificate-generation-step"
import { StepsProgress } from "@/components/steps/steps-progress"
import { Navbar } from "@/components/navbar"

export default function StepsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [formData, setFormData] = useState({
    osType: "",
    hddType: "",
    diskIdentifier: "",
  })

  const steps = [
    { id: 1, title: "Device Configuration", description: "Configure OS type, HDD type, and disk identifier" },
    { id: 2, title: "Log Verification", description: "Upload log file for AI verification" },
    { id: 3, title: "Certificate Generation", description: "Generate security certificate" },
  ]

  const handleStep1Complete = (script: string) => {
    setCompletedSteps([...completedSteps, 1])
    setCurrentStep(2)
  }

  const handleStep2Complete = () => {
    setCompletedSteps([...completedSteps, 2])
    setCurrentStep(3)
  }

  const handleStep3Complete = () => {
    setCompletedSteps([...completedSteps, 3])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/30 to-background">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Device Security Process</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Follow these steps to securely wipe and certify your device
            </p>
          </div>

          {/* Progress Steps */}
          <StepsProgress steps={steps} currentStep={currentStep} completedSteps={completedSteps} />

          {/* Step Content */}
          <div className="space-y-8">
            {/* Step 1: Device Configuration */}
            {currentStep >= 1 && (
              <DeviceConfigurationStep
                isCompleted={completedSteps.includes(1)}
                isActive={currentStep === 1}
                onComplete={handleStep1Complete}
              />
            )}

            {/* Step 2: Log Verification */}
            {currentStep >= 2 && (
              <LogVerificationStep
                isCompleted={completedSteps.includes(2)}
                isActive={currentStep === 2}
                onComplete={handleStep2Complete}
              />
            )}

            {/* Step 3: Certificate Generation */}
            {currentStep >= 3 && (
              <CertificateGenerationStep
                isCompleted={completedSteps.includes(3)}
                isActive={currentStep === 3}
                formData={formData}
                onComplete={handleStep3Complete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

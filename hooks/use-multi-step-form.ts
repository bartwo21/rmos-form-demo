import { useState } from "react"
import { cities } from "@/lib/form-schema"
import { stepHeaders } from "@/lib/constants"

export interface Step {
  id: string
  title: string
  description: string
  component: React.ComponentType<any>
}

export interface StepHeader {
  icon: React.ComponentType<any>
  iconBg: string
  iconColor: string
  title: string
  description: string
}

export function useMultiStepForm(steps: Step[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const currentStep = steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1

  function goToNext() {
    if (!isLastStep) {
      setCompletedSteps(prev => new Set(prev).add(currentStepIndex))
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  function goToPrevious() {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  function goToStep(stepIndex: number) {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStepIndex(stepIndex)
    }
  }

  function markStepAsCompleted(stepIndex: number) {
    setCompletedSteps(prev => new Set(prev).add(stepIndex))
  }

  function isStepCompleted(stepIndex: number) {
    return completedSteps.has(stepIndex)
  }

  const getStepFields = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return ["firstName", "lastName", "email", "phone", "birthDate"] as const
      case 1: return ["country", "city", "address", "postalCode"] as const
      case 2: return ["gender", "hobbies"] as const
      case 3: return ["password", "confirmPassword"] as const
      case 4: return ["biography"] as const
      case 5: return ["kvkkConsent"] as const
      default: return []
    }
  }

  const getStepHeader = (stepIndex: number): StepHeader => {
    const headers: StepHeader[] = stepHeaders
    return headers[stepIndex] || headers[0]
  }

  const getPasswordChecks = (password: string) => [
    { label: "En az 8 karakter", valid: password.length >= 8 },
    { label: "En az 1 büyük harf", valid: /[A-Z]/.test(password) },
    { label: "En az 1 küçük harf", valid: /[a-z]/.test(password) },
    { label: "En az 1 rakam", valid: /\d/.test(password) },
    { label: "En az 1 özel karakter", valid: /[@$!%*?&]/.test(password) },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setValue: any) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileName = file.name
      setUploadedFile(fileName)
      setValue("profilePhoto", fileName)
    }
  }

  const getAvailableCities = (selectedCountry: string) => {
    return selectedCountry && cities[selectedCountry as keyof typeof cities] 
      ? cities[selectedCountry as keyof typeof cities] 
      : []
  }

  const progress = ((currentStepIndex + 1) / steps.length) * 100

  return {
    currentStep,
    currentStepIndex,
    steps,
    isFirstStep,
    isLastStep,
    goToNext,
    goToPrevious,
    goToStep,
    markStepAsCompleted,
    isStepCompleted,
    getStepFields,
    getStepHeader,
    progress,
    completedSteps,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    getPasswordChecks,
    uploadedFile,
    setUploadedFile,
    handleFileUpload,
    getAvailableCities,
  }
}
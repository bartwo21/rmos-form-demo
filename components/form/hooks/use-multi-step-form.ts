import { useState } from "react"
import { FormData } from "@/lib/form-schema"
import { cities, stepHeaders } from "@/lib/constants"
import { FieldErrors, UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

export interface Step {
  id: string
  title: string
  description: string
  component: React.ComponentType<any>
}

interface StepHeader {
  icon: React.ComponentType<any>
  iconBg: string
  iconColor: string
  title: string
  description: string
}

export function useStepForm(steps: Step[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [maxReachedStep, setMaxReachedStep] = useState(0)
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const currentStep = steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1

  const goToNext = () => {
    if (!isLastStep) {
      setCompletedSteps(prev => new Set(prev).add(currentStepIndex))
      const nextStep = currentStepIndex + 1
      setCurrentStepIndex(nextStep)
      setMaxReachedStep(prev => Math.max(prev, nextStep))
    }
  }

  const goToPrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length && stepIndex <= maxReachedStep) {
      setCurrentStepIndex(stepIndex)
    }
  }

  const markStepAsCompleted = (stepIndex: number) => {
    setCompletedSteps(prev => new Set(prev).add(stepIndex))
  }

  const isStepCompleted = (stepIndex: number) => {
    return completedSteps.has(stepIndex)
  }

  const isLastVisitedStep = (stepIndex: number) => {
    return stepIndex === maxReachedStep && stepIndex > currentStepIndex && !completedSteps.has(stepIndex)
  }

  const resetForm = (form: UseFormReturn<FormData>) => {
    form.reset()
    setCurrentStepIndex(0)
    setCompletedSteps(new Set())
    setMaxReachedStep(0)
    setUploadedFile(null)
    setShowPassword(false)
    setShowConfirmPassword(false)
    setUploadedFile(null)
  }

  const getStepFields = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return ["firstName", "lastName", "email", "phone", "birthDate"]
      case 1: return ["country", "city", "address", "postalCode"]
      case 2: return ["gender", "hobbies"]
      case 3: return ["password", "confirmPassword"]
      case 4: return ["biography"]
      case 5: return ["kvkkConsent"]
      default: return []
    }
  }

  const getStepHeader = (stepIndex: number): StepHeader => {
    const headers: StepHeader[] = stepHeaders
    return headers[stepIndex] || headers[0]
  }

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
  
  const validatePasswordsMatch = async (form: UseFormReturn<FormData>) => {
    const password = form.getValues("password")
    const confirmPassword = form.getValues("confirmPassword")
    
    if (password !== confirmPassword) {
      form.setError("confirmPassword", { 
        type: "manual",
        message: "Şifreler eşleşmiyor",
      })
      return false
    }
    
    return true
  }

  const handleSubmitError = (formErrors: FieldErrors<FormData>) => {
    const errorMessages = Object.values(formErrors)
      .map(error => error?.message)
      .filter(message => message)
    
    if (errorMessages.length > 0) {
      const errorText = errorMessages.length === 1 
        ? errorMessages[0] 
        : errorMessages.join(', ')
      
      toast.error(errorText)
    }
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
    isLastVisitedStep,
    getStepFields,
    getStepHeader,
    progress,
    completedSteps,
    maxReachedStep,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    uploadedFile,
    setUploadedFile,
    handleFileUpload,
    getAvailableCities,
    validatePasswordsMatch,
    resetForm,
    handleSubmitError
  }
}
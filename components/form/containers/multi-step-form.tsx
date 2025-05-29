"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormData as FormDataType, formSchema } from "@/lib/form-schema"
import { useStepForm } from "@/components/form/hooks/use-multi-step-form"
import { steps, defaultFormValues } from "@/lib/constants"
import { useState } from "react"
import ProgressCard from "../components/progress-card"
import MultiStepFormFields from "../components/multi-step-form-fields"
import SubmittedDataDialog from "../components/submitted-data-dialog"

export function MultiStepForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormDataType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
    mode: "onChange",
  })

  const {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToNext,
    goToPrevious,
    goToStep,
    progress,
    isStepCompleted,
    isLastVisitedStep,
    getStepFields,
    validatePasswordsMatch,
    maxReachedStep,
    resetForm,
    handleSubmitError
  } = useStepForm(steps)

  const CurrentStepComponent = currentStep.component

  const onSubmit = async (data: FormDataType) => {
    if (isLastStep) {
      setIsSubmitting(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsDialogOpen(true)
        setSubmittedData(data)
      } catch (error) {
        console.error("error:", error)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      goToNext()
    }
  }

  const handleNewForm = () => {
    setIsDialogOpen(false)
    resetForm(form)
  }

  const validateCurrentStep = async () => {
    const stepFields = getStepFields(currentStepIndex) as (keyof FormDataType)[]
    const isValid = await form.trigger(stepFields)
    console.log(stepFields, isValid)
    
    if (currentStepIndex === 3 && isValid) {
      return await validatePasswordsMatch(form)
    }
    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      goToNext()
    }
  }

  return (
    <div className="w-full mx-auto space-y-8">
      <ProgressCard 
        currentStepIndex={currentStepIndex} 
        progress={progress} 
        isStepCompleted={isStepCompleted} 
        isLastVisitedStep={isLastVisitedStep} 
        maxReachedStep={maxReachedStep} 
        goToStep={goToStep} />
      

      <MultiStepFormFields
        form={form}
        onSubmit={onSubmit}
        CurrentStepComponent={CurrentStepComponent}
        goToPrevious={goToPrevious}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
        handleNext={handleNext}
        handleSubmitError={handleSubmitError}
      />

      <SubmittedDataDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        submittedData={submittedData as FormDataType}
        handleNewForm={handleNewForm}
        setShowSuccessDialog={() => setIsDialogOpen(false)}
      />
    </div>
  )
} 
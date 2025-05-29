"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormData, formSchema } from "@/lib/form-schema"
import { useMultiStepForm } from "@/hooks/use-multi-step-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { steps, defaultFormValues } from "@/lib/constants"
import { ChevronLeft, ChevronRight, Send, CheckCircle } from "lucide-react"
import { useState } from "react"
import { StepButton } from "@/components/step-button"
import SubmittedDataDialog from "@/components/submittedDataDialog"

export function MultiStepForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<FormData>({
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
    validatePasswords,
    maxReachedStep,
    resetForm
  } = useMultiStepForm(steps)

  const CurrentStepComponent = currentStep.component

  const onSubmit = async (data: FormData) => {
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
    const stepFields = getStepFields(currentStepIndex)
    const isValid = await form.trigger(stepFields)
    
    if (currentStepIndex === 3 && isValid) {
      return await validatePasswords(form)
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
      <Card className="bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
        <CardHeader>
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Kayıt Formu
            </h1>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Adım {currentStepIndex + 1} / {steps.length}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                %{Math.round(progress)} tamamlandı
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-x-4 overflow-x-auto">
          {steps.map((step, index) => (
            <StepButton
              key={step.id}
              step={step}
              index={index}
              currentStepIndex={currentStepIndex}
              isStepCompleted={isStepCompleted}
              isLastVisitedStep={isLastVisitedStep}
              maxReachedStep={maxReachedStep}
              onStepClick={goToStep}
            />
          ))}
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="pt-0">
              <CurrentStepComponent form={form} />
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={goToPrevious}
              disabled={isFirstStep}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Önceki
            </Button>

            {isLastStep ? (
              <Button
                type="submit"
                disabled={!form.watch("kvkkConsent") || isSubmitting}
                className="flex items-center gap-2"
                onClick={
                  () => console.log(form.formState.errors)
                }
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmitting ? "Gönderiliyor..." : "Formu Gönder"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Sonraki
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </Form>

      <SubmittedDataDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        submittedData={submittedData as FormData}
        handleNewForm={handleNewForm}
        setShowSuccessDialog={() => setIsDialogOpen(false)}
      />
    </div>
  )
} 
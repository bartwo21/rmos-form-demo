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
import { Separator } from "@/components/ui/separator"
import { steps, defaultFormValues } from "@/lib/constants"
import { ChevronLeft, ChevronRight, Send, CheckCircle } from "lucide-react"
import { useState } from "react"



export function MultiStepForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    getStepFields,
  } = useMultiStepForm(steps)

  const CurrentStepComponent = currentStep.component

  const onSubmit = async (data: FormData) => {
    if (isLastStep) {
      setIsSubmitting(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log("Form submitted:", data)
        setIsSubmitted(true)
      } catch (error) {
        console.error("Submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      goToNext()
    }
  }

  const validateCurrentStep = async () => {
    const stepFields = getStepFields(currentStepIndex)
    const isValid = await form.trigger(stepFields)
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

      <Card className="bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-x-4 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-2 w-full">
                <button
                  onClick={() => goToStep(index)}
                  className={`flex w-full items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    index === currentStepIndex
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      : index < currentStepIndex || isStepCompleted(index)
                      ? "bg-green-100 text-green-700 cursor-pointer dark:bg-green-900/20 dark:text-green-400 hover:bg-green-150"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                  disabled={index > currentStepIndex && !isStepCompleted(index)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === currentStepIndex
                      ? "bg-blue-500 text-white"
                      : index < currentStepIndex || isStepCompleted(index)
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                  }`}>
                    {index < currentStepIndex || isStepCompleted(index) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="hidden sm:block">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <Separator orientation="vertical" className="h-8 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-end">
                <Badge variant="outline" className="text-xs">
                  {currentStepIndex + 1} / {steps.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CurrentStepComponent form={form} />
            </CardContent>
          </Card>

          <div className="flex justify-between items-center pt-6">
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
    </div>
  )
} 
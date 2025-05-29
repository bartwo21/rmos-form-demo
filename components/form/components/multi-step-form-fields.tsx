import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { ChevronRight, Send } from 'lucide-react'
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { FieldErrors, UseFormReturn } from 'react-hook-form'
import { FormData as FormDataType } from '@/lib/form-schema'

interface IMultiStepFormFieldsProps {
  form: UseFormReturn<FormDataType>,
  onSubmit: (data: FormDataType) => void,
  CurrentStepComponent: React.ComponentType<{ form: UseFormReturn<FormDataType> }>,
  goToPrevious: () => void,
  isFirstStep: boolean,
  isLastStep: boolean,
  isSubmitting: boolean,
  handleNext: () => void,
  handleSubmitError: (formErrors: FieldErrors<FormDataType>) => void
}

function MultiStepFormFields({
    form,
    onSubmit,
    CurrentStepComponent,
    goToPrevious,
    isFirstStep,
    isLastStep,
    isSubmitting,
    handleNext,
    handleSubmitError
}: IMultiStepFormFieldsProps) {
  return (
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
                onClick={() => {
                  if (form.formState.errors) {
                    handleSubmitError(form.formState.errors)
                  }
                }}
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
  )
}

export default MultiStepFormFields

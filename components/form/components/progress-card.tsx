import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { StepButton } from './step-button'
import { CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { steps } from '@/lib/constants'

function ProgressCard({
    currentStepIndex,
    progress,
    isStepCompleted,
    isLastVisitedStep,
    maxReachedStep,
    goToStep
}: {
    currentStepIndex: number,
    progress: number,
    isStepCompleted: (index: number) => boolean,
    isLastVisitedStep: (index: number) => boolean,
    maxReachedStep: number,
    goToStep: (index: number) => void
}) {
  return (
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
  )
}

export default ProgressCard

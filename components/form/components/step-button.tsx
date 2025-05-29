"use client"

import { CheckCircle } from "lucide-react"
import { Step } from "@/components/form/hooks/use-multi-step-form"

interface StepButtonProps {
  step: Step
  index: number
  currentStepIndex: number
  isStepCompleted: (index: number) => boolean
  isLastVisitedStep: (index: number) => boolean
  maxReachedStep: number
  onStepClick: (index: number) => void
}

export function StepButton({
  step,
  index,
  currentStepIndex,
  isStepCompleted,
  isLastVisitedStep,
  maxReachedStep,
  onStepClick
}: StepButtonProps) {
  const getStepStyles = () => {
    if (index === currentStepIndex) {
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-500"
    }
    if (isStepCompleted(index)) {
      return "bg-green-100 text-green-700 cursor-pointer dark:bg-green-900/20 dark:text-green-400 hover:bg-green-150 border-green-500"
    }
    if (isLastVisitedStep(index)) {
      return "bg-yellow-50 text-yellow-700 cursor-pointer dark:bg-yellow-900/20 dark:text-yellow-400 hover:bg-yellow-100 border-yellow-500 border-dashed"
    }
    if (index <= maxReachedStep) {
      return "bg-gray-50 text-gray-700 cursor-pointer dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 border-gray-300"
    }
    return "text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50 border-transparent"
  }

  const getIconStyles = () => {
    if (index === currentStepIndex) {
      return "bg-blue-500 text-white"
    }
    if (isStepCompleted(index)) {
      return "bg-green-500 text-white"
    }
    if (isLastVisitedStep(index)) {
      return "bg-yellow-500 text-white"
    }
    if (index <= maxReachedStep) {
      return "bg-gray-400 text-white"
    }
    return "bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
  }

  return (
    <div className="flex items-center space-x-2 w-full">
      <button
        onClick={() => onStepClick(index)}
        className={`flex w-full items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border-2 ${getStepStyles()}`}
        disabled={index > maxReachedStep}
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-0 ${getIconStyles()}`}>
          {isStepCompleted(index) ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            index + 1
          )}
        </div>
        <span className="hidden sm:block ml-2">{step.title}</span>
      </button>
    </div>
  )
}
import { PropsWithChildren, useEffect, useState } from 'react'

type StepProps = PropsWithChildren & {
  step: number
}

export function useSteps(initialStep: number = 0) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  function nextStep() {
    setCurrentStep(currentStep + 1)
  }

  function previousStep() {
    if (currentStep <= 0) return
    setCurrentStep(currentStep - 1)
  }

  function goToStep(step: number) {
    if (step < 0) return
    setCurrentStep(step)
  }

  return {
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    Step: ({ children, step }: StepProps) => {
      // Durante a hidratação, renderiza o step inicial para evitar inconsistências
      if (!isClient) {
        return step === initialStep ? children : null
      }

      if (step !== currentStep) return null
      return children
    },
  }
}

import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

type StepProps = PropsWithChildren & {
  step: number
}

export function useSteps(initialStep: number = 0) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1)
  }, [])

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1))
  }, [])

  const goToStep = useCallback((step: number) => {
    if (step < 0) return
    setCurrentStep(step)
  }, [])

  const Step = useCallback(
    ({ children, step }: StepProps) => {
      if (!isClient) {
        return step === initialStep ? children : null
      }

      if (step !== currentStep) return null
      return children
    },
    [currentStep, initialStep, isClient]
  )

  return { currentStep, nextStep, previousStep, goToStep, Step }
}

interface ProgressStepperProps {
  currentStep: number
  steps: string[]
}

export function ProgressStepper({ currentStep, steps }: ProgressStepperProps) {
  return (
    <div className="stepper-container">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="stepper-step">
              <div
                className={`stepper-circle ${
                  index <= currentStep ? "stepper-circle-active" : "stepper-circle-inactive"
                }`}
              >
                {index + 1}
              </div>
              <span className="stepper-label">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`stepper-line ${index < currentStep ? "stepper-line-active" : "stepper-line-inactive"}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

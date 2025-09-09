import React from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { focusManagement, keyboardNavigation } from '@/design-system/accessibility'
import { rtl, iconDirection } from '@/design-system/rtl'

interface Step {
  id: string
  title: string
  description?: string
  status: 'completed' | 'current' | 'upcoming'
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onNavigate?: (step: number) => void
  className?: string
  orientation?: 'horizontal' | 'vertical'
  showLabels?: boolean
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onNavigate,
  className,
  orientation = 'horizontal',
  showLabels = true
}) => {
  const { t } = useTranslation()
  const [focusedIndex, setFocusedIndex] = React.useState(currentStep)
  const stepRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (!onNavigate) return

    const newIndex = keyboardNavigation.handleArrowKeys(
      event,
      stepRefs.current.filter(Boolean) as HTMLButtonElement[],
      index,
      orientation
    )
    
    if (newIndex !== index) {
      setFocusedIndex(newIndex)
    }
  }

  const handleStepClick = (index: number) => {
    if (onNavigate) {
      onNavigate(index)
      focusManagement.announce(`Navigated to step ${index + 1}: ${steps[index].title}`)
    }
  }

  const getStepIcon = (step: Step, index: number) => {
    if (step.status === 'completed') {
      return <Check className="w-4 h-4" aria-hidden="true" />
    }
    return index + 1
  }

  const getStepStatus = (step: Step, index: number) => {
    if (step.status === 'completed') return 'completed'
    if (step.status === 'current') return 'current'
    if (index < currentStep) return 'completed'
    return 'upcoming'
  }

  if (orientation === 'vertical') {
    return (
      <nav 
        className={cn('space-y-4', className)}
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label="Progress"
      >
        {steps.map((step, index) => {
          const status = getStepStatus(step, index)
          const isClickable = onNavigate && (status === 'completed' || index <= currentStep)
          
          return (
            <div key={step.id} className="flex items-start gap-4">
              <button
                ref={(el) => (stepRefs.current[index] = el)}
                onClick={() => isClickable && handleStepClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={!isClickable}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                  'focus:outline-none focus:ring-2 focus:ring-primary transition-colors',
                  'touch-target',
                  status === 'completed' && 'bg-primary text-white',
                  status === 'current' && 'bg-primary/10 text-primary border-2 border-primary',
                  status === 'upcoming' && 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
                  isClickable && 'hover:bg-primary/20 cursor-pointer',
                  !isClickable && 'cursor-default'
                )}
                aria-label={`Step ${index + 1}: ${step.title}`}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                {getStepIcon(step, index)}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={cn(
                    'text-sm font-medium',
                    status === 'current' ? 'text-primary' : 'text-gray-900 dark:text-gray-100'
                  )}>
                    {step.title}
                  </h3>
                  {status === 'current' && (
                    <span className="text-xs text-primary font-medium">
                      {t('common.current', 'Current')}
                    </span>
                  )}
                </div>
                {step.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
          )
        })}
      </nav>
    )
  }

  return (
    <nav 
      className={cn('flex items-center justify-between', className)}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label="Progress"
    >
      {steps.map((step, index) => {
        const status = getStepStatus(step, index)
        const isClickable = onNavigate && (status === 'completed' || index <= currentStep)
        
        return (
          <div key={step.id} className="flex items-center">
            <button
              ref={(el) => (stepRefs.current[index] = el)}
              onClick={() => isClickable && handleStepClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={!isClickable}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                'focus:outline-none focus:ring-2 focus:ring-primary transition-colors',
                'touch-target',
                status === 'completed' && 'bg-primary text-white',
                status === 'current' && 'bg-primary/10 text-primary border-2 border-primary',
                status === 'upcoming' && 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
                isClickable && 'hover:bg-primary/20 cursor-pointer',
                !isClickable && 'cursor-default'
              )}
              aria-label={`Step ${index + 1}: ${step.title}`}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              {getStepIcon(step, index)}
            </button>
            
            {showLabels && (
              <div className="ms-2 min-w-0">
                <div className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {step.description}
                  </div>
                )}
              </div>
            )}
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  'w-12 h-0.5 mx-2 flex items-center justify-center',
                  status === 'completed' 
                    ? 'bg-primary' 
                    : 'bg-gray-200 dark:bg-gray-700'
                )}
              >
                <ChevronRight 
                  className={cn(
                    'w-3 h-3 text-gray-400',
                    iconDirection.flipHorizontal('')
                  )}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default Stepper

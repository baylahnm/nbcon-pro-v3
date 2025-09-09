import React from 'react'
import { useTranslation } from 'react-i18next'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formValidation, focusManagement } from '@/design-system/accessibility'
import { rtl, form } from '@/design-system/rtl'

interface OtpCodeInputProps {
  length: number
  value: string
  onChange: (value: string) => void
  onComplete: (code: string) => void
  error?: string
  disabled?: boolean
  className?: string
  label?: string
  autoFocus?: boolean
}

const OtpCodeInput: React.FC<OtpCodeInputProps> = ({
  length,
  value,
  onChange,
  onComplete,
  error,
  disabled,
  className,
  label,
  autoFocus = true
}) => {
  const { t } = useTranslation()
  const [isValid, setIsValid] = React.useState(true)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  React.useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return // Prevent multiple characters
    
    const newValue = value.split('')
    newValue[index] = digit
    const newCode = newValue.join('')
    
    onChange(newCode)
    
    // Auto-advance to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
    
    // Check if complete
    if (newCode.length === length && !newCode.includes('')) {
      const isValidOtp = formValidation.validateOTP(newCode, length)
      setIsValid(isValidOtp)
      if (isValidOtp) {
        onComplete(newCode)
        focusManagement.announce('Verification code completed')
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '')
    if (pastedData.length === length) {
      onChange(pastedData)
      const isValidOtp = formValidation.validateOTP(pastedData, length)
      setIsValid(isValidOtp)
      if (isValidOtp) {
        onComplete(pastedData)
        focusManagement.announce('Verification code completed')
      }
    }
  }

  const getErrorMessage = () => {
    if (error) return error
    if (!isValid && value.length === length) {
      return formValidation.getErrorMessage('Verification code', 'otp')
    }
    return null
  }

  const errorMessage = getErrorMessage()
  const isComplete = value.length === length && isValid

  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <label 
          className={cn(
            'block text-sm font-medium text-gray-700 dark:text-gray-300',
            form.getLabelAlign()
          )}
        >
          {label}
        </label>
      )}
      
      <div 
        className="flex gap-3 justify-center"
        onPaste={handlePaste}
        role="group"
        aria-label={`Enter ${length}-digit verification code`}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={disabled}
            className={cn(
              'w-12 h-12 text-center text-xl font-semibold border rounded-lg',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              'disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed',
              'transition-colors',
              errorMessage
                ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                : isComplete
                ? 'border-green-300 dark:border-green-700 focus:ring-green-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
            )}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-describedby={errorMessage ? 'otp-error' : undefined}
            aria-invalid={!!errorMessage}
            dir={form.getInputDirection('number')}
          />
        ))}
      </div>
      
      {errorMessage && (
        <p id="otp-error" className="text-sm text-red-600 dark:text-red-400 text-center flex items-center justify-center gap-1">
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          {errorMessage}
        </p>
      )}
      
      {isComplete && !errorMessage && (
        <p className="text-sm text-green-600 dark:text-green-400 text-center flex items-center justify-center gap-1">
          <CheckCircle className="w-4 h-4" aria-hidden="true" />
          {t('auth.codeVerified', 'Code verified successfully')}
        </p>
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {t('auth.otpHelp', 'Enter the {length}-digit code sent to your phone', { length })}
      </div>
    </div>
  )
}

export default OtpCodeInput

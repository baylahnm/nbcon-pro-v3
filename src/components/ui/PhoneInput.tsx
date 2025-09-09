import React from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formValidation } from '@/design-system/accessibility'
import { rtl, form } from '@/design-system/rtl'

interface PhoneInputProps {
  countryCode: string
  value: string
  onChange: (value: string) => void
  onCountryChange: (code: string) => void
  error?: string
  disabled?: boolean
  className?: string
  label?: string
  required?: boolean
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode,
  value,
  onChange,
  onCountryChange,
  error,
  disabled,
  className,
  label,
  required = false
}) => {
  const { t } = useTranslation()
  const [isValid, setIsValid] = React.useState(true)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const formatPhoneNumber = (input: string) => {
    // Saudi phone number formatting: +966 5XXXXXXXX
    const cleaned = input.replace(/\D/g, '')
    if (cleaned.startsWith('966')) {
      const number = cleaned.slice(3)
      if (number.length <= 9) {
        return `+966 ${number}`
      }
    }
    return input
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    onChange(formatted)
    
    // Validate phone number
    const isValidPhone = formValidation.validatePhone(formatted)
    setIsValid(isValidPhone)
  }

  const handleBlur = () => {
    if (value && !formValidation.validatePhone(value)) {
      setIsValid(false)
    }
  }

  const handleFocus = () => {
    setIsValid(true)
  }

  const getErrorMessage = () => {
    if (error) return error
    if (!isValid && value) {
      return formValidation.getErrorMessage('Phone number', 'phone')
    }
    return null
  }

  const errorMessage = getErrorMessage()

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label 
          className={cn(
            'block text-sm font-medium text-gray-700 dark:text-gray-300',
            form.getLabelAlign()
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Phone className="w-4 h-4 text-gray-400" aria-hidden="true" />
        </div>
        
        <input
          ref={inputRef}
          type="tel"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          className={cn(
            'block w-full pl-10 pr-10 py-3 border rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed',
            'transition-colors',
            errorMessage
              ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary'
          )}
          placeholder="5XXXXXXXX"
          aria-describedby={errorMessage ? 'phone-error' : undefined}
          aria-invalid={!!errorMessage}
          dir={form.getInputDirection('tel')}
          required={required}
        />
        
        {errorMessage && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AlertCircle className="w-4 h-4 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      
      {errorMessage && (
        <p id="phone-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          {errorMessage}
        </p>
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {t('auth.phoneFormat', 'Format: +966 5XXXXXXXX')}
      </div>
    </div>
  )
}

export default PhoneInput

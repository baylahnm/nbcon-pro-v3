import React from 'react';
import { cn } from '../lib/utils';
import { designTokens } from './tokens';

// Enhanced LanguageSelector Component
interface LanguageSelectorProps {
  languages: Array<{
    code: string;
    name: string;
    flag: string;
    numeralFormat: 'latin' | 'arabic';
  }>;
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

export function LanguageSelector({ 
  languages, 
  value, 
  onChange, 
  className 
}: LanguageSelectorProps) {
  return (
    <div 
      className={cn(
        "grid grid-cols-2 gap-3 p-4",
        className
      )}
      role="radiogroup"
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg border-2 transition-all",
            "hover:bg-gray-50 dark:hover:bg-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            value === lang.code
              ? "border-primary bg-primary/5"
              : "border-gray-200 dark:border-gray-700"
          )}
          role="radio"
          aria-checked={value === lang.code}
          aria-describedby={`${lang.code}-description`}
        >
          <span className="text-2xl" role="img" aria-label={lang.name}>
            {lang.flag}
          </span>
          <div className="text-start">
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {lang.name}
            </div>
            <div 
              id={`${lang.code}-description`}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {lang.numeralFormat === 'latin' ? '123' : '١٢٣'}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// Enhanced RoleCard Component
interface RoleCardProps {
  role: 'engineer' | 'client' | 'enterprise';
  title: string;
  description: string;
  features: string[];
  icon: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}

export function RoleCard({
  role,
  title,
  description,
  features,
  icon,
  selected,
  onSelect,
  className
}: RoleCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-6 rounded-xl border-2 transition-all text-start",
        "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary",
        "group",
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
      )}
      role="radio"
      aria-checked={selected}
      aria-describedby={`${role}-features`}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center text-2xl",
          "transition-colors",
          selected 
            ? "bg-primary text-white" 
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary/10"
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {description}
          </p>
          <ul 
            id={`${role}-features`}
            className="space-y-1 text-sm text-gray-500 dark:text-gray-400"
          >
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        {selected && (
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

// Enhanced PhoneInput Component
interface PhoneInputProps {
  countryCode: string;
  value: string;
  onChange: (value: string) => void;
  onCountryChange: (code: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function PhoneInput({
  countryCode,
  value,
  onChange,
  onCountryChange,
  error,
  disabled,
  className
}: PhoneInputProps) {
  const formatPhoneNumber = (input: string) => {
    // Saudi phone number formatting: +966 5XXXXXXXX
    const cleaned = input.replace(/\D/g, '');
    if (cleaned.startsWith('966')) {
      const number = cleaned.slice(3);
      if (number.length <= 9) {
        return `+966 ${number}`;
      }
    }
    return input;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Phone Number
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 inset-s-0 ps-3 flex items-center pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {countryCode}
          </span>
        </div>
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            "block w-full ps-12 pe-3 py-3 border rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed",
            error
              ? "border-red-300 dark:border-red-700"
              : "border-gray-300 dark:border-gray-600"
          )}
          placeholder="5XXXXXXXX"
          aria-describedby={error ? "phone-error" : undefined}
          aria-invalid={!!error}
        />
      </div>
      {error && (
        <p id="phone-error" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

// Enhanced OtpCodeInput Component
interface OtpCodeInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  onComplete: (code: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function OtpCodeInput({
  length,
  value,
  onChange,
  onComplete,
  error,
  disabled,
  className
}: OtpCodeInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return; // Prevent multiple characters
    
    const newValue = value.split('');
    newValue[index] = digit;
    const newCode = newValue.join('');
    
    onChange(newCode);
    
    // Auto-advance to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Check if complete
    if (newCode.length === length && !newCode.includes('')) {
      onComplete(newCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length === length) {
      onChange(pastedData);
      onComplete(pastedData);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Enter verification code
      </label>
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
              "w-12 h-12 text-center text-xl font-semibold border rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed",
              error
                ? "border-red-300 dark:border-red-700"
                : "border-gray-300 dark:border-gray-600"
            )}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-describedby={error ? "otp-error" : undefined}
            aria-invalid={!!error}
          />
        ))}
      </div>
      {error && (
        <p id="otp-error" className="text-sm text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}
    </div>
  );
}

// Enhanced Stepper Component
interface StepperProps {
  steps: Array<{
    id: string;
    title: string;
    description?: string;
    status: 'completed' | 'current' | 'upcoming';
  }>;
  currentStep: number;
  onNavigate?: (step: number) => void;
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onNavigate,
  className
}: StepperProps) {
  return (
    <nav 
      className={cn("flex items-center justify-between", className)}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label="Progress"
    >
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => onNavigate?.(index)}
            disabled={!onNavigate}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
              "focus:outline-none focus:ring-2 focus:ring-primary",
              step.status === 'completed' && "bg-primary text-white",
              step.status === 'current' && "bg-primary/10 text-primary border-2 border-primary",
              step.status === 'upcoming' && "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
              onNavigate && "hover:bg-primary/20 cursor-pointer",
              !onNavigate && "cursor-default"
            )}
            aria-label={`Step ${index + 1}: ${step.title}`}
          >
            {step.status === 'completed' ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              index + 1
            )}
          </button>
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "w-12 h-0.5 mx-2",
                step.status === 'completed' 
                  ? "bg-primary" 
                  : "bg-gray-200 dark:bg-gray-700"
              )}
            />
          )}
        </div>
      ))}
    </nav>
  );
}

// Enhanced SlideToAct Component
interface SlideToActProps {
  label: string;
  onSlide: () => void;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  error?: string;
  className?: string;
}

export function SlideToAct({
  label,
  onSlide,
  disabled = false,
  loading = false,
  success = false,
  error,
  className
}: SlideToActProps) {
  const [isSliding, setIsSliding] = React.useState(false);
  const [slidePosition, setSlidePosition] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || loading || success) return;
    setIsSliding(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSlidePosition(percentage);
  };

  const handleMouseUp = () => {
    setIsSliding(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    if (slidePosition >= 80) {
      onSlide();
    } else {
      setSlidePosition(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled && !loading && !success) {
        onSlide();
      }
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        ref={trackRef}
        className={cn(
          "relative w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-full",
          "overflow-hidden cursor-pointer select-none",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onMouseDown={handleMouseDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        aria-label={label}
        aria-describedby={error ? "slide-error" : undefined}
      >
        <div
          ref={sliderRef}
          className={cn(
            "absolute top-1 inset-s-1 w-10 h-10 rounded-full transition-all duration-200",
            "flex items-center justify-center text-white font-medium",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            success 
              ? "bg-green-500" 
              : error 
              ? "bg-red-500" 
              : "bg-primary hover:bg-primary/90"
          )}
          style={{
            transform: `translateX(${slidePosition}%)`,
            transition: isSliding ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : success ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </div>
      </div>
      {error && (
        <p id="slide-error" className="text-sm text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}
    </div>
  );
}

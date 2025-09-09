import React from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { focusManagement, keyboardNavigation } from '@/design-system/accessibility'
import { rtl, iconDirection } from '@/design-system/rtl'

interface SlideToActProps {
  label: string
  onSlide: () => void
  disabled?: boolean
  loading?: boolean
  success?: boolean
  error?: string
  className?: string
  successMessage?: string
  threshold?: number
  showProgress?: boolean
}

const SlideToAct: React.FC<SlideToActProps> = ({
  label,
  onSlide,
  disabled = false,
  loading = false,
  success = false,
  error,
  className,
  successMessage,
  threshold = 80,
  showProgress = true
}) => {
  const { t } = useTranslation()
  const [isSliding, setIsSliding] = React.useState(false)
  const [slidePosition, setSlidePosition] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const sliderRef = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const startXRef = React.useRef<number>(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || loading || success) return
    
    setIsSliding(true)
    setIsDragging(true)
    startXRef.current = e.clientX
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!trackRef.current || !isDragging) return
    
    const rect = trackRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSlidePosition(percentage)
  }

  const handleMouseUp = () => {
    setIsSliding(false)
    setIsDragging(false)
    
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    
    if (slidePosition >= threshold) {
      onSlide()
      focusManagement.announce(successMessage || 'Action completed')
    } else {
      setSlidePosition(0)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || loading || success) return
    
    setIsSliding(true)
    setIsDragging(true)
    startXRef.current = e.touches[0].clientX
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!trackRef.current || !isDragging) return
    
    e.preventDefault()
    const rect = trackRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSlidePosition(percentage)
  }

  const handleTouchEnd = () => {
    setIsSliding(false)
    setIsDragging(false)
    
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
    
    if (slidePosition >= threshold) {
      onSlide()
      focusManagement.announce(successMessage || 'Action completed')
    } else {
      setSlidePosition(0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    keyboardNavigation.handleActivation(() => {
      if (!disabled && !loading && !success) {
        onSlide()
        focusManagement.announce(successMessage || 'Action completed')
      }
    })(e)
  }

  const getSliderIcon = () => {
    if (loading) {
      return <Loader2 className="w-4 h-4 animate-spin" />
    }
    if (success) {
      return <Check className="w-4 h-4" />
    }
    if (error) {
      return <AlertCircle className="w-4 h-4" />
    }
    return <ArrowRight className={cn('w-4 h-4', iconDirection.flipHorizontal(''))} />
  }

  const getSliderColor = () => {
    if (success) return 'bg-green-500'
    if (error) return 'bg-red-500'
    return 'bg-primary hover:bg-primary/90'
  }

  const getTrackColor = () => {
    if (success) return 'bg-green-100 dark:bg-green-900/20'
    if (error) return 'bg-red-100 dark:bg-red-900/20'
    return 'bg-gray-200 dark:bg-gray-700'
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div
        ref={trackRef}
        className={cn(
          'relative w-full h-12 rounded-full overflow-hidden cursor-pointer select-none',
          'transition-colors',
          getTrackColor(),
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        aria-label={label}
        aria-describedby={error ? 'slide-error' : undefined}
        aria-pressed={slidePosition >= threshold}
      >
        <div
          ref={sliderRef}
          className={cn(
            'absolute top-1 left-1 w-10 h-10 rounded-full transition-all duration-200',
            'flex items-center justify-center text-white font-medium',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            getSliderColor()
          )}
          style={{
            transform: `translateX(${slidePosition}%)`,
            transition: isSliding ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {getSliderIcon()}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </div>
        
        {showProgress && slidePosition > 0 && slidePosition < threshold && (
          <div 
            className="absolute top-0 left-0 h-full bg-primary/20 transition-all duration-200"
            style={{ width: `${slidePosition}%` }}
          />
        )}
      </div>
      
      {error && (
        <p id="slide-error" className="text-sm text-red-600 dark:text-red-400 text-center flex items-center justify-center gap-1">
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          {error}
        </p>
      )}
      
      {success && successMessage && (
        <p className="text-sm text-green-600 dark:text-green-400 text-center flex items-center justify-center gap-1">
          <Check className="w-4 h-4" aria-hidden="true" />
          {successMessage}
        </p>
      )}
      
      {!success && !error && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {t('common.slideToActivate', 'Slide to activate')}
        </div>
      )}
    </div>
  )
}

export default SlideToAct

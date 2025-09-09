import React from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { focusManagement, keyboardNavigation } from '@/design-system/accessibility'
import { rtl, iconDirection } from '@/design-system/rtl'

interface RoleCardProps {
  role: 'engineer' | 'client' | 'enterprise'
  title: string
  description: string
  features: string[]
  icon: string
  selected: boolean
  onSelect: () => void
  className?: string
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  title,
  description,
  features,
  icon,
  selected,
  onSelect,
  className
}) => {
  const { t } = useTranslation()
  const cardRef = React.useRef<HTMLButtonElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    keyboardNavigation.handleActivation(() => {
      onSelect()
      focusManagement.announce(`${title} selected`)
    })(event)
  }

  const handleSelect = () => {
    onSelect()
    focusManagement.announce(`${title} selected`)
  }

  return (
    <button
      ref={cardRef}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      className={cn(
        'w-full p-6 rounded-xl border-2 transition-all text-left',
        'hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary',
        'group touch-target',
        selected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      )}
      role="radio"
      aria-checked={selected}
      aria-describedby={`${role}-features`}
      aria-label={`Select ${title} role`}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-12 h-12 rounded-lg flex items-center justify-center text-2xl',
          'transition-colors',
          selected 
            ? 'bg-primary text-white' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary/10'
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
                <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          {selected && (
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
          )}
          <ArrowRight 
            className={cn(
              'w-4 h-4 text-gray-400 transition-transform group-hover:translate-x-1',
              iconDirection.flipHorizontal('')
            )}
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  )
}

export default RoleCard

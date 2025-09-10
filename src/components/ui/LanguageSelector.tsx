import React from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { focusManagement, keyboardNavigation } from '@/design-system/accessibility'
import { rtl, logicalProperties } from '@/design-system/rtl'

interface Language {
  code: string
  name: string
  flag: string
  numeralFormat: 'latin' | 'arabic'
}

interface LanguageSelectorProps {
  languages: Language[]
  selectedLanguage: string
  onLanguageChange: (code: string) => void
  className?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
  className
}) => {
  const { t } = useTranslation()
  const [focusedIndex, setFocusedIndex] = React.useState(0)
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const newIndex = keyboardNavigation.handleArrowKeys(
      event,
      buttonRefs.current.filter(Boolean) as HTMLButtonElement[],
      index,
      'horizontal'
    )
    
    if (newIndex !== index) {
      setFocusedIndex(newIndex)
    }
  }

  const handleLanguageChange = (code: string) => {
    onLanguageChange(code)
    focusManagement.announce(`Language changed to ${languages.find(l => l.code === code)?.name}`)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Globe className="w-4 h-4" />
        {t('common.selectLanguage')}
      </div>
      
      <div 
        className="grid grid-cols-2 gap-3"
        role="radiogroup"
        aria-label="Select language"
      >
        {languages.map((lang, index) => (
          <button
            key={lang.code}
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => handleLanguageChange(lang.code)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
              'hover:bg-gray-50 dark:hover:bg-gray-800',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'touch-target',
              selectedLanguage === lang.code
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 dark:border-gray-700'
            )}
            role="radio"
            aria-checked={selectedLanguage === lang.code}
            aria-label={`Select ${lang.name}`}
            aria-describedby={`${lang.code}-description`}
          >
            <span className="text-2xl" role="img" aria-label={lang.name}>
              {lang.flag}
            </span>
            <div className="flex-1 text-start">
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
            {selectedLanguage === lang.code && (
              <Check className="w-5 h-5 text-primary" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector

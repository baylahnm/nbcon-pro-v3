import { useTranslation } from 'react-i18next'
import { toSkillSlug } from '../../i18n/skillMap'

interface SkillChipProps {
  label: string
  className?: string
}

export function SkillChip({ label, className = '' }: SkillChipProps) {
  const { t } = useTranslation(['skills'])
  // Support both display labels (e.g., "AutoCAD") and slugs (e.g., "autocad")
  const raw = label.trim()
  const slug = toSkillSlug(raw) || raw
  const text = t(`${slug}`, { ns: 'skills', defaultValue: raw })
  
  return (
    <span 
      className={`px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full bidi-plaintext text-start ${className}`}
      dir="auto"
    >
      {text}
    </span>
  )
}

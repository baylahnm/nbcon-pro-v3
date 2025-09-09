import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { ArrowLeft, ArrowRight, Users, Wrench, Building2 } from 'lucide-react'

const RoleSelection = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language } = useThemeStore()
  const [selectedRole, setSelectedRole] = useState<'client' | 'engineer' | 'enterprise' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const isRTL = language === 'ar'

  const roles = [
    {
      id: 'client',
      title: t('roleSelection.client.title', { ns: 'auth' }),
      description: t('roleSelection.client.description', { ns: 'auth' }),
      icon: Users,
      features: [
        t('roleSelection.client.features.0', { ns: 'auth' }),
        t('roleSelection.client.features.1', { ns: 'auth' }),
        t('roleSelection.client.features.2', { ns: 'auth' }),
        t('roleSelection.client.features.3', { ns: 'auth' })
      ]
    },
    {
      id: 'engineer',
      title: t('roleSelection.engineer.title', { ns: 'auth' }),
      description: t('roleSelection.engineer.description', { ns: 'auth' }),
      icon: Wrench,
      features: [
        t('roleSelection.engineer.features.0', { ns: 'auth' }),
        t('roleSelection.engineer.features.1', { ns: 'auth' }),
        t('roleSelection.engineer.features.2', { ns: 'auth' }),
        t('roleSelection.engineer.features.3', { ns: 'auth' })
      ]
    },
    {
      id: 'enterprise',
      title: t('roleSelection.enterprise.title', { ns: 'auth' }),
      description: t('roleSelection.enterprise.description', { ns: 'auth' }),
      icon: Building2,
      features: [
        t('roleSelection.enterprise.features.0', { ns: 'auth' }),
        t('roleSelection.enterprise.features.1', { ns: 'auth' }),
        t('roleSelection.enterprise.features.2', { ns: 'auth' }),
        t('roleSelection.enterprise.features.3', { ns: 'auth' })
      ]
    }
  ]

  const handleRoleSelect = (role: 'client' | 'engineer' | 'enterprise') => {
    setSelectedRole(role)
  }

  const handleContinue = async () => {
    if (!selectedRole) return
    
    setIsLoading(true)
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigate('/phone-verification')
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-dark-surface dark:to-dark-surface2 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {t('roleSelection.title', { ns: 'auth' })}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300 text-lg"
          >
            {t('roleSelection.subtitle', { ns: 'auth' })}
          </motion.p>
        </div>

        {/* Role Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {roles.map((role, index) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id
            
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                }`}
                onClick={() => handleRoleSelect(role.id as 'client' | 'engineer' | 'enterprise')}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className={`absolute top-4 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center ${
                    isRTL ? 'left-4' : 'right-4'
                  }`}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}

                {/* Icon */}
                <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-semibold text-gray-900 dark:text-white mb-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {role.title}
                </h3>
                <p className={`text-gray-600 dark:text-gray-300 mb-4 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {role.description}
                </p>

                {/* Features */}
                <ul className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {role.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center text-sm text-gray-600 dark:text-gray-400 ${
                      isRTL ? '' : ''
                    }`}>
                      <div className={`w-1.5 h-1.5 bg-brand-500 rounded-full ${
                        isRTL ? 'ml-3' : 'mr-3'
                      }`} />
                      <span className={`${isRTL ? 'text-right' : 'text-left'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleBack}
            variant="outline"
            size="lg"
            className="sm:w-auto"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('actions.back', { ns: 'common' })}
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            loading={isLoading}
            size="lg"
            className="sm:w-auto bg-brand-500 hover:bg-brand-600 text-white"
          >
            {t('actions.continue', { ns: 'common' })}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RoleSelection

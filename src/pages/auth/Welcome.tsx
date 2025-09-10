import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { CheckCircle, ArrowRight, Play } from 'lucide-react'

const Welcome = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language } = useThemeStore()
  const [isLoading, setIsLoading] = useState(false)
  
  const isRTL = language === 'ar'

  const handleTutorial = async () => {
    setIsLoading(true)
    
    try {
      // Simulate tutorial loading
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would start the tutorial flow
      navigate('/permissions')
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    navigate('/permissions')
  }

  const handleGetStarted = () => {
    navigate('/permissions')
  }

  const features = [
    {
      title: t('welcome.features.aiMatching.title', { ns: 'auth' }),
      description: t('welcome.features.aiMatching.description', { ns: 'auth' }),
      icon: '🤖'
    },
    {
      title: t('welcome.features.securePayments.title', { ns: 'auth' }),
      description: t('welcome.features.securePayments.description', { ns: 'auth' }),
      icon: '🔒'
    },
    {
      title: t('welcome.features.realTimeTracking.title', { ns: 'auth' }),
      description: t('welcome.features.realTimeTracking.description', { ns: 'auth' }),
      icon: '📊'
    },
    {
      title: t('welcome.features.professionalNetwork.title', { ns: 'auth' }),
      description: t('welcome.features.professionalNetwork.description', { ns: 'auth' }),
      icon: '🌐'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-dark-surface dark:to-dark-surface2 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center"
        >
          {t('welcome.title', { ns: 'auth' })}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center"
        >
          {t('welcome.subtitle', { ns: 'auth' })}
        </motion.p>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm ${
                isRTL ? 'text-right' : 'text-left'
              }`}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${
                isRTL ? 'text-right' : 'text-left'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-gray-600 dark:text-gray-300 text-sm ${
                isRTL ? 'text-right' : 'text-left'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-4"
        >
          <Button
            onClick={handleTutorial}
            loading={isLoading}
            size="lg"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white"
          >
            <Play className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('welcome.tutorial', { ns: 'auth' })}
          </Button>
          
          <Button
            onClick={handleGetStarted}
            variant="outline"
            size="lg"
            className="w-full"
          >
            {t('welcome.getStarted', { ns: 'auth' })}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
          </Button>
          
          <Button
            onClick={handleSkip}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            {t('welcome.skip', { ns: 'auth' })}
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          <p className="text-center">
            {t('welcome.footer', { ns: 'auth' })}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Welcome

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { Globe, ArrowRight } from 'lucide-react'

const SplashScreen = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language, setLanguage } = useThemeStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage)
  }

  const handleContinue = async () => {
    setIsLoading(true)
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigate('/role-selection')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-dark-surface dark:to-dark-surface2 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-brand-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            NBCON Pro
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('auth.splash.subtitle')}
          </p>
        </motion.div>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('auth.splash.selectLanguage')}
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                language === 'en'
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Globe className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">English</span>
            </button>
            
            <button
              onClick={() => handleLanguageChange('ar')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                language === 'ar'
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Globe className="w-6 h-6 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">العربية</span>
            </button>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={handleContinue}
            loading={isLoading}
            size="lg"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white"
          >
            {t('auth.splash.continue')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          <p>© 2024 NBCON Pro. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SplashScreen

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { ArrowLeft, DollarSign, Clock, Calendar, Briefcase } from 'lucide-react'

const RateSetting = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language } = useThemeStore()
  const [isLoading, setIsLoading] = useState(false)
  
  const isRTL = language === 'ar'
  const [rates, setRates] = useState({
    hourly: '',
    daily: '',
    project: '',
    currency: 'SAR'
  })

  const handleRateChange = (type: string, value: string) => {
    // Only allow numbers and decimal point
    const cleaned = value.replace(/[^0-9.]/g, '')
    setRates(prev => ({ ...prev, [type]: cleaned }))
  }

  const handleCurrencyChange = (currency: string) => {
    setRates(prev => ({ ...prev, currency }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store rates data
      localStorage.setItem('ratesData', JSON.stringify(rates))
      
      navigate('/welcome')
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/service-area')
  }

  const rateTypes = [
    {
      id: 'hourly',
      title: t('rateSetting.hourlyRate', { ns: 'auth' }),
      icon: Clock,
      placeholder: '100',
      description: t('rateSetting.hourlyDescription', { ns: 'auth' })
    },
    {
      id: 'daily',
      title: t('rateSetting.dailyRate', { ns: 'auth' }),
      icon: Calendar,
      placeholder: '800',
      description: t('rateSetting.dailyDescription', { ns: 'auth' })
    },
    {
      id: 'project',
      title: t('rateSetting.projectRate', { ns: 'auth' }),
      icon: Briefcase,
      placeholder: '5000',
      description: t('rateSetting.projectDescription', { ns: 'auth' })
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-dark-surface dark:to-dark-surface2 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 bg-brand-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          >
            <DollarSign className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center"
          >
            {t('rateSetting.title', { ns: 'auth' })}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300 text-center"
          >
            {t('rateSetting.subtitle', { ns: 'auth' })}
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-6"
        >
          {/* Currency Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('rateSetting.currency', { ns: 'auth' })}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleCurrencyChange('SAR')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  rates.currency === 'SAR'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🇸🇦</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t('rateSetting.currencySAR', { ns: 'auth' })}
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleCurrencyChange('USD')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  rates.currency === 'USD'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🇺🇸</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t('rateSetting.currencyUSD', { ns: 'auth' })}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Rate Inputs */}
          <div className="space-y-4">
            {rateTypes.map((rateType, index) => {
              const Icon = rateType.icon
              const value = rates[rateType.id as keyof typeof rates]
              
              return (
                <motion.div
                  key={rateType.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                >
                  <div className={`flex items-center mb-4 ${isRTL ? 'justify-end' : ''}`}>
                    <div className={`w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center ${
                      isRTL ? 'ml-3' : 'mr-3'
                    }`}>
                      <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        {rateType.title}
                      </h3>
                      <p className={`text-sm text-gray-500 dark:text-gray-400 ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        {rateType.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {rates.currency}
                    </span>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleRateChange(rateType.id, e.target.value)}
                      placeholder={rateType.placeholder}
                      className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent text-lg font-semibold"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            loading={isLoading}
            size="lg"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white"
          >
            {isLoading ? t('loading.saving', { ns: 'common' }) : t('rateSetting.continue', { ns: 'auth' })}
          </Button>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6"
        >
          <Button
            onClick={handleBack}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('actions.back', { ns: 'common' })}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RateSetting

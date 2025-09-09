import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { ArrowLeft, Phone, CheckCircle } from 'lucide-react'
import { validatePhoneNumber } from '@/lib/utils'

const PhoneVerification = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language } = useThemeStore()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('+966')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const isRTL = language === 'ar'

  const countryOptions = [
    { code: '+966', country: 'Saudi Arabia', countryAr: 'المملكة العربية السعودية', flag: '🇸🇦' },
    { code: '+971', country: 'UAE', countryAr: 'الإمارات العربية المتحدة', flag: '🇦🇪' },
    { code: '+965', country: 'Kuwait', countryAr: 'الكويت', flag: '🇰🇼' },
    { code: '+974', country: 'Qatar', countryAr: 'قطر', flag: '🇶🇦' },
    { code: '+973', country: 'Bahrain', countryAr: 'البحرين', flag: '🇧🇭' },
    { code: '+968', country: 'Oman', countryAr: 'عُمان', flag: '🇴🇲' },
  ]

  const handlePhoneChange = (value: string) => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, '')
    setPhoneNumber(cleaned)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const fullPhoneNumber = `${countryCode}${phoneNumber}`
    
    if (!phoneNumber) {
      setError(t('errors.required', { ns: 'common' }))
      return
    }
    
    if (!validatePhoneNumber(fullPhoneNumber)) {
      setError(t('errors.invalid', { ns: 'common' }))
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store phone number in localStorage for OTP screen
      localStorage.setItem('verificationPhone', fullPhoneNumber)
      
      navigate('/otp-verification')
    } catch (err) {
      setError(t('errors.network', { ns: 'common' }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/role-selection')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-dark-surface dark:to-dark-surface2 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 bg-brand-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          >
            <Phone className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {t('phoneVerification.title', { ns: 'auth' })}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300"
          >
            {t('phoneVerification.subtitle', { ns: 'auth' })}
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Country Code Selection */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('phoneVerification.countryLabel', { ns: 'auth' })}
            </label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              {countryOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.flag} {isRTL ? option.countryAr : option.country} ({option.code})
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('phoneVerification.phoneLabel', { ns: 'auth' })}
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder={t('phoneVerification.phonePlaceholder', { ns: 'auth' })}
                className={`w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                  isRTL ? 'pr-16' : 'pl-16'
                } ${
                  error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                maxLength={15}
              />
              <div className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 ${
                isRTL ? 'right-3' : 'left-3'
              }`}>
                {countryCode}
              </div>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isLoading}
            disabled={!phoneNumber || isLoading}
            size="lg"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white"
          >
            {isLoading ? (
              t('loading.processing', { ns: 'common' })
            ) : (
              <>
                <CheckCircle className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('phoneVerification.submit', { ns: 'auth' })}
              </>
            )}
          </Button>
        </motion.form>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6"
        >
          <Button
            onClick={handleBack}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('phoneVerification.back', { ns: 'auth' })}
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className={`mt-8 text-sm text-gray-500 dark:text-gray-400 ${
            isRTL ? 'text-right' : 'text-center'
          }`}
        >
          <p>
            {t('auth.termsFooter', { ns: 'common' })}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PhoneVerification

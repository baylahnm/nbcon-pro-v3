import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, CheckCircle } from 'lucide-react'
import { validatePhoneNumber } from '@/lib/utils'

const PhoneVerification = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('+966')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const countryOptions = [
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
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
      setError(t('common.errors.required'))
      return
    }
    
    if (!validatePhoneNumber(fullPhoneNumber)) {
      setError(t('common.errors.invalid'))
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
      setError(t('common.errors.network'))
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
            {t('auth.phoneVerification.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300"
          >
            {t('auth.phoneVerification.subtitle')}
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('auth.phoneVerification.countryLabel')}
            </label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              {countryOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.flag} {option.country} ({option.code})
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('auth.phoneVerification.phoneLabel')}
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder={t('auth.phoneVerification.phonePlaceholder')}
                className={`w-full p-3 pl-12 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                  error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                maxLength={15}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
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
              t('common.loading.processing')
            ) : (
              <>
                <CheckCircle className="mr-2 w-5 h-5" />
                {t('auth.phoneVerification.submit')}
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
            <ArrowLeft className="mr-2 w-5 h-5" />
            {t('auth.phoneVerification.back')}
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PhoneVerification

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { ArrowLeft, Shield, RotateCcw } from 'lucide-react'

const OtpVerification = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language } = useThemeStore()
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  
  const isRTL = language === 'ar'

  useEffect(() => {
    // Get phone number from localStorage
    const storedPhone = localStorage.getItem('verificationPhone')
    if (storedPhone) {
      setPhoneNumber(storedPhone)
    } else {
      navigate('/phone-verification')
    }
  }, [navigate])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleOtpChange = (value: string) => {
    // Only allow digits and limit to 4 characters
    const cleaned = value.replace(/\D/g, '').slice(0, 4)
    setOtp(cleaned)
    setError('')
    
    // Auto-submit when 4 digits are entered
    if (cleaned.length === 4) {
      handleSubmit(cleaned)
    }
  }

  const handleSubmit = async (otpValue?: string) => {
    const code = otpValue || otp
    
    if (code.length !== 4) {
      setError('Please enter a 4-digit code')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, accept any 4-digit code
      if (code === '1234' || code.length === 4) {
        navigate('/profile-setup')
      } else {
        setError('Invalid verification code')
      }
    } catch (err) {
      setError(t('errors.network', { ns: 'common' }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    
    setResendTimer(60)
    setError('')
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In real app, this would trigger SMS resend
    } catch (err) {
      setError('Failed to resend code. Please try again.')
    }
  }

  const handleBack = () => {
    navigate('/phone-verification')
  }

  const formatPhoneNumber = (phone: string) => {
    // Format phone number for display (e.g., +966 50 123 4567)
    if (phone.length > 6) {
      return phone.replace(/(\+\d{3})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4')
    }
    return phone
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
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {t('otpVerification.title', { ns: 'auth' })}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300"
          >
            {t('otpVerification.subtitle', { ns: 'auth' })}
          </motion.p>
          
          {phoneNumber && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm text-gray-500 dark:text-gray-400 mt-2"
            >
              {formatPhoneNumber(phoneNumber)}
            </motion.p>
          )}
        </div>

        {/* OTP Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
              isRTL ? 'text-right' : 'text-left'
            }`}>
              {t('otpVerification.codeLabel', { ns: 'auth' })}
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => handleOtpChange(e.target.value)}
              placeholder="0000"
              className={`w-full p-4 text-center text-2xl font-mono border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              maxLength={4}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            )}
          </div>

          {/* Resend Code */}
          <div className="text-center">
            {resendTimer > 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('otpVerification.resendIn', { ns: 'auth', seconds: resendTimer })}
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium"
              >
                <RotateCcw className={`inline w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t('otpVerification.resend', { ns: 'auth' })}
              </button>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={() => handleSubmit()}
            loading={isLoading}
            disabled={otp.length !== 4 || isLoading}
            size="lg"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white"
          >
            {isLoading ? (
              t('loading.processing', { ns: 'common' })
            ) : (
              t('otpVerification.verify', { ns: 'auth' })
            )}
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
            {t('otpVerification.back', { ns: 'auth' })}
          </Button>
        </motion.div>

        {/* Demo Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
        >
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            <strong>Demo:</strong> Enter any 4-digit code to continue
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OtpVerification

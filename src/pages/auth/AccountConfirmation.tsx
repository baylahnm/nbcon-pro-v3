import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, Edit, User, Phone, Mail, MapPin, DollarSign } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

const AccountConfirmation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [accountData, setAccountData] = useState<any>(null)

  useEffect(() => {
    // Load all stored data
    const profileData = localStorage.getItem('profileData')
    const serviceAreaData = localStorage.getItem('serviceAreaData')
    const ratesData = localStorage.getItem('ratesData')
    const permissionsData = localStorage.getItem('permissionsData')
    const phoneNumber = localStorage.getItem('verificationPhone')

    if (profileData && serviceAreaData && ratesData && permissionsData && phoneNumber) {
      setAccountData({
        profile: JSON.parse(profileData),
        serviceArea: JSON.parse(serviceAreaData),
        rates: JSON.parse(ratesData),
        permissions: JSON.parse(permissionsData),
        phone: phoneNumber
      })
    } else {
      // Redirect to splash if data is missing
      navigate('/')
    }
  }, [navigate])

  const handleConfirm = async () => {
    if (!accountData) return

    setIsLoading(true)
    
    try {
      // Simulate API call to create account
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Create user object
      const user = {
        id: 'user_' + Date.now(),
        role: 'engineer', // Default role for demo
        firstName: accountData.profile.firstName,
        lastName: accountData.profile.lastName,
        email: accountData.profile.email,
        phone: accountData.phone,
        isVerified: true,
        profileComplete: true,
        language: 'en',
        createdAt: new Date()
      }

      // Set user in store
      setUser(user)
      
      // Clear stored data
      localStorage.removeItem('profileData')
      localStorage.removeItem('serviceAreaData')
      localStorage.removeItem('ratesData')
      localStorage.removeItem('permissionsData')
      localStorage.removeItem('verificationPhone')
      
      // Redirect to dashboard
      navigate('/')
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    navigate('/profile-setup')
  }

  const handleBack = () => {
    navigate('/permissions')
  }

  if (!accountData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-dark-surface dark:to-dark-surface2 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading account details...</p>
        </div>
      </div>
    )
  }

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
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {t('accountConfirmation.title', { ns: 'auth' })}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300"
          >
            {t('accountConfirmation.subtitle', { ns: 'auth' })}
          </motion.p>
        </div>

        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-6 mb-8"
        >
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 me-2 text-brand-500" />
              {t('accountConfirmation.role', { ns: 'auth' })}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('accountConfirmation.role', { ns: 'auth' })}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  Engineer
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('accountConfirmation.phone', { ns: 'auth' })}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {accountData.phone}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('accountConfirmation.email', { ns: 'auth' })}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {accountData.profile.email}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('accountConfirmation.name', { ns: 'auth' })}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {accountData.profile.firstName} {accountData.profile.lastName}
                </p>
              </div>
            </div>
          </div>

          {/* Service Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 me-2 text-brand-500" />
              {t('accountConfirmation.serviceArea', { ns: 'auth' })}
            </h3>
            
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('accountConfirmation.address', { ns: 'auth' })}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {accountData.serviceArea.address}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('accountConfirmation.serviceRadius', { ns: 'auth' })}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {accountData.serviceArea.radius} km
                </p>
              </div>
            </div>
          </div>

          {/* Rates */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DollarSign className="w-5 h-5 me-2 text-brand-500" />
              {t('accountConfirmation.rates', { ns: 'auth' })}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('accountConfirmation.hourlyRate', { ns: 'auth' })}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {accountData.rates.currency} {accountData.rates.hourly}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('accountConfirmation.dailyRate', { ns: 'auth' })}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {accountData.rates.currency} {accountData.rates.daily}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {t('accountConfirmation.projectRate', { ns: 'auth' })}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {accountData.rates.currency} {accountData.rates.project}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={handleBack}
            variant="outline"
            size="lg"
            className="sm:w-auto"
          >
            <ArrowLeft className="me-2 w-5 h-5" />
            {t('actions.back', { ns: 'common' })}
          </Button>
          
          <Button
            onClick={handleEdit}
            variant="ghost"
            size="lg"
            className="sm:w-auto"
          >
            <Edit className="me-2 w-5 h-5" />
            {t('accountConfirmation.edit', { ns: 'auth' })}
          </Button>
          
          <Button
            onClick={handleConfirm}
            loading={isLoading}
            size="lg"
            className="sm:w-auto bg-brand-500 hover:bg-brand-600 text-white"
          >
            {isLoading ? t('loading.processing', { ns: 'common' }) : t('accountConfirmation.confirm', { ns: 'auth' })}
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
            {t('auth.termsFooter', { ns: 'common' })}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AccountConfirmation

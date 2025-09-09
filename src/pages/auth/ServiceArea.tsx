import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Navigation } from 'lucide-react'

const ServiceArea = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [serviceArea, setServiceArea] = useState({
    address: '',
    radius: 50, // km
    coordinates: {
      lat: 24.7136, // Riyadh coordinates
      lng: 46.6753
    }
  })

  const handleAddressChange = (value: string) => {
    setServiceArea(prev => ({ ...prev, address: value }))
  }

  const handleRadiusChange = (value: number) => {
    setServiceArea(prev => ({ ...prev, radius: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store service area data
      localStorage.setItem('serviceAreaData', JSON.stringify(serviceArea))
      
      navigate('/rate-setting')
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/credentials-upload')
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
            <MapPin className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {t('auth.serviceArea.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300"
          >
            {t('auth.serviceArea.subtitle')}
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-6"
        >
          {/* Address Input */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-brand-500" />
              {t('auth.serviceArea.addressLabel')}
            </h3>
            
            <input
              type="text"
              value={serviceArea.address}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder={t('auth.serviceArea.addressPlaceholder')}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          {/* Service Radius */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-brand-500" />
              {t('auth.serviceArea.radiusLabel')}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={serviceArea.radius}
                  onChange={(e) => handleRadiusChange(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="w-20 text-center">
                  <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {serviceArea.radius}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    {t('auth.serviceArea.radiusUnit')}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>10 {t('auth.serviceArea.radiusUnit')}</span>
                <span>200 {t('auth.serviceArea.radiusUnit')}</span>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('auth.serviceArea.mapLabel')}
            </h3>
            
            <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Interactive map will be displayed here</p>
                <p className="text-sm">Center: {serviceArea.coordinates.lat}, {serviceArea.coordinates.lng}</p>
                <p className="text-sm">Radius: {serviceArea.radius} km</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            loading={isLoading}
            size="lg"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white"
          >
            {isLoading ? t('common.loading.saving') : t('auth.serviceArea.continue')}
          </Button>
        </motion.div>

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
            {t('common.actions.back')}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ServiceArea

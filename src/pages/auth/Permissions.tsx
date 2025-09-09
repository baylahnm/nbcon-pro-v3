import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Bell, Camera, Folder, Shield } from 'lucide-react'

const Permissions = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [permissions, setPermissions] = useState({
    location: false,
    notifications: false,
    camera: false,
    storage: false
  })

  const permissionList = [
    {
      id: 'location',
      title: t('auth.permissions.location.title'),
      description: t('auth.permissions.location.description'),
      icon: MapPin,
      required: true
    },
    {
      id: 'notifications',
      title: t('auth.permissions.notifications.title'),
      description: t('auth.permissions.notifications.description'),
      icon: Bell,
      required: false
    },
    {
      id: 'camera',
      title: t('auth.permissions.camera.title'),
      description: t('auth.permissions.camera.description'),
      icon: Camera,
      required: false
    },
    {
      id: 'storage',
      title: t('auth.permissions.storage.title'),
      description: t('auth.permissions.storage.description'),
      icon: Folder,
      required: false
    }
  ]

  const handlePermissionToggle = (permissionId: string) => {
    setPermissions(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId]
    }))
  }

  const handleContinue = async () => {
    setIsLoading(true)
    
    try {
      // Simulate permission request
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store permissions data
      localStorage.setItem('permissionsData', JSON.stringify(permissions))
      
      navigate('/account-confirmation')
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleDenyAll = () => {
    setPermissions({
      location: false,
      notifications: false,
      camera: false,
      storage: false
    })
  }

  const handleBack = () => {
    navigate('/welcome')
  }

  const requiredPermissionsGranted = permissions.location

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
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {t('auth.permissions.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300"
          >
            {t('auth.permissions.subtitle')}
          </motion.p>
        </div>

        {/* Permissions List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4 mb-8"
        >
          {permissionList.map((permission, index) => {
            const Icon = permission.icon
            const isGranted = permissions[permission.id as keyof typeof permissions]
            
            return (
              <motion.div
                key={permission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {permission.title}
                        </h3>
                        {permission.required && (
                          <span className="ml-2 px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePermissionToggle(permission.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isGranted
                        ? 'bg-brand-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isGranted ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Warning for Required Permissions */}
        {!requiredPermissionsGranted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          >
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> Location permission is required for geofenced check-ins and location-based job matching.
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={handleBack}
            variant="outline"
            size="lg"
            className="sm:w-auto"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            {t('common.actions.back')}
          </Button>
          
          <Button
            onClick={handleDenyAll}
            variant="ghost"
            size="lg"
            className="sm:w-auto"
          >
            {t('auth.permissions.deny')}
          </Button>
          
          <Button
            onClick={handleContinue}
            loading={isLoading}
            disabled={!requiredPermissionsGranted}
            size="lg"
            className="sm:w-auto bg-brand-500 hover:bg-brand-600 text-white"
          >
            {isLoading ? t('common.loading.processing') : t('auth.permissions.continue')}
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>
            You can change these permissions later in your device settings.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Permissions

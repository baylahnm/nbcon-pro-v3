import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Navigation,
  Shield,
  Camera
} from 'lucide-react'

const GeofencedCheckIn = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
  const [isInGeofence, setIsInGeofence] = useState(false)
  const [checkInStatus, setCheckInStatus] = useState<'idle' | 'checking' | 'checked_in' | 'checked_out'>('idle')
  const [timeElapsed, setTimeElapsed] = useState(0)

  // Mock project data
  const project = {
    id: '1',
    title: 'Office Building Design',
    location: {
      lat: 24.7136,
      lng: 46.6753,
      address: 'King Fahd Road, Riyadh, Saudi Arabia',
      radius: 100 // meters
    },
    engineer: 'Ahmed Al-Rashid',
    startTime: '09:00',
    endTime: '17:00'
  }

  useEffect(() => {
    // Simulate getting current location
    const getCurrentLocation = () => {
      // In a real app, this would use the browser's geolocation API
      setLocation({ lat: 24.7136, lng: 46.6753 })
      setIsInGeofence(true)
    }

    getCurrentLocation()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (checkInStatus === 'checked_in') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [checkInStatus])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCheckIn = async () => {
    setIsLoading(true)
    setCheckInStatus('checking')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setCheckInStatus('checked_in')
      setTimeElapsed(0)
    } catch (err) {
      setCheckInStatus('idle')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckOut = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setCheckInStatus('checked_out')
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleTakePhoto = () => {
    // In a real app, this would open the camera
    console.log('Taking photo...')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Geofenced Check-In
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.location.address}
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {project.startTime} - {project.endTime}
            </span>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location.radius}m radius
            </span>
          </div>
        </motion.div>

        {/* Location Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Location Status
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {isInGeofence ? (
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {isInGeofence ? 'Within Project Area' : 'Outside Project Area'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Getting location...'}
                </p>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          {!isInGeofence && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                You need to be within {project.location.radius}m of the project location to check in.
              </p>
            </div>
          )}
        </motion.div>

        {/* Check-In/Out Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Work Status
          </h3>
          
          {checkInStatus === 'idle' && (
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ready to start work? Check in when you arrive at the project site.
              </p>
              <Button
                onClick={handleCheckIn}
                loading={isLoading}
                disabled={!isInGeofence}
                size="lg"
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Check In
              </Button>
            </div>
          )}
          
          {checkInStatus === 'checking' && (
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Checking in...
              </p>
            </div>
          )}
          
          {checkInStatus === 'checked_in' && (
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Checked In Successfully
              </p>
              <p className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-4">
                {formatTime(timeElapsed)}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Work time is being tracked automatically.
              </p>
              <Button
                onClick={handleCheckOut}
                loading={isLoading}
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Check Out
              </Button>
            </div>
          )}
          
          {checkInStatus === 'checked_out' && (
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Checked Out Successfully
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your work session has been recorded.
              </p>
              <Button
                onClick={handleCheckIn}
                disabled={!isInGeofence}
                size="lg"
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                Check In Again
              </Button>
            </div>
          )}
        </motion.div>

        {/* Additional Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Button
            onClick={handleTakePhoto}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Camera className="w-5 h-5 mr-2" />
            Take Photo
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Shield className="w-5 h-5 mr-2" />
            Report Issue
          </Button>
        </motion.div>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                Safety Notice
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Always follow safety protocols and wear appropriate protective equipment while on site.
                Report any safety concerns immediately.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GeofencedCheckIn

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Zap, 
  Users, 
  Clock, 
  Star, 
  MapPin,
  DollarSign,
  CheckCircle,
  X,
  RefreshCw,
  Bell,
  Eye,
  MessageCircle,
  Heart
} from 'lucide-react'

const RealTimeMatching = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isMatching, setIsMatching] = useState(true)
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([])
  const [matches, setMatches] = useState<any[]>([])
  const [matchCount, setMatchCount] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Mock job data
  const jobData = {
    id: '1',
    title: 'Office Building Design',
    description: 'Complete architectural design for modern office building with sustainable features.',
    budget: 'SAR 15,000 - 50,000',
    location: 'Riyadh, Saudi Arabia',
    timeline: '2-3 weeks',
    skills: ['AutoCAD', 'Revit', 'Structural Analysis', 'Sustainability'],
    postedAt: new Date()
  }

  // Mock matching engineers
  const mockEngineers = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      title: 'Senior Civil Engineer',
      rating: 4.9,
      reviews: 127,
      location: 'Riyadh',
      experience: '8 years',
      hourlyRate: 'SAR 150',
      matchScore: 95,
      responseTime: '2 hours',
      availability: 'Available now',
      skills: ['AutoCAD', 'Revit', 'Project Management', 'Structural Analysis'],
      isVerified: true,
      isOnline: true,
      avatar: '/api/placeholder/60/60',
      lastActive: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      title: 'Mechanical Engineer',
      rating: 4.8,
      reviews: 89,
      location: 'Jeddah',
      experience: '6 years',
      hourlyRate: 'SAR 120',
      matchScore: 92,
      responseTime: '1 hour',
      availability: 'Available this week',
      skills: ['HVAC Design', 'Energy Efficiency', 'Building Systems'],
      isVerified: true,
      isOnline: false,
      avatar: '/api/placeholder/60/60',
      lastActive: '1 hour ago'
    },
    {
      id: '3',
      name: 'Mohammed Al-Zahrani',
      title: 'Structural Engineer',
      rating: 4.9,
      reviews: 156,
      location: 'Dammam',
      experience: '10 years',
      hourlyRate: 'SAR 180',
      matchScore: 88,
      responseTime: '3 hours',
      availability: 'Available this month',
      skills: ['Structural Analysis', 'Safety Assessment', 'Building Codes'],
      isVerified: true,
      isOnline: true,
      avatar: '/api/placeholder/60/60',
      lastActive: '5 minutes ago'
    },
    {
      id: '4',
      name: 'Fatima Al-Shehri',
      title: 'Electrical Engineer',
      rating: 4.7,
      reviews: 98,
      location: 'Riyadh',
      experience: '5 years',
      hourlyRate: 'SAR 100',
      matchScore: 85,
      responseTime: '4 hours',
      availability: 'Available now',
      skills: ['Power Systems', 'Lighting Design', 'Smart Buildings'],
      isVerified: true,
      isOnline: false,
      avatar: '/api/placeholder/60/60',
      lastActive: '30 minutes ago'
    }
  ]

  useEffect(() => {
    // Simulate real-time matching
    const interval = setInterval(() => {
      if (isMatching) {
        // Simulate new matches coming in
        const newMatches = mockEngineers.slice(0, Math.min(matchCount + 1, mockEngineers.length))
        setMatches(newMatches)
        setMatchCount(newMatches.length)
        setLastUpdate(new Date())
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isMatching, matchCount])

  const handleSelectEngineer = (engineerId: string) => {
    setSelectedEngineers(prev => 
      prev.includes(engineerId) 
        ? prev.filter(id => id !== engineerId)
        : [...prev, engineerId]
    )
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setMatches([])
      setMatchCount(0)
      setIsLoading(false)
    }, 1000)
  }

  const handleStopMatching = () => {
    setIsMatching(false)
  }

  const handleStartMatching = () => {
    setIsMatching(true)
  }

  const handleSendInvitations = () => {
    console.log('Sending invitations to:', selectedEngineers)
    navigate('/quote-comparison')
  }

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/30'
    if (score >= 80) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
    return 'text-red-600 bg-red-100 dark:bg-red-900/30'
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available now':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'Available this week':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'Available this month':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-4" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Real-Time Matching
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isMatching ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {isMatching ? 'Matching...' : 'Paused'}
                </span>
              </div>
              
              <Button
                onClick={isMatching ? handleStopMatching : handleStartMatching}
                variant="outline"
                size="sm"
              >
                {isMatching ? 'Stop' : 'Start'} Matching
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {jobData.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {jobData.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {jobData.location}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {jobData.budget}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {jobData.timeline}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">
                {matchCount} Matches
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Matching Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">
                AI-Powered Matching in Progress
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Our AI is analyzing your job requirements and finding the best matching engineers in real-time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Matches Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Matching Engineers
            </h3>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleRefresh}
                loading={isLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              
              {selectedEngineers.length > 0 && (
                <Button
                  onClick={handleSendInvitations}
                  size="sm"
                  className="bg-brand-500 hover:bg-brand-600 text-white"
                >
                  Send Invitations ({selectedEngineers.length})
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {matches.map((engineer, index) => (
                <motion.div
                  key={engineer.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${
                    selectedEngineers.includes(engineer.id)
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
                            {engineer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {engineer.name}
                            </h4>
                            {engineer.isVerified && (
                              <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                            )}
                            {engineer.isOnline && (
                              <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {engineer.title}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchColor(engineer.matchScore)}`}>
                          {engineer.matchScore}% match
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        {engineer.rating} ({engineer.reviews} reviews)
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {engineer.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {engineer.experience}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {engineer.hourlyRate}/hour
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(engineer.availability)}`}>
                        {engineer.availability}
                      </span>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        Last active: {engineer.lastActive}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {engineer.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {engineer.skills.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                            +{engineer.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>Response: {engineer.responseTime}</span>
                      <span>Portfolio: 12 projects</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSelectEngineer(engineer.id)}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedEngineers.includes(engineer.id)
                            ? 'bg-brand-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {selectedEngineers.includes(engineer.id) ? 'Selected' : 'Select'}
                      </button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* No Matches */}
        {matches.length === 0 && !isMatching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No matches found yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your job requirements or start matching again.
            </p>
            <Button
              onClick={handleStartMatching}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              Start Matching
            </Button>
          </motion.div>
        )}

        {/* Loading State */}
        {isMatching && matches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Finding the best engineers...
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI is analyzing your requirements and matching with qualified engineers.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default RealTimeMatching

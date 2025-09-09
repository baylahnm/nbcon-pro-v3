import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  CheckCircle,
  X,
  Filter,
  Search
} from 'lucide-react'

const AIMatches = () => {
  const { t } = useTranslation()
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const matches = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      title: 'Senior Civil Engineer',
      rating: 4.9,
      reviews: 127,
      location: 'Riyadh',
      experience: '8 years',
      matchScore: 95,
      price: 'SAR 15,000',
      availability: 'Available',
      specialties: ['Structural Design', 'Project Management', 'Building Codes'],
      portfolio: [
        { title: 'Office Complex Design', year: '2023', value: 'SAR 2.5M' },
        { title: 'Shopping Mall Renovation', year: '2022', value: 'SAR 1.8M' }
      ],
      responseTime: '2 hours',
      completionRate: '98%'
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      title: 'Mechanical Engineer',
      rating: 4.8,
      reviews: 89,
      location: 'Jeddah',
      experience: '6 years',
      matchScore: 92,
      price: 'SAR 12,000',
      availability: 'Available',
      specialties: ['HVAC Design', 'Energy Efficiency', 'Building Systems'],
      portfolio: [
        { title: 'Hospital HVAC System', year: '2023', value: 'SAR 3.2M' },
        { title: 'Hotel Climate Control', year: '2022', value: 'SAR 1.5M' }
      ],
      responseTime: '1 hour',
      completionRate: '96%'
    },
    {
      id: '3',
      name: 'Mohammed Al-Zahrani',
      title: 'Structural Engineer',
      rating: 4.9,
      reviews: 156,
      location: 'Dammam',
      experience: '10 years',
      matchScore: 88,
      price: 'SAR 18,000',
      availability: 'Available',
      specialties: ['Structural Analysis', 'Seismic Design', 'Concrete Structures'],
      portfolio: [
        { title: 'Highway Bridge Design', year: '2023', value: 'SAR 5.0M' },
        { title: 'Industrial Complex', year: '2022', value: 'SAR 4.2M' }
      ],
      responseTime: '3 hours',
      completionRate: '99%'
    },
    {
      id: '4',
      name: 'Fatima Al-Shehri',
      title: 'Electrical Engineer',
      rating: 4.7,
      reviews: 98,
      location: 'Riyadh',
      experience: '5 years',
      matchScore: 85,
      price: 'SAR 10,000',
      availability: 'Available',
      specialties: ['Power Systems', 'Lighting Design', 'Smart Buildings'],
      portfolio: [
        { title: 'Smart Office Building', year: '2023', value: 'SAR 2.8M' },
        { title: 'Residential Complex', year: '2022', value: 'SAR 1.2M' }
      ],
      responseTime: '4 hours',
      completionRate: '94%'
    }
  ]

  const handleSelectEngineer = (engineerId: string) => {
    setSelectedEngineers(prev => 
      prev.includes(engineerId) 
        ? prev.filter(id => id !== engineerId)
        : [...prev, engineerId]
    )
  }

  const handleSendInvitations = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Handle sending invitations
      console.log('Sending invitations to:', selectedEngineers)
      
      // Redirect to next page
      // navigate('/job-timeline')
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/30'
    if (score >= 80) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
    return 'text-red-600 bg-red-100 dark:bg-red-900/30'
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
                AI-Powered Matches
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Perfect Matches for Your Project
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our AI has found {matches.length} engineers who match your requirements. Select the ones you'd like to invite.
          </p>
        </motion.div>

        {/* Matches Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {matches.map((engineer, index) => (
            <motion.div
              key={engineer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
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
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {engineer.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {engineer.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchColor(engineer.matchScore)}`}>
                      {engineer.matchScore}% match
                    </span>
                    <button
                      onClick={() => handleSelectEngineer(engineer.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedEngineers.includes(engineer.id)
                          ? 'border-brand-500 bg-brand-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 hover:border-brand-500'
                      }`}
                    >
                      {selectedEngineers.includes(engineer.id) && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    {engineer.rating} ({engineer.reviews} reviews)
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {engineer.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {engineer.experience}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {engineer.price}
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {engineer.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Portfolio */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recent Projects
                  </h4>
                  <div className="space-y-1">
                    {engineer.portfolio.map((project, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {project.title} ({project.year})
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {project.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance */}
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>Response: {engineer.responseTime}</span>
                  <span>Completion: {engineer.completionRate}</span>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => handleSelectEngineer(engineer.id)}
                  variant={selectedEngineers.includes(engineer.id) ? 'default' : 'outline'}
                  size="sm"
                  className="w-full"
                >
                  {selectedEngineers.includes(engineer.id) ? 'Selected' : 'Select Engineer'}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-between items-center"
        >
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {selectedEngineers.length} engineer{selectedEngineers.length !== 1 ? 's' : ''} selected
          </div>
          
          <div className="flex space-x-4">
            <Button variant="outline" size="lg">
              <X className="mr-2 w-5 h-5" />
              Clear Selection
            </Button>
            
            <Button
              onClick={handleSendInvitations}
              loading={isLoading}
              disabled={selectedEngineers.length === 0}
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              {isLoading ? 'Sending Invitations...' : `Send Invitations (${selectedEngineers.length})`}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIMatches

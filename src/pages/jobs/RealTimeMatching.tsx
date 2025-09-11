import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { SkillChip } from '@/components/ui/SkillChip'
import { 
  Zap, 
  Users, 
  Clock, 
  Star, 
  MapPin,
  DollarSign,
  CheckCircle,
  RefreshCw,
  Eye,
  MessageCircle,
  Search
} from 'lucide-react'

const RealTimeMatching = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isMatching, setIsMatching] = useState(true)
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([])
  const [matches, setMatches] = useState<any[]>([])
  const [matchCount, setMatchCount] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeSkillTab, setActiveSkillTab] = useState('all')

  // Skill tabs for filtering
  const skillTabs = useMemo(() => [
    {
      id: 'all',
      label: t('engineerFiltering.allSkills', 'All Skills'),
      icon: Users
    },
    {
      id: 'autocad',
      label: t('skills:autocad', 'AutoCAD'),
      icon: Search
    },
    {
      id: 'revit',
      label: t('skills:revit', 'Revit'),
      icon: Search
    },
    {
      id: 'project-management',
      label: t('skills:project-management', 'Project Management'),
      icon: Search
    },
    {
      id: 'structural-analysis',
      label: t('skills:structural-analysis', 'Structural Analysis'),
      icon: Search
    },
    {
      id: 'hvac-design',
      label: t('skills:hvac-design', 'HVAC Design'),
      icon: Search
    },
    {
      id: 'energy-efficiency',
      label: t('skills:energy-efficiency', 'Energy Efficiency'),
      icon: Search
    },
    {
      id: 'building-systems',
      label: t('skills:building-systems', 'Building Systems'),
      icon: Search
    },
    {
      id: '3d-modeling',
      label: t('skills:3d-modeling', '3D Modeling'),
      icon: Search
    },
    {
      id: 'safety-assessment',
      label: t('skills:safety-assessment', 'Safety Assessment'),
      icon: Search
    },
    {
      id: 'building-codes',
      label: t('skills:building-codes', 'Building Codes'),
      icon: Search
    },
    {
      id: 'seismic-design',
      label: t('skills:seismic-design', 'Seismic Design'),
      icon: Search
    },
    {
      id: 'power-systems',
      label: t('skills:power-systems', 'Power Systems'),
      icon: Search
    },
    {
      id: 'lighting-design',
      label: t('skills:lighting-design', 'Lighting Design'),
      icon: Search
    },
    {
      id: 'smart-buildings',
      label: t('skills:smart-buildings', 'Smart Buildings'),
      icon: Search
    },
    {
      id: 'renewable-energy',
      label: t('skills:renewable-energy', 'Renewable Energy'),
      icon: Search
    }
  ], [t])

  // Mock job data
  const jobData = {
    id: '1',
    title: t('jobs.realTimeMatching.jobInfo.title', 'Office Building Design'),
    description: t('jobs.realTimeMatching.jobInfo.description', 'Complete architectural design for modern office building with sustainable features.'),
    budget: 'SAR 15,000 - 50,000',
    location: t('jobs.realTimeMatching.jobInfo.location', 'Riyadh, Saudi Arabia'),
    timeline: t('jobs.realTimeMatching.jobInfo.timeline', '2-3 weeks'),
    skills: ['AutoCAD', 'Revit', 'Structural Analysis', 'Sustainability'],
    postedAt: new Date()
  }

  // Mock matching engineers
  const mockEngineers = [
    {
      id: '1',
      name: t('engineerData.ahmed.name', 'Ahmed Al-Rashid'),
      title: t('engineerData.ahmed.title', 'Senior Civil Engineer'),
      rating: 4.9,
      reviews: 127,
      location: t('engineerFiltering.locations.riyadh', 'Riyadh'),
      experience: t('engineerFiltering.experience.8+', '8 years'),
      hourlyRate: 'SAR 150',
      matchScore: 95,
      responseTime: t('engineerFiltering.responseTime.2hours', '2 hours'),
      availability: t('engineerFiltering.availability.now', 'Available now'),
      skills: ['autocad', 'revit', 'project-management', 'structural-analysis'],
      isVerified: true,
      isOnline: true,
      avatar: '/api/placeholder/60/60',
      lastActive: t('engineerData.ahmed.lastActive', '2 minutes ago')
    },
    {
      id: '2',
      name: t('engineerData.sarah.name', 'Sarah Al-Mansouri'),
      title: t('engineerData.sarah.title', 'Mechanical Engineer'),
      rating: 4.8,
      reviews: 89,
      location: t('engineerFiltering.locations.jeddah', 'Jeddah'),
      experience: t('engineerFiltering.experience.5-10', '6 years'),
      hourlyRate: 'SAR 120',
      matchScore: 92,
      responseTime: t('engineerFiltering.responseTime.1hour', '1 hour'),
      availability: t('engineerFiltering.availability.thisWeek', 'Available this week'),
      skills: ['hvac-design', 'energy-efficiency', 'building-systems'],
      isVerified: true,
      isOnline: false,
      avatar: '/api/placeholder/60/60',
      lastActive: t('engineerData.sarah.lastActive', '1 hour ago')
    },
    {
      id: '3',
      name: t('engineerData.mohammed.name', 'Mohammed Al-Zahrani'),
      title: t('engineerData.mohammed.title', 'Structural Engineer'),
      rating: 4.9,
      reviews: 156,
      location: t('engineerFiltering.locations.dammam', 'Dammam'),
      experience: t('engineerFiltering.experience.10+', '10 years'),
      hourlyRate: 'SAR 180',
      matchScore: 88,
      responseTime: t('engineerFiltering.responseTime.3hours', '3 hours'),
      availability: t('engineerFiltering.availability.thisMonth', 'Available this month'),
      skills: ['structural-analysis', 'safety-assessment', 'building-codes'],
      isVerified: true,
      isOnline: true,
      avatar: '/api/placeholder/60/60',
      lastActive: t('engineerData.mohammed.lastActive', '5 minutes ago')
    },
    {
      id: '4',
      name: t('engineerData.fatima.name', 'Fatima Al-Shehri'),
      title: t('engineerData.fatima.title', 'Electrical Engineer'),
      rating: 4.7,
      reviews: 98,
      location: t('engineerFiltering.locations.riyadh', 'Riyadh'),
      experience: t('engineerFiltering.experience.2-5', '5 years'),
      hourlyRate: 'SAR 100',
      matchScore: 85,
      responseTime: t('engineerFiltering.responseTime.4hours', '4 hours'),
      availability: t('engineerFiltering.availability.now', 'Available now'),
      skills: ['power-systems', 'lighting-design', 'smart-buildings'],
      isVerified: true,
      isOnline: false,
      avatar: '/api/placeholder/60/60',
      lastActive: t('engineerData.fatima.lastActive', '30 minutes ago')
    }
  ]

  // Filter engineers based on search and skill tab
  const filteredEngineers = useMemo(() => {
    let filtered = mockEngineers

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(engineer =>
        engineer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engineer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engineer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engineer.skills.some(skill => 
          t(`skills:${skill}`, skill).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Filter by skill tab
    if (activeSkillTab !== 'all') {
      filtered = filtered.filter(engineer =>
        engineer.skills.includes(activeSkillTab)
      )
    }

    return filtered
  }, [mockEngineers, searchQuery, activeSkillTab, t])

  useEffect(() => {
    // Simulate real-time matching
    const interval = setInterval(() => {
      if (isMatching) {
        // Simulate new matches coming in
        const newMatches = filteredEngineers.slice(0, Math.min(matchCount + 1, filteredEngineers.length))
        setMatches(newMatches)
        setMatchCount(newMatches.length)
        setLastUpdate(new Date())
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isMatching, matchCount, filteredEngineers])

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
    <PageLayout
      title={t('jobs.realTimeMatching.title', 'Real-Time Matching')}
      description={t('jobs.realTimeMatching.description', 'AI-powered matching to find the best engineers for your job')}
      searchPlaceholder={t('jobs.realTimeMatching.searchPlaceholder', 'Search engineers by name, skills, or location...')}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      filterTabs={skillTabs}
      activeTab={activeSkillTab}
      onTabChange={setActiveSkillTab}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      showViewToggle={true}
      headerActions={
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isMatching ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isMatching ? t('jobs.realTimeMatching.matching', 'Matching...') : t('jobs.realTimeMatching.paused', 'Paused')}
            </span>
          </div>
          
          <Button
            onClick={isMatching ? handleStopMatching : handleStartMatching}
            variant="outline"
            size="sm"
          >
            {isMatching ? t('jobs.realTimeMatching.stopMatching', 'Stop Matching') : t('jobs.realTimeMatching.startMatching', 'Start Matching')}
          </Button>
        </div>
      }
    >

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
                  <MapPin className="w-4 h-4 me-1" />
                  {jobData.location}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 me-1" />
                  {jobData.budget}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 me-1" />
                  {jobData.timeline}
                </span>
              </div>
            </div>
            
            <div className="text-end">
              <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">
                {matchCount} {t('jobs.realTimeMatching.matches', 'Matches')}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('jobs.realTimeMatching.lastUpdated', 'Last updated')}: {lastUpdate.toLocaleTimeString()}
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
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 me-3" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">
                {t('jobs.realTimeMatching.aiPoweredMatching', 'AI-Powered Matching in Progress')}
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {t('jobs.realTimeMatching.aiDescription', 'Our AI is analyzing your job requirements and finding the best matching engineers in real-time.')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Matches Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('jobs.realTimeMatching.matchingEngineers', 'Matching Engineers')}
            </h3>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleRefresh}
                loading={isLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 me-2" />
                {t('jobs.realTimeMatching.refresh', 'Refresh')}
              </Button>
              
              {selectedEngineers.length > 0 && (
                <Button
                  onClick={handleSendInvitations}
                  size="sm"
                  className="bg-brand-500 hover:bg-brand-600 text-white"
                >
                  {t('jobs.realTimeMatching.sendInvitations', 'Send Invitations')} ({selectedEngineers.length})
                </Button>
              )}
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
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
                  } ${viewMode === 'list' ? 'flex items-center p-4' : 'p-6'}`}
                >
                  <div className={viewMode === 'list' ? 'flex-1' : 'w-full'}>
                    {/* Header */}
                    <div className={`flex items-start justify-between ${viewMode === 'list' ? 'mb-2' : 'mb-4'}`}>
                      <div className="flex items-center">
                        <div className={`bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center ${viewMode === 'list' ? 'w-12 h-12 me-3' : 'w-16 h-16 me-4'}`}>
                          <span className={`font-bold text-brand-600 dark:text-brand-400 ${viewMode === 'list' ? 'text-lg' : 'text-xl'}`}>
                            {engineer.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className={`font-semibold text-gray-900 dark:text-white ${viewMode === 'list' ? 'text-base' : 'text-lg'}`}>
                              {engineer.name}
                            </h4>
                            {engineer.isVerified && (
                              <CheckCircle className="w-4 h-4 text-green-500 ms-2" />
                            )}
                            {engineer.isOnline && (
                              <div className="w-2 h-2 bg-green-500 rounded-full ms-2"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {engineer.title}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-end">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchColor(engineer.matchScore)}`}>
                          {engineer.matchScore}% {t('jobs.realTimeMatching.engineer.matchScore', 'match')}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className={`grid gap-4 text-sm text-gray-600 dark:text-gray-400 ${viewMode === 'list' ? 'grid-cols-4 mb-2' : 'grid-cols-2 mb-4'}`}>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 me-1 text-yellow-400 fill-current" />
                        {engineer.rating} ({engineer.reviews} {t('jobs.realTimeMatching.engineer.reviews', 'reviews')})
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 me-1" />
                        {engineer.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 me-1" />
                        {engineer.experience}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 me-1" />
                        {engineer.hourlyRate}/{t('jobs.realTimeMatching.engineer.hourlyRate', 'hour')}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className={viewMode === 'list' ? 'mb-2' : 'mb-4'}>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(engineer.availability)}`}>
                        {engineer.availability}
                      </span>
                      <span className="ms-2 text-xs text-gray-500 dark:text-gray-400">
                        {t('jobs.realTimeMatching.engineer.lastActive', 'Last active')}: {engineer.lastActive}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className={viewMode === 'list' ? 'mb-2' : 'mb-4'}>
                      <div className="flex flex-wrap gap-1">
                        {engineer.skills.slice(0, viewMode === 'list' ? 2 : 3).map((skill: string, idx: number) => (
                          <SkillChip
                            key={idx}
                            label={t(`skills:${skill}`, skill) as string}
                            className="text-xs"
                          />
                        ))}
                        {engineer.skills.length > (viewMode === 'list' ? 2 : 3) && (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                            +{engineer.skills.length - (viewMode === 'list' ? 2 : 3)} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Performance */}
                    <div className={`flex justify-between text-sm text-gray-500 dark:text-gray-400 ${viewMode === 'list' ? 'mb-2' : 'mb-4'}`}>
                      <span>{t('jobs.realTimeMatching.engineer.response', 'Response')}: {engineer.responseTime}</span>
                      <span>{t('jobs.realTimeMatching.engineer.portfolio', 'Portfolio')}: 12 {t('jobs.realTimeMatching.engineer.projects', 'projects')}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex ${viewMode === 'list' ? 'space-x-2' : 'space-x-2'}`}>
                      <button
                        onClick={() => handleSelectEngineer(engineer.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedEngineers.includes(engineer.id)
                            ? 'bg-brand-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        } ${viewMode === 'list' ? 'flex-1' : 'flex-1'}`}
                      >
                        {selectedEngineers.includes(engineer.id) ? t('jobs.realTimeMatching.engineer.selected', 'Selected') : t('jobs.realTimeMatching.engineer.select', 'Select')}
                      </button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        title={t('jobs.realTimeMatching.engineer.viewProfile', 'View Profile')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        title={t('jobs.realTimeMatching.engineer.message', 'Message')}
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
              {t('jobs.realTimeMatching.noMatchesFound', 'No matches found yet')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('jobs.realTimeMatching.noMatchesHint', 'Try adjusting your job requirements or start matching again.')}
            </p>
            <Button
              onClick={handleStartMatching}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              {t('jobs.realTimeMatching.startMatching', 'Start Matching')}
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
              {t('jobs.realTimeMatching.findingEngineers', 'Finding the best engineers...')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('jobs.realTimeMatching.findingDescription', 'Our AI is analyzing your requirements and matching with qualified engineers.')}
            </p>
          </motion.div>
        )}
      </div>
    </PageLayout>
  )
}

export default RealTimeMatching

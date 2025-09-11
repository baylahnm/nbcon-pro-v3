import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { formatSar } from '@/i18n/formatters'
import { createEngineerPool, buildEngineersForTab } from '@/domain/engineerPool'
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  CheckCircle,
  X,
  Filter,
  Search,
  Grid3X3,
  List
} from 'lucide-react'

const AIMatches = () => {
  const { t, i18n } = useTranslation('common')
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterMatch, setFilterMatch] = useState('all')

  // Use the pooled engineers across all skills as recommendations
  const matches = useMemo(() => {
    const pool = createEngineerPool(t, i18n.language)
    const list = buildEngineersForTab(pool, 'all', 'aim-')
    return list.map((e) => ({
      id: e.id,
      name: e.name,
      title: e.title,
      rating: e.rating,
      reviews: e.reviews,
      location: e.location,
      experience: e.experience,
      matchScore: e.matchScore,
      price: formatSar(parseFloat(String(e.hourlyRate).replace(/[^0-9.]/g, '')) * 100),
      availability: e.availability,
      specialties: e.skills,
      portfolio: [
        { title: t('projects.officeBuildingDesign', 'Office Building Design'), year: '2023', value: formatSar(2500000) },
        { title: t('projects.shoppingMallRenovation', 'Shopping Mall Renovation'), year: '2022', value: formatSar(1800000) }
      ],
      responseTime: e.responseTime,
      completionRate: e.completionRate || '96%'
    }))
  }, [t, i18n.language])

  // Filter tabs for match score
  const matchTabs = useMemo(() => [
    {
      id: 'all',
      label: t('jobs.jobRecommendations.allMatches', 'All Matches'),
      icon: Search,
      count: matches.length
    },
    {
      id: 'high',
      label: t('jobs.jobRecommendations.highMatch', 'High Match (90%+)'),
      icon: Star,
      count: matches.filter(m => m.matchScore >= 90).length
    },
    {
      id: 'medium',
      label: t('jobs.jobRecommendations.mediumMatch', 'Medium Match (80-89%)'),
      icon: Clock,
      count: matches.filter(m => m.matchScore >= 80 && m.matchScore < 90).length
    },
    {
      id: 'low',
      label: t('jobs.jobRecommendations.lowMatch', 'Low Match (<80%)'),
      icon: X,
      count: matches.filter(m => m.matchScore < 80).length
    }
  ], [t, matches])

  // Filter matches based on search and match score
  const filteredMatches = useMemo(() => {
    let filtered = matches

    // Filter by match score
    if (filterMatch !== 'all') {
      if (filterMatch === 'high') {
        filtered = filtered.filter(m => m.matchScore >= 90)
      } else if (filterMatch === 'medium') {
        filtered = filtered.filter(m => m.matchScore >= 80 && m.matchScore < 90)
      } else if (filterMatch === 'low') {
        filtered = filtered.filter(m => m.matchScore < 80)
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(engineer =>
        engineer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engineer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engineer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(engineer.specialties) && engineer.specialties.some((slug: string) => 
          t(`skills:${slug}`, slug).toLowerCase().includes(searchQuery.toLowerCase())
        ))
      )
    }

    return filtered
  }, [matches, filterMatch, searchQuery])

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
    <PageLayout
      title={t('jobs.jobRecommendations.title', 'AI-Powered Matches')}
      description={t('jobs.jobRecommendations.aiFound', 'Our AI has found {count} engineers who match your requirements. Select the ones you\'d like to invite.', { count: matches.length })}
      searchPlaceholder={t('jobs.jobRecommendations.searchPlaceholder', 'Search engineers by name, skills, or location...')}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      filterTabs={matchTabs}
      activeTab={filterMatch}
      onTabChange={setFilterMatch}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      showViewToggle={true}
    >

        {/* Matches Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8' : 'space-y-4 mb-8'}
        >
          {filteredMatches.map((engineer, index) => (
            <motion.div
              key={engineer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${
                selectedEngineers.includes(engineer.id)
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              } ${viewMode === 'list' ? 'flex items-center' : ''}`}
            >
              <div className={viewMode === 'list' ? 'flex-1 p-4' : 'p-6'}>
                {/* Header */}
                <div className={`flex items-start justify-between ${viewMode === 'list' ? 'mb-2' : 'mb-4'}`}>
                  <div className="flex items-center">
                    <div className={`bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center ${viewMode === 'list' ? 'w-12 h-12 me-3' : 'w-16 h-16 me-4'}`}>
                      <span className={`font-bold text-brand-600 dark:text-brand-400 ${viewMode === 'list' ? 'text-lg' : 'text-xl'}`}>
                        {engineer.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className={`font-semibold text-gray-900 dark:text-white ${viewMode === 'list' ? 'text-base' : 'text-lg'}`}>
                        {engineer.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {engineer.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchColor(engineer.matchScore)}`}>
                      {engineer.matchScore}% {t('jobs.jobRecommendations.matchScore', 'match')}
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
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Star className="w-4 h-4 me-1 text-yellow-400 fill-current" />
                      {engineer.rating} ({engineer.reviews} {t('jobs.jobRecommendations.reviews', 'reviews')})
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 me-1" />
                      {engineer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4 me-1" />
                      {engineer.experience}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-4 h-4 me-1" />
                      {engineer.price}
                    </div>
                  </div>
                )}

                {/* List view stats */}
                {viewMode === 'list' && (
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 me-1 text-yellow-400 fill-current" />
                      {engineer.rating} ({engineer.reviews})
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
                      {engineer.price}
                    </div>
                  </div>
                )}

                {/* Specialties */}
                {viewMode === 'grid' && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('jobs.jobRecommendations.specialties', 'Specialties')}
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
                )}

                {/* Portfolio */}
                {viewMode === 'grid' && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('jobs.jobRecommendations.recentProjects', 'Recent Projects')}
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
                )}

                {/* Performance */}
                {viewMode === 'grid' && (
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span>{t('jobs.jobRecommendations.response', 'Response')}: {engineer.responseTime}</span>
                    <span>{t('jobs.jobRecommendations.completion', 'Completion')}: {engineer.completionRate}</span>
                  </div>
                )}

                {/* List view performance */}
                {viewMode === 'list' && (
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>{t('jobs.jobRecommendations.response', 'Response')}: {engineer.responseTime}</span>
                    <span>{t('jobs.jobRecommendations.completion', 'Completion')}: {engineer.completionRate}</span>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  onClick={() => handleSelectEngineer(engineer.id)}
                  variant={selectedEngineers.includes(engineer.id) ? 'default' : 'outline'}
                  size="sm"
                  className={viewMode === 'list' ? 'w-auto' : 'w-full'}
                >
                  {selectedEngineers.includes(engineer.id) ? t('jobs.jobRecommendations.selected', 'Selected') : t('jobs.jobRecommendations.selectEngineer', 'Select Engineer')}
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
            {selectedEngineers.length} {selectedEngineers.length === 1 
              ? t('jobs.jobRecommendations.engineersSelected', 'engineer selected')
              : t('jobs.jobRecommendations.engineersSelectedPlural', 'engineers selected')
            }
          </div>
          
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setSelectedEngineers([])}
            >
              <X className="me-2 w-5 h-5" />
              {t('jobs.jobRecommendations.clearSelection', 'Clear Selection')}
            </Button>
            
            <Button
              onClick={handleSendInvitations}
              loading={isLoading}
              disabled={selectedEngineers.length === 0}
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              {isLoading 
                ? t('jobs.jobRecommendations.sendingInvitations', 'Sending Invitations...')
                : t('jobs.jobRecommendations.sendInvitationsCount', 'Send Invitations ({count})', { count: selectedEngineers.length })
              }
            </Button>
          </div>
        </motion.div>

        {/* No Matches */}
        {filteredMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('jobs.jobRecommendations.noMatchesFound', 'No matches found')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('jobs.jobRecommendations.noMatchesHint', 'Try adjusting your search criteria or job requirements.')}
            </p>
          </motion.div>
        )}
    </PageLayout>
  )
}

export default AIMatches

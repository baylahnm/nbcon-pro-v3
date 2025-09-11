import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/PageLayout'
import { SkillChip } from '@/components/ui/SkillChip'
import { toSkillSlug } from '@/i18n/skillMap'
import { createEngineerPool, buildEngineersForTab, normalizeSkillId } from '@/domain/engineerPool'
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock,
  DollarSign,
  Users,
  Award,
  CheckCircle,
  X,
  SlidersHorizontal
} from 'lucide-react'
import { formatNumber, formatSar, tCity } from '@/i18n/formatters'

const EngineerFiltering = () => {
  // include 'common' so we can use engineerFiltering keys
  const { t, i18n } = useTranslation(['common', 'jobs', 'skills', 'certs', 'languages'])
  const navigate = useNavigate()
  const isRTL = i18n.language === 'ar'
  
  // Title localization helper similar to RealTimeMatching
  const localizeTitle = (title: string) => {
    const map: Record<string, string> = {
      'Senior Civil Engineer': 'engineerTitles.seniorCivilEngineer',
      'Mechanical Engineer': 'engineerTitles.mechanicalEngineer',
      'Structural Engineer': 'engineerTitles.structuralEngineer',
      'Electrical Engineer': 'engineerTitles.electricalEngineer',
      'Project Manager': 'engineerTitles.projectManager',
      'Architect': 'engineerTitles.architect',
      'Environmental Engineer': 'engineerTitles.environmentalEngineer',
    }
    const key = map[title]
    return key ? t(key, title) : title
  }

  const localizeExperience = (s: string) => {
    if (i18n.language !== 'ar') return s
    return s.replace(/years?/gi, t('engineerFiltering.engineer.years', 'years'))
  }

  // Helper functions for translations
  const getEngineerName = (id: string) => {
    const engineerMap: { [key: string]: string } = {
      'ahmed': 'ahmed',
      'sarah': 'sarah', 
      'mohammed': 'mohammed',
      'fatima': 'fatima'
    }
    return t(`engineerData.${engineerMap[id]}.name`, '')
  }
  
  const getEngineerTitle = (id: string) => {
    const engineerMap: { [key: string]: string } = {
      'ahmed': 'ahmed',
      'sarah': 'sarah',
      'mohammed': 'mohammed', 
      'fatima': 'fatima'
    }
    return t(`engineerData.${engineerMap[id]}.title`, '')
  }
  
  const getLocation = (location: string) => {
    const locationMap: { [key: string]: string } = {
      'Riyadh': 'riyadh',
      'Jeddah': 'jeddah',
      'Dammam': 'dammam'
    }
    return t(`locations.${locationMap[location]}`, location)
  }
  
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([])
  const [activeSkillTab, setActiveSkillTab] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    rating: '',
    availability: '',
    skills: [] as string[],
    certifications: [] as string[],
    budget: '',
    responseTime: '',
    languages: [] as string[]
  })

  const experienceLevels = useMemo(() => [
    { slug: '0-2', label: t('engineerFiltering.experience.0-2', '0-2 years') },
    { slug: '2-5', label: t('engineerFiltering.experience.2-5', '2-5 years') },
    { slug: '5-10', label: t('engineerFiltering.experience.5-10', '5-10 years') },
    { slug: '10+', label: t('engineerFiltering.experience.10+', '10+ years') }
  ], [t, i18n.language])

  const ratingRanges = useMemo(() => [
    { slug: '4.5', label: `4.5+ ${t('engineerFiltering.search.stars', 'stars')}` },
    { slug: '4.0', label: `4.0+ ${t('engineerFiltering.search.stars', 'stars')}` },
    { slug: '3.5', label: `3.5+ ${t('engineerFiltering.search.stars', 'stars')}` },
    { slug: '3.0', label: `3.0+ ${t('engineerFiltering.search.stars', 'stars')}` }
  ], [t, i18n.language])

  const availabilityOptions = useMemo(() => [
    { slug: 'now', label: t('engineerFiltering.availability.now', 'Available now') },
    { slug: 'thisWeek', label: t('engineerFiltering.availability.thisWeek', 'Available this week') },
    { slug: 'thisMonth', label: t('engineerFiltering.availability.thisMonth', 'Available this month') },
    { slug: 'flexible', label: t('engineerFiltering.availability.flexible', 'Flexible') }
  ], [t, i18n.language])

  const budgetRanges = useMemo(() => [
    { slug: 'under50', label: t('engineerFiltering.budget.under50', 'Under SAR 50/hour') },
    { slug: '50-100', label: t('engineerFiltering.budget.50-100', 'SAR 50-100/hour') },
    { slug: '100-200', label: t('engineerFiltering.budget.100-200', 'SAR 100-200/hour') },
    { slug: '200+', label: t('engineerFiltering.budget.200+', 'SAR 200+/hour') }
  ], [t, i18n.language])

  const responseTimes = useMemo(() => [
    { slug: '1hour', label: t('engineerFiltering.responseTime.1hour', 'Within 1 hour') },
    { slug: '4hours', label: t('engineerFiltering.responseTime.4hours', 'Within 4 hours') },
    { slug: '24hours', label: t('engineerFiltering.responseTime.24hours', 'Within 24 hours') },
    { slug: '3days', label: t('engineerFiltering.responseTime.3days', 'Within 3 days') }
  ], [t, i18n.language])

  // keep underlying values as English labels for filter matching, render via <SkillChip>
  const commonSkills = useMemo(() => [
    'AutoCAD',
    'Revit',
    'Project Management',
    'Structural Analysis',
    'HVAC Design',
    'Energy Efficiency',
    'Building Systems',
    '3D Modeling',
    'Safety Assessment',
    'Building Codes',
    'Seismic Design',
    'Power Systems',
    'Lighting Design',
    'Smart Buildings',
    'Renewable Energy'
  ], [])

  const certifications = useMemo(() => [
    { slug: 'pmp', label: t('jobs:certifications.pmp', 'PMP') },
    { slug: 'peLicense', label: t('jobs:certifications.peLicense', 'PE License') },
    { slug: 'leed', label: t('jobs:certifications.leed', 'LEED') },
    { slug: 'sceCertified', label: t('jobs:certifications.sceCertified', 'SCE Certified') },
    { slug: 'iso9001', label: t('certs:iso-9001', 'ISO 9001') },
    { slug: 'sixSigma', label: t('certs:six-sigma', 'Six Sigma') },
    { slug: 'autocadCertified', label: t('jobs:certifications.autocadCertified', 'AutoCAD Certified') },
    { slug: 'revitCertified', label: t('certs:revit-certified', 'Revit Certified') }
  ], [t, i18n.language])

  const languages = useMemo(() => [
    { slug: 'ar', label: t('jobs:languagesList.ar', 'Arabic') },
    { slug: 'en', label: t('jobs:languagesList.en', 'English') },
    { slug: 'fr', label: t('jobs:languagesList.fr', 'French') },
    { slug: 'de', label: t('jobs:languagesList.de', 'German') },
    { slug: 'es', label: t('jobs:languagesList.es', 'Spanish') },
    { slug: 'zh', label: t('jobs:languagesList.zh', 'Chinese') }
  ], [t, i18n.language])

  // Skill filter tabs data
  const skillTabs = useMemo(() => [
    {
      id: 'all',
      label: t('jobs:filters.allSkills', 'All Skills'),
      icon: Users
    },
    {
      id: 'autocad',
      label: t('jobs:skills.autocad', 'AutoCAD'),
      icon: Award
    },
    {
      id: 'revit',
      label: t('jobs:skills.revit', 'Revit'),
      icon: Award
    },
    {
      id: 'projectManagement',
      label: t('jobs:skills.projectManagement', 'Project Management'),
      icon: Award
    },
    {
      id: 'structuralAnalysis',
      label: t('jobs:skills.structuralAnalysis', 'Structural Analysis'),
      icon: Award
    },
    {
      id: 'hvacDesign',
      label: t('jobs:skills.hvacDesign', 'HVAC Design'),
      icon: Award
    },
    {
      id: 'energyEfficiency',
      label: t('jobs:skills.energyEfficiency', 'Energy Efficiency'),
      icon: Award
    },
    {
      id: 'buildingSystems',
      label: t('jobs:skills.buildingSystems', 'Building Systems'),
      icon: Award
    },
    {
      id: 'modeling3d',
      label: t('jobs:skills.modeling3d', '3D Modeling'),
      icon: Award
    },
    {
      id: 'safetyAssessment',
      label: t('jobs:skills.safetyAssessment', 'Safety Assessment'),
      icon: Award
    },
    {
      id: 'buildingCodes',
      label: t('jobs:skills.buildingCodes', 'Building Codes'),
      icon: Award
    },
    {
      id: 'seismicDesign',
      label: t('jobs:skills.seismicDesign', 'Seismic Design'),
      icon: Award
    },
    {
      id: 'powerSystems',
      label: t('jobs:skills.powerSystems', 'Power Systems'),
      icon: Award
    },
    {
      id: 'lightingDesign',
      label: t('jobs:skills.lightingDesign', 'Lighting Design'),
      icon: Award
    },
    {
      id: 'smartBuildings',
      label: t('jobs:skills.smartBuildings', 'Smart Buildings'),
      icon: Award
    },
    {
      id: 'renewableEnergy',
      label: t('jobs:skills.renewableEnergy', 'Renewable Energy'),
      icon: Award
    }
  ], [t, i18n.language])

  const engineerPool = useMemo(() => createEngineerPool(t, i18n.language), [t, i18n.language])
  const engineers = useMemo(() => buildEngineersForTab(engineerPool, activeSkillTab, 'ef-'), [engineerPool, activeSkillTab])

  const filteredEngineers = engineers.filter(engineer => {
    const matchesSearch = engineer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         engineer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         engineer.skills.some(skill => {
                           const slug = toSkillSlug(skill)
                           if (slug) {
                             const translatedSkill = t(`skills:${slug}`, skill)
                             return translatedSkill.toLowerCase().includes(searchQuery.toLowerCase())
                           }
                           return skill.toLowerCase().includes(searchQuery.toLowerCase())
                         })
    
    const matchesLocation = !filters.location || engineer.location.toLowerCase().includes(filters.location.toLowerCase())
    const matchesExperience = !filters.experience || engineer.experience === filters.experience
    const matchesRating = !filters.rating || engineer.rating >= parseFloat(filters.rating)
    const matchesAvailability = !filters.availability || engineer.availabilityKey === filters.availability
    const matchesSkills = filters.skills.length === 0 || filters.skills.every(skill => engineer.skills.includes(normalizeSkillId(skill) || (toSkillSlug(skill) as any) || (skill as any)))
    const matchesCertifications = filters.certifications.length === 0 || (engineer.certifications || []).length === 0 || filters.certifications.every(cert => (engineer.certifications || []).includes(cert))
    const matchesLanguages = filters.languages.length === 0 || (engineer.languages || []).length === 0 || filters.languages.every(lang => (engineer.languages || []).includes(lang))
    
    // Skill tab filtering (normalize camelCase ids to slugs)
    const matchesSkillTab = activeSkillTab === 'all' || engineer.skills.includes((normalizeSkillId(activeSkillTab) as any) || (activeSkillTab as any))
    
    return matchesSearch && matchesLocation && matchesExperience && matchesRating && 
           matchesAvailability && matchesSkills && matchesCertifications && matchesLanguages && matchesSkillTab
  })

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'skills' || filterType === 'certifications' || filterType === 'languages') {
      setFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType as keyof typeof prev].includes(value)
          ? (prev[filterType as keyof typeof prev] as string[]).filter(item => item !== value)
          : [...(prev[filterType as keyof typeof prev] as string[]), value]
      }))
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }))
    }
  }

  const handleSelectEngineer = (engineerId: string) => {
    setSelectedEngineers(prev => 
      prev.includes(engineerId) 
        ? prev.filter(id => id !== engineerId)
        : [...prev, engineerId]
    )
  }

  const handleClearFilters = () => {
    setFilters({
      location: '',
      experience: '',
      rating: '',
      availability: '',
      skills: [],
      certifications: [],
      budget: '',
      responseTime: '',
      languages: []
    })
  }

  const handleSendInvitations = () => {
    console.log('Sending invitations to:', selectedEngineers)
    navigate('/ai-matches')
  }

  const getAvailabilityColor = (availabilityKey: 'now' | 'thisWeek' | 'thisMonth') => {
    switch (availabilityKey) {
      case 'now':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'thisWeek':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'thisMonth':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <PageLayout
      title={t('engineerFiltering.title', 'Find Engineers')}
      searchPlaceholder={t('engineerFiltering.searchPlaceholder', 'Search engineers by name, skills, or location...')}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      filterTabs={skillTabs}
      activeTab={activeSkillTab}
      onTabChange={setActiveSkillTab}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      showViewToggle={true}
      headerActions={
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant={showFilters ? 'default' : 'outline'}
          size="sm"
        >
          <SlidersHorizontal className={`w-4 h-4 ${isRTL ? 'ms-2' : 'me-2'}`} />
          {t('engineerFiltering.filters', 'Filters')}
        </Button>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-fit"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('engineerFiltering.filters', 'Filters')}
                </h3>
                <Button
                  onClick={handleClearFilters}
                  variant="ghost"
                  size="sm"
                >
                  {t('engineerFiltering.clearFilters', 'Clear Filters')}
                </Button>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('engineerFiltering.search.location', 'Location')}
                  </label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder={t('engineerFiltering.search.locationPlaceholder', 'e.g., Riyadh, Jeddah')}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('engineerFiltering.experience.label', 'Experience')}
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">{t('engineerFiltering.search.allExperience', 'All Experience Levels')}</option>
                    {experienceLevels.map((level) => (
                      // keep value as label string for existing matching
                      <option key={level.slug} value={level.label}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('engineerFiltering.search.minimumRating', 'Minimum Rating')}
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">{t('engineerFiltering.search.anyRating', 'Any Rating')}</option>
                    {ratingRanges.map((range) => (
                      <option key={range.slug} value={range.slug}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('engineerFiltering.search.availability', 'Availability')}
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">{t('engineerFiltering.search.anyAvailability', 'Any Availability')}</option>
                    {availabilityOptions.map((option) => (
                      <option key={option.slug} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('engineerFiltering.search.skills', 'Skills')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleFilterChange('skills', skill)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          filters.skills.includes(skill)
                            ? 'bg-brand-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <SkillChip label={skill} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('engineerFiltering.search.certifications', 'Certifications')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                      <button
                        key={cert}
                        onClick={() => handleFilterChange('certifications', cert)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          filters.certifications.includes(cert)
                            ? 'bg-brand-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {cert}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('engineerFiltering.search.languages', 'Languages')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleFilterChange('languages', lang)}
                        className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          filters.languages.includes(lang)
                            ? 'bg-brand-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-300">
                  {t('engineerFiltering.showing', 'Showing')} {filteredEngineers.length} {t('engineerFiltering.engineers', 'engineers')}
                </p>
                {selectedEngineers.length > 0 && (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedEngineers.length} selected
                    </span>
                    <Button
                      onClick={handleSendInvitations}
                      size="sm"
                      className="bg-brand-500 hover:bg-brand-600 text-white"
                    >
                      Send Invitations
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Engineers Grid/List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 lg:grid-cols-2 gap-6" 
                : "flex flex-col gap-4"
              }
            >
              {filteredEngineers.map((engineer, index) => (
                <motion.div
                  key={engineer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${
                    selectedEngineers.includes(engineer.id)
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${viewMode === 'list' ? 'flex items-center' : ''}`}
                >
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex items-center justify-between' : ''}`}>
                    {/* Header */}
                    <div className={`flex items-start justify-between ${viewMode === 'list' ? 'mb-0' : 'mb-4'}`}>
                      <div className="flex items-center">
                        <div className={`bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center me-4 ${
                          viewMode === 'list' ? 'w-12 h-12' : 'w-16 h-16'
                        }`}>
                          <span className={`font-bold text-brand-600 dark:text-brand-400 ${
                            viewMode === 'list' ? 'text-lg' : 'text-xl'
                          }`}>
                            {engineer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className={`font-semibold text-gray-900 dark:text-white ${
                              viewMode === 'list' ? 'text-base' : 'text-lg'
                            }`}>
                              {engineer.name}
                            </h3>
                            {engineer.isVerified && (
                              <CheckCircle className="w-4 h-4 text-green-500 ms-2" />
                            )}
                            {engineer.isOnline && (
                              <div className="w-2 h-2 bg-green-500 rounded-full ms-2"></div>
                            )}
                          </div>
                          <p className={`text-gray-600 dark:text-gray-300 ${
                            viewMode === 'list' ? 'text-xs' : 'text-sm'
                          }`}>
                            {localizeTitle(engineer.title)}
                          </p>
                        </div>
                      </div>
                      
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

                    {/* Grid View Content */}
                    {viewMode === 'grid' && (
                      <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 me-1 text-yellow-400 fill-current" />
                            {engineer.rating} ({engineer.reviews} {t('engineerFiltering.engineer.reviews', 'reviews')})
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 me-1" />
                            {isRTL ? getLocation(engineer.location) : engineer.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 me-1" />
                            {isRTL ? engineer.experience.replace('years', t('engineerFiltering.engineer.years', 'سنوات')) : engineer.experience}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 me-1" />
                            {engineer.hourlyRate}/{t('engineerFiltering.engineer.hour', 'hour')}
                          </div>
                        </div>

                        {/* Availability */}
                        <div className="mb-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(engineer.availability)}`}>
                            {engineer.availability}
                          </span>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {Array.from(new Set(engineer.skills))
                              .slice(0, 4)
                              .map((skill, idx) => (
                                <SkillChip key={idx} label={skill} />
                              ))}
                            {engineer.skills.length > 4 && (
                              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                +{engineer.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Performance */}
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <span>{t('engineerFiltering.engineer.response', 'Response')}: {isRTL ? engineer.responseTime.replace('hours', t('engineerFiltering.engineer.hours', 'ساعات')).replace('hour', t('engineerFiltering.engineer.hour', 'ساعة')) : engineer.responseTime}</span>
                          <span>{t('engineerFiltering.engineer.completion', 'Completion')}: {engineer.completionRate}</span>
                          <span>{t('engineerFiltering.engineer.portfolio', 'Portfolio')}: {engineer.portfolio} {t('engineerFiltering.engineer.projects', 'projects')}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleSelectEngineer(engineer.id)}
                            variant={selectedEngineers.includes(engineer.id) ? 'default' : 'outline'}
                            size="sm"
                            className="flex-1"
                          >
                            {selectedEngineers.includes(engineer.id) ? t('engineerFiltering.engineer.selected', 'Selected') : t('engineerFiltering.engineer.select', 'Select')}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            {t('engineerFiltering.engineer.viewProfile', 'View Profile')}
                          </Button>
                        </div>
                      </>
                    )}

                    {/* List View Content */}
                    {viewMode === 'list' && (
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 me-1 text-yellow-400 fill-current" />
                          {formatNumber(engineer.rating)} ({formatNumber(engineer.reviews)} {t('engineerFiltering.engineer.reviews', 'reviews')})
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 me-1" />
                          {tCity(engineer.location, t)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 me-1" />
                          {isRTL ? engineer.experience.replace('years', t('engineerFiltering.engineer.years', 'سنوات')) : engineer.experience}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 me-1" />
                          {formatSar(parseInt(engineer.hourlyRate.replace(/[^0-9]/g, '')))} / {t('engineers.card.perHour', { ns: 'jobs', defaultValue: t('engineerFiltering.engineer.hour', 'hour') })}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(engineer.availability)}`}>
                          {isRTL ? (
                            engineer.availability === 'Available now' ? t('engineers.card.available.now', { ns: 'jobs' }) :
                            engineer.availability === 'Available this week' ? t('engineers.card.available.week', { ns: 'jobs' }) :
                            engineer.availability === 'Available this month' ? t('engineers.card.available.month', { ns: 'jobs' }) : engineer.availability
                          ) : engineer.availability}
                        </span>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleSelectEngineer(engineer.id)}
                            variant={selectedEngineers.includes(engineer.id) ? 'default' : 'outline'}
                            size="sm"
                          >
                            {selectedEngineers.includes(engineer.id) ? t('engineerFiltering.engineer.selected', 'Selected') : t('engineerFiltering.engineer.select', 'Select')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            {t('engineerFiltering.engineer.viewProfile', 'View Profile')}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredEngineers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('engineerFiltering.noEngineersFound', 'No engineers found')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('engineerFiltering.noEngineersHint', 'Try adjusting your search criteria or filters.')}
                </p>
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                >
                  {t('jobs:filters.clearAll', 'Clear Filters')}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default EngineerFiltering

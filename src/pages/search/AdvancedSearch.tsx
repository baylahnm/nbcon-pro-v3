import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { SkillChip } from '@/components/ui/SkillChip'
import { formatSar } from '@/i18n/formatters'
import { createEngineerPool, buildEngineersForTab } from '@/domain/engineerPool'
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Users,
  Award,
  X,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const AdvancedSearch = () => {
  const { t, i18n } = useTranslation(['jobs', 'skills', 'certs', 'languages'])
  const isRTL = i18n.language === 'ar'
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
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

  // Title + experience localization helpers
  const localizeTitle = (title: string) => {
    const map: Record<string, string> = {
      'Senior Civil Engineer': 'common:engineerTitles.seniorCivilEngineer',
      'Mechanical Engineer': 'common:engineerTitles.mechanicalEngineer',
      'Structural Engineer': 'common:engineerTitles.structuralEngineer',
      'Electrical Engineer': 'common:engineerTitles.electricalEngineer',
      'Project Manager': 'common:engineerTitles.projectManager',
      'Architect': 'common:engineerTitles.architect',
      'Environmental Engineer': 'common:engineerTitles.environmentalEngineer',
    }
    const key = map[title]
    return key ? (t as any)(key, title) : title
  }

  const localizeExperience = (s: string) => {
    if (i18n.language !== 'ar') return s
    return s.replace(/years?/gi, (t as any)('engineerFiltering.engineer.years', { ns: 'common', defaultValue: 'years' }))
  }

  // Engineer results (pooled across skills)
  const engineerPool = useMemo(() => createEngineerPool(t as any, i18n.language), [t, i18n.language])
  const engineerResults = useMemo(() => buildEngineersForTab(engineerPool, 'all', 'adv-'), [engineerPool])
  const filteredEngineers = useMemo(() => {
    let list = engineerResults
    const q = searchQuery.toLowerCase()
    if (q) {
      list = list.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.skills.some(slug => (t as any)(`skills:${slug}`, slug).toLowerCase().includes(q))
      )
    }
    if (filters.location) {
      list = list.filter(e => e.location.toLowerCase().includes(filters.location))
    }
    if (filters.rating) {
      list = list.filter(e => e.rating >= parseFloat(filters.rating))
    }
    return list
  }, [engineerResults, searchQuery, filters, t])
  // Use slugs for data consistency
  const experienceLevels = [
    { slug: '0-2', label: t('engineerFiltering.experience.0-2', '0-2 years') },
    { slug: '2-5', label: t('engineerFiltering.experience.2-5', '2-5 years') },
    { slug: '5-10', label: t('engineerFiltering.experience.5-10', '5-10 years') },
    { slug: '10+', label: t('engineerFiltering.experience.10+', '10+ years') }
  ]

  const availabilityOptions = [
    { slug: 'now', label: t('engineerFiltering.availability.now', 'Available now') },
    { slug: 'thisWeek', label: t('engineerFiltering.availability.thisWeek', 'Available this week') },
    { slug: 'thisMonth', label: t('engineerFiltering.availability.thisMonth', 'Available this month') },
    { slug: 'flexible', label: t('engineerFiltering.availability.flexible', 'Flexible') }
  ]

  const budgetRanges = [
    { slug: 'under50', label: t('engineerFiltering.budget.under50', 'Under SAR 50/hour') },
    { slug: '50-100', label: t('engineerFiltering.budget.50-100', 'SAR 50-100/hour') },
    { slug: '100-200', label: t('engineerFiltering.budget.100-200', 'SAR 100-200/hour') },
    { slug: '200+', label: t('engineerFiltering.budget.200+', 'SAR 200+/hour') }
  ]

  const responseTimeOptions = [
    { slug: '1hour', label: t('engineerFiltering.responseTime.1hour', 'Within 1 hour') },
    { slug: '4hours', label: t('engineerFiltering.responseTime.4hours', 'Within 4 hours') },
    { slug: '24hours', label: t('engineerFiltering.responseTime.24hours', 'Within 24 hours') },
    { slug: '3days', label: t('engineerFiltering.responseTime.3days', 'Within 3 days') }
  ]

  const languageOptions = [
    { slug: 'ar', label: t('languages:ar', 'Arabic') },
    { slug: 'en', label: t('languages:en', 'English') },
    { slug: 'fr', label: t('languages:fr', 'French') },
    { slug: 'de', label: t('languages:de', 'German') },
    { slug: 'es', label: t('languages:es', 'Spanish') },
    { slug: 'zh', label: t('languages:zh', 'Chinese') }
  ]

  const skillOptions = useMemo(() => [
    { slug: 'autocad', label: t('jobs:skills.autocad', 'AutoCAD') },
    { slug: 'revit', label: t('jobs:skills.revit', 'Revit') },
    { slug: 'projectManagement', label: t('jobs:skills.projectManagement', 'Project Management') },
    { slug: 'structuralAnalysis', label: t('jobs:skills.structuralAnalysis', 'Structural Analysis') },
    { slug: 'hvacDesign', label: t('jobs:skills.hvacDesign', 'HVAC Design') },
    { slug: 'energyEfficiency', label: t('jobs:skills.energyEfficiency', 'Energy Efficiency') },
    { slug: 'buildingSystems', label: t('jobs:skills.buildingSystems', 'Building Systems') },
    { slug: 'modeling3d', label: t('jobs:skills.modeling3d', '3D Modeling') },
    { slug: 'safetyAssessment', label: t('jobs:skills.safetyAssessment', 'Safety Assessment') },
    { slug: 'buildingCodes', label: t('jobs:skills.buildingCodes', 'Building Codes') },
    { slug: 'seismicDesign', label: t('jobs:skills.seismicDesign', 'Seismic Design') },
    { slug: 'powerSystems', label: t('jobs:skills.powerSystems', 'Power Systems') },
    { slug: 'lightingDesign', label: t('jobs:skills.lightingDesign', 'Lighting Design') },
    { slug: 'smartBuildings', label: t('jobs:skills.smartBuildings', 'Smart Buildings') },
    { slug: 'renewableEnergy', label: t('jobs:skills.renewableEnergy', 'Renewable Energy') }
  ], [t, i18n.language])

  const certificationOptions = useMemo(() => [
    { slug: 'peLicense', label: t('jobs:certifications.peLicense', 'PE License') },
    { slug: 'pmp', label: t('jobs:certifications.pmp', 'PMP') },
    { slug: 'leed', label: t('jobs:certifications.leed', 'LEED') },
    { slug: 'sceCertified', label: t('jobs:certifications.sceCertified', 'SCE Certified') },
    { slug: 'autocadCertified', label: t('jobs:certifications.autocadCertified', 'AutoCAD Certified') }
  ], [t, i18n.language])

  const locationOptions = [
    { slug: 'riyadh', label: t('engineerFiltering.locations.riyadh', 'Riyadh') },
    { slug: 'jeddah', label: t('engineerFiltering.locations.jeddah', 'Jeddah') },
    { slug: 'dammam', label: t('engineerFiltering.locations.dammam', 'Dammam') },
    { slug: 'mecca', label: t('engineerFiltering.locations.mecca', 'Mecca') },
    { slug: 'medina', label: t('engineerFiltering.locations.medina', 'Medina') },
    { slug: 'tabuk', label: t('engineerFiltering.locations.tabuk', 'Tabuk') },
    { slug: 'buraidah', label: t('engineerFiltering.locations.buraidah', 'Buraidah') },
    { slug: 'khamis-mushait', label: t('engineerFiltering.locations.khamis-mushait', 'Khamis Mushait') }
  ]

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'skills' || filterType === 'certifications' || filterType === 'languages') {
      setFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
      }))
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }))
    }
  }

  const clearAllFilters = () => {
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

  const getLocation = (location: string) => {
    const locationMap: { [key: string]: string } = {
      'Riyadh': 'riyadh',
      'Jeddah': 'jeddah',
      'Dammam': 'dammam',
      'Mecca': 'mecca',
      'Medina': 'medina',
      'Tabuk': 'tabuk',
      'Buraidah': 'buraidah',
      'Khamis Mushait': 'khamis-mushait'
    }
    return t(`engineerFiltering.locations.${locationMap[location]}`, location)
  }

  const [activeTab, setActiveTab] = useState('all')

  // Use useMemo to make filterTabs reactive to language changes
  const filterTabs = useMemo(() => [
    {
      id: 'all',
      label: t('jobs:filters.allResults', 'All Results'),
      icon: Search
    },
    {
      id: 'engineers',
      label: t('jobs:filters.engineers', 'Engineers'),
      icon: Users
    },
    {
      id: 'services',
      label: t('jobs:filters.services', 'Services'),
      icon: Award
    },
    {
      id: 'jobs',
      label: t('jobs:filters.jobs', 'Jobs'),
      icon: Clock
    }
  ], [t, i18n.language])

  return (
    <PageLayout
      title={t('jobs:advancedSearch.title', 'Advanced Search')}
      description={t('jobs:advancedSearch.subtitle', 'Find engineers, services, and jobs with advanced filters')}
      searchPlaceholder={t('jobs:advancedSearch.searchPlaceholder', 'Search by name, skills, location, or keywords...')}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      filterTabs={filterTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      showViewToggle={true}
      headerActions={
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          size="sm"
          className="flex items-center"
        >
          <SlidersHorizontal className={`w-4 h-4 ${isRTL ? 'ms-2' : 'me-2'}`} />
          {t('jobs:advancedSearch.filters', 'Filters')}
          {showFilters ? <ChevronUp className={`w-4 h-4 ${isRTL ? 'me-2' : 'ms-2'}`} /> : <ChevronDown className={`w-4 h-4 ${isRTL ? 'me-2' : 'ms-2'}`} />}
        </Button>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Advanced Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('jobs:advancedSearch.filters', 'Advanced Filters')}
              </h3>
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className={`w-4 h-4 ${isRTL ? 'ms-2' : 'me-2'}`} />
                {t('jobs:filters.clearAll', 'Clear All')}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className={`w-4 h-4 inline ${isRTL ? 'ms-1' : 'me-1'}`} />
                  {t('jobs:filters.location', 'Location')}
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">{t('jobs:filters.allLocations', 'All Locations')}</option>
                  {locationOptions.map(location => (
                    <option key={location.slug} value={location.slug}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className={`w-4 h-4 inline ${isRTL ? 'ms-1' : 'me-1'}`} />
                  {t('jobs:filters.experience', 'Experience')}
                </label>
                <select
                  value={filters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">{t('jobs:filters.allExperience', 'All Experience Levels')}</option>
                  {experienceLevels.map(level => (
                    <option key={level.slug} value={level.slug}>{level.label}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Star className={`w-4 h-4 inline ${isRTL ? 'ms-1' : 'me-1'}`} />
                  {t('jobs:filters.rating', 'Minimum Rating')}
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">{t('jobs:filters.anyRating', 'Any Rating')}</option>
                  <option value="4.5">4.5+ {t('searchAdvanced:options.stars', 'stars')}</option>
                  <option value="4.0">4.0+ {t('searchAdvanced:options.stars', 'stars')}</option>
                  <option value="3.5">3.5+ {t('searchAdvanced:options.stars', 'stars')}</option>
                  <option value="3.0">3.0+ {t('searchAdvanced:options.stars', 'stars')}</option>
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <DollarSign className={`w-4 h-4 inline ${isRTL ? 'ms-1' : 'me-1'}`} />
                  {t('jobs:filters.budget', 'Budget Range')}
                </label>
                <select
                  value={filters.budget}
                  onChange={(e) => handleFilterChange('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">{t('jobs:filters.anyBudget', 'Any Budget')}</option>
                  {budgetRanges.map(range => (
                    <option key={range.slug} value={range.slug}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('jobs:filters.availability', 'Availability')}
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">{t('jobs:filters.anyAvailability', 'Any Availability')}</option>
                  {availabilityOptions.map(option => (
                    <option key={option.slug} value={option.slug}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Response Time Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('jobs:filters.responseTime', 'Response Time')}
                </label>
                <select
                  value={filters.responseTime}
                  onChange={(e) => handleFilterChange('responseTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">{t('jobs:filters.anyResponseTime', 'Any Response Time')}</option>
                  {responseTimeOptions.map(option => (
                    <option key={option.slug} value={option.slug}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Skills Filter */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('jobs:filters.skills', 'Skills')}
              </label>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map(skill => (
                  <button
                    key={skill.slug}
                    onClick={() => handleFilterChange('skills', skill.slug)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      filters.skills.includes(skill.slug)
                        ? 'bg-brand-100 text-brand-700 border-brand-300 dark:bg-brand-900 dark:text-brand-300 dark:border-brand-700'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                    }`}
                  >
                    <SkillChip label={skill.label} className="!px-0 !py-0 !bg-transparent !text-current" />
                  </button>
                ))}
              </div>
            </div>

            {/* Certifications Filter */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('jobs:filters.certifications', 'Certifications')}
              </label>
              <div className="flex flex-wrap gap-2">
                {certificationOptions.map(cert => (
                  <button
                    key={cert.slug}
                    onClick={() => handleFilterChange('certifications', cert.slug)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      filters.certifications.includes(cert.slug)
                        ? 'bg-brand-100 text-brand-700 border-brand-300 dark:bg-brand-900 dark:text-brand-300 dark:border-brand-700'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                    }`}
                  >
                    {cert.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Languages Filter */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('jobs:filters.languages', 'Languages')}
              </label>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map(lang => (
                  <button
                    key={lang.slug}
                    onClick={() => handleFilterChange('languages', lang.slug)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      filters.languages.includes(lang.slug)
                        ? 'bg-brand-100 text-brand-700 border-brand-300 dark:bg-brand-900 dark:text-brand-300 dark:border-brand-700'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        <div className="space-y-6">
          {(activeTab === 'engineers' || activeTab === 'all') && filteredEngineers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEngineers.map((e) => (
                <div key={e.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{e.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{localizeTitle(e.title)}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {e.matchScore}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center"><MapPin className="w-4 h-4 me-1" />{e.location}</div>
                    <div className="flex items-center"><Clock className="w-4 h-4 me-1" />{localizeExperience(e.experience)}</div>
                    <div className="flex items-center"><Star className="w-4 h-4 me-1 text-yellow-400 fill-current" />{e.rating} ({e.reviews})</div>
                    <div className="flex items-center"><DollarSign className="w-4 h-4 me-1" />{formatSar(parseFloat(String(e.hourlyRate).replace(/[^0-9.]/g, '')))}</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {e.skills.slice(0,3).map((s, idx) => (
                      <SkillChip key={idx} label={s} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('jobs:filters.noResults', 'No results found')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('jobs:filters.noResultsHelp', 'Try adjusting your search criteria or filters to find what you\'re looking for.')}
              </p>
              <Button onClick={() => setShowFilters(true)}>
                <Filter className={`w-4 h-4 ${isRTL ? 'ms-2' : 'me-2'}`} />
                {t('jobs:filters.adjustFilters', 'Adjust Filters')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

export default AdvancedSearch

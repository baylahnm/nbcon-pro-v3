import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
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

const EngineerFiltering = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([])
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

  const experienceLevels = [
    '0-2 years', '2-5 years', '5-10 years', '10+ years'
  ]

  const ratingRanges = [
    '4.5+ stars', '4.0+ stars', '3.5+ stars', '3.0+ stars'
  ]

  const availabilityOptions = [
    'Available now', 'Available this week', 'Available this month', 'Flexible'
  ]

  const budgetRanges = [
    'Under SAR 50/hour', 'SAR 50-100/hour', 'SAR 100-200/hour', 'SAR 200+/hour'
  ]

  const responseTimes = [
    'Within 1 hour', 'Within 4 hours', 'Within 24 hours', 'Within 3 days'
  ]

  const commonSkills = [
    'AutoCAD', 'Revit', 'Project Management', 'Structural Analysis',
    'HVAC Design', 'Electrical Systems', 'Building Codes', 'Sustainability',
    '3D Modeling', 'Cost Estimation', 'Quality Control', 'Safety Management',
    'BIM', 'Energy Efficiency', 'Renewable Energy', 'Smart Buildings'
  ]

  const certifications = [
    'PMP', 'PE License', 'LEED', 'PMP', 'SCE Certified',
    'ISO 9001', 'Six Sigma', 'AutoCAD Certified', 'Revit Certified'
  ]

  const languages = [
    'Arabic', 'English', 'French', 'German', 'Spanish', 'Chinese'
  ]

  const engineers = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      title: 'Senior Civil Engineer',
      rating: 4.9,
      reviews: 127,
      location: 'Riyadh',
      experience: '8 years',
      availability: 'Available now',
      responseTime: '2 hours',
      hourlyRate: 'SAR 150',
      skills: ['AutoCAD', 'Revit', 'Project Management', 'Structural Analysis'],
      certifications: ['PE License', 'PMP', 'LEED'],
      languages: ['Arabic', 'English'],
      portfolio: 12,
      completionRate: '98%',
      isVerified: true,
      isOnline: true,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      title: 'Mechanical Engineer',
      rating: 4.8,
      reviews: 89,
      location: 'Jeddah',
      experience: '6 years',
      availability: 'Available this week',
      responseTime: '1 hour',
      hourlyRate: 'SAR 120',
      skills: ['HVAC Design', 'Energy Efficiency', 'Building Systems', '3D Modeling'],
      certifications: ['PE License', 'LEED'],
      languages: ['Arabic', 'English', 'French'],
      portfolio: 8,
      completionRate: '96%',
      isVerified: true,
      isOnline: false,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: '3',
      name: 'Mohammed Al-Zahrani',
      title: 'Structural Engineer',
      rating: 4.9,
      reviews: 156,
      location: 'Dammam',
      experience: '10 years',
      availability: 'Available this month',
      responseTime: '3 hours',
      hourlyRate: 'SAR 180',
      skills: ['Structural Analysis', 'Safety Assessment', 'Building Codes', 'Seismic Design'],
      certifications: ['PE License', 'PMP', 'SCE Certified'],
      languages: ['Arabic', 'English'],
      portfolio: 15,
      completionRate: '99%',
      isVerified: true,
      isOnline: true,
      avatar: '/api/placeholder/60/60'
    },
    {
      id: '4',
      name: 'Fatima Al-Shehri',
      title: 'Electrical Engineer',
      rating: 4.7,
      reviews: 98,
      location: 'Riyadh',
      experience: '5 years',
      availability: 'Available now',
      responseTime: '4 hours',
      hourlyRate: 'SAR 100',
      skills: ['Power Systems', 'Lighting Design', 'Smart Buildings', 'Renewable Energy'],
      certifications: ['PE License', 'AutoCAD Certified'],
      languages: ['Arabic', 'English', 'German'],
      portfolio: 6,
      completionRate: '94%',
      isVerified: true,
      isOnline: false,
      avatar: '/api/placeholder/60/60'
    }
  ]

  const filteredEngineers = engineers.filter(engineer => {
    const matchesSearch = engineer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         engineer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         engineer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesLocation = !filters.location || engineer.location.toLowerCase().includes(filters.location.toLowerCase())
    const matchesExperience = !filters.experience || engineer.experience === filters.experience
    const matchesRating = !filters.rating || engineer.rating >= parseFloat(filters.rating)
    const matchesAvailability = !filters.availability || engineer.availability === filters.availability
    const matchesSkills = filters.skills.length === 0 || filters.skills.every(skill => engineer.skills.includes(skill))
    const matchesCertifications = filters.certifications.length === 0 || filters.certifications.every(cert => engineer.certifications.includes(cert))
    const matchesLanguages = filters.languages.length === 0 || filters.languages.every(lang => engineer.languages.includes(lang))
    
    return matchesSearch && matchesLocation && matchesExperience && matchesRating && 
           matchesAvailability && matchesSkills && matchesCertifications && matchesLanguages
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
                Find Engineers
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? 'default' : 'outline'}
                size="sm"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

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
                  Filters
                </h3>
                <Button
                  onClick={handleClearFilters}
                  variant="ghost"
                  size="sm"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="e.g., Riyadh, Jeddah"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">Any experience</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">Any rating</option>
                    {ratingRanges.map((range) => (
                      <option key={range} value={range.split('+')[0]}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">Any availability</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills
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
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Certifications
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
                    Languages
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search engineers by name, skills, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-300">
                  Showing {filteredEngineers.length} engineers
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

            {/* Engineers Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
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
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {engineer.name}
                            </h3>
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
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {engineer.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {skill}
                          </span>
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
                      <span>Response: {engineer.responseTime}</span>
                      <span>Completion: {engineer.completionRate}</span>
                      <span>Portfolio: {engineer.portfolio} projects</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleSelectEngineer(engineer.id)}
                        variant={selectedEngineers.includes(engineer.id) ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                      >
                        {selectedEngineers.includes(engineer.id) ? 'Selected' : 'Select'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        View Profile
                      </Button>
                    </div>
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
                  No engineers found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Try adjusting your search criteria or filters.
                </p>
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EngineerFiltering

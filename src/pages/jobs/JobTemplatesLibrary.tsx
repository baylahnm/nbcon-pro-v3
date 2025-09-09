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
  Clock, 
  Users,
  DollarSign,
  FileText,
  Plus,
  Eye,
  Copy,
  Heart,
  Download
} from 'lucide-react'

const JobTemplatesLibrary = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [favorites, setFavorites] = useState<string[]>([])

  const categories = [
    { id: 'all', name: 'All Templates', count: 24 },
    { id: 'civil', name: 'Civil Engineering', count: 8 },
    { id: 'mechanical', name: 'Mechanical Engineering', count: 6 },
    { id: 'electrical', name: 'Electrical Engineering', count: 4 },
    { id: 'architectural', name: 'Architecture', count: 6 }
  ]

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Most Recent' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'name', name: 'Name A-Z' }
  ]

  const templates = [
    {
      id: '1',
      title: 'Office Building Design',
      category: 'architectural',
      description: 'Complete architectural design template for modern office buildings with sustainable features.',
      rating: 4.8,
      reviews: 127,
      downloads: 2341,
      duration: '2-3 weeks',
      budget: 'SAR 15,000 - 50,000',
      complexity: 'Medium',
      skills: ['AutoCAD', 'Revit', '3D Modeling', 'Sustainability'],
      author: 'Ahmed Al-Rashid',
      authorRating: 4.9,
      isPremium: false,
      tags: ['Commercial', 'Modern', 'Sustainable', 'Office'],
      preview: '/api/placeholder/300/200',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'HVAC System Design',
      category: 'mechanical',
      description: 'Comprehensive HVAC system design template for commercial buildings.',
      rating: 4.7,
      reviews: 89,
      downloads: 1876,
      duration: '1-2 weeks',
      budget: 'SAR 8,000 - 25,000',
      complexity: 'Medium',
      skills: ['HVAC Design', 'Energy Efficiency', 'Building Systems'],
      author: 'Sarah Al-Mansouri',
      authorRating: 4.8,
      isPremium: true,
      tags: ['HVAC', 'Energy', 'Commercial', 'Systems'],
      preview: '/api/placeholder/300/200',
      lastUpdated: '2024-01-12'
    },
    {
      id: '3',
      title: 'Structural Analysis',
      category: 'civil',
      description: 'Detailed structural analysis template for building safety assessment.',
      rating: 4.9,
      reviews: 156,
      downloads: 3124,
      duration: '1 week',
      budget: 'SAR 5,000 - 15,000',
      complexity: 'High',
      skills: ['Structural Analysis', 'Safety Assessment', 'Building Codes'],
      author: 'Mohammed Al-Zahrani',
      authorRating: 4.9,
      isPremium: false,
      tags: ['Structural', 'Safety', 'Analysis', 'Building'],
      preview: '/api/placeholder/300/200',
      lastUpdated: '2024-01-10'
    },
    {
      id: '4',
      title: 'Electrical Installation',
      category: 'electrical',
      description: 'Complete electrical system design and installation template.',
      rating: 4.6,
      reviews: 98,
      downloads: 1456,
      duration: '1-2 weeks',
      budget: 'SAR 6,000 - 20,000',
      complexity: 'Medium',
      skills: ['Power Systems', 'Lighting Design', 'Smart Buildings'],
      author: 'Fatima Al-Shehri',
      authorRating: 4.7,
      isPremium: false,
      tags: ['Electrical', 'Power', 'Lighting', 'Smart'],
      preview: '/api/placeholder/300/200',
      lastUpdated: '2024-01-08'
    },
    {
      id: '5',
      title: 'Road Construction',
      category: 'civil',
      description: 'Highway construction project template with modern infrastructure.',
      rating: 4.8,
      reviews: 134,
      downloads: 2789,
      duration: '4-6 weeks',
      budget: 'SAR 25,000 - 100,000',
      complexity: 'High',
      skills: ['Road Design', 'Traffic Engineering', 'Infrastructure'],
      author: 'Khalid Al-Otaibi',
      authorRating: 4.8,
      isPremium: true,
      tags: ['Road', 'Highway', 'Infrastructure', 'Traffic'],
      preview: '/api/placeholder/300/200',
      lastUpdated: '2024-01-05'
    },
    {
      id: '6',
      title: 'Water Treatment Plant',
      category: 'civil',
      description: 'Advanced water treatment facility design and implementation template.',
      rating: 4.9,
      reviews: 76,
      downloads: 1234,
      duration: '6-8 weeks',
      budget: 'SAR 35,000 - 150,000',
      complexity: 'High',
      skills: ['Water Treatment', 'Environmental Engineering', 'Process Design'],
      author: 'Noura Al-Ghamdi',
      authorRating: 4.9,
      isPremium: true,
      tags: ['Water', 'Treatment', 'Environmental', 'Process'],
      preview: '/api/placeholder/300/200',
      lastUpdated: '2024-01-03'
    }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleFavoriteToggle = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const handleUseTemplate = (templateId: string) => {
    // Navigate to job builder with template data
    navigate('/advanced-job-builder', { state: { templateId } })
  }

  const handlePreviewTemplate = (templateId: string) => {
    // Open template preview modal
    console.log('Preview template:', templateId)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
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
                Job Templates Library
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="mb-2"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredTemplates.length} templates
          </p>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Template Image */}
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700">
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <span>Template Preview</span>
                  </div>
                </div>
                
                {/* Premium Badge */}
                {template.isPremium && (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                )}
                
                {/* Favorite Button */}
                <button
                  onClick={() => handleFavoriteToggle(template.id)}
                  className="absolute top-3 left-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(template.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
              </div>

              {/* Template Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {template.title}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
                      {template.rating}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      ({template.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {template.description}
                </p>

                {/* Template Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {template.duration}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {template.budget}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {template.downloads} downloads
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {template.complexity}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {template.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {template.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                        +{template.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                        {template.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {template.author}
                      </p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                          {template.authorRating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getComplexityColor(template.complexity)}`}>
                    {template.complexity}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleUseTemplate(template.id)}
                    size="sm"
                    className="flex-1 bg-brand-500 hover:bg-brand-600 text-white"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Use Template
                  </Button>
                  
                  <Button
                    onClick={() => handlePreviewTemplate(template.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search criteria or browse different categories.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default JobTemplatesLibrary

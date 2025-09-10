import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  ArrowLeft,
  Grid,
  List
} from 'lucide-react'

const BrowseServices = () => {
  const { t } = useTranslation('common')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { id: 'all', name: t('servicesPage.categories.all') },
    { id: 'civil', name: t('servicesPage.categories.civil') },
    { id: 'mechanical', name: t('servicesPage.categories.mechanical') },
    { id: 'electrical', name: t('servicesPage.categories.electrical') },
    { id: 'structural', name: t('servicesPage.categories.structural') },
    { id: 'architectural', name: t('servicesPage.categories.architectural') }
  ]

  const services = [
    {
      id: '1',
      title: 'Office Building Design',
      engineer: 'Ahmed Al-Rashid',
      rating: 4.9,
      reviews: 127,
      location: 'Riyadh',
      price: 'SAR 15,000',
      duration: '2-3 weeks',
      category: 'architectural',
      image: '/api/placeholder/300/200',
      description: 'Complete architectural design for modern office building with sustainable features.'
    },
    {
      id: '2',
      title: 'HVAC System Design',
      engineer: 'Sarah Al-Mansouri',
      rating: 4.8,
      reviews: 89,
      location: 'Jeddah',
      price: 'SAR 8,500',
      duration: '1-2 weeks',
      category: 'mechanical',
      image: '/api/placeholder/300/200',
      description: 'Energy-efficient HVAC system design for commercial buildings.'
    },
    {
      id: '3',
      title: 'Structural Analysis',
      engineer: 'Mohammed Al-Zahrani',
      rating: 4.9,
      reviews: 156,
      location: 'Dammam',
      price: 'SAR 12,000',
      duration: '1 week',
      category: 'structural',
      image: '/api/placeholder/300/200',
      description: 'Comprehensive structural analysis and safety assessment.'
    },
    {
      id: '4',
      title: 'Electrical Installation',
      engineer: 'Fatima Al-Shehri',
      rating: 4.7,
      reviews: 98,
      location: 'Riyadh',
      price: 'SAR 6,500',
      duration: '1-2 weeks',
      category: 'electrical',
      image: '/api/placeholder/300/200',
      description: 'Complete electrical system design and installation planning.'
    },
    {
      id: '5',
      title: 'Road Construction',
      engineer: 'Khalid Al-Otaibi',
      rating: 4.8,
      reviews: 134,
      location: 'Tabuk',
      price: 'SAR 25,000',
      duration: '4-6 weeks',
      category: 'civil',
      image: '/api/placeholder/300/200',
      description: 'Highway construction project with modern infrastructure.'
    },
    {
      id: '6',
      title: 'Water Treatment Plant',
      engineer: 'Noura Al-Ghamdi',
      rating: 4.9,
      reviews: 76,
      location: 'Jeddah',
      price: 'SAR 35,000',
      duration: '6-8 weeks',
      category: 'civil',
      image: '/api/placeholder/300/200',
      description: 'Advanced water treatment facility design and implementation.'
    }
  ]

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.engineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
                {t('servicesPage.headerTitle')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Filter className="w-5 h-5" />
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
                placeholder={t('servicesPage.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
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
                {category.name}
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
            {t('servicesPage.resultsCount', { count: filteredServices.length })}
          </p>
        </motion.div>

        {/* Services Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Service Image */}
              <div className={`bg-gray-200 dark:bg-gray-700 ${
                viewMode === 'list' ? 'w-48 h-32' : 'w-full h-48'
              }`}>
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <span>Service Image</span>
                </div>
              </div>

              {/* Service Content */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
                      {service.rating}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                      ({service.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t('servicesPage.by')} {service.engineer}
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {service.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {service.price}
                  </div>
                  <Button size="sm" className="bg-brand-500 hover:bg-brand-600 text-white">
                    {t('servicesPage.viewDetails')}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredServices.length === 0 && (
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
              {t('servicesPage.noResultsTitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('servicesPage.noResultsHint')}
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              variant="outline"
            >
              {t('servicesPage.clearFilters')}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default BrowseServices

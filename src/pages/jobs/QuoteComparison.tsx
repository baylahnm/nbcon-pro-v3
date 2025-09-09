import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  CheckCircle, 
  X, 
  Star, 
  Clock, 
  MapPin,
  DollarSign,
  Users,
  Award,
  MessageCircle,
  Download,
  Eye,
  Heart,
  AlertCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

const QuoteComparison = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('price')
  const [viewMode, setViewMode] = useState('grid') // grid or table

  const quotes = [
    {
      id: '1',
      engineer: {
        id: '1',
        name: 'Ahmed Al-Rashid',
        title: 'Senior Civil Engineer',
        rating: 4.9,
        reviews: 127,
        location: 'Riyadh',
        experience: '8 years',
        isVerified: true,
        isOnline: true,
        avatar: '/api/placeholder/60/60'
      },
      price: {
        total: 45000,
        hourly: 150,
        currency: 'SAR',
        breakdown: {
          design: 20000,
          engineering: 15000,
          projectManagement: 10000
        }
      },
      timeline: {
        start: '2024-02-01',
        end: '2024-02-28',
        duration: '4 weeks'
      },
      proposal: {
        summary: 'Complete architectural and structural design with 3D modeling and sustainability features.',
        deliverables: [
          'Architectural Drawings',
          'Structural Plans',
          '3D Models',
          'Cost Estimates',
          'Sustainability Report'
        ],
        approach: 'Modern design approach with focus on sustainability and energy efficiency.',
        experience: 'Similar projects: 15 office buildings, 8 commercial complexes',
        timeline: '4 weeks with weekly progress updates'
      },
      features: {
        revisions: 3,
        support: '6 months post-completion',
        warranty: '2 years',
        communication: 'Daily updates',
        tools: ['AutoCAD', 'Revit', '3D Studio Max']
      },
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z',
      isRecommended: true,
      matchScore: 95
    },
    {
      id: '2',
      engineer: {
        id: '2',
        name: 'Sarah Al-Mansouri',
        title: 'Mechanical Engineer',
        rating: 4.8,
        reviews: 89,
        location: 'Jeddah',
        experience: '6 years',
        isVerified: true,
        isOnline: false,
        avatar: '/api/placeholder/60/60'
      },
      price: {
        total: 38000,
        hourly: 120,
        currency: 'SAR',
        breakdown: {
          design: 18000,
          engineering: 12000,
          projectManagement: 8000
        }
      },
      timeline: {
        start: '2024-02-05',
        end: '2024-03-05',
        duration: '4 weeks'
      },
      proposal: {
        summary: 'Comprehensive design solution with emphasis on energy efficiency and modern aesthetics.',
        deliverables: [
          'Architectural Drawings',
          'Structural Plans',
          '3D Models',
          'Energy Analysis',
          'Cost Estimates'
        ],
        approach: 'Energy-efficient design with smart building integration.',
        experience: 'Similar projects: 12 office buildings, 5 commercial complexes',
        timeline: '4 weeks with bi-weekly progress updates'
      },
      features: {
        revisions: 2,
        support: '3 months post-completion',
        warranty: '1 year',
        communication: 'Weekly updates',
        tools: ['AutoCAD', 'Revit', 'EnergyPlus']
      },
      status: 'pending',
      submittedAt: '2024-01-15T14:20:00Z',
      isRecommended: false,
      matchScore: 88
    },
    {
      id: '3',
      engineer: {
        id: '3',
        name: 'Mohammed Al-Zahrani',
        title: 'Structural Engineer',
        rating: 4.9,
        reviews: 156,
        location: 'Dammam',
        experience: '10 years',
        isVerified: true,
        isOnline: true,
        avatar: '/api/placeholder/60/60'
      },
      price: {
        total: 52000,
        hourly: 180,
        currency: 'SAR',
        breakdown: {
          design: 25000,
          engineering: 18000,
          projectManagement: 9000
        }
      },
      timeline: {
        start: '2024-02-01',
        end: '2024-03-15',
        duration: '6 weeks'
      },
      proposal: {
        summary: 'Premium design solution with advanced structural analysis and cutting-edge technology.',
        deliverables: [
          'Architectural Drawings',
          'Structural Plans',
          '3D Models',
          'Structural Analysis',
          'Cost Estimates',
          'Sustainability Report',
          'BIM Model'
        ],
        approach: 'Advanced structural design with focus on safety and innovation.',
        experience: 'Similar projects: 20 office buildings, 12 commercial complexes',
        timeline: '6 weeks with detailed progress tracking'
      },
      features: {
        revisions: 5,
        support: '12 months post-completion',
        warranty: '3 years',
        communication: 'Daily updates',
        tools: ['AutoCAD', 'Revit', 'ETABS', 'SAP2000']
      },
      status: 'pending',
      submittedAt: '2024-01-15T16:45:00Z',
      isRecommended: false,
      matchScore: 92
    }
  ]

  const sortedQuotes = [...quotes].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price.total - b.price.total
      case 'rating':
        return b.engineer.rating - a.engineer.rating
      case 'timeline':
        return new Date(a.timeline.start).getTime() - new Date(b.timeline.start).getTime()
      case 'match':
        return b.matchScore - a.matchScore
      default:
        return 0
    }
  })

  const handleSelectQuote = (quoteId: string) => {
    setSelectedQuote(selectedQuote === quoteId ? null : quoteId)
  }

  const handleAcceptQuote = (quoteId: string) => {
    console.log('Accepting quote:', quoteId)
    navigate('/job-timeline')
  }

  const handleRejectQuote = (quoteId: string) => {
    console.log('Rejecting quote:', quoteId)
  }

  const handleContactEngineer = (engineerId: string) => {
    navigate('/messaging-hub')
  }

  const getPriceTrend = (quote: any) => {
    const avgPrice = quotes.reduce((sum, q) => sum + q.price.total, 0) / quotes.length
    if (quote.price.total < avgPrice * 0.9) return 'down'
    if (quote.price.total > avgPrice * 1.1) return 'up'
    return 'neutral'
  }

  const getTimelineColor = (timeline: string) => {
    switch (timeline) {
      case '4 weeks':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case '6 weeks':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case '8 weeks':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
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
                Quote Comparison
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
                <option value="timeline">Sort by Timeline</option>
                <option value="match">Sort by Match Score</option>
              </select>
              
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === 'grid'
                      ? 'bg-brand-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                    viewMode === 'table'
                      ? 'bg-brand-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Quotes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{quotes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  SAR {Math.round(quotes.reduce((sum, q) => sum + q.price.total, 0) / quotes.length).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Timeline</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.7 weeks</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.9</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quotes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {sortedQuotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${
                selectedQuote === quote.id
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                        {quote.engineer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {quote.engineer.name}
                        </h3>
                        {quote.engineer.isVerified && (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                        )}
                        {quote.engineer.isOnline && (
                          <div className="w-2 h-2 bg-green-500 rounded-full ml-1"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {quote.engineer.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {quote.isRecommended && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full mb-2">
                        <Award className="w-3 h-3 mr-1" />
                        Recommended
                      </span>
                    )}
                    <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                      SAR {quote.price.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {quote.price.hourly}/hour
                    </div>
                  </div>
                </div>

                {/* Match Score */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Match Score</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                      <div 
                        className="bg-brand-500 h-2 rounded-full" 
                        style={{ width: `${quote.matchScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {quote.matchScore}%
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    {quote.engineer.rating} ({quote.engineer.reviews})
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {quote.timeline.duration}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {quote.engineer.location}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    {quote.engineer.experience}
                  </div>
                </div>
              </div>

              {/* Proposal Summary */}
              <div className="p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Proposal Summary
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {quote.proposal.summary}
                </p>

                {/* Key Features */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {quote.features.revisions} revisions included
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {quote.features.support} support
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {quote.features.warranty} warranty
                  </div>
                </div>

                {/* Price Trend */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Price Trend</span>
                  <div className="flex items-center">
                    {getPriceTrend(quote) === 'down' && (
                      <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                    )}
                    {getPriceTrend(quote) === 'up' && (
                      <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      getPriceTrend(quote) === 'down' ? 'text-green-600' :
                      getPriceTrend(quote) === 'up' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {getPriceTrend(quote) === 'down' ? 'Below Average' :
                       getPriceTrend(quote) === 'up' ? 'Above Average' : 'Average'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleSelectQuote(quote.id)}
                    variant={selectedQuote === quote.id ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                  >
                    {selectedQuote === quote.id ? 'Selected' : 'Select'}
                  </Button>
                  
                  <Button
                    onClick={() => handleContactEngineer(quote.engineer.id)}
                    variant="outline"
                    size="sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedQuote === quote.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="space-y-4">
                    {/* Deliverables */}
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Deliverables
                      </h5>
                      <ul className="space-y-1">
                        {quote.proposal.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Approach */}
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Approach
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {quote.proposal.approach}
                      </p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        Relevant Experience
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {quote.proposal.experience}
                      </p>
                    </div>

                    {/* Final Actions */}
                    <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        onClick={() => handleAcceptQuote(quote.id)}
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Accept Quote
                      </Button>
                      
                      <Button
                        onClick={() => handleRejectQuote(quote.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* No Quotes */}
        {quotes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No quotes received yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Quotes from invited engineers will appear here once they submit their proposals.
            </p>
            <Button
              onClick={() => navigate('/real-time-matching')}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              Invite More Engineers
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default QuoteComparison

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  FileText,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Reply,
  Flag,
  Heart,
  Award,
  TrendingUp,
  BarChart3,
  Calendar,
  MapPin,
  Tag,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const FeedbackRating = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('reviews')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const tabs = [
    { id: 'reviews', label: 'Reviews', count: 0 },
    { id: 'ratings', label: 'Ratings', count: 0 },
    { id: 'feedback', label: 'Feedback', count: 0 },
    { id: 'reports', label: 'Reports', count: 0 }
  ]

  const filterTypes = [
    { id: 'all', label: 'All' },
    { id: '5-star', label: '5 Stars' },
    { id: '4-star', label: '4 Stars' },
    { id: '3-star', label: '3 Stars' },
    { id: '2-star', label: '2 Stars' },
    { id: '1-star', label: '1 Star' },
    { id: 'recent', label: 'Recent' },
    { id: 'oldest', label: 'Oldest' }
  ]

  const reviews = [
    {
      id: '1',
      type: 'review',
      rating: 5,
      title: 'Excellent structural analysis',
      content: 'The engineer provided a comprehensive structural analysis that exceeded our expectations. The report was detailed and professional.',
      author: 'Ahmed Al-Rashid',
      authorRole: 'Client',
      project: 'Office Building Design',
      date: '2024-01-25T14:30:00Z',
      helpful: 12,
      replies: 2,
      tags: ['Structural Analysis', 'Professional', 'Detailed Report'],
      verified: true,
      projectValue: 'SAR 50,000',
      completionTime: '7 days'
    },
    {
      id: '2',
      type: 'rating',
      rating: 4,
      title: 'Good project management',
      content: 'Overall good experience with the project management. Some delays but quality was maintained.',
      author: 'Sarah Al-Mansouri',
      authorRole: 'Client',
      project: 'Shopping Mall Renovation',
      date: '2024-01-24T10:15:00Z',
      helpful: 8,
      replies: 1,
      tags: ['Project Management', 'Quality'],
      verified: true,
      projectValue: 'SAR 75,000',
      completionTime: '14 days'
    },
    {
      id: '3',
      type: 'feedback',
      rating: 3,
      title: 'Communication could be better',
      content: 'The work quality was acceptable but communication throughout the project was lacking. More regular updates would have been helpful.',
      author: 'Mohammed Al-Zahrani',
      authorRole: 'Client',
      project: 'Residential Complex Design',
      date: '2024-01-23T16:45:00Z',
      helpful: 5,
      replies: 0,
      tags: ['Communication', 'Updates'],
      verified: false,
      projectValue: 'SAR 30,000',
      completionTime: '10 days'
    },
    {
      id: '4',
      type: 'review',
      rating: 5,
      title: 'Outstanding emergency response',
      content: 'When we had an urgent structural issue, the engineer responded immediately and provided a solution within hours. Highly recommended!',
      author: 'Fatima Al-Shehri',
      authorRole: 'Client',
      project: 'Hospital HVAC System',
      date: '2024-01-22T09:20:00Z',
      helpful: 15,
      replies: 3,
      tags: ['Emergency Response', 'Quick Solution', 'Professional'],
      verified: true,
      projectValue: 'SAR 25,000',
      completionTime: '2 days'
    },
    {
      id: '5',
      type: 'rating',
      rating: 2,
      title: 'Disappointed with timeline',
      content: 'The project was delivered late and the quality was not as expected. Would not recommend for time-sensitive projects.',
      author: 'Khalid Al-Otaibi',
      authorRole: 'Client',
      project: 'Industrial Plant Inspection',
      date: '2024-01-21T14:10:00Z',
      helpful: 3,
      replies: 1,
      tags: ['Timeline', 'Quality Issues'],
      verified: true,
      projectValue: 'SAR 40,000',
      completionTime: '20 days'
    }
  ]

  // Update tab counts
  tabs.forEach(tab => {
    tab.count = reviews.filter(review => 
      tab.id === 'reviews' && review.type === 'review' ||
      tab.id === 'ratings' && review.type === 'rating' ||
      tab.id === 'feedback' && review.type === 'feedback' ||
      tab.id === 'reports' && review.type === 'report'
    ).length
  })

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.project.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterType === 'all' || 
      (filterType === '5-star' && review.rating === 5) ||
      (filterType === '4-star' && review.rating === 4) ||
      (filterType === '3-star' && review.rating === 3) ||
      (filterType === '2-star' && review.rating === 2) ||
      (filterType === '1-star' && review.rating === 1) ||
      (filterType === 'recent' && new Date(review.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (filterType === 'oldest' && new Date(review.date) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    
    return matchesSearch && matchesFilter
  })

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const handleFilterChange = (filterId: string) => {
    setFilterType(filterId)
  }

  const handleSortChange = (sortId: string) => {
    setSortBy(sortId)
  }

  const handleReplySubmit = (reviewId: string) => {
    if (replyText.trim()) {
      console.log('Reply submitted:', reviewId, replyText)
      setReplyText('')
      setShowReplyForm(null)
    }
  }

  const handleHelpful = (reviewId: string) => {
    console.log('Marked as helpful:', reviewId)
  }

  const handleReport = (reviewId: string) => {
    console.log('Report review:', reviewId)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      return 'Today'
    } else if (days === 1) {
      return 'Yesterday'
    } else if (days < 7) {
      return `${days} days ago`
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600 bg-green-100 dark:bg-green-900/30'
    if (rating >= 3) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
    if (rating >= 2) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
    return 'text-red-600 bg-red-100 dark:bg-red-900/30'
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
                Feedback & Ratings
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                size="sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              <Button
                onClick={() => console.log('Export feedback')}
                variant="outline"
                size="sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reviews, ratings, and feedback..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="most-helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {filterTypes.map((filter) => (
              <Button
                key={filter.id}
                variant={filterType === filter.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange(filter.id)}
                className="mb-2"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Reviews List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {review.author}
                      </h3>
                      {review.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{review.authorRole}</span>
                      <span>•</span>
                      <span>{formatTime(review.date)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRatingColor(review.rating)}`}>
                    {review.rating} Stars
                  </span>
                  
                  <Button
                    onClick={() => handleReport(review.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(review.rating)}
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {review.title}
                </h4>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {review.content}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{review.project}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4" />
                      <span>{review.projectValue}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{review.completionTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => handleHelpful(review.id)}
                      variant="outline"
                      size="sm"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    
                    <Button
                      onClick={() => setShowReplyForm(showReplyForm === review.id ? null : review.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Reply className="w-4 h-4 mr-1" />
                      Reply ({review.replies})
                    </Button>
                  </div>
                </div>
              </div>

              {/* Reply Form */}
              <AnimatePresence>
                {showReplyForm === review.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="space-y-4">
                      <textarea
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                        rows={3}
                      />
                      
                      <div className="flex justify-end space-x-2">
                        <Button
                          onClick={() => setShowReplyForm(null)}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                        
                        <Button
                          onClick={() => handleReplySubmit(review.id)}
                          size="sm"
                        >
                          Post Reply
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* No Reviews */}
        {filteredReviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No reviews found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              No reviews match your current filters. Try adjusting your search criteria.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setFilterType('all')
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

export default FeedbackRating

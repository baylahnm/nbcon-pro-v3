import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Plus,
  MessageCircle,
  Users,
  TrendingUp,
  Clock,
  User,
  ChevronRight,
  ThumbsUp,
  Reply,
  Pin,
  Lock,
  Globe,
  Star,
  Award,
  Calendar,
  Tag,
  MoreVertical
} from 'lucide-react'

const CommunityForums = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('general')
  const [sortBy, setSortBy] = useState('recent')

  const categories = [
    { id: 'general', label: 'General Discussion', icon: MessageCircle, count: 45, color: 'bg-blue-100 text-blue-800' },
    { id: 'projects', label: 'Project Showcase', icon: TrendingUp, count: 23, color: 'bg-green-100 text-green-800' },
    { id: 'technical', label: 'Technical Support', icon: Users, count: 18, color: 'bg-purple-100 text-purple-800' },
    { id: 'career', label: 'Career & Jobs', icon: Award, count: 12, color: 'bg-orange-100 text-orange-800' },
    { id: 'events', label: 'Events & Meetups', icon: Calendar, count: 8, color: 'bg-pink-100 text-pink-800' }
  ]

  const forums = [
    {
      id: '1',
      title: 'Best practices for structural analysis in Saudi Arabia',
      category: 'technical',
      author: 'Ahmed Al-Rashid',
      authorRole: 'Senior Engineer',
      replies: 24,
      views: 1250,
      lastActivity: '2 hours ago',
      isPinned: true,
      isLocked: false,
      tags: ['structural-analysis', 'best-practices', 'saudi-standards'],
      excerpt: 'Sharing some insights on structural analysis methodologies that work well in the Saudi construction environment...'
    },
    {
      id: '2',
      title: 'New office building project in Riyadh - seeking collaboration',
      category: 'projects',
      author: 'Sarah Al-Mansouri',
      authorRole: 'Project Manager',
      replies: 18,
      views: 980,
      lastActivity: '4 hours ago',
      isPinned: false,
      isLocked: false,
      tags: ['collaboration', 'riyadh', 'office-building'],
      excerpt: 'We are starting a new office building project in Riyadh and looking for experienced engineers to join our team...'
    },
    {
      id: '3',
      title: 'Upcoming engineering conference in Jeddah',
      category: 'events',
      author: 'Mohammed Al-Zahrani',
      authorRole: 'Event Organizer',
      replies: 12,
      views: 750,
      lastActivity: '1 day ago',
      isPinned: false,
      isLocked: false,
      tags: ['conference', 'jeddah', 'networking'],
      excerpt: 'Join us for the annual engineering conference in Jeddah. Early bird registration is now open...'
    },
    {
      id: '4',
      title: 'Career advice for fresh engineering graduates',
      category: 'career',
      author: 'Fatima Al-Shehri',
      authorRole: 'HR Manager',
      replies: 31,
      views: 2100,
      lastActivity: '2 days ago',
      isPinned: false,
      isLocked: false,
      tags: ['career', 'graduates', 'advice'],
      excerpt: 'As a fresh engineering graduate, what are the most important skills to develop for a successful career...'
    },
    {
      id: '5',
      title: 'Forum Rules and Guidelines',
      category: 'general',
      author: 'Admin',
      authorRole: 'Administrator',
      replies: 0,
      views: 500,
      lastActivity: '1 week ago',
      isPinned: true,
      isLocked: true,
      tags: ['rules', 'guidelines', 'announcement'],
      excerpt: 'Please read these guidelines before participating in our community discussions...'
    }
  ]

  const filteredForums = forums.filter(forum => 
    forum.category === activeCategory &&
    (forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     forum.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
     forum.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  const handleForumSelect = (forumId: string) => {
    console.log('Selected forum:', forumId)
  }

  const handleCreatePost = () => {
    console.log('Create new post')
  }

  const formatTime = (timeString: string) => {
    return timeString
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
                Community & Forums
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleCreatePost}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="replies">Most Replies</option>
                <option value="views">Most Views</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                  className="mb-2"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label} ({category.count})
                </Button>
              )
            })}
          </div>
        </motion.div>

        {/* Forums List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          {filteredForums.map((forum, index) => (
            <motion.div
              key={forum.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleForumSelect(forum.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {forum.isPinned && (
                        <Pin className="w-4 h-4 text-blue-500" />
                      )}
                      {forum.isLocked && (
                        <Lock className="w-4 h-4 text-gray-500" />
                      )}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {forum.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('More options for forum:', forum.id)
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {forum.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{forum.author}</span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                          {forum.authorRole}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{forum.replies} replies</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{forum.lastActivity}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('Like forum:', forum.id)
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Like
                      </Button>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('Reply to forum:', forum.id)
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Reply className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {forum.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Forums */}
        {filteredForums.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No discussions found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              No discussions match your current filters. Try adjusting your search criteria.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('general')
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

export default CommunityForums

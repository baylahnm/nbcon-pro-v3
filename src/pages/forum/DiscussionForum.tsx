import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus,
  MoreVertical,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Pin,
  Lock,
  Unlock,
  Eye,
  MessageCircle,
  Clock,
  User,
  Tag,
  Star,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Share,
  Bookmark,
  BookmarkCheck,
  SortAsc,
  SortDesc,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

const DiscussionForum = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [showNewPost, setShowNewPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([])

  const categories = [
    { id: 'all', name: 'All Discussions', count: 0 },
    { id: 'general', name: 'General', count: 0 },
    { id: 'technical', name: 'Technical', count: 0 },
    { id: 'project', name: 'Project Updates', count: 0 },
    { id: 'help', name: 'Help & Support', count: 0 },
    { id: 'announcements', name: 'Announcements', count: 0 }
  ]

  const sortOptions = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'trending', label: 'Trending' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'most_replies', label: 'Most Replies' }
  ]

  const posts = [
    {
      id: '1',
      title: 'Structural Analysis Best Practices',
      content: 'I\'d like to share some best practices I\'ve learned for structural analysis in large commercial projects. What methods do you all use for load calculations?',
      author: {
        id: '1',
        name: 'Ahmed Al-Rashid',
        title: 'Senior Civil Engineer',
        avatar: '/api/placeholder/40/40',
        isVerified: true
      },
      category: 'technical',
      tags: ['structural', 'analysis', 'best-practices'],
      createdAt: '2024-01-25T14:30:00Z',
      updatedAt: '2024-01-25T14:30:00Z',
      replies: 12,
      views: 156,
      likes: 8,
      dislikes: 0,
      isPinned: true,
      isLocked: false,
      isResolved: false,
      lastReply: {
        author: 'Sarah Al-Mansouri',
        createdAt: '2024-01-25T16:45:00Z'
      },
      attachments: [
        {
          id: '1',
          name: 'Structural_Analysis_Guide.pdf',
          type: 'pdf',
          size: '2.4 MB'
        }
      ]
    },
    {
      id: '2',
      title: 'Project Update: Office Building Design Progress',
      content: 'We\'ve completed 65% of the structural design work. The foundation plans are ready for review and the 3D model is being finalized.',
      author: {
        id: '2',
        name: 'Sarah Al-Mansouri',
        title: 'Project Manager',
        avatar: '/api/placeholder/40/40',
        isVerified: true
      },
      category: 'project',
      tags: ['project-update', 'office-building', 'progress'],
      createdAt: '2024-01-24T10:15:00Z',
      updatedAt: '2024-01-24T10:15:00Z',
      replies: 5,
      views: 89,
      likes: 12,
      dislikes: 0,
      isPinned: false,
      isLocked: false,
      isResolved: false,
      lastReply: {
        author: 'Mohammed Al-Zahrani',
        createdAt: '2024-01-24T14:20:00Z'
      },
      attachments: []
    },
    {
      id: '3',
      title: 'HVAC System Design Question',
      content: 'I\'m working on the HVAC design for the office building. What\'s the recommended approach for energy efficiency in Saudi climate?',
      author: {
        id: '3',
        name: 'Fatima Al-Shehri',
        title: 'Mechanical Engineer',
        avatar: '/api/placeholder/40/40',
        isVerified: true
      },
      category: 'technical',
      tags: ['hvac', 'energy-efficiency', 'climate'],
      createdAt: '2024-01-23T16:30:00Z',
      updatedAt: '2024-01-23T16:30:00Z',
      replies: 8,
      views: 67,
      likes: 5,
      dislikes: 0,
      isPinned: false,
      isLocked: false,
      isResolved: true,
      lastReply: {
        author: 'Khalid Al-Otaibi',
        createdAt: '2024-01-24T09:10:00Z'
      },
      attachments: []
    },
    {
      id: '4',
      title: 'New Platform Features Coming Soon',
      content: 'We\'re excited to announce several new features coming to the platform in the next update, including enhanced collaboration tools and improved mobile experience.',
      author: {
        id: '4',
        name: 'NBCON Pro Team',
        title: 'Platform Team',
        avatar: '/api/placeholder/40/40',
        isVerified: true
      },
      category: 'announcements',
      tags: ['announcement', 'features', 'update'],
      createdAt: '2024-01-22T11:00:00Z',
      updatedAt: '2024-01-22T11:00:00Z',
      replies: 15,
      views: 234,
      likes: 25,
      dislikes: 1,
      isPinned: true,
      isLocked: true,
      isResolved: false,
      lastReply: {
        author: 'Ahmed Al-Rashid',
        createdAt: '2024-01-23T08:30:00Z'
      },
      attachments: []
    },
    {
      id: '5',
      title: 'Help: Can\'t Access Project Files',
      content: 'I\'m having trouble accessing the project files. Getting a permission error. Has anyone else experienced this?',
      author: {
        id: '5',
        name: 'Mohammed Al-Zahrani',
        title: 'Structural Engineer',
        avatar: '/api/placeholder/40/40',
        isVerified: true
      },
      category: 'help',
      tags: ['help', 'permissions', 'files'],
      createdAt: '2024-01-21T14:45:00Z',
      updatedAt: '2024-01-21T14:45:00Z',
      replies: 3,
      views: 45,
      likes: 2,
      dislikes: 0,
      isPinned: false,
      isLocked: false,
      isResolved: true,
      lastReply: {
        author: 'Support Team',
        createdAt: '2024-01-21T16:20:00Z'
      },
      attachments: []
    }
  ]

  // Update category counts
  categories.forEach(category => {
    category.count = posts.filter(post => 
      category.id === 'all' || post.category === category.id
    ).length
  })

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'popular':
        return b.likes - a.likes
      case 'trending':
        return (b.likes + b.replies) - (a.likes + a.replies)
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'most_replies':
        return b.replies - a.replies
      default:
        return 0
    }
  })

  const handlePostSelect = (postId: string) => {
    setSelectedPost(selectedPost === postId ? null : postId)
  }

  const handleBookmarkToggle = (postId: string) => {
    setBookmarkedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handlePostAction = (postId: string, action: string) => {
    console.log('Post action:', action, postId)
  }

  const handleReply = (postId: string) => {
    console.log('Replying to post:', postId)
  }

  const handleLike = (postId: string) => {
    console.log('Liking post:', postId)
  }

  const handleDislike = (postId: string) => {
    console.log('Disliking post:', postId)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (days === 1) {
      return 'Yesterday'
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'technical':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'project':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'help':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'announcements':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getTrendingIcon = (post: any) => {
    const score = post.likes + post.replies
    if (score > 15) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (score > 8) return <TrendingUp className="w-4 h-4 text-yellow-500" />
    return null
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
                Discussion Forum
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowNewPost(true)}
                size="sm"
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
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
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Posts List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          {sortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {post.author.name}
                        </h3>
                        {post.author.isVerified && (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                        )}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {post.author.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(post.createdAt)}</span>
                        {post.updatedAt !== post.createdAt && (
                          <span>• Edited</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {post.isPinned && (
                      <Pin className="w-4 h-4 text-yellow-500" />
                    )}
                    {post.isLocked && (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                    {post.isResolved && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {getTrendingIcon(post)}
                    <button
                      onClick={() => handleBookmarkToggle(post.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      {bookmarkedPosts.includes(post.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-brand-500" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => handlePostAction(post.id, 'more')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                    {post.category.toUpperCase()}
                  </span>
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {post.title}
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Attachments */}
                {post.attachments && post.attachments.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {post.attachments.length} attachment(s)
                      </span>
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.replies} replies
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views} views
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {post.likes} likes
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last reply by {post.lastReply.author} {formatTime(post.lastReply.createdAt)}
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => handleLike(post.id)}
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Like ({post.likes})
                    </Button>
                    
                    <Button
                      onClick={() => handleDislike(post.id)}
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      Dislike ({post.dislikes})
                    </Button>
                    
                    <Button
                      onClick={() => handleReply(post.id)}
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Reply className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                    
                    <Button
                      onClick={() => handlePostAction(post.id, 'share')}
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Share className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  
                  <Button
                    onClick={() => handlePostSelect(post.id)}
                    variant="outline"
                    size="sm"
                  >
                    {selectedPost === post.id ? 'Hide Details' : 'View Details'}
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedPost === post.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="space-y-4">
                    {/* Full Content */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Full Content
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {post.content}
                      </p>
                    </div>

                    {/* Attachments */}
                    {post.attachments && post.attachments.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Attachments
                        </h4>
                        <div className="space-y-2">
                          {post.attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                              <div className="flex items-center">
                                <FileText className="w-4 h-4 text-gray-400 mr-2" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {attachment.type.toUpperCase()} • {attachment.size}
                                  </p>
                                </div>
                              </div>
                              <Button
                                onClick={() => handlePostAction(post.id, 'download')}
                                variant="outline"
                                size="sm"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Replies */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Recent Replies ({post.replies})
                      </h4>
                      <div className="space-y-3">
                        {/* Mock replies */}
                        <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                              SA
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Sarah Al-Mansouri
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(post.lastReply.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Great question! I usually start with the load calculations and then move to the structural analysis...
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* No Posts */}
        {sortedPosts.length === 0 && (
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
              Try adjusting your search criteria or start a new discussion.
            </p>
            <Button
              onClick={() => setShowNewPost(true)}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Start Discussion
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DiscussionForum

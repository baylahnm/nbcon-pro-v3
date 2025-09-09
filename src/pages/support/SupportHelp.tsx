import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Search, 
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  Star,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Video,
  Download,
  ExternalLink
} from 'lucide-react'

const SupportHelp = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: BookOpen, count: 12 },
    { id: 'account', label: 'Account & Profile', icon: User, count: 8 },
    { id: 'projects', label: 'Projects & Jobs', icon: FileText, count: 15 },
    { id: 'payments', label: 'Payments & Billing', icon: CheckCircle, count: 6 },
    { id: 'technical', label: 'Technical Support', icon: AlertCircle, count: 10 },
    { id: 'safety', label: 'Safety & Security', icon: Shield, count: 5 }
  ]

  const articles = [
    {
      id: '1',
      title: 'How to create your first project',
      category: 'getting-started',
      content: 'Learn how to create and manage your first engineering project on the platform.',
      rating: 4.8,
      views: 1250,
      lastUpdated: '2024-01-20',
      tags: ['project', 'tutorial', 'beginner']
    },
    {
      id: '2',
      title: 'Setting up your engineer profile',
      category: 'account',
      content: 'Complete guide to setting up a professional engineer profile.',
      rating: 4.9,
      views: 980,
      lastUpdated: '2024-01-18',
      tags: ['profile', 'setup', 'verification']
    },
    {
      id: '3',
      title: 'Understanding project milestones',
      category: 'projects',
      content: 'Learn how to set up and track project milestones effectively.',
      rating: 4.7,
      views: 750,
      lastUpdated: '2024-01-15',
      tags: ['milestones', 'tracking', 'project-management']
    }
  ]

  const filteredArticles = articles.filter(article => 
    article.category === activeCategory &&
    (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
     article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setSelectedArticle(null)
  }

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticle(articleId)
  }

  const handleContactSupport = () => {
    console.log('Contact support')
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
                Support & Help Center
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleContactSupport}
                variant="outline"
                size="sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent text-lg"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{category.label}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {category.count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Articles List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {categories.find(c => c.id === activeCategory)?.label} Articles
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredArticles.length} articles found
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => handleArticleSelect(article.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {article.content}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4" />
                              <span>{article.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.views} views</span>
                            </div>
                            <span>Updated {article.lastUpdated}</span>
                          </div>
                        </div>
                        
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredArticles.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search terms or browse different categories.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SupportHelp

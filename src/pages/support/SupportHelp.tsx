import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/PageLayout'
import { 
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
  ExternalLink,
  Shield
} from 'lucide-react'

const SupportHelp = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)

  const categories = [
    { id: 'getting-started', label: t('support.gettingStarted', 'Getting Started'), icon: BookOpen, count: 12 },
    { id: 'account', label: t('support.accountProfile', 'Account & Profile'), icon: User, count: 8 },
    { id: 'projects', label: t('support.projectsJobs', 'Projects & Jobs'), icon: FileText, count: 15 },
    { id: 'payments', label: t('support.paymentsBilling', 'Payments & Billing'), icon: CheckCircle, count: 6 },
    { id: 'technical', label: t('support.technicalSupport', 'Technical Support'), icon: AlertCircle, count: 10 },
    { id: 'safety', label: t('support.safetySecurity', 'Safety & Security'), icon: Shield, count: 5 }
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

  const filterTabs = categories.map(category => ({
    id: category.id,
    label: category.label,
    icon: category.icon
  }))

  return (
    <PageLayout
      title={t('support.title', 'Help Center')}
      searchPlaceholder={t('support.searchPlaceholder', 'Search help articles...')}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      filterTabs={filterTabs}
      activeTab={activeCategory}
      onTabChange={handleCategoryChange}
      showViewToggle={false}
      headerActions={
        <Button
          onClick={handleContactSupport}
          variant="outline"
          size="sm"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {t('support.contactSupport', 'Contact Support')}
        </Button>
      }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
                {t('support.categories', 'Categories')}
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
                  {categories.find(c => c.id === activeCategory)?.label} {t('support.articles', 'Articles')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredArticles.length} {t('support.relatedArticles', 'Related Articles')}
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
                      {t('empty.noResults', 'No results found')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('support.needMoreHelp', 'Need more help?')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}

export default SupportHelp

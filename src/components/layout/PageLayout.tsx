import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Search, 
  Grid, 
  List,
  Filter
} from 'lucide-react'
import { DirectionalIcon } from '@/components/system/DirectionalIcon'

interface FilterTab {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface PageLayoutProps {
  title: string
  description?: string
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  viewMode?: 'grid' | 'list'
  onViewModeChange?: (mode: 'grid' | 'list') => void
  filterTabs?: FilterTab[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
  showViewToggle?: boolean
  showSearch?: boolean
  showFilters?: boolean
  headerActions?: React.ReactNode
  children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  searchPlaceholder,
  searchValue = '',
  onSearchChange,
  viewMode = 'grid',
  onViewModeChange,
  filterTabs = [],
  activeTab = '',
  onTabChange,
  showViewToggle = true,
  showSearch = true,
  showFilters = true,
  headerActions,
  children
}) => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="me-4"
              >
                <DirectionalIcon>
                  <ArrowLeft className="w-5 h-5" />
                </DirectionalIcon>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h1>
                {description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {headerActions}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        {(showSearch || showFilters) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search Bar */}
              {showSearch && (
                <div className="flex-1 relative">
                  <Search className="absolute inset-s-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={searchPlaceholder || t('common.search', 'Search...')}
                    value={searchValue}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="w-full ps-10 pe-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
              
              {/* View Mode Toggle */}
              {showViewToggle && onViewModeChange && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onViewModeChange('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onViewModeChange('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Filter Tabs */}
            {showFilters && filterTabs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filterTabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onTabChange?.(tab.id)}
                      className="mb-2"
                    >
                      {Icon && <Icon className="w-4 h-4 me-2" />}
                      {tab.label}
                    </Button>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

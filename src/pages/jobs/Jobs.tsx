import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/PageLayout'
import { 
  Search, 
  Filter, 
  Plus,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Eye,
  Bookmark,
  Share,
  MoreVertical,
  Briefcase,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Award
} from 'lucide-react'

export default function Jobs() {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('browse')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('browse')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const tabs = [
    { id: 'browse', label: t('jobs.browse', 'Browse Jobs'), icon: Search },
    { id: 'my-jobs', label: t('jobs.myJobsLabel', 'My Jobs'), icon: Briefcase },
    { id: 'recommendations', label: t('jobs.recommendations', 'Recommendations'), icon: Target },
    { id: 'saved', label: t('jobs.saved', 'Saved Jobs'), icon: Bookmark },
    { id: 'applications', label: t('jobs.applications', 'Applications'), icon: CheckCircle }
  ]

  const mockJobs = [
    {
      id: 'JOB-001',
      title: t('jobs.sampleJobs.job1.title'),
      company: t('jobs.sampleJobs.job1.company'),
      location: t('jobs.sampleJobs.job1.location'),
      type: t('jobs.sampleJobs.job1.type'),
      duration: t('jobs.sampleJobs.job1.duration'),
      budget: t('jobs.sampleJobs.job1.budget'),
      posted: t('jobs.sampleJobs.job1.posted'),
      applicants: 12,
      rating: 4.8,
      skills: t('jobs.sampleJobs.job1.skills', { returnObjects: true }) as string[],
      description: t('jobs.sampleJobs.job1.description'),
      urgent: false,
      featured: true
    },
    {
      id: 'JOB-002',
      title: t('jobs.sampleJobs.job2.title'),
      company: t('jobs.sampleJobs.job2.company'),
      location: t('jobs.sampleJobs.job2.location'),
      type: t('jobs.sampleJobs.job2.type'),
      duration: t('jobs.sampleJobs.job2.duration'),
      budget: t('jobs.sampleJobs.job2.budget'),
      posted: t('jobs.sampleJobs.job2.posted'),
      applicants: 8,
      rating: 4.6,
      skills: t('jobs.sampleJobs.job2.skills', { returnObjects: true }) as string[],
      description: t('jobs.sampleJobs.job2.description'),
      urgent: true,
      featured: false
    },
    {
      id: 'JOB-003',
      title: t('jobs.sampleJobs.job3.title'),
      company: t('jobs.sampleJobs.job3.company'),
      location: t('jobs.sampleJobs.job3.location'),
      type: t('jobs.sampleJobs.job3.type'),
      duration: t('jobs.sampleJobs.job3.duration'),
      budget: t('jobs.sampleJobs.job3.budget'),
      posted: t('jobs.sampleJobs.job3.posted'),
      applicants: 15,
      rating: 4.9,
      skills: t('jobs.sampleJobs.job3.skills', { returnObjects: true }) as string[],
      description: t('jobs.sampleJobs.job3.description'),
      urgent: false,
      featured: true
    }
  ]

  const mockMyJobs = [
    {
      id: 'MY-001',
      title: t('jobs.myJobs.sample1.title'),
      status: 'in-progress',
      progress: 65,
      deadline: '2024-02-15',
      client: t('jobs.myJobs.sample1.client'),
      budget: t('jobs.myJobs.sample1.budget')
    },
    {
      id: 'MY-002',
      title: t('jobs.myJobs.sample2.title'),
      status: 'pending-review',
      progress: 100,
      deadline: '2024-01-30',
      client: t('jobs.myJobs.sample2.client'),
      budget: t('jobs.myJobs.sample2.budget')
    },
    {
      id: 'MY-003',
      title: t('jobs.myJobs.sample3.title'),
      status: 'completed',
      progress: 100,
      deadline: '2024-01-20',
      client: t('jobs.myJobs.sample3.client'),
      budget: t('jobs.myJobs.sample3.budget')
    }
  ]

  const renderBrowseJobs = () => (
    <div className="space-y-6">
      {/* Additional Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
              <option>{t('jobs.allCategories', 'All Categories')}</option>
              <option>{t('jobs.electrical', 'Electrical')}</option>
              <option>{t('jobs.mechanical', 'Mechanical')}</option>
              <option>{t('jobs.civil', 'Civil')}</option>
              <option>{t('jobs.structural', 'Structural')}</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
              <option>{t('jobs.allLocations', 'All Locations')}</option>
              <option>{t('jobs.riyadh', 'Riyadh')}</option>
              <option>{t('jobs.jeddah', 'Jeddah')}</option>
              <option>{t('jobs.dammam', 'Dammam')}</option>
              <option>{t('jobs.mecca', 'Mecca')}</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 me-2" />
              {t('jobs.filters', 'Filters')}
            </Button>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {mockJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  {job.featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      <Star className="w-3 h-3 me-1" />
                      {t('jobs.featured', 'Featured')}
                    </span>
                  )}
                  {job.urgent && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      <Zap className="w-3 h-3 me-1" />
                      {t('jobs.urgent', 'Urgent')}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <Briefcase className="w-4 h-4 me-1" />
                  {job.company}
                  <MapPin className="w-4 h-4 ms-4 me-1" />
                  {job.location}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 me-1" />
                      {job.posted}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 me-1" />
                      {job.applicants} {t('jobs.applicants', 'applicants')}
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 me-1" />
                      {job.rating}
                    </span>
                  </div>
                  <div className="text-end">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {job.budget}
                    </div>
                    <div className="text-xs">
                      {job.type} • {job.duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <Button size="sm">
                  {t('jobs.apply', 'Apply')}
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 me-1" />
                  {t('jobs.view', 'View')}
                </Button>
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          {t('jobs.loadMore', 'Load More Jobs')}
        </Button>
      </div>
    </div>
  )

  const renderMyJobs = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('jobs.activeJobs', 'Active Jobs')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('jobs.completed', 'Completed')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('jobs.totalEarnings', 'Total Earnings')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">45,500 SAR</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Jobs List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('jobs.myActiveJobs', 'My Active Jobs')}
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockMyJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {job.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {job.client} • {job.budget}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {job.progress}% {t('jobs.complete', 'Complete')}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t('jobs.deadline', 'Deadline')}: {job.deadline}
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div
                      className="h-2 bg-primary rounded-full"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : job.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {job.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {job.status === 'in-progress' && <Clock className="w-3 h-3 mr-1" />}
                    {job.status === 'pending-review' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {t(`jobs.${job.status}`, job.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('jobs.aiRecommendations', 'AI-Powered Job Recommendations')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('jobs.recommendationsDescription', 'Based on your skills and experience, we recommend these jobs for you')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockJobs.slice(0, 2).map((job) => (
            <div key={job.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{job.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{job.company}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{job.budget}</span>
                <Button size="sm" variant="outline">
                  {t('jobs.view', 'View')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSavedJobs = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('jobs.savedJobs', 'Saved Jobs')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('jobs.savedJobsDescription', 'Jobs you have saved for later review')}
        </p>
      </div>
    </div>
  )

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('jobs.myApplications', 'My Applications')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('jobs.applicationsDescription', 'Track the status of your job applications')}
        </p>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'browse':
        return renderBrowseJobs()
      case 'my-jobs':
        return renderMyJobs()
      case 'recommendations':
        return renderRecommendations()
      case 'saved':
        return renderSavedJobs()
      case 'applications':
        return renderApplications()
      default:
        return renderBrowseJobs()
    }
  }

  return (
    <PageLayout
      title={t('jobs.title', 'Jobs')}
      description={t('jobs.description', 'Find engineering jobs and manage your applications')}
      searchPlaceholder={t('jobs.searchJobs', 'Search jobs...')}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      filterTabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerActions={
        <Button>
          <Plus className="w-4 h-4 me-2" />
          {t('jobs.postJob', 'Post Job')}
        </Button>
      }
    >
      {renderTabContent()}
    </PageLayout>
  )
}

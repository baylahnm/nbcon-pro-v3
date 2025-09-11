import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Play,
  Pause,
  Calendar,
  Users,
  FileText,
  MessageCircle,
  Download,
  Upload,
  Eye,
  Edit,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Search,
  Grid3X3,
  List
} from 'lucide-react'

const JobStatusTracking = () => {
  const { t, i18n } = useTranslation(['common', 'jobs'])
  const navigate = useNavigate()
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const isRTL = i18n.language === 'ar'

  // Helpers to fetch localized text with graceful fallbacks when *_Key fields are missing
  const getJobTitle = (job: any) =>
    job.titleKey
      ? t(`common:statusTracking.jobTitles.${job.titleKey}`, { defaultValue: job.titleKey })
      : (job.title || '')

  const getClient = (job: any) =>
    job.clientKey
      ? t(`common:statusTracking.clients.${job.clientKey}`, { defaultValue: job.clientKey })
      : (job.client || '')

  const getLocation = (job: any) =>
    job.locationKey
      ? t(`common:statusTracking.locations.${job.locationKey}`, { defaultValue: job.locationKey })
      : (job.location || '')

  const getDescription = (job: any) =>
    job.descriptionKey
      ? t(`common:statusTracking.descriptions.${job.descriptionKey}`, { defaultValue: job.descriptionKey })
      : (job.description || '')

  const getDeliverableTitle = (d: any) =>
    d.titleKey
      ? t(`common:statusTracking.deliverableTitles.${d.titleKey}`, { defaultValue: d.titleKey })
      : (d.title || '')

  const getTeamRole = (member: any) =>
    member.roleKey
      ? t(`common:statusTracking.teamRoles.${member.roleKey}`, { defaultValue: member.roleKey })
      : (member.role || '')

  const jobs = useMemo(() => [
    {
      id: '1',
      titleKey: 'officeBuildingDesign',
      clientKey: 'alRajhiConstruction',
      engineer: 'Ahmed Al-Rashid',
      status: 'in_progress',
      progress: 65,
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      budget: 45000,
      spent: 29250,
      currency: 'SAR',
      locationKey: 'riyadh',
      descriptionKey: 'officeBuildingDesign',
      milestones: [
        {
          id: '1',
          titleKey: 'initialDesignConcept',
          status: 'completed',
          dueDate: '2024-01-22',
          completedDate: '2024-01-20',
          descriptionKey: 'initialDesignConcept'
        },
        {
          id: '2',
          titleKey: 'detailedDrawings',
          status: 'in_progress',
          dueDate: '2024-02-05',
          completedDate: null,
          descriptionKey: 'detailedDrawings'
        },
        {
          id: '3',
          titleKey: '3dModeling',
          status: 'pending',
          dueDate: '2024-02-15',
          completedDate: null,
          descriptionKey: '3dModeling'
        },
        {
          id: '4',
          titleKey: 'finalReview',
          status: 'pending',
          dueDate: '2024-02-28',
          completedDate: null,
          descriptionKey: 'finalReview'
        }
      ],
      deliverables: [
        {
          id: '1',
          titleKey: 'architecturalDrawings',
          status: 'completed',
          uploadedAt: '2024-01-20',
          size: '2.4 MB',
          type: 'PDF'
        },
        {
          id: '2',
          titleKey: 'structuralPlans',
          status: 'in_progress',
          uploadedAt: null,
          size: null,
          type: 'DWG'
        },
        {
          id: '3',
          titleKey: '3dModels',
          status: 'pending',
          uploadedAt: null,
          size: null,
          type: 'RVT'
        }
      ],
      team: [
        {
          id: '1',
          name: 'Ahmed Al-Rashid',
          roleKey: 'leadEngineer',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        },
        {
          id: '2',
          name: 'Sarah Al-Mansouri',
          roleKey: 'structuralEngineer',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        },
        {
          id: '3',
          name: 'Mohammed Al-Zahrani',
          roleKey: 'projectManager',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        }
      ],
      lastUpdate: '2024-01-25T14:30:00Z',
      nextMilestoneKey: 'detailedDrawings',
      nextDueDate: '2024-02-05'
    },
    {
      id: '2',
      // keys for i18n
      titleKey: 'shoppingMallRenovation',
      clientKey: 'saudiAramco',
      engineer: 'Sarah Al-Mansouri',
      status: 'completed',
      progress: 100,
      priority: 'medium',
      startDate: '2023-11-01',
      endDate: '2024-01-15',
      budget: 38000,
      spent: 38000,
      currency: 'SAR',
      locationKey: 'dhahran',
      descriptionKey: 'shoppingMallRenovation',
      milestones: [
        {
          id: '1',
          titleKey: 'siteAssessment',
          status: 'completed',
          dueDate: '2023-11-08',
          completedDate: '2023-11-06',
          descriptionKey: 'siteAssessment'
        },
        {
          id: '2',
          titleKey: 'renovationPlans',
          status: 'completed',
          dueDate: '2023-11-22',
          completedDate: '2023-11-20',
          descriptionKey: 'renovationPlans'
        },
        {
          id: '3',
          titleKey: 'implementation',
          status: 'completed',
          dueDate: '2024-01-01',
          completedDate: '2023-12-28',
          descriptionKey: 'implementation'
        },
        {
          id: '4',
          titleKey: 'finalInspection',
          status: 'completed',
          dueDate: '2024-01-15',
          completedDate: '2024-01-15',
          descriptionKey: 'finalInspection'
        }
      ],
      deliverables: [
        {
          id: '1',
          title: 'Renovation Plans',
          status: 'completed',
          uploadedAt: '2023-11-20',
          size: '1.8 MB',
          type: 'PDF'
        },
        {
          id: '2',
          title: 'Implementation Timeline',
          status: 'completed',
          uploadedAt: '2023-11-25',
          size: '0.5 MB',
          type: 'PDF'
        },
        {
          id: '3',
          title: 'Final Report',
          status: 'completed',
          uploadedAt: '2024-01-15',
          size: '3.2 MB',
          type: 'PDF'
        }
      ],
      team: [
        {
          id: '1',
          name: 'Sarah Al-Mansouri',
          role: 'Lead Engineer',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        },
        {
          id: '2',
          name: 'Khalid Al-Otaibi',
          role: 'Mechanical Engineer',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        }
      ],
      lastUpdate: '2024-01-15T16:45:00Z',
      nextMilestone: null,
      nextDueDate: null
    },
    {
      id: '3',
      titleKey: 'residentialComplexDesign',
      clientKey: 'neom',
      engineer: 'Mohammed Al-Zahrani',
      status: 'pending',
      progress: 0,
      priority: 'low',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      budget: 52000,
      spent: 0,
      currency: 'SAR',
      locationKey: 'tabuk',
      descriptionKey: 'residentialComplexDesign',
      milestones: [
        {
          id: '1',
          titleKey: 'projectKickoff',
          status: 'pending',
          dueDate: '2024-02-01',
          completedDate: null,
          descriptionKey: 'projectKickoff'
        },
        {
          id: '2',
          titleKey: 'masterPlan',
          status: 'pending',
          dueDate: '2024-02-15',
          completedDate: null,
          descriptionKey: 'masterPlan'
        },
        {
          id: '3',
          titleKey: 'buildingDesigns',
          status: 'pending',
          dueDate: '2024-03-01',
          completedDate: null,
          descriptionKey: 'buildingDesigns'
        },
        {
          id: '4',
          titleKey: 'finalReview',
          status: 'pending',
          dueDate: '2024-03-15',
          completedDate: null,
          descriptionKey: 'finalReview'
        }
      ],
      deliverables: [],
      team: [
        {
          id: '1',
          name: 'Mohammed Al-Zahrani',
          role: 'Lead Engineer',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        },
        {
          id: '2',
          name: 'Fatima Al-Shehri',
          role: 'Electrical Engineer',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        }
      ],
      lastUpdate: '2024-01-20T10:15:00Z',
      nextMilestone: 'Project Kickoff',
      nextDueDate: '2024-02-01'
    }
  ], [])

  // Status filter tabs
  const statusTabs = useMemo(() => [
    {
      id: 'all',
      label: t('common:statusTracking.allJobs', { defaultValue: 'All Jobs' }),
      icon: Search,
      count: jobs.length
    },
    {
      id: 'pending',
      label: t('common:statusTracking.pending', { defaultValue: 'Pending' }),
      icon: Clock,
      count: jobs.filter(j => j.status === 'pending').length
    },
    {
      id: 'in_progress',
      label: t('common:statusTracking.inProgress', { defaultValue: 'In Progress' }),
      icon: Play,
      count: jobs.filter(j => j.status === 'in_progress').length
    },
    {
      id: 'completed',
      label: t('common:statusTracking.completed', { defaultValue: 'Completed' }),
      icon: CheckCircle,
      count: jobs.filter(j => j.status === 'completed').length
    },
    {
      id: 'on_hold',
      label: t('common:statusTracking.onHold', { defaultValue: 'On Hold' }),
      icon: Pause,
      count: jobs.filter(j => j.status === 'on_hold').length
    }
  ], [t, jobs, i18n.language])

  // Filter jobs based on search and status
  const filteredJobs = useMemo(() => {
    let filtered = jobs

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(job => job.status === filterStatus)
    }

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(job =>
        getJobTitle(job).toLowerCase().includes(q) ||
        getClient(job).toLowerCase().includes(q) ||
        job.engineer.toLowerCase().includes(q) ||
        getLocation(job).toLowerCase().includes(q)
      )
    }

    return filtered
  }, [jobs, filterStatus, searchQuery, t, i18n.language])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'in_progress':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'on_hold':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'in_progress':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'pending':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(selectedJob === jobId ? null : jobId)
  }

  const handleStatusChange = (jobId: string, newStatus: string) => {
    console.log('Changing job status:', jobId, newStatus)
  }

  const handleMilestoneUpdate = (jobId: string, milestoneId: string) => {
    console.log('Updating milestone:', jobId, milestoneId)
  }

  return (
    <PageLayout
      title={t('common:statusTracking.title', { defaultValue: 'Job Status Tracking' })}
      description={t('common:statusTracking.description', { defaultValue: 'Track and manage your job progress, milestones, and team collaboration' })}
      searchPlaceholder={t('common:statusTracking.searchPlaceholder', { defaultValue: 'Search jobs by title, client, or engineer...' })}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      filterTabs={statusTabs}
      activeTab={filterStatus}
      onTabChange={setFilterStatus}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      showViewToggle={true}
      headerActions={
        <Button
          onClick={() => navigate('/job-archive')}
          variant="outline"
          size="sm"
        >
          {t('common:statusTracking.viewArchive', { defaultValue: 'View Archive' })}
        </Button>
      }
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Jobs Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={viewMode === 'grid' ? 'space-y-6' : 'space-y-4'}
        >
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${
                viewMode === 'list' ? 'flex items-center' : ''
              }`}
            >
              {/* Job Header */}
              <div className={`border-b border-gray-200 dark:border-gray-700 ${viewMode === 'list' ? 'flex-1 p-4' : 'p-6'}`}>
                <div className={`flex items-start justify-between ${viewMode === 'list' ? 'mb-2' : 'mb-4'}`}>
                  <div className="flex-1">
                    <div className={`flex items-center ${viewMode === 'list' ? 'mb-1' : 'mb-2'}`}>
                      <h3 className={`font-semibold text-gray-900 dark:text-white ${viewMode === 'list' ? 'text-lg' : 'text-xl'}`}>
                        {getJobTitle(job)}
                      </h3>
                      <span className={`${isRTL ? 'ms-3' : 'ms-3'} px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                        {t(`common:statusTracking.${job.status === 'in_progress' ? 'inProgress' : job.status === 'on_hold' ? 'onHold' : job.status}`, { defaultValue: job.status.replace('_', ' ').toUpperCase() })}
                      </span>
                      <span className={`${isRTL ? 'ms-2' : 'ms-2'} px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(job.priority)}`}>
                        {t(`common:statusTracking.${job.priority}`, { defaultValue: job.priority.toUpperCase() })}
                      </span>
                    </div>
                    
                    <div className={`flex items-center text-sm text-gray-600 dark:text-gray-400 ${viewMode === 'list' ? 'space-x-4 mb-1' : 'space-x-6 mb-3'}`}>
                      <span>{t('common:statusTracking.client', { defaultValue: 'Client' })}: {getClient(job)}</span>
                      <span>{t('common:statusTracking.engineer', { defaultValue: 'Engineer' })}: {job.engineer}</span>
                      <span>{t('common:statusTracking.location', { defaultValue: 'Location' })}: {getLocation(job)}</span>
                    </div>
                    
                    {viewMode === 'grid' && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {getDescription(job)}
                      </p>
                    )}
                  </div>
                  
                  <div className={`text-end ${viewMode === 'list' ? 'ms-4' : 'ms-6'}`}>
                    <div className={`font-bold text-brand-600 dark:text-brand-400 ${viewMode === 'list' ? 'text-lg mb-1' : 'text-2xl mb-1'}`}>
                      {job.currency} {job.budget.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {t('common:statusTracking.spent', { defaultValue: 'Spent' })}: {job.currency} {job.spent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {job.progress}% {t('common:statusTracking.complete', { defaultValue: 'Complete' })}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {viewMode === 'grid' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('common:statusTracking.progress', { defaultValue: 'Progress' })}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {job.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-brand-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className={`flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 ${viewMode === 'list' ? 'mt-2' : ''}`}>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 me-1" />
                    <span>{t('common:statusTracking.start', { defaultValue: 'Start' })}: {new Date(job.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 me-1" />
                    <span>{t('common:statusTracking.end', { defaultValue: 'End' })}: {new Date(job.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 me-1" />
                    <span>{t('common:statusTracking.lastUpdate', { defaultValue: 'Last Update' })}: {new Date(job.lastUpdate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedJob === job.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Milestones */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {t('common:statusTracking.milestones', { defaultValue: 'Milestones' })}
                      </h4>
                      <div className="space-y-4">
                        {job.milestones.map((milestone, idx) => (
                          <div
                            key={milestone.id}
                            className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex-shrink-0 mr-4">
                              {milestone.status === 'completed' ? (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                              ) : milestone.status === 'in_progress' ? (
                                <Play className="w-6 h-6 text-blue-500" />
                              ) : (
                                <Clock className="w-6 h-6 text-gray-400" />
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  {t(`statusTracking.milestoneTitles.${milestone.titleKey}`, { ns: 'common', defaultValue: milestone.titleKey })}
                                </h5>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMilestoneStatusColor(milestone.status)}`}>
                                  {t(`common:statusTracking.${milestone.status === 'in_progress' ? 'inProgress' : milestone.status}`, { defaultValue: milestone.status.replace('_', ' ').toUpperCase() })}
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {t(`common:statusTracking.milestoneDescriptions.${milestone.descriptionKey}`, { defaultValue: milestone.descriptionKey })}
                              </p>
                              
                              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>{t('common:statusTracking.due', { defaultValue: 'Due' })}: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                                {milestone.completedDate && (
                                  <span>{t('common:statusTracking.completed', { defaultValue: 'Completed' })}: {new Date(milestone.completedDate).toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team & Deliverables */}
                    <div className="space-y-6">
                      {/* Team */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          {t('common:statusTracking.teamMembers', { defaultValue: 'Team Members' })}
                        </h4>
                        <div className="space-y-3">
                          {job.team.map((member) => (
                            <div key={member.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className={`w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center ${isRTL ? 'ms-3' : 'me-3'}`}>
                                <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                                  {member.name.split(' ').map((n: string) => n[0]).join('')}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  {member.name}
                                </h5>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {getTeamRole(member)}
                                </p>
                              </div>
                              <div className={`w-2 h-2 rounded-full ${
                                member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                              }`}></div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          {t('common:statusTracking.deliverables', { defaultValue: 'Deliverables' })}
                        </h4>
                        <div className="space-y-3">
                          {job.deliverables.map((deliverable) => (
                            <div key={deliverable.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center">
                                <FileText className={`w-5 h-5 text-gray-400 ${isRTL ? 'ms-3' : 'me-3'}`} />
                                <div>
                                  <h5 className="font-medium text-gray-900 dark:text-white">
                                    {getDeliverableTitle(deliverable)}
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {deliverable.type} • {deliverable.size || 'Pending'}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMilestoneStatusColor(deliverable.status)}`}>
                                  {t(`common:statusTracking.deliverableStatus.${deliverable.status === 'in_progress' ? 'inProgress' : deliverable.status}`, { defaultValue: deliverable.status.toUpperCase() })}
                                </span>
                                {deliverable.status === 'completed' && (
                                  <Button variant="outline" size="sm">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => handleStatusChange(job.id, 'in_progress')}
                        variant="outline"
                        size="sm"
                      >
                        <Play className="w-4 h-4 me-2" />
                        {t('common:statusTracking.startJob', { defaultValue: 'Start' })}
                      </Button>
                      
                      <Button
                        onClick={() => handleStatusChange(job.id, 'on_hold')}
                        variant="outline"
                        size="sm"
                      >
                        <Pause className="w-4 h-4 me-2" />
                        {t('common:statusTracking.pauseJob', { defaultValue: 'Pause' })}
                      </Button>
                      
                      <Button
                        onClick={() => navigate('/messaging-hub')}
                        variant="outline"
                        size="sm"
                      >
                        <MessageCircle className="w-4 h-4 me-2" />
                        {t('common:statusTracking.message', { defaultValue: 'Message' })}
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => navigate('/file-manager')}
                        variant="outline"
                        size="sm"
                      >
                        <Upload className="w-4 h-4 me-2" />
                        {t('common:statusTracking.upload', { defaultValue: 'Upload' })}
                      </Button>
                      
                      <Button
                        onClick={() => navigate('/job-timeline')}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 me-2" />
                        {t('common:statusTracking.viewDetails', { defaultValue: 'View Details' })}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Job Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {t('common:statusTracking.next', { defaultValue: 'Next' })}: {job.nextMilestoneKey ? t(`common:statusTracking.milestoneTitles.${job.nextMilestoneKey}`, { defaultValue: job.nextMilestoneKey }) : 'N/A'}
                    </span>
                    {job.nextDueDate && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('common:statusTracking.due', { defaultValue: 'Due' })}: {new Date(job.nextDueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleJobSelect(job.id)}
                    variant="outline"
                    size="sm"
                  >
                    {selectedJob === job.id ? t('common:statusTracking.hideDetails', { defaultValue: 'Hide Details' }) : t('common:statusTracking.viewDetails', { defaultValue: 'View Details' })}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Jobs */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('common:statusTracking.noJobsFound', { defaultValue: 'No jobs found' })}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {filterStatus === 'all' 
                ? t('common:statusTracking.noJobsHint', { defaultValue: "You don't have any jobs yet. Create a new job to get started." })
                : t('common:statusTracking.noJobsStatusHint', { defaultValue: `No jobs with status "${filterStatus.replace('_', ' ')}" found.`, status: filterStatus.replace('_', ' ') })
              }
            </p>
            <Button
              onClick={() => navigate('/quick-job-post')}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              {t('common:statusTracking.createNewJob', { defaultValue: 'Create New Job' })}
            </Button>
          </motion.div>
        )}
      </div>
    </PageLayout>
  )
}

export default JobStatusTracking

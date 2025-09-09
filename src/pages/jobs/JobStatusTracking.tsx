import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Play,
  Pause,
  Square,
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
  TrendingDown
} from 'lucide-react'

const JobStatusTracking = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const jobs = [
    {
      id: '1',
      title: 'Office Building Design',
      client: 'Al-Rajhi Construction',
      engineer: 'Ahmed Al-Rashid',
      status: 'in_progress',
      progress: 65,
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      budget: 45000,
      spent: 29250,
      currency: 'SAR',
      location: 'Riyadh, Saudi Arabia',
      description: 'Complete architectural and structural design for modern office building with sustainable features.',
      milestones: [
        {
          id: '1',
          title: 'Initial Design Concept',
          status: 'completed',
          dueDate: '2024-01-22',
          completedDate: '2024-01-20',
          description: 'Create initial design concept and present to client'
        },
        {
          id: '2',
          title: 'Detailed Drawings',
          status: 'in_progress',
          dueDate: '2024-02-05',
          completedDate: null,
          description: 'Develop detailed architectural and structural drawings'
        },
        {
          id: '3',
          title: '3D Modeling',
          status: 'pending',
          dueDate: '2024-02-15',
          completedDate: null,
          description: 'Create 3D models and renderings'
        },
        {
          id: '4',
          title: 'Final Review',
          status: 'pending',
          dueDate: '2024-02-28',
          completedDate: null,
          description: 'Final review and client approval'
        }
      ],
      deliverables: [
        {
          id: '1',
          title: 'Architectural Drawings',
          status: 'completed',
          uploadedAt: '2024-01-20',
          size: '2.4 MB',
          type: 'PDF'
        },
        {
          id: '2',
          title: 'Structural Plans',
          status: 'in_progress',
          uploadedAt: null,
          size: null,
          type: 'DWG'
        },
        {
          id: '3',
          title: '3D Models',
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
          role: 'Lead Engineer',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        },
        {
          id: '2',
          name: 'Sarah Al-Mansouri',
          role: 'Structural Engineer',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        },
        {
          id: '3',
          name: 'Mohammed Al-Zahrani',
          role: 'Project Manager',
          status: 'active',
          avatar: '/api/placeholder/40/40'
        }
      ],
      lastUpdate: '2024-01-25T14:30:00Z',
      nextMilestone: 'Detailed Drawings',
      nextDueDate: '2024-02-05'
    },
    {
      id: '2',
      title: 'Shopping Mall Renovation',
      client: 'Saudi Aramco',
      engineer: 'Sarah Al-Mansouri',
      status: 'completed',
      progress: 100,
      priority: 'medium',
      startDate: '2023-11-01',
      endDate: '2024-01-15',
      budget: 38000,
      spent: 38000,
      currency: 'SAR',
      location: 'Dhahran, Saudi Arabia',
      description: 'Comprehensive renovation and modernization of existing shopping mall.',
      milestones: [
        {
          id: '1',
          title: 'Site Assessment',
          status: 'completed',
          dueDate: '2023-11-08',
          completedDate: '2023-11-06',
          description: 'Complete site assessment and analysis'
        },
        {
          id: '2',
          title: 'Renovation Plans',
          status: 'completed',
          dueDate: '2023-11-22',
          completedDate: '2023-11-20',
          description: 'Develop comprehensive renovation plans'
        },
        {
          id: '3',
          title: 'Implementation',
          status: 'completed',
          dueDate: '2024-01-01',
          completedDate: '2023-12-28',
          description: 'Execute renovation implementation'
        },
        {
          id: '4',
          title: 'Final Inspection',
          status: 'completed',
          dueDate: '2024-01-15',
          completedDate: '2024-01-15',
          description: 'Final inspection and handover'
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
      title: 'Residential Complex Design',
      client: 'NEOM',
      engineer: 'Mohammed Al-Zahrani',
      status: 'pending',
      progress: 0,
      priority: 'low',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      budget: 52000,
      spent: 0,
      currency: 'SAR',
      location: 'Tabuk, Saudi Arabia',
      description: 'Sustainable residential complex design for NEOM smart city.',
      milestones: [
        {
          id: '1',
          title: 'Project Kickoff',
          status: 'pending',
          dueDate: '2024-02-01',
          completedDate: null,
          description: 'Project kickoff meeting and initial planning'
        },
        {
          id: '2',
          title: 'Master Plan',
          status: 'pending',
          dueDate: '2024-02-15',
          completedDate: null,
          description: 'Develop master plan and site layout'
        },
        {
          id: '3',
          title: 'Building Designs',
          status: 'pending',
          dueDate: '2024-03-01',
          completedDate: null,
          description: 'Design individual building units'
        },
        {
          id: '4',
          title: 'Final Review',
          status: 'pending',
          dueDate: '2024-03-15',
          completedDate: null,
          description: 'Final review and client approval'
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
  ]

  const statusOptions = [
    { id: 'all', label: 'All Jobs', count: jobs.length },
    { id: 'pending', label: 'Pending', count: jobs.filter(j => j.status === 'pending').length },
    { id: 'in_progress', label: 'In Progress', count: jobs.filter(j => j.status === 'in_progress').length },
    { id: 'completed', label: 'Completed', count: jobs.filter(j => j.status === 'completed').length },
    { id: 'on_hold', label: 'On Hold', count: jobs.filter(j => j.status === 'on_hold').length }
  ]

  const filteredJobs = jobs.filter(job => 
    filterStatus === 'all' || job.status === filterStatus
  )

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
                Job Status Tracking
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/job-archive')}
                variant="outline"
                size="sm"
              >
                View Archive
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <Button
                key={option.id}
                variant={filterStatus === option.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(option.id)}
                className="mb-2"
              >
                {option.label} ({option.count})
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Jobs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Job Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                        {job.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(job.priority)}`}>
                        {job.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>Client: {job.client}</span>
                      <span>Engineer: {job.engineer}</span>
                      <span>Location: {job.location}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {job.description}
                    </p>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">
                      {job.currency} {job.budget.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Spent: {job.currency} {job.spent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {job.progress}% Complete
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progress
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

                {/* Timeline */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Start: {new Date(job.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>End: {new Date(job.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Last Update: {new Date(job.lastUpdate).toLocaleDateString()}</span>
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
                        Milestones
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
                                  {milestone.title}
                                </h5>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMilestoneStatusColor(milestone.status)}`}>
                                  {milestone.status.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {milestone.description}
                              </p>
                              
                              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                                {milestone.completedDate && (
                                  <span>Completed: {new Date(milestone.completedDate).toLocaleDateString()}</span>
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
                          Team Members
                        </h4>
                        <div className="space-y-3">
                          {job.team.map((member) => (
                            <div key={member.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-3">
                                <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  {member.name}
                                </h5>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {member.role}
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
                          Deliverables
                        </h4>
                        <div className="space-y-3">
                          {job.deliverables.map((deliverable) => (
                            <div key={deliverable.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center">
                                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                  <h5 className="font-medium text-gray-900 dark:text-white">
                                    {deliverable.title}
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {deliverable.type} • {deliverable.size || 'Pending'}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMilestoneStatusColor(deliverable.status)}`}>
                                  {deliverable.status.toUpperCase()}
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
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                      
                      <Button
                        onClick={() => handleStatusChange(job.id, 'on_hold')}
                        variant="outline"
                        size="sm"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                      
                      <Button
                        onClick={() => navigate('/messaging-hub')}
                        variant="outline"
                        size="sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => navigate('/file-manager')}
                        variant="outline"
                        size="sm"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                      
                      <Button
                        onClick={() => navigate('/job-timeline')}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
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
                      Next: {job.nextMilestone || 'N/A'}
                    </span>
                    {job.nextDueDate && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Due: {new Date(job.nextDueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleJobSelect(job.id)}
                    variant="outline"
                    size="sm"
                  >
                    {selectedJob === job.id ? 'Hide Details' : 'View Details'}
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
              No jobs found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {filterStatus === 'all' 
                ? 'You don\'t have any jobs yet. Create a new job to get started.'
                : `No jobs with status "${filterStatus.replace('_', ' ')}" found.`
              }
            </p>
            <Button
              onClick={() => navigate('/quick-job-post')}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              Create New Job
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default JobStatusTracking

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Circle,
  AlertCircle,
  FileText,
  MessageCircle,
  Upload,
  Download
} from 'lucide-react'

const JobTimeline = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const milestones = [
    {
      id: '1',
      title: 'Project Kickoff',
      description: 'Initial meeting and project scope discussion',
      status: 'completed',
      dueDate: '2024-01-15',
      completedDate: '2024-01-15',
      assignee: 'Ahmed Al-Rashid',
      deliverables: ['Project Charter', 'Scope Document', 'Timeline']
    },
    {
      id: '2',
      title: 'Site Survey',
      description: 'Conduct comprehensive site analysis and measurements',
      status: 'in_progress',
      dueDate: '2024-01-25',
      completedDate: null,
      assignee: 'Ahmed Al-Rashid',
      deliverables: ['Site Survey Report', 'Photos', 'Measurements']
    },
    {
      id: '3',
      title: 'Concept Design',
      description: 'Develop initial design concepts and layouts',
      status: 'pending',
      dueDate: '2024-02-05',
      completedDate: null,
      assignee: 'Ahmed Al-Rashid',
      deliverables: ['Concept Drawings', '3D Models', 'Design Options']
    },
    {
      id: '4',
      title: 'Design Review',
      description: 'Client review and feedback on concept design',
      status: 'pending',
      dueDate: '2024-02-10',
      completedDate: null,
      assignee: 'Client',
      deliverables: ['Feedback Document', 'Approval']
    },
    {
      id: '5',
      title: 'Final Design',
      description: 'Incorporate feedback and finalize design',
      status: 'pending',
      dueDate: '2024-02-20',
      completedDate: null,
      assignee: 'Ahmed Al-Rashid',
      deliverables: ['Final Drawings', 'Specifications', 'Cost Estimate']
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'pending':
        return <Circle className="w-5 h-5 text-gray-400" />
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const handleMilestoneAction = async (milestoneId: string, action: string) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Handle milestone action
      console.log(`Action: ${action} for milestone: ${milestoneId}`)
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Project Timeline
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Office Building Design
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Complete architectural design for modern office building with sustainable features.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Started: Jan 15, 2024
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Due: Feb 20, 2024
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  1 of 5 milestones completed
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Engineer</p>
              <p className="font-medium text-gray-900 dark:text-white">Ahmed Al-Rashid</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">SAR 15,000</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start">
                {/* Timeline Icon */}
                <div className="flex-shrink-0 mr-4">
                  {getStatusIcon(milestone.status)}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                    
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(milestone.status)}`}>
                      {milestone.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>Due: {milestone.dueDate}</span>
                    {milestone.completedDate && (
                      <span>Completed: {milestone.completedDate}</span>
                    )}
                    <span>Assignee: {milestone.assignee}</span>
                  </div>
                  
                  {/* Deliverables */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Deliverables
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {milestone.deliverables.map((deliverable, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    {milestone.status === 'in_progress' && (
                      <>
                        <Button
                          onClick={() => handleMilestoneAction(milestone.id, 'complete')}
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark Complete
                        </Button>
                        <Button
                          onClick={() => handleMilestoneAction(milestone.id, 'upload')}
                          variant="outline"
                          size="sm"
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          Upload Files
                        </Button>
                      </>
                    )}
                    
                    {milestone.status === 'completed' && (
                      <Button
                        onClick={() => handleMilestoneAction(milestone.id, 'download')}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download Files
                      </Button>
                    )}
                    
                    {milestone.status === 'pending' && (
                      <Button
                        onClick={() => handleMilestoneAction(milestone.id, 'start')}
                        variant="outline"
                        size="sm"
                      >
                        Start Work
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Project Progress
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Overall Progress</span>
                <span>20%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-brand-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">1</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">3</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default JobTimeline

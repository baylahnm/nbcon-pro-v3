import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  MessageCircle,
  FileText,
  Video,
  Phone,
  Download,
  Eye,
  Trash2,
  Archive,
  MoreVertical,
  Settings,
  Bell,
  BellOff,
  RefreshCw,
  MarkAsRead,
  MarkAllRead
} from 'lucide-react'

const NotificationCenter = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)

  const filterTypes = [
    { id: 'all', label: 'All Notifications', count: 0 },
    { id: 'unread', label: 'Unread', count: 0 },
    { id: 'urgent', label: 'Urgent', count: 0 },
    { id: 'project', label: 'Project Updates', count: 0 },
    { id: 'message', label: 'Messages', count: 0 },
    { id: 'system', label: 'System', count: 0 }
  ]

  const notifications = [
    {
      id: '1',
      title: 'New Quote Received',
      message: 'Ahmed Al-Rashid has submitted a quote for your office building project.',
      type: 'quote',
      priority: 'high',
      isRead: false,
      createdAt: '2024-01-25T14:30:00Z',
      project: 'Office Building Design',
      sender: 'Ahmed Al-Rashid',
      actionUrl: '/quote-comparison'
    },
    {
      id: '2',
      title: 'Project Milestone Completed',
      message: 'Structural analysis milestone has been completed for the shopping mall renovation.',
      type: 'milestone',
      priority: 'medium',
      isRead: false,
      createdAt: '2024-01-25T12:15:00Z',
      project: 'Shopping Mall Renovation',
      sender: 'Sarah Al-Mansouri',
      actionUrl: '/job-status-tracking'
    },
    {
      id: '3',
      title: 'New Message',
      message: 'You have a new message from Mohammed Al-Zahrani about the residential complex project.',
      type: 'message',
      priority: 'low',
      isRead: true,
      createdAt: '2024-01-25T10:45:00Z',
      project: 'Residential Complex Design',
      sender: 'Mohammed Al-Zahrani',
      actionUrl: '/messaging-hub'
    },
    {
      id: '4',
      title: 'Emergency Response Required',
      message: 'Urgent structural issue reported for the hospital HVAC system project.',
      type: 'emergency',
      priority: 'urgent',
      isRead: false,
      createdAt: '2024-01-25T09:20:00Z',
      project: 'Hospital HVAC System',
      sender: 'Fatima Al-Shehri',
      actionUrl: '/emergency-job-request'
    },
    {
      id: '5',
      title: 'File Uploaded',
      message: 'New design files have been uploaded to the industrial plant inspection project.',
      type: 'file',
      priority: 'low',
      isRead: true,
      createdAt: '2024-01-24T16:20:00Z',
      project: 'Industrial Plant Inspection',
      sender: 'Khalid Al-Otaibi',
      actionUrl: '/file-manager'
    },
    {
      id: '6',
      title: 'Video Call Scheduled',
      message: 'A video call has been scheduled for tomorrow at 2 PM for the office building project.',
      type: 'meeting',
      priority: 'medium',
      isRead: false,
      createdAt: '2024-01-24T14:10:00Z',
      project: 'Office Building Design',
      sender: 'System',
      actionUrl: '/video-calls'
    }
  ]

  // Update filter counts
  filterTypes.forEach(filter => {
    filter.count = notifications.filter(notification => 
      filter.id === 'all' || 
      (filter.id === 'unread' && !notification.isRead) ||
      (filter.id === 'urgent' && notification.priority === 'urgent') ||
      (filter.id === 'project' && notification.type === 'milestone') ||
      (filter.id === 'message' && notification.type === 'message') ||
      (filter.id === 'system' && notification.sender === 'System')
    ).length
  })

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.project.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterType === 'all' || 
      (filterType === 'unread' && !notification.isRead) ||
      (filterType === 'urgent' && notification.priority === 'urgent') ||
      (filterType === 'project' && notification.type === 'milestone') ||
      (filterType === 'message' && notification.type === 'message') ||
      (filterType === 'system' && notification.sender === 'System')
    
    return matchesSearch && matchesFilter
  })

  const handleNotificationSelect = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId) 
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    )
  }

  const handleNotificationAction = (notificationId: string, action: string) => {
    console.log('Notification action:', action, notificationId)
  }

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, selectedNotifications)
  }

  const handleMarkAsRead = (notificationId: string) => {
    console.log('Mark as read:', notificationId)
  }

  const handleMarkAllRead = () => {
    console.log('Mark all as read')
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'high':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return FileText
      case 'milestone':
        return CheckCircle
      case 'message':
        return MessageCircle
      case 'emergency':
        return AlertCircle
      case 'file':
        return Download
      case 'meeting':
        return Video
      default:
        return Bell
    }
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
                Notifications
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleMarkAllRead}
                variant="outline"
                size="sm"
              >
                <MarkAllRead className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              
              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                size="sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterTypes.map((filter) => (
              <Button
                key={filter.id}
                variant={filterType === filter.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType(filter.id)}
                className="mb-2"
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Bulk Actions */}
        {selectedNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {selectedNotifications.length} notifications selected
              </span>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleBulkAction('mark-read')}
                  variant="outline"
                  size="sm"
                >
                  <MarkAsRead className="w-4 h-4 mr-2" />
                  Mark as Read
                </Button>
                
                <Button
                  onClick={() => handleBulkAction('archive')}
                  variant="outline"
                  size="sm"
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                
                <Button
                  onClick={() => handleBulkAction('delete')}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          {filteredNotifications.map((notification, index) => {
            const TypeIcon = getTypeIcon(notification.type)
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${
                  selectedNotifications.includes(notification.id)
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } ${!notification.isRead ? 'border-l-4 border-l-brand-500' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => handleNotificationSelect(notification.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                        selectedNotifications.includes(notification.id)
                          ? 'border-brand-500 bg-brand-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 hover:border-brand-500'
                      }`}
                    >
                      {selectedNotifications.includes(notification.id) && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <TypeIcon className="w-5 h-5 text-gray-400" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}>
                            {notification.priority.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatTime(notification.createdAt)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>Project: {notification.project}</span>
                          <span>From: {notification.sender}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <Button
                              onClick={() => handleMarkAsRead(notification.id)}
                              variant="outline"
                              size="sm"
                            >
                              <MarkAsRead className="w-4 h-4 mr-1" />
                              Mark Read
                            </Button>
                          )}
                          
                          <Button
                            onClick={() => handleNotificationAction(notification.id, 'view')}
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          
                          <Button
                            onClick={() => handleNotificationAction(notification.id, 'more')}
                            variant="outline"
                            size="sm"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* No Notifications */}
        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No notifications found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You're all caught up! New notifications will appear here.
            </p>
            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
            >
              <Settings className="w-4 h-4 mr-2" />
              Notification Settings
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default NotificationCenter

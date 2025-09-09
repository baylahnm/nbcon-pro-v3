import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  DollarSign,
  Users,
  FileText,
  Download,
  Eye,
  Archive,
  Trash2,
  RefreshCw,
  SortAsc,
  SortDesc,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star
} from 'lucide-react'

const JobArchive = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    budget: 'all',
    engineer: 'all',
    client: 'all'
  })
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [viewMode, setViewMode] = useState('grid') // grid or list

  const statusOptions = [
    { id: 'all', label: 'All Status', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
    { id: 'cancelled', label: 'Cancelled', count: 0 },
    { id: 'expired', label: 'Expired', count: 0 },
    { id: 'disputed', label: 'Disputed', count: 0 }
  ]

  const dateRangeOptions = [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' }
  ]

  const budgetRanges = [
    { id: 'all', label: 'All Budgets' },
    { id: 'under-5k', label: 'Under SAR 5,000' },
    { id: '5k-10k', label: 'SAR 5,000 - 10,000' },
    { id: '10k-25k', label: 'SAR 10,000 - 25,000' },
    { id: '25k-50k', label: 'SAR 25,000 - 50,000' },
    { id: 'over-50k', label: 'Over SAR 50,000' }
  ]

  const sortOptions = [
    { id: 'date', label: 'Date' },
    { id: 'title', label: 'Title' },
    { id: 'budget', label: 'Budget' },
    { id: 'status', label: 'Status' },
    { id: 'engineer', label: 'Engineer' },
    { id: 'client', label: 'Client' }
  ]

  const archivedJobs = [
    {
      id: '1',
      title: 'Office Building Design',
      client: 'Al-Rajhi Construction',
      engineer: 'Ahmed Al-Rashid',
      status: 'completed',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      completedDate: '2024-02-25',
      budget: 45000,
      spent: 45000,
      currency: 'SAR',
      location: 'Riyadh, Saudi Arabia',
      description: 'Complete architectural and structural design for modern office building with sustainable features.',
      rating: 4.9,
      review: 'Excellent work! Delivered on time and exceeded expectations.',
      duration: '6 weeks',
      milestones: 4,
      completedMilestones: 4,
      deliverables: 8,
      team: ['Ahmed Al-Rashid', 'Sarah Al-Mansouri', 'Mohammed Al-Zahrani'],
      tags: ['Architecture', 'Structural', 'Commercial', 'Sustainable'],
      lastActivity: '2024-02-25T16:30:00Z',
      archivedAt: '2024-03-01T10:00:00Z'
    },
    {
      id: '2',
      title: 'Shopping Mall Renovation',
      client: 'Saudi Aramco',
      engineer: 'Sarah Al-Mansouri',
      status: 'completed',
      priority: 'medium',
      startDate: '2023-11-01',
      endDate: '2024-01-15',
      completedDate: '2024-01-15',
      budget: 38000,
      spent: 38000,
      currency: 'SAR',
      location: 'Dhahran, Saudi Arabia',
      description: 'Comprehensive renovation and modernization of existing shopping mall.',
      rating: 4.8,
      review: 'Professional service with great attention to detail.',
      duration: '10 weeks',
      milestones: 4,
      completedMilestones: 4,
      deliverables: 6,
      team: ['Sarah Al-Mansouri', 'Khalid Al-Otaibi'],
      tags: ['Renovation', 'Commercial', 'Modernization'],
      lastActivity: '2024-01-15T14:45:00Z',
      archivedAt: '2024-01-20T09:00:00Z'
    },
    {
      id: '3',
      title: 'Residential Complex Design',
      client: 'NEOM',
      engineer: 'Mohammed Al-Zahrani',
      status: 'cancelled',
      priority: 'low',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      completedDate: null,
      budget: 52000,
      spent: 15000,
      currency: 'SAR',
      location: 'Tabuk, Saudi Arabia',
      description: 'Sustainable residential complex design for NEOM smart city.',
      rating: null,
      review: null,
      duration: '6 weeks',
      milestones: 4,
      completedMilestones: 1,
      deliverables: 2,
      team: ['Mohammed Al-Zahrani', 'Fatima Al-Shehri'],
      tags: ['Residential', 'Sustainable', 'Smart City'],
      lastActivity: '2024-02-15T11:20:00Z',
      archivedAt: '2024-02-20T08:30:00Z',
      cancellationReason: 'Client changed project requirements'
    },
    {
      id: '4',
      title: 'Industrial Plant Inspection',
      client: 'SABIC',
      engineer: 'Fatima Al-Shehri',
      status: 'expired',
      priority: 'high',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      completedDate: null,
      budget: 25000,
      spent: 8000,
      currency: 'SAR',
      location: 'Jubail, Saudi Arabia',
      description: 'Comprehensive safety inspection of industrial plant facilities.',
      rating: null,
      review: null,
      duration: '4 weeks',
      milestones: 3,
      completedMilestones: 1,
      deliverables: 1,
      team: ['Fatima Al-Shehri', 'Ahmed Al-Rashid'],
      tags: ['Industrial', 'Safety', 'Inspection'],
      lastActivity: '2023-12-15T09:30:00Z',
      archivedAt: '2024-01-05T12:00:00Z',
      expiryReason: 'Project timeline exceeded without completion'
    },
    {
      id: '5',
      title: 'Hospital HVAC System',
      client: 'King Fahd Hospital',
      engineer: 'Khalid Al-Otaibi',
      status: 'disputed',
      priority: 'high',
      startDate: '2023-10-01',
      endDate: '2023-12-15',
      completedDate: '2023-12-10',
      budget: 35000,
      spent: 35000,
      currency: 'SAR',
      location: 'Riyadh, Saudi Arabia',
      description: 'HVAC system design and installation for new hospital wing.',
      rating: 3.2,
      review: 'Some issues with installation quality and timeline delays.',
      duration: '10 weeks',
      milestones: 5,
      completedMilestones: 5,
      deliverables: 7,
      team: ['Khalid Al-Otaibi', 'Sarah Al-Mansouri'],
      tags: ['HVAC', 'Healthcare', 'Installation'],
      lastActivity: '2024-01-10T14:15:00Z',
      archivedAt: '2024-01-15T10:30:00Z',
      disputeReason: 'Quality concerns and warranty issues'
    }
  ]

  // Update counts
  statusOptions.forEach(option => {
    option.count = archivedJobs.filter(job => 
      option.id === 'all' || job.status === option.id
    ).length
  })

  const filteredJobs = archivedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.engineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filters.status === 'all' || job.status === filters.status
    const matchesBudget = filters.budget === 'all' || 
      (filters.budget === 'under-5k' && job.budget < 5000) ||
      (filters.budget === '5k-10k' && job.budget >= 5000 && job.budget <= 10000) ||
      (filters.budget === '10k-25k' && job.budget >= 10000 && job.budget <= 25000) ||
      (filters.budget === '25k-50k' && job.budget >= 25000 && job.budget <= 50000) ||
      (filters.budget === 'over-50k' && job.budget > 50000)
    
    return matchesSearch && matchesStatus && matchesBudget
  })

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.archivedAt).getTime()
        bValue = new Date(b.archivedAt).getTime()
        break
      case 'title':
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case 'budget':
        aValue = a.budget
        bValue = b.budget
        break
      case 'status':
        aValue = a.status
        bValue = b.status
        break
      case 'engineer':
        aValue = a.engineer.toLowerCase()
        bValue = b.engineer.toLowerCase()
        break
      case 'client':
        aValue = a.client.toLowerCase()
        bValue = b.client.toLowerCase()
        break
      default:
        return 0
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleJobSelect = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const handleSelectAll = () => {
    if (selectedJobs.length === sortedJobs.length) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(sortedJobs.map(job => job.id))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, selectedJobs)
  }

  const handleJobAction = (jobId: string, action: string) => {
    console.log('Job action:', action, jobId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'expired':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'disputed':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'cancelled':
        return XCircle
      case 'expired':
        return Clock
      case 'disputed':
        return AlertCircle
      default:
        return Clock
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
                Job Archive & History
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/job-status-tracking')}
                variant="outline"
                size="sm"
              >
                Active Jobs
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search archived jobs..."
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
                    Sort by {option.label}
                  </option>
                ))}
              </select>
              
              <Button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                variant="outline"
                size="sm"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {statusOptions.map((option) => (
              <Button
                key={option.id}
                variant={filters.status === option.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, status: option.id }))}
                className="mb-2"
              >
                {option.label} ({option.count})
              </Button>
            ))}
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filters.budget}
              onChange={(e) => setFilters(prev => ({ ...prev, budget: e.target.value }))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              {budgetRanges.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                  viewMode === 'grid'
                    ? 'bg-brand-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                  viewMode === 'list'
                    ? 'bg-brand-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bulk Actions */}
        {selectedJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {selectedJobs.length} jobs selected
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleBulkAction('download')}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                
                <Button
                  onClick={() => handleBulkAction('restore')}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Restore
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

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {sortedJobs.length} archived jobs
            </p>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleSelectAll}
                variant="outline"
                size="sm"
              >
                {selectedJobs.length === sortedJobs.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Jobs Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'space-y-4'
          }
        >
          {sortedJobs.map((job, index) => {
            const StatusIcon = getStatusIcon(job.status)
            
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${
                  selectedJobs.includes(job.id)
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {job.status.toUpperCase()}
                        </span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(job.priority)}`}>
                          {job.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Client: {job.client}</span>
                        <span>Engineer: {job.engineer}</span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mb-1">
                        {job.currency} {job.budget.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Spent: {job.currency} {job.spent.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Duration: {job.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Team: {job.team.length}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>Deliverables: {job.deliverables}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Archived: {new Date(job.archivedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Progress
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {job.completedMilestones}/{job.milestones} milestones
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-brand-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(job.completedMilestones / job.milestones) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Rating */}
                  {job.rating && (
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(job.rating!)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {job.rating}/5.0
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleJobSelect(job.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedJobs.includes(job.id)
                            ? 'border-brand-500 bg-brand-500 text-white'
                            : 'border-gray-300 dark:border-gray-600 hover:border-brand-500'
                        }`}
                      >
                        {selectedJobs.includes(job.id) && (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleJobAction(job.id, 'view')}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleJobAction(job.id, 'download')}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleJobAction(job.id, 'restore')}
                        variant="outline"
                        size="sm"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* No Results */}
        {sortedJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Archive className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No archived jobs found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setFilters({
                  status: 'all',
                  dateRange: 'all',
                  budget: 'all',
                  engineer: 'all',
                  client: 'all'
                })
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

export default JobArchive

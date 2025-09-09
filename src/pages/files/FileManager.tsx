import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Share,
  Copy,
  Move,
  Folder,
  File,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  MoreVertical,
  Grid,
  List,
  SortAsc,
  SortDesc,
  RefreshCw,
  Plus,
  Star,
  Lock,
  Unlock,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  Tag,
  FolderPlus,
  FilePlus
} from 'lucide-react'

const FileManager = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filterType, setFilterType] = useState('all')
  const [currentFolder, setCurrentFolder] = useState('root')
  const [showUpload, setShowUpload] = useState(false)
  const [showCreateFolder, setShowCreateFolder] = useState(false)

  const folders = [
    {
      id: '1',
      name: 'Project Documents',
      type: 'folder',
      size: '125 MB',
      modified: '2024-01-25T14:30:00Z',
      created: '2024-01-15T10:00:00Z',
      owner: 'Ahmed Al-Rashid',
      permissions: 'read-write',
      isStarred: true,
      isLocked: false,
      children: 8,
      path: '/Project Documents'
    },
    {
      id: '2',
      name: 'Design Files',
      type: 'folder',
      size: '2.1 GB',
      modified: '2024-01-24T16:45:00Z',
      created: '2024-01-10T09:00:00Z',
      owner: 'Sarah Al-Mansouri',
      permissions: 'read-write',
      isStarred: false,
      isLocked: false,
      children: 15,
      path: '/Design Files'
    },
    {
      id: '3',
      name: 'Meeting Recordings',
      type: 'folder',
      size: '850 MB',
      modified: '2024-01-23T11:20:00Z',
      created: '2024-01-20T14:00:00Z',
      owner: 'Mohammed Al-Zahrani',
      permissions: 'read-only',
      isStarred: false,
      isLocked: true,
      children: 5,
      path: '/Meeting Recordings'
    }
  ]

  const files = [
    {
      id: '1',
      name: 'Structural_Analysis_Report.pdf',
      type: 'file',
      fileType: 'pdf',
      size: '2.4 MB',
      modified: '2024-01-25T14:30:00Z',
      created: '2024-01-20T10:00:00Z',
      owner: 'Ahmed Al-Rashid',
      permissions: 'read-write',
      isStarred: true,
      isLocked: false,
      version: '2.1',
      downloads: 15,
      path: '/Project Documents/Structural_Analysis_Report.pdf',
      tags: ['structural', 'analysis', 'report'],
      description: 'Comprehensive structural analysis report for office building project'
    },
    {
      id: '2',
      name: 'Foundation_Plans.dwg',
      type: 'file',
      fileType: 'dwg',
      size: '1.8 MB',
      modified: '2024-01-24T16:45:00Z',
      created: '2024-01-22T14:00:00Z',
      owner: 'Sarah Al-Mansouri',
      permissions: 'read-write',
      isStarred: false,
      isLocked: false,
      version: '1.3',
      downloads: 8,
      path: '/Design Files/Foundation_Plans.dwg',
      tags: ['foundation', 'plans', 'dwg'],
      description: 'Detailed foundation plans and specifications'
    },
    {
      id: '3',
      name: '3D_Model_Office_Building.rvt',
      type: 'file',
      fileType: 'rvt',
      size: '45.2 MB',
      modified: '2024-01-23T11:20:00Z',
      created: '2024-01-18T09:00:00Z',
      owner: 'Mohammed Al-Zahrani',
      permissions: 'read-only',
      isStarred: true,
      isLocked: true,
      version: '3.0',
      downloads: 23,
      path: '/Design Files/3D_Model_Office_Building.rvt',
      tags: ['3d', 'model', 'revit', 'building'],
      description: 'Complete 3D Revit model of the office building'
    },
    {
      id: '4',
      name: 'Project_Meeting_2024-01-24.mp4',
      type: 'file',
      fileType: 'mp4',
      size: '125 MB',
      modified: '2024-01-24T15:30:00Z',
      created: '2024-01-24T15:30:00Z',
      owner: 'Khalid Al-Otaibi',
      permissions: 'read-only',
      isStarred: false,
      isLocked: false,
      version: '1.0',
      downloads: 5,
      path: '/Meeting Recordings/Project_Meeting_2024-01-24.mp4',
      tags: ['meeting', 'recording', 'project'],
      description: 'Weekly project progress meeting recording'
    },
    {
      id: '5',
      name: 'Cost_Estimate_Spreadsheet.xlsx',
      type: 'file',
      fileType: 'xlsx',
      size: '850 KB',
      modified: '2024-01-23T09:15:00Z',
      created: '2024-01-20T16:00:00Z',
      owner: 'Fatima Al-Shehri',
      permissions: 'read-write',
      isStarred: false,
      isLocked: false,
      version: '2.4',
      downloads: 12,
      path: '/Project Documents/Cost_Estimate_Spreadsheet.xlsx',
      tags: ['cost', 'estimate', 'spreadsheet', 'budget'],
      description: 'Detailed cost estimation and budget breakdown'
    },
    {
      id: '6',
      name: 'Site_Photos_Collection.zip',
      type: 'file',
      fileType: 'zip',
      size: '15.7 MB',
      modified: '2024-01-22T12:00:00Z',
      created: '2024-01-22T12:00:00Z',
      owner: 'Ahmed Al-Rashid',
      permissions: 'read-write',
      isStarred: false,
      isLocked: false,
      version: '1.0',
      downloads: 3,
      path: '/Project Documents/Site_Photos_Collection.zip',
      tags: ['photos', 'site', 'collection', 'images'],
      description: 'Collection of site photos and progress images'
    }
  ]

  const allItems = [...folders, ...files]

  const fileTypeOptions = [
    { id: 'all', label: 'All Files', count: allItems.length },
    { id: 'folder', label: 'Folders', count: folders.length },
    { id: 'pdf', label: 'PDF', count: files.filter(f => f.fileType === 'pdf').length },
    { id: 'dwg', label: 'DWG', count: files.filter(f => f.fileType === 'dwg').length },
    { id: 'rvt', label: 'RVT', count: files.filter(f => f.fileType === 'rvt').length },
    { id: 'mp4', label: 'Video', count: files.filter(f => f.fileType === 'mp4').length },
    { id: 'xlsx', label: 'Excel', count: files.filter(f => f.fileType === 'xlsx').length },
    { id: 'zip', label: 'Archive', count: files.filter(f => f.fileType === 'zip').length }
  ]

  const sortOptions = [
    { id: 'name', label: 'Name' },
    { id: 'size', label: 'Size' },
    { id: 'modified', label: 'Modified' },
    { id: 'type', label: 'Type' },
    { id: 'owner', label: 'Owner' }
  ]

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    
    const matchesType = filterType === 'all' || 
                       (filterType === 'folder' && item.type === 'folder') ||
                       (filterType !== 'folder' && item.type === 'file' && item.fileType === filterType)
    
    return matchesSearch && matchesType
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'size':
        aValue = parseFloat(a.size.replace(/[^\d.]/g, ''))
        bValue = parseFloat(b.size.replace(/[^\d.]/g, ''))
        break
      case 'modified':
        aValue = new Date(a.modified).getTime()
        bValue = new Date(b.modified).getTime()
        break
      case 'type':
        aValue = a.type === 'folder' ? 'folder' : a.fileType || 'file'
        bValue = b.type === 'folder' ? 'folder' : b.fileType || 'file'
        break
      case 'owner':
        aValue = a.owner.toLowerCase()
        bValue = b.owner.toLowerCase()
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

  const handleItemSelect = (itemId: string) => {
    setSelectedFiles(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === sortedItems.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(sortedItems.map(item => item.id))
    }
  }

  const handleItemAction = (itemId: string, action: string) => {
    console.log('Item action:', action, itemId)
  }

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, selectedFiles)
  }

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId)
  }

  const getFileIcon = (item: any) => {
    if (item.type === 'folder') {
      return Folder
    }
    
    switch (item.fileType) {
      case 'pdf':
        return FileText
      case 'dwg':
        return File
      case 'rvt':
        return File
      case 'mp4':
        return Video
      case 'xlsx':
        return FileText
      case 'zip':
        return Archive
      default:
        return File
    }
  }

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'dwg':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'rvt':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'mp4':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'xlsx':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'zip':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const formatFileSize = (size: string) => {
    return size
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
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
                File Manager
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowCreateFolder(true)}
                variant="outline"
                size="sm"
              >
                <FolderPlus className="w-4 h-4 mr-2" />
                New Folder
              </Button>
              
              <Button
                onClick={() => setShowUpload(true)}
                size="sm"
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
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
                placeholder="Search files and folders..."
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
            {fileTypeOptions.map((option) => (
              <Button
                key={option.id}
                variant={filterType === option.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType(option.id)}
                className="mb-2"
              >
                {option.label} ({option.count})
              </Button>
            ))}
          </div>

          {/* View Mode and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                    viewMode === 'grid'
                      ? 'bg-brand-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                    viewMode === 'list'
                      ? 'bg-brand-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleSelectAll}
                variant="outline"
                size="sm"
              >
                {selectedFiles.length === sortedItems.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bulk Actions */}
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {selectedFiles.length} items selected
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
                  onClick={() => handleBulkAction('move')}
                  variant="outline"
                  size="sm"
                >
                  <Move className="w-4 h-4 mr-2" />
                  Move
                </Button>
                
                <Button
                  onClick={() => handleBulkAction('copy')}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
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

        {/* Files Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-2'
          }
        >
          {sortedItems.map((item, index) => {
            const Icon = getFileIcon(item)
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${
                  selectedFiles.includes(item.id)
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {viewMode === 'grid' ? (
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center mr-3">
                          <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {item.type === 'folder' ? 'Folder' : item.fileType?.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {item.isStarred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        {item.isLocked && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        <button
                          onClick={() => handleItemSelect(item.id)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedFiles.includes(item.id)
                              ? 'border-brand-500 bg-brand-500 text-white'
                              : 'border-gray-300 dark:border-gray-600 hover:border-brand-500'
                          }`}
                        >
                          {selectedFiles.includes(item.id) && (
                            <CheckCircle className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span>{item.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modified:</span>
                        <span>{formatDate(item.modified)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Owner:</span>
                        <span className="truncate ml-2">{item.owner}</span>
                      </div>
                      {item.type === 'file' && item.version && (
                        <div className="flex justify-between">
                          <span>Version:</span>
                          <span>{item.version}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleItemAction(item.id, 'view')}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleItemAction(item.id, 'download')}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleItemAction(item.id, 'more')}
                        variant="outline"
                        size="sm"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex items-center space-x-4">
                    <button
                      onClick={() => handleItemSelect(item.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedFiles.includes(item.id)
                          ? 'border-brand-500 bg-brand-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 hover:border-brand-500'
                      }`}
                    >
                      {selectedFiles.includes(item.id) && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                    </button>
                    
                    <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h3>
                        {item.isStarred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        {item.isLocked && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {item.type === 'folder' ? 'Folder' : item.fileType?.toUpperCase()} • {item.size} • {formatDate(item.modified)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleItemAction(item.id, 'view')}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleItemAction(item.id, 'download')}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleItemAction(item.id, 'more')}
                        variant="outline"
                        size="sm"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* No Files */}
        {sortedItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <File className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No files found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search criteria or upload some files.
            </p>
            <Button
              onClick={() => setShowUpload(true)}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default FileManager

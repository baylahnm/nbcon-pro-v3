import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square,
  Download,
  Share,
  Edit,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  Plus,
  Clock,
  FileText,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertCircle,
  Star,
  Tag,
  Calendar,
  User,
  MessageCircle,
  Send,
  Copy,
  Flag,
  Archive,
  Bookmark,
  BookmarkCheck,
  Headphones,
  Activity,
  Bolt,
  Shield
} from 'lucide-react'

const VoiceNotes = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentRecording, setCurrentRecording] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [showTranscription, setShowTranscription] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [showNewNote, setShowNewNote] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [isOnline, setIsOnline] = useState(true)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const languages = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'ar', name: 'العربية', flag: '🇸🇦' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'zh', name: '中文', flag: '🇨🇳' }
  ]

  const filterTypes = [
    { id: 'all', label: 'All Notes', count: 0 },
    { id: 'recent', label: 'Recent', count: 0 },
    { id: 'transcribed', label: 'Transcribed', count: 0 },
    { id: 'favorites', label: 'Favorites', count: 0 },
    { id: 'archived', label: 'Archived', count: 0 }
  ]

  const sortOptions = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'duration', label: 'Duration' },
    { id: 'name', label: 'Name' },
    { id: 'size', label: 'Size' }
  ]

  const voiceNotes = [
    {
      id: '1',
      title: 'Project Meeting Notes',
      description: 'Weekly project progress meeting with team',
      duration: '00:15:30',
      size: '2.4 MB',
      createdAt: '2024-01-25T14:30:00Z',
      updatedAt: '2024-01-25T14:30:00Z',
      author: 'Ahmed Al-Rashid',
      project: 'Office Building Design',
      language: 'ar',
      isTranscribed: true,
      isFavorite: true,
      isArchived: false,
      transcription: 'مرحباً جميعاً، اليوم سنناقش التقدم في مشروع المبنى المكتبي. لقد أكملنا 65% من العمل الإنشائي...',
      translatedTranscription: 'Hello everyone, today we will discuss the progress on the office building project. We have completed 65% of the structural work...',
      tags: ['meeting', 'project', 'progress'],
      audioUrl: '/api/audio/project-meeting-notes.mp3',
      waveform: [0.2, 0.8, 0.5, 0.9, 0.3, 0.7, 0.6, 0.4, 0.8, 0.2, 0.9, 0.5, 0.3, 0.7, 0.6, 0.4, 0.8, 0.2, 0.9, 0.5],
      quality: 'high',
      isVerified: true,
      isPremium: false
    },
    {
      id: '2',
      title: 'Structural Analysis Discussion',
      description: 'Discussion about structural analysis methods',
      duration: '00:08:45',
      size: '1.2 MB',
      createdAt: '2024-01-24T16:20:00Z',
      updatedAt: '2024-01-24T16:20:00Z',
      author: 'Sarah Al-Mansouri',
      project: 'Shopping Mall Renovation',
      language: 'en',
      isTranscribed: true,
      isFavorite: false,
      isArchived: false,
      transcription: 'I want to discuss the structural analysis methods we should use for this project. The load calculations are critical...',
      translatedTranscription: 'أريد مناقشة طرق التحليل الإنشائي التي يجب أن نستخدمها في هذا المشروع. حسابات الأحمال حرجة...',
      tags: ['technical', 'structural', 'analysis'],
      audioUrl: '/api/audio/structural-analysis-discussion.mp3',
      waveform: [0.3, 0.6, 0.4, 0.8, 0.2, 0.7, 0.5, 0.9, 0.3, 0.6, 0.4, 0.8, 0.2, 0.7, 0.5, 0.9, 0.3, 0.6, 0.4, 0.8],
      quality: 'high',
      isVerified: true,
      isPremium: true
    },
    {
      id: '3',
      title: 'Client Feedback Session',
      description: 'Client feedback on design proposals',
      duration: '00:22:15',
      size: '3.1 MB',
      createdAt: '2024-01-23T11:45:00Z',
      updatedAt: '2024-01-23T11:45:00Z',
      author: 'Mohammed Al-Zahrani',
      project: 'Residential Complex Design',
      language: 'ar',
      isTranscribed: false,
      isFavorite: false,
      isArchived: false,
      transcription: null,
      translatedTranscription: null,
      tags: ['client', 'feedback', 'design'],
      audioUrl: '/api/audio/client-feedback-session.mp3',
      waveform: [0.4, 0.7, 0.3, 0.9, 0.2, 0.8, 0.5, 0.6, 0.4, 0.7, 0.3, 0.9, 0.2, 0.8, 0.5, 0.6, 0.4, 0.7, 0.3, 0.9],
      quality: 'medium',
      isVerified: true,
      isPremium: false
    },
    {
      id: '4',
      title: 'Emergency Response Notes',
      description: 'Emergency response discussion for structural issue',
      duration: '00:05:20',
      size: '0.8 MB',
      createdAt: '2024-01-22T09:30:00Z',
      updatedAt: '2024-01-22T09:30:00Z',
      author: 'Fatima Al-Shehri',
      project: 'Hospital HVAC System',
      language: 'en',
      isTranscribed: true,
      isFavorite: true,
      isArchived: false,
      transcription: 'We have a structural issue that needs immediate attention. The foundation has some cracks that need to be addressed...',
      translatedTranscription: 'لدينا مشكلة إنشائية تحتاج إلى اهتمام فوري. الأساس به بعض الشقوق التي تحتاج إلى معالجة...',
      tags: ['emergency', 'structural', 'urgent'],
      audioUrl: '/api/audio/emergency-response-notes.mp3',
      waveform: [0.6, 0.9, 0.4, 0.7, 0.3, 0.8, 0.5, 0.6, 0.9, 0.4, 0.7, 0.3, 0.8, 0.5, 0.6, 0.9, 0.4, 0.7, 0.3, 0.8],
      quality: 'high',
      isVerified: true,
      isPremium: false
    },
    {
      id: '5',
      title: 'Team Standup Meeting',
      description: 'Daily standup meeting with development team',
      duration: '00:12:10',
      size: '1.8 MB',
      createdAt: '2024-01-21T10:00:00Z',
      updatedAt: '2024-01-21T10:00:00Z',
      author: 'Khalid Al-Otaibi',
      project: 'Industrial Plant Inspection',
      language: 'en',
      isTranscribed: true,
      isFavorite: false,
      isArchived: true,
      transcription: 'Good morning team. Let\'s go through what we accomplished yesterday and what we plan to do today...',
      translatedTranscription: 'صباح الخير فريق. دعنا نراجع ما أنجزناه أمس وما نخطط للقيام به اليوم...',
      tags: ['standup', 'team', 'daily'],
      audioUrl: '/api/audio/team-standup-meeting.mp3',
      waveform: [0.3, 0.5, 0.7, 0.4, 0.8, 0.2, 0.6, 0.9, 0.3, 0.5, 0.7, 0.4, 0.8, 0.2, 0.6, 0.9, 0.3, 0.5, 0.7, 0.4],
      quality: 'medium',
      isVerified: true,
      isPremium: false
    }
  ]

  // Update filter counts
  filterTypes.forEach(filter => {
    filter.count = voiceNotes.filter(note => 
      filter.id === 'all' || 
      (filter.id === 'recent' && new Date(note.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000) ||
      (filter.id === 'transcribed' && note.isTranscribed) ||
      (filter.id === 'favorites' && note.isFavorite) ||
      (filter.id === 'archived' && note.isArchived)
    ).length
  })

  const filteredNotes = voiceNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = filterType === 'all' || 
      (filterType === 'recent' && new Date(note.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000) ||
      (filterType === 'transcribed' && note.isTranscribed) ||
      (filterType === 'favorites' && note.isFavorite) ||
      (filterType === 'archived' && note.isArchived)
    
    return matchesSearch && matchesFilter
  })

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'duration':
        return parseFloat(b.duration.replace(':', '.')) - parseFloat(a.duration.replace(':', '.'))
      case 'name':
        return a.title.localeCompare(b.title)
      case 'size':
        return parseFloat(b.size.replace(/[^\d.]/g, '')) - parseFloat(a.size.replace(/[^\d.]/g, ''))
      default:
        return 0
    }
  })

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop())
        setIsRecording(false)
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current)
        }
      }
    } catch (err) {
      console.error('Error starting recording:', err)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
    }
  }

  const handlePlayPause = (noteId: string) => {
    if (currentRecording === noteId) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentRecording(noteId)
      setIsPlaying(true)
    }
  }

  const handleNoteSelect = (noteId: string) => {
    setSelectedNotes(prev => 
      prev.includes(noteId) 
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId]
    )
  }

  const handleNoteAction = (noteId: string, action: string) => {
    console.log('Note action:', action, noteId)
  }

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, selectedNotes)
  }

  const handleTranscribe = (noteId: string) => {
    setIsTranscribing(true)
    // Simulate transcription
    setTimeout(() => {
      setIsTranscribing(false)
      setShowTranscription(true)
    }, 3000)
  }

  const handleFavoriteToggle = (noteId: string) => {
    console.log('Toggle favorite:', noteId)
  }

  const handleArchiveToggle = (noteId: string) => {
    console.log('Toggle archive:', noteId)
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

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getLanguageFlag = (languageId: string) => {
    const language = languages.find(lang => lang.id === languageId)
    return language?.flag || '🌐'
  }

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play()
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [isPlaying])

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
                Voice Notes
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              
              <Button
                onClick={() => setShowNewNote(true)}
                size="sm"
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Note
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
                placeholder="Search voice notes..."
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
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
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

        {/* Recording Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  variant={isRecording ? 'destructive' : 'default'}
                  size="lg"
                  className={isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-500 hover:bg-brand-600'}
                >
                  {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatDuration(recordingTime)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {isRecording ? 'Recording...' : 'Ready to record'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{volume}%</span>
              </div>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Bulk Actions */}
        {selectedNotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {selectedNotes.length} notes selected
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
                  onClick={() => handleBulkAction('transcribe')}
                  variant="outline"
                  size="sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Transcribe
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

        {/* Voice Notes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {sortedNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${
                selectedNotes.includes(note.id)
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {note.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {note.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {note.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    {note.isVerified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {note.isPremium && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <button
                      onClick={() => handleNoteSelect(note.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedNotes.includes(note.id)
                          ? 'border-brand-500 bg-brand-500 text-white'
                          : 'border-gray-300 dark:border-gray-600 hover:border-brand-500'
                      }`}
                    >
                      {selectedNotes.includes(note.id) && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Waveform */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Audio Waveform
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {note.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 h-8">
                    {note.waveform.map((amplitude, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-500 rounded-full"
                        style={{
                          width: '3px',
                          height: `${amplitude * 100}%`,
                          minHeight: '4px'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{formatTime(note.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{note.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    <span>{note.size}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs">{getLanguageFlag(note.language)}</span>
                    <span className="ml-1">{note.language.toUpperCase()}</span>
                  </div>
                </div>

                {/* Quality and Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getQualityColor(note.quality)}`}>
                    {note.quality.toUpperCase()} QUALITY
                  </span>
                  <div className="flex items-center space-x-2">
                    {note.isTranscribed ? (
                      <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Transcribed
                      </span>
                    ) : (
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Transcription Preview */}
                {note.isTranscribed && note.transcription && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                      {showTranscription ? note.translatedTranscription : note.transcription}
                    </p>
                    <button
                      onClick={() => setShowTranscription(!showTranscription)}
                      className="text-xs text-brand-600 dark:text-brand-400 hover:underline mt-1"
                    >
                      {showTranscription ? 'Show Original' : 'Show Translation'}
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handlePlayPause(note.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    {currentRecording === note.id && isPlaying ? (
                      <Pause className="w-4 h-4 mr-1" />
                    ) : (
                      <Play className="w-4 h-4 mr-1" />
                    )}
                    {currentRecording === note.id && isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    onClick={() => handleNoteAction(note.id, 'download')}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    onClick={() => handleNoteAction(note.id, 'more')}
                    variant="outline"
                    size="sm"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Notes */}
        {sortedNotes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No voice notes found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search criteria or record a new voice note.
            </p>
            <Button
              onClick={() => setShowNewNote(true)}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              <Mic className="w-4 h-4 mr-2" />
              Record Voice Note
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default VoiceNotes

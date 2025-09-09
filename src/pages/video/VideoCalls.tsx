import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Settings,
  Users,
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Share,
  Circle,
  StopCircle,
  ScreenShare,
  ScreenShareOff,
  MessageSquare,
  Hand,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  MessageCircle,
  FileText,
  Download
} from 'lucide-react'

const VideoCalls = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null)
  const [meetingType, setMeetingType] = useState<'upcoming' | 'past' | 'scheduled'>('upcoming')

  const upcomingMeetings = [
    {
      id: '1',
      title: 'Project Kickoff Meeting',
      participants: ['Ahmed Al-Rashid', 'Sarah Al-Mansouri', 'Mohammed Al-Zahrani'],
      date: '2024-01-26',
      time: '14:00',
      duration: '60 minutes',
      type: 'project',
      status: 'scheduled',
      description: 'Initial project discussion and requirements review',
      meetingId: '123-456-789',
      password: 'Project2024',
      agenda: [
        'Project overview and objectives',
        'Team introductions',
        'Timeline and milestones',
        'Q&A session'
      ]
    },
    {
      id: '2',
      title: 'Design Review Session',
      participants: ['Ahmed Al-Rashid', 'Fatima Al-Shehri'],
      date: '2024-01-27',
      time: '10:00',
      duration: '45 minutes',
      type: 'review',
      status: 'scheduled',
      description: 'Review of structural design and calculations',
      meetingId: '987-654-321',
      password: 'Design2024',
      agenda: [
        'Structural analysis review',
        'Design modifications discussion',
        'Next steps planning'
      ]
    }
  ]

  const pastMeetings = [
    {
      id: '3',
      title: 'Weekly Progress Update',
      participants: ['Ahmed Al-Rashid', 'Sarah Al-Mansouri', 'Khalid Al-Otaibi'],
      date: '2024-01-24',
      time: '15:00',
      duration: '30 minutes',
      type: 'update',
      status: 'completed',
      description: 'Weekly progress review and next week planning',
      meetingId: '456-789-123',
      password: 'Progress2024',
      recording: {
        url: '/api/recordings/weekly-update-2024-01-24.mp4',
        duration: '28:45',
        size: '125 MB'
      },
      notes: 'Key decisions: Accelerate foundation work, delay HVAC installation by 1 week',
      actionItems: [
        'Ahmed to provide updated foundation plans by Tuesday',
        'Sarah to coordinate with HVAC contractor for new timeline',
        'Khalid to update project schedule'
      ]
    },
    {
      id: '4',
      title: 'Emergency Response Meeting',
      participants: ['Mohammed Al-Zahrani', 'Fatima Al-Shehri'],
      date: '2024-01-23',
      time: '09:00',
      duration: '20 minutes',
      type: 'emergency',
      status: 'completed',
      description: 'Emergency response discussion for structural issue',
      meetingId: '789-123-456',
      password: 'Emergency2024',
      recording: {
        url: '/api/recordings/emergency-response-2024-01-23.mp4',
        duration: '18:30',
        size: '85 MB'
      },
      notes: 'Emergency resolved: Structural issue was minor and has been fixed',
      actionItems: [
        'Mohammed to prepare incident report',
        'Fatima to update safety protocols'
      ]
    }
  ]

  const scheduledMeetings = [
    {
      id: '5',
      title: 'Client Presentation',
      participants: ['Ahmed Al-Rashid', 'Sarah Al-Mansouri', 'Client Team'],
      date: '2024-01-30',
      time: '16:00',
      duration: '90 minutes',
      type: 'presentation',
      status: 'scheduled',
      description: 'Final project presentation to client',
      meetingId: '321-654-987',
      password: 'Client2024',
      agenda: [
        'Project overview and achievements',
        'Technical details and innovations',
        'Timeline and deliverables',
        'Client feedback and next steps'
      ]
    }
  ]

  const allMeetings = [...upcomingMeetings, ...pastMeetings, ...scheduledMeetings]

  const filteredMeetings = allMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.participants.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesType = meetingType === 'upcoming' && meeting.status === 'scheduled' ||
                       meetingType === 'past' && meeting.status === 'completed' ||
                       meetingType === 'scheduled' && meeting.status === 'scheduled'
    
    return matchesSearch && matchesType
  })

  const handleJoinMeeting = (meetingId: string) => {
    console.log('Joining meeting:', meetingId)
    setIsInCall(true)
  }

  const handleStartMeeting = () => {
    console.log('Starting new meeting')
    setIsInCall(true)
  }

  const handleEndCall = () => {
    setIsInCall(false)
    setIsMuted(false)
    setIsVideoOff(false)
    setIsScreenSharing(false)
    setIsRecording(false)
    setIsHandRaised(false)
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff)
  }

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
  }

  const handleToggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const handleToggleHand = () => {
    setIsHandRaised(!isHandRaised)
  }

  const handleScheduleMeeting = () => {
    console.log('Scheduling new meeting')
  }

  const handleDownloadRecording = (recording: any) => {
    console.log('Downloading recording:', recording)
  }

  const getMeetingTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'review':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'update':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'emergency':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'presentation':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return Clock
      case 'completed':
        return CheckCircle
      case 'cancelled':
        return XCircle
      default:
        return AlertCircle
    }
  }

  if (isInCall) {
    return (
      <div className="min-h-screen bg-black">
        {/* Video Call Interface */}
        <div className="relative h-screen">
          {/* Main Video Area */}
          <div className="absolute inset-0 bg-gray-900">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ahmed Al-Rashid</h3>
                <p className="text-gray-400">Senior Civil Engineer</p>
              </div>
            </div>
          </div>

          {/* Participants Panel */}
          {showParticipants && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute right-0 top-0 w-80 h-full bg-gray-800 p-4 overflow-y-auto"
            >
              <h4 className="text-white font-semibold mb-4">Participants (3)</h4>
              <div className="space-y-3">
                {['Ahmed Al-Rashid', 'Sarah Al-Mansouri', 'Mohammed Al-Zahrani'].map((participant, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                    <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {participant.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{participant}</p>
                      <p className="text-gray-400 text-xs">Engineer</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mic className="w-4 h-4 text-green-400" />
                      <Video className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chat Panel */}
          {showChat && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute right-0 top-0 w-80 h-full bg-gray-800 p-4 flex flex-col"
            >
              <h4 className="text-white font-semibold mb-4">Chat</h4>
              <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">A</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Ahmed Al-Rashid</p>
                    <p className="text-gray-300 text-sm">Welcome everyone!</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">S</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Sarah Al-Mansouri</p>
                    <p className="text-gray-300 text-sm">Thanks for organizing this meeting</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
                <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-800 p-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={handleToggleMute}
                variant={isMuted ? 'destructive' : 'outline'}
                size="lg"
                className="text-white"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={handleToggleVideo}
                variant={isVideoOff ? 'destructive' : 'outline'}
                size="lg"
                className="text-white"
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={handleToggleScreenShare}
                variant={isScreenSharing ? 'default' : 'outline'}
                size="lg"
                className="text-white"
              >
                {isScreenSharing ? <ScreenShareOff className="w-5 h-5" /> : <ScreenShare className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={handleToggleRecording}
                variant={isRecording ? 'destructive' : 'outline'}
                size="lg"
                className="text-white"
              >
                {isRecording ? <StopCircle className="w-5 h-5" /> : <Circle className="w-5 h-5 text-red-500" />}
              </Button>
              
              <Button
                onClick={() => setShowParticipants(!showParticipants)}
                variant="outline"
                size="lg"
                className="text-white"
              >
                <Users className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={() => setShowChat(!showChat)}
                variant="outline"
                size="lg"
                className="text-white"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={handleEndCall}
                variant="destructive"
                size="lg"
              >
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
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
                Video Calls
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleStartMeeting}
                size="sm"
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Start Meeting
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Meeting Type Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => setMeetingType('upcoming')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                meetingType === 'upcoming'
                  ? 'bg-brand-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Upcoming ({upcomingMeetings.length})
            </button>
            <button
              onClick={() => setMeetingType('past')}
              className={`px-6 py-3 text-sm font-medium ${
                meetingType === 'past'
                  ? 'bg-brand-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Past ({pastMeetings.length})
            </button>
            <button
              onClick={() => setMeetingType('scheduled')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                meetingType === 'scheduled'
                  ? 'bg-brand-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Scheduled ({scheduledMeetings.length})
            </button>
          </div>
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search meetings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            
            <Button
              onClick={handleScheduleMeeting}
              variant="outline"
              size="lg"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </motion.div>

        {/* Meetings Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredMeetings.map((meeting, index) => {
            const StatusIcon = getStatusIcon(meeting.status)
            
            return (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {meeting.title}
                        </h3>
                        <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getMeetingTypeColor(meeting.type)}`}>
                          {meeting.type.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{meeting.date} at {meeting.time}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{meeting.duration}</span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {meeting.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <StatusIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Participants ({meeting.participants.length})
                      </span>
                    </div>
                    <div className="flex -space-x-2">
                      {meeting.participants.slice(0, 3).map((participant, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800"
                        >
                          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                            {participant.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      ))}
                      {meeting.participants.length > 3 && (
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                          <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                            +{meeting.participants.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Meeting Details */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <span className="font-medium">Meeting ID:</span>
                      <span className="ml-2 font-mono">{meeting.meetingId}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Password:</span>
                      <span className="ml-2 font-mono">{meeting.password}</span>
                    </div>
                  </div>

                  {/* Recording Info */}
                  {meeting.recording && (
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Recording Available
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {meeting.recording.duration} • {meeting.recording.size}
                          </p>
                        </div>
                        <Button
                          onClick={() => handleDownloadRecording(meeting.recording)}
                          variant="outline"
                          size="sm"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {meeting.status === 'scheduled' ? (
                      <Button
                        onClick={() => handleJoinMeeting(meeting.id)}
                        size="sm"
                        className="flex-1 bg-brand-500 hover:bg-brand-600 text-white"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Join Meeting
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleJoinMeeting(meeting.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => setSelectedMeeting(meeting.id)}
                      variant="outline"
                      size="sm"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* No Meetings */}
        {filteredMeetings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No meetings found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {meetingType === 'upcoming' 
                ? 'You don\'t have any upcoming meetings scheduled.'
                : meetingType === 'past'
                ? 'You don\'t have any past meetings.'
                : 'You don\'t have any scheduled meetings.'
              }
            </p>
            <Button
              onClick={handleScheduleMeeting}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default VideoCalls

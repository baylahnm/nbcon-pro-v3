import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  MicOff, 
  Phone, 
  Video, 
  MoreVertical,
  Settings,
  Users,
  Globe,
  Languages,
  Volume2,
  VolumeX,
  Smile,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  Flag,
  UserX,
  RefreshCw,
  Copy,
  Share,
  Bookmark,
  BookmarkCheck,
  MessageCircle,
  Bolt,
  Shield
} from 'lucide-react'

const LiveChat = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'ar', name: 'العربية', flag: '🇸🇦' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'zh', name: '中文', flag: '🇨🇳' }
  ]

  const chats = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      title: 'Senior Civil Engineer',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'I\'ve completed the structural analysis. Please review the attached files.',
      lastMessageTime: '2024-01-25T14:30:00Z',
      unreadCount: 2,
      isOnline: true,
      isPinned: true,
      isMuted: false,
      project: 'Office Building Design',
      status: 'active',
      language: 'ar',
      isVerified: true,
      isPremium: false
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      title: 'Mechanical Engineer',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'The HVAC design is ready for your approval.',
      lastMessageTime: '2024-01-25T12:15:00Z',
      unreadCount: 0,
      isOnline: false,
      isPinned: false,
      isMuted: false,
      project: 'Shopping Mall Renovation',
      status: 'completed',
      language: 'en',
      isVerified: true,
      isPremium: true
    },
    {
      id: '3',
      name: 'Mohammed Al-Zahrani',
      title: 'Structural Engineer',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'I need clarification on the foundation requirements.',
      lastMessageTime: '2024-01-25T10:45:00Z',
      unreadCount: 1,
      isOnline: true,
      isPinned: false,
      isMuted: false,
      project: 'Residential Complex Design',
      status: 'active',
      language: 'ar',
      isVerified: true,
      isPremium: false
    },
    {
      id: '4',
      name: 'Fatima Al-Shehri',
      title: 'Electrical Engineer',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'The electrical plans are ready for review.',
      lastMessageTime: '2024-01-24T16:20:00Z',
      unreadCount: 0,
      isOnline: false,
      isPinned: false,
      isMuted: true,
      project: 'Hospital HVAC System',
      status: 'disputed',
      language: 'en',
      isVerified: true,
      isPremium: false
    }
  ]

  const messages = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Ahmed Al-Rashid',
      content: 'مرحباً! لقد أكملت التحليل الإنشائي لمشروع المبنى المكتبي.',
      translatedContent: 'Hello! I\'ve completed the structural analysis for the office building project.',
      timestamp: '2024-01-25T14:30:00Z',
      type: 'text',
      isRead: true,
      language: 'ar',
      attachments: []
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'Ahmed Al-Rashid',
      content: 'يرجى مراجعة الملفات المرفقة.',
      translatedContent: 'Please review the attached files.',
      timestamp: '2024-01-25T14:32:00Z',
      type: 'text',
      isRead: true,
      language: 'ar',
      attachments: [
        {
          id: '1',
          name: 'Structural_Analysis.pdf',
          type: 'pdf',
          size: '2.4 MB',
          url: '/api/files/structural-analysis.pdf'
        }
      ]
    },
    {
      id: '3',
      senderId: 'current',
      senderName: 'You',
      content: 'Thank you Ahmed! I\'ll review the documents and get back to you.',
      translatedContent: 'شكراً لك أحمد! سأراجع المستندات وأعود إليك.',
      timestamp: '2024-01-25T14:35:00Z',
      type: 'text',
      isRead: true,
      language: 'en',
      attachments: []
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Ahmed Al-Rashid',
      content: 'ممتاز! دعني أعرف إذا كنت بحاجة إلى أي توضيحات.',
      translatedContent: 'Perfect! Let me know if you need any clarifications.',
      timestamp: '2024-01-25T14:36:00Z',
      type: 'text',
      isRead: false,
      language: 'ar',
      attachments: []
    },
    {
      id: '5',
      senderId: '1',
      senderName: 'Ahmed Al-Rashid',
      content: 'لقد أعددت أيضاً نموذج ثلاثي الأبعاد للهيكل. هل تريد مني مشاركته؟',
      translatedContent: 'I\'ve also prepared a 3D model of the structure. Would you like me to share it?',
      timestamp: '2024-01-25T14:38:00Z',
      type: 'text',
      isRead: false,
      language: 'ar',
      attachments: []
    }
  ]

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedChatData = chats.find(chat => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText)
      setMessageText('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (files: FileList) => {
    console.log('Uploading files:', files)
  }

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId)
  }

  const handleChatAction = (chatId: string, action: string) => {
    console.log('Chat action:', action, chatId)
  }

  const handleMessageAction = (messageId: string, action: string) => {
    console.log('Message action:', action, messageId)
  }

  const handleLanguageChange = (languageId: string) => {
    setSelectedLanguage(languageId)
  }

  const handleTranslationToggle = () => {
    setShowTranslation(!showTranslation)
  }

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'completed':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'disputed':
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="me-4" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Live Chat
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
                onClick={() => navigate('/video-calls')}
                variant="outline"
                size="sm"
              >
                <Video className="w-4 h-4 me-2" />
                Video Calls
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Chats List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute inset-s-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full ps-10 pe-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Chats */}
            <div className="overflow-y-auto h-[calc(100%-5rem)]">
              {filteredChats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => handleChatSelect(chat.id)}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedChat === chat.id ? 'bg-brand-50 dark:bg-brand-900/20' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                          {chat.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {chat.isOnline && (
                        <div className="absolute -bottom-1 -inset-e-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {chat.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {chat.isPinned && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                          {chat.isMuted && (
                            <VolumeX className="w-3 h-3 text-gray-400" />
                          )}
                          {chat.isVerified && (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          )}
                          {chat.isPremium && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(chat.lastMessageTime)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 truncate">
                        {chat.title}
                      </p>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {chat.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(chat.status)}`}>
                            {chat.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {getLanguageFlag(chat.language)}
                          </span>
                        </div>
                        {chat.unreadCount > 0 && (
                          <span className="bg-brand-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                          {selectedChatData?.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {selectedChatData?.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {selectedChatData?.title}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleChatAction(selectedChat, 'call')}
                        variant="outline"
                        size="sm"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleChatAction(selectedChat, 'video')}
                        variant="outline"
                        size="sm"
                      >
                        <Video className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleChatAction(selectedChat, 'more')}
                        variant="outline"
                        size="sm"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-8rem)]">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === 'current'
                          ? 'bg-brand-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        {message.senderId !== 'current' && (
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-medium opacity-75">
                              {message.senderName}
                            </p>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs opacity-75">
                                {getLanguageFlag(message.language)}
                              </span>
                              {message.language !== selectedLanguage && (
                                <button
                                  onClick={() => handleTranslationToggle()}
                                  className="text-xs opacity-75 hover:opacity-100"
                                >
                                  <Languages className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <p className="text-sm bidi-plaintext" dir="auto">
                          {showTranslation && message.translatedContent ? message.translatedContent : message.content}
                        </p>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment) => (
                              <div
                                key={attachment.id}
                                className="flex items-center p-2 bg-white dark:bg-gray-800 rounded border"
                              >
                                <FileText className="w-4 h-4 text-gray-400 me-2" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {attachment.type.toUpperCase()} • {attachment.size}
                                  </p>
                                </div>
                                <Button
                                  onClick={() => handleMessageAction(message.id, 'download')}
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-75">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.senderId === 'current' && (
                            <div className="flex items-center">
                              {message.isRead ? (
                                <CheckCircle className="w-3 h-3 text-blue-400" />
                              ) : (
                                <Clock className="w-3 h-3 text-gray-400" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setShowFileUpload(!showFileUpload)}
                      variant="outline"
                      size="sm"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    
                    <Button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      variant="outline"
                      size="sm"
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      onClick={handleVoiceMessage}
                      variant={isRecording ? 'destructive' : 'outline'}
                      size="sm"
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      size="sm"
                      className="bg-brand-500 hover:bg-brand-600 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose a conversation from the list to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveChat

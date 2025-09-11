import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  Star,
  Archive,
  Trash2,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  FileText,
  Download,
  Eye,
  Reply,
  Forward,
  Copy,
  Flag,
  VolumeX,
  UserX,
  MessageCircle
} from 'lucide-react'

const MessagingHub = () => {
  const { t, i18n } = useTranslation('common')
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isRTL = i18n.language === 'ar'

  const conversations = useMemo(() => [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      titleKey: 'seniorCivilEngineer',
      avatar: '/api/placeholder/40/40',
      lastMessageKey: 'structuralAnalysisComplete',
      lastMessageTime: '2024-01-25T14:30:00Z',
      unreadCount: 2,
      isOnline: true,
      isPinned: true,
      isMuted: false,
      projectKey: 'officeBuildingDesign',
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      titleKey: 'mechanicalEngineer',
      avatar: '/api/placeholder/40/40',
      lastMessageKey: 'hvacDesignReady',
      lastMessageTime: '2024-01-25T12:15:00Z',
      unreadCount: 0,
      isOnline: false,
      isPinned: false,
      isMuted: false,
      projectKey: 'shoppingMallRenovation',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Mohammed Al-Zahrani',
      titleKey: 'structuralEngineer',
      avatar: '/api/placeholder/40/40',
      lastMessageKey: 'foundationClarification',
      lastMessageTime: '2024-01-25T10:45:00Z',
      unreadCount: 1,
      isOnline: true,
      isPinned: false,
      isMuted: false,
      projectKey: 'residentialComplexDesign',
      status: 'active'
    },
    {
      id: '4',
      name: 'Fatima Al-Shehri',
      titleKey: 'electricalEngineer',
      avatar: '/api/placeholder/40/40',
      lastMessageKey: 'electricalPlansReady',
      lastMessageTime: '2024-01-24T16:20:00Z',
      unreadCount: 0,
      isOnline: false,
      isPinned: false,
      isMuted: true,
      projectKey: 'hospitalHvacSystem',
      status: 'disputed'
    },
    {
      id: '5',
      name: 'Khalid Al-Otaibi',
      titleKey: 'projectManager',
      avatar: '/api/placeholder/40/40',
      lastMessageKey: 'meetingScheduled',
      lastMessageTime: '2024-01-24T14:10:00Z',
      unreadCount: 0,
      isOnline: true,
      isPinned: false,
      isMuted: false,
      projectKey: 'industrialPlantInspection',
      status: 'active'
    }
  ], [])

  const messages = useMemo(() => [
    {
      id: '1',
      senderId: '1',
      senderName: 'Ahmed Al-Rashid',
      contentKey: 'hello',
      timestamp: '2024-01-25T14:30:00Z',
      type: 'text',
      isRead: true,
      attachments: []
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'Ahmed Al-Rashid',
      contentKey: 'attachedFiles',
      timestamp: '2024-01-25T14:32:00Z',
      type: 'text',
      isRead: true,
      attachments: [
        {
          id: '1',
          name: 'Structural_Analysis.pdf',
          type: 'pdf',
          size: '2.4 MB',
          url: '/api/files/structural-analysis.pdf'
        },
        {
          id: '2',
          name: 'Foundation_Plans.dwg',
          type: 'dwg',
          size: '1.8 MB',
          url: '/api/files/foundation-plans.dwg'
        }
      ]
    },
    {
      id: '3',
      senderId: 'current',
      senderName: 'You',
      contentKey: 'thankYou',
      timestamp: '2024-01-25T14:35:00Z',
      type: 'text',
      isRead: true,
      attachments: []
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Ahmed Al-Rashid',
      contentKey: 'perfect',
      timestamp: '2024-01-25T14:36:00Z',
      type: 'text',
      isRead: false,
      attachments: []
    },
    {
      id: '5',
      senderId: '1',
      senderName: 'Ahmed Al-Rashid',
      contentKey: '3dModelReady',
      timestamp: '2024-01-25T14:38:00Z',
      type: 'text',
      isRead: false,
      attachments: []
    }
  ], [])

  const filteredConversations = useMemo(() => 
    conversations.filter(conv => 
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(`messages.projects.${conv.projectKey}`, conv.projectKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(`messages.sampleMessages.${conv.lastMessageKey}`, conv.lastMessageKey).toLowerCase().includes(searchQuery.toLowerCase())
    ), [conversations, searchQuery, t]
  )

  const selectedConv = conversations.find(conv => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Simulate sending message
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

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId)
  }

  const handleConversationAction = (conversationId: string, action: string) => {
    console.log('Conversation action:', action, conversationId)
  }

  const handleMessageAction = (messageId: string, action: string) => {
    console.log('Message action:', action, messageId)
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className={isRTL ? 'ms-4' : 'mr-4'} onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('messages.title', 'Messages')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/video-calls')}
                variant="outline"
                size="sm"
              >
                <Video className={`w-4 h-4 ${isRTL ? 'ms-2' : 'mr-2'}`} />
                {t('messages.videoCall', 'Video Calls')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`} />
                <input
                  type="text"
                  placeholder={t('messages.searchConversations', 'Search conversations...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent`}
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="overflow-y-auto h-[calc(100%-5rem)]">
              {filteredConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => handleConversationSelect(conversation.id)}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-brand-50 dark:bg-brand-900/20' : ''
                  }`}
                >
                  <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                    <div className="relative">
                      <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {conversation.isOnline && (
                        <div className={`absolute -bottom-1 ${isRTL ? '-left-1' : '-right-1'} w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full`}></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {conversation.name}
                        </h3>
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                          {conversation.isPinned && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                          {conversation.isMuted && (
                            <VolumeX className="w-3 h-3 text-gray-400" />
                          )}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 truncate">
                        {t(`messages.engineerTitles.${conversation.titleKey}`, conversation.titleKey)}
                      </p>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {t(`messages.sampleMessages.${conversation.lastMessageKey}`, conversation.lastMessageKey)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(conversation.status)}`}>
                          {t(`messages.projectStatuses.${conversation.status}`, conversation.status).toUpperCase()}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-brand-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unreadCount}
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
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                          {selectedConv?.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {selectedConv?.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {selectedConv && t(`messages.engineerTitles.${selectedConv.titleKey}`, selectedConv.titleKey)}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                      <Button
                        onClick={() => handleConversationAction(selectedConversation, 'call')}
                        variant="outline"
                        size="sm"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleConversationAction(selectedConversation, 'video')}
                        variant="outline"
                        size="sm"
                      >
                        <Video className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={() => handleConversationAction(selectedConversation, 'info')}
                        variant="outline"
                        size="sm"
                      >
                        <Info className="w-4 h-4" />
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
                          <p className="text-xs font-medium mb-1 opacity-75">
                            {message.senderName}
                          </p>
                        )}
                        
                        <p className="text-sm">
                          {message.contentKey ? t(`messages.sampleMessages.${message.contentKey}`, message.contentKey) : message.content}
                        </p>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment) => (
                              <div
                                key={attachment.id}
                                className={`flex items-center p-2 bg-white dark:bg-gray-800 rounded border ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}
                              >
                                <FileText className={`w-4 h-4 text-gray-400 ${isRTL ? 'ms-2' : 'mr-2'}`} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {attachment.size}
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
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
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
                        placeholder={t('messages.typeMessage', 'Type a message...')}
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
                    {t('messages.selectConversation', 'Select a conversation')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('messages.chooseConversation', 'Choose a conversation from the list to start messaging')}
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

export default MessagingHub

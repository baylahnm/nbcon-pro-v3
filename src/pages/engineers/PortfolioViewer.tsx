import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock,
  DollarSign,
  Users,
  Award,
  CheckCircle,
  Download,
  Share,
  Heart,
  MessageCircle,
  Calendar,
  Briefcase,
  ExternalLink,
  Play,
  Image as ImageIcon
} from 'lucide-react'

const PortfolioViewer = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('projects')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)

  const engineer = {
    id: '1',
    name: 'Ahmed Al-Rashid',
    title: 'Senior Civil Engineer',
    rating: 4.9,
    reviews: 127,
    location: 'Riyadh, Saudi Arabia',
    experience: '8 years',
    hourlyRate: 'SAR 150',
    responseTime: '2 hours',
    completionRate: '98%',
    isVerified: true,
    isOnline: true,
    avatar: '/api/placeholder/120/120',
    bio: 'Experienced civil engineer specializing in structural design, project management, and sustainable building practices. Passionate about creating innovative solutions for complex engineering challenges.',
    skills: ['AutoCAD', 'Revit', 'Project Management', 'Structural Analysis', 'Building Codes', 'Sustainability', '3D Modeling', 'Cost Estimation'],
    certifications: ['PE License', 'PMP', 'LEED Green Associate', 'SCE Certified'],
    languages: ['Arabic (Native)', 'English (Fluent)', 'French (Conversational)'],
    availability: 'Available now',
    joinedDate: 'January 2020'
  }

  const projects = [
    {
      id: '1',
      title: 'Modern Office Complex Design',
      client: 'Al-Rajhi Construction',
      location: 'Riyadh, Saudi Arabia',
      year: '2023',
      duration: '6 months',
      budget: 'SAR 2.5M',
      status: 'Completed',
      description: 'Complete architectural and structural design for a 15-story office complex with sustainable features and modern amenities.',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
      skills: ['AutoCAD', 'Revit', 'Structural Analysis', 'Sustainability'],
      deliverables: ['Architectural Drawings', 'Structural Plans', '3D Models', 'Cost Estimates'],
      testimonial: {
        text: 'Ahmed delivered exceptional work that exceeded our expectations. His attention to detail and innovative solutions were outstanding.',
        author: 'Mohammed Al-Rajhi',
        position: 'Project Manager, Al-Rajhi Construction'
      }
    },
    {
      id: '2',
      title: 'Shopping Mall Renovation',
      client: 'Saudi Aramco',
      location: 'Dhahran, Saudi Arabia',
      year: '2022',
      duration: '4 months',
      budget: 'SAR 1.8M',
      status: 'Completed',
      description: 'Comprehensive renovation and modernization of existing shopping mall with improved structural integrity and energy efficiency.',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      skills: ['Structural Analysis', 'Energy Efficiency', 'Building Codes', 'Project Management'],
      deliverables: ['Renovation Plans', 'Structural Assessment', 'Energy Audit', 'Implementation Timeline'],
      testimonial: {
        text: 'Professional, reliable, and highly skilled. Ahmed managed the complex renovation project flawlessly.',
        author: 'Sarah Al-Mansouri',
        position: 'Facilities Manager, Saudi Aramco'
      }
    },
    {
      id: '3',
      title: 'Residential Complex Design',
      client: 'NEOM',
      location: 'Tabuk, Saudi Arabia',
      year: '2023',
      duration: '8 months',
      budget: 'SAR 3.2M',
      status: 'In Progress',
      description: 'Sustainable residential complex design for NEOM smart city with cutting-edge technology integration.',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
      skills: ['Sustainability', 'Smart Buildings', '3D Modeling', 'Project Management'],
      deliverables: ['Master Plan', 'Building Designs', 'Technology Integration', 'Sustainability Report'],
      testimonial: null
    }
  ]

  const reviews = [
    {
      id: '1',
      client: 'Mohammed Al-Rajhi',
      project: 'Modern Office Complex Design',
      rating: 5,
      date: '2023-12-15',
      comment: 'Exceptional work! Ahmed delivered beyond our expectations with innovative solutions and excellent project management.',
      response: 'Thank you for the kind words, Mohammed. It was a pleasure working on this project with your team.'
    },
    {
      id: '2',
      client: 'Sarah Al-Mansouri',
      project: 'Shopping Mall Renovation',
      rating: 5,
      date: '2022-11-20',
      comment: 'Professional, reliable, and highly skilled. The renovation project was completed on time and within budget.',
      response: null
    },
    {
      id: '3',
      client: 'Khalid Al-Otaibi',
      project: 'Infrastructure Development',
      rating: 4,
      date: '2023-08-10',
      comment: 'Great attention to detail and excellent communication throughout the project.',
      response: 'Thank you, Khalid. I appreciate your feedback and look forward to future collaborations.'
    }
  ]

  const tabs = [
    { id: 'projects', label: 'Projects', count: projects.length },
    { id: 'reviews', label: 'Reviews', count: reviews.length },
    { id: 'skills', label: 'Skills & Certifications', count: engineer.skills.length },
    { id: 'about', label: 'About', count: 0 }
  ]

  const handleContact = () => {
    navigate('/messaging-hub')
  }

  const handleHire = () => {
    navigate('/ai-matches')
  }

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing portfolio...')
  }

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading portfolio...')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Project Images */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {project.images.slice(0, 4).map((image, idx) => (
                      <div
                        key={idx}
                        className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedProject(project.id)}
                      >
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  
                  {project.images.length > 4 && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      +{project.images.length - 4} more
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {project.client}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {project.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {project.year}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-semibold text-brand-600 dark:text-brand-400">
                        {project.budget}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {project.duration}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  {project.testimonial && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                            {project.testimonial.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-1">
                            "{project.testimonial.text}"
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            — {project.testimonial.author}, {project.testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'reviews':
        return (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-4">
                      <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                        {review.client.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.client}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {review.project}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.date}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {review.comment}
                </p>

                {review.response && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                          AR
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {review.response}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-8">
            {/* Skills */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Technical Skills
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {engineer.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Certifications
              </h3>
              <div className="space-y-3">
                {engineer.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-yellow-500 mr-3" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {cert}
                      </span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Languages
              </h3>
              <div className="space-y-2">
                {engineer.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">
                      {lang}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'about':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                About {engineer.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {engineer.bio}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Professional Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Experience</span>
                    <span className="font-medium text-gray-900 dark:text-white">{engineer.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Hourly Rate</span>
                    <span className="font-medium text-gray-900 dark:text-white">{engineer.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                    <span className="font-medium text-gray-900 dark:text-white">{engineer.responseTime}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                    <span className="font-medium text-gray-900 dark:text-white">{engineer.completionRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                    <span className="font-medium text-gray-900 dark:text-white">{engineer.joinedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Availability</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{engineer.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-4" onClick={() => navigate('/engineer-filtering')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Engineer Portfolio
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsLiked(!isLiked)}
                variant="outline"
                size="sm"
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Engineer Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mr-6">
                <span className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {engineer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {engineer.name}
                  </h2>
                  {engineer.isVerified && (
                    <CheckCircle className="w-6 h-6 text-green-500 ml-2" />
                  )}
                  {engineer.isOnline && (
                    <div className="w-3 h-3 bg-green-500 rounded-full ml-2"></div>
                  )}
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                  {engineer.title}
                </p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    {engineer.rating} ({engineer.reviews} reviews)
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {engineer.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {engineer.experience}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">
                {engineer.hourlyRate}/hour
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {engineer.responseTime} response time
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={handleContact}
                  variant="outline"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                
                <Button
                  onClick={handleHire}
                  size="lg"
                  className="bg-brand-500 hover:bg-brand-600 text-white"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Hire Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  )
}

export default PortfolioViewer

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  AlertTriangle, 
  Clock, 
  MapPin,
  Phone,
  MessageCircle,
  Users,
  DollarSign,
  FileText,
  Camera,
  Mic,
  Send,
  CheckCircle,
  X,
  Zap,
  Shield,
  Star
} from 'lucide-react'

const EmergencyJobRequest = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Emergency Details
    emergencyType: '',
    severity: '',
    description: '',
    location: '',
    coordinates: { lat: 0, lng: 0 },
    
    // Contact Information
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    alternateContact: '',
    
    // Project Details
    projectType: '',
    budget: '',
    timeline: '',
    skills: [] as string[],
    
    // Media & Documentation
    photos: [] as File[],
    videos: [] as File[],
    voiceNotes: [] as File[],
    documents: [] as File[],
    
    // Additional Information
    safetyConcerns: '',
    accessRequirements: '',
    specialInstructions: '',
    
    // Verification
    isVerified: false,
    termsAccepted: false
  })

  const emergencyTypes = [
    'Structural Emergency',
    'Electrical Emergency',
    'Mechanical Failure',
    'Safety Hazard',
    'Environmental Issue',
    'System Failure',
    'Other'
  ]

  const severityLevels = [
    {
      id: 'critical',
      label: 'Critical',
      description: 'Immediate danger to life or property',
      color: 'text-red-600 bg-red-100 dark:bg-red-900/30',
      icon: AlertTriangle,
      responseTime: 'Within 1 hour'
    },
    {
      id: 'high',
      label: 'High',
      description: 'Significant risk requiring urgent attention',
      color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
      icon: AlertTriangle,
      responseTime: 'Within 2 hours'
    },
    {
      id: 'medium',
      label: 'Medium',
      description: 'Important but not immediately dangerous',
      color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
      icon: Clock,
      responseTime: 'Within 4 hours'
    }
  ]

  const projectTypes = [
    'Building Inspection',
    'Structural Assessment',
    'Electrical Repair',
    'Mechanical Repair',
    'Safety Inspection',
    'Environmental Assessment',
    'System Diagnosis',
    'Emergency Repair'
  ]

  const commonSkills = [
    'Structural Engineering', 'Electrical Engineering', 'Mechanical Engineering',
    'Safety Assessment', 'Emergency Response', 'Building Inspection',
    'HVAC Systems', 'Power Systems', 'Fire Safety', 'Environmental Engineering'
  ]

  const steps = [
    { id: 1, title: 'Emergency Details', icon: AlertTriangle },
    { id: 2, title: 'Contact Information', icon: Phone },
    { id: 3, title: 'Project Details', icon: FileText },
    { id: 4, title: 'Media & Documentation', icon: Camera },
    { id: 5, title: 'Review & Submit', icon: CheckCircle }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleFileUpload = (field: string, files: FileList) => {
    const fileArray = Array.from(files)
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as File[], ...fileArray]
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to emergency dashboard
      navigate('/emergency-dashboard')
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Emergency Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Emergency Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {emergencyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleInputChange('emergencyType', type)}
                    className={`p-4 text-left border-2 rounded-lg transition-colors ${
                      formData.emergencyType === type
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Severity Level *
              </label>
              <div className="space-y-3">
                {severityLevels.map((level) => {
                  const Icon = level.icon
                  return (
                    <button
                      key={level.id}
                      onClick={() => handleInputChange('severity', level.id)}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                        formData.severity === level.id
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-start">
                        <Icon className="w-6 h-6 text-red-500 mr-4 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {level.label}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${level.color}`}>
                              {level.responseTime}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {level.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Emergency Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the emergency situation in detail..."
                rows={4}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Emergency Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter the exact location of the emergency"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="Your full name"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="+966 50 123 4567"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Alternate Contact
                </label>
                <input
                  type="tel"
                  value={formData.alternateContact}
                  onChange={(e) => handleInputChange('alternateContact', e.target.value)}
                  placeholder="+966 50 987 6543"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Type *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="Under SAR 5,000">Under SAR 5,000</option>
                  <option value="SAR 5,000 - 10,000">SAR 5,000 - 10,000</option>
                  <option value="SAR 10,000 - 25,000">SAR 10,000 - 25,000</option>
                  <option value="SAR 25,000 - 50,000">SAR 25,000 - 50,000</option>
                  <option value="Over SAR 50,000">Over SAR 50,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="Within 1 hour">Within 1 hour</option>
                  <option value="Within 4 hours">Within 4 hours</option>
                  <option value="Within 24 hours">Within 24 hours</option>
                  <option value="Within 3 days">Within 3 days</option>
                </select>
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Required Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {commonSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.skills.includes(skill)
                        ? 'bg-brand-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Safety Concerns */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Safety Concerns
              </label>
              <textarea
                value={formData.safetyConcerns}
                onChange={(e) => handleInputChange('safetyConcerns', e.target.value)}
                placeholder="Describe any safety concerns or hazards..."
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            {/* Access Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Access Requirements
              </label>
              <textarea
                value={formData.accessRequirements}
                onChange={(e) => handleInputChange('accessRequirements', e.target.value)}
                placeholder="Describe any special access requirements..."
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Upload photos of the emergency situation
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFileUpload('photos', e.target.files)}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Choose Photos
                </label>
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Videos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Upload videos of the emergency situation
                </p>
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => e.target.files && handleFileUpload('videos', e.target.files)}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Choose Videos
                </label>
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Documents (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Upload relevant documents (PDF, DWG, etc.)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.dwg,.doc,.docx"
                  onChange={(e) => e.target.files && handleFileUpload('documents', e.target.files)}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Choose Documents
                </label>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Special Instructions
              </label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Any special instructions for the emergency response team..."
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            {/* Emergency Summary */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                  Emergency Request Summary
                </h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.emergencyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Severity:</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">{formData.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Contact:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.contactName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.contactPhone}</span>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  className="mt-1 mr-3"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                  I agree to the emergency response terms and conditions, including the emergency response fee structure and priority handling procedures.
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="verified"
                  checked={formData.isVerified}
                  onChange={(e) => handleInputChange('isVerified', e.target.checked)}
                  className="mt-1 mr-3"
                />
                <label htmlFor="verified" className="text-sm text-gray-600 dark:text-gray-300">
                  I confirm that this is a genuine emergency requiring immediate attention and that all information provided is accurate.
                </label>
              </div>
            </div>

            {/* Emergency Response Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                  Emergency Response Process
                </h4>
              </div>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Your emergency request will be immediately forwarded to qualified engineers</li>
                <li>• Engineers will be notified via SMS, email, and push notifications</li>
                <li>• Response time depends on severity level and engineer availability</li>
                <li>• You will receive real-time updates on the response status</li>
                <li>• Emergency response fees may apply based on severity and timing</li>
              </ul>
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
              <Button variant="ghost" size="sm" className="mr-4" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Emergency Job Request
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">EMERGENCY</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                Emergency Response Required
              </h2>
              <p className="text-red-700 dark:text-red-300">
                This form is for genuine emergencies only. Please provide accurate information to ensure the fastest possible response.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive 
                      ? 'bg-red-500 text-white' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-between mt-8"
        >
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            size="lg"
          >
            Previous
          </Button>

          <div className="flex space-x-4">
            {currentStep < steps.length ? (
              <Button
                onClick={handleNext}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                disabled={!formData.termsAccepted || !formData.isVerified}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isLoading ? 'Submitting Emergency Request...' : 'Submit Emergency Request'}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default EmergencyJobRequest

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Settings,
  FileText,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Shield,
  Calendar,
  Upload,
  Plus,
  X,
  Save,
  Eye
} from 'lucide-react'

const AdvancedJobBuilder = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    category: '',
    subcategory: '',
    description: '',
    objectives: '',
    scope: '',
    
    // Location & Timeline
    location: '',
    address: '',
    coordinates: { lat: 0, lng: 0 },
    startDate: '',
    endDate: '',
    duration: '',
    milestones: [] as Array<{id: string, title: string, dueDate: string, description: string}>,
    
    // Budget & Payment
    budget: '',
    currency: 'SAR',
    paymentTerms: '',
    billingType: 'fixed',
    expenses: [] as Array<{id: string, item: string, amount: string, category: string}>,
    
    // Requirements & Skills
    requiredSkills: [] as string[],
    experienceLevel: '',
    certifications: [] as string[],
    languages: [] as string[],
    
    // Project Details
    projectType: '',
    complexity: '',
    deliverables: [] as Array<{id: string, title: string, description: string, dueDate: string}>,
    constraints: '',
    risks: '',
    
    // Team & Collaboration
    teamSize: '',
    reportingStructure: '',
    communication: '',
    tools: [] as string[],
    
    // Compliance & Legal
    compliance: [] as string[],
    insurance: '',
    contracts: '',
    confidentiality: false,
    
    // Files & Attachments
    attachments: [] as Array<{id: string, name: string, type: string, size: number}>,
    references: [] as Array<{id: string, title: string, url: string, description: string}>
  })

  const steps = [
    { id: 1, title: 'Basic Information', icon: FileText },
    { id: 2, title: 'Location & Timeline', icon: MapPin },
    { id: 3, title: 'Budget & Payment', icon: DollarSign },
    { id: 4, title: 'Requirements', icon: Users },
    { id: 5, title: 'Project Details', icon: Settings },
    { id: 6, title: 'Team & Collaboration', icon: Users },
    { id: 7, title: 'Compliance & Legal', icon: Shield },
    { id: 8, title: 'Files & Attachments', icon: Upload },
    { id: 9, title: 'Review & Publish', icon: Eye }
  ]

  const categories = [
    'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering',
    'Structural Engineering', 'Architecture', 'Environmental Engineering',
    'Petroleum Engineering', 'Computer Engineering', 'Other'
  ]

  const subcategories = {
    'Civil Engineering': ['Road Construction', 'Bridge Design', 'Water Systems', 'Urban Planning'],
    'Mechanical Engineering': ['HVAC Systems', 'Manufacturing', 'Automotive', 'Aerospace'],
    'Electrical Engineering': ['Power Systems', 'Control Systems', 'Telecommunications', 'Renewable Energy'],
    'Architecture': ['Residential', 'Commercial', 'Industrial', 'Landscape'],
    'Structural Engineering': ['Building Design', 'Seismic Analysis', 'Foundation Design', 'Steel Structures']
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayAdd = (field: string, item: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as any[], { id: Date.now().toString(), ...item }]
    }))
  }

  const handleArrayRemove = (field: string, id: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as any[]).filter((item: any) => item.id !== id)
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

  const handleSaveDraft = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Draft saved:', formData)
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      navigate('/ai-matches')
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter a descriptive project title"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subcategory
                </label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  disabled={!formData.category}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Select subcategory</option>
                  {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a detailed description of your project..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Objectives
                </label>
                <textarea
                  value={formData.objectives}
                  onChange={(e) => handleInputChange('objectives', e.target.value)}
                  placeholder="What are the main objectives of this project?"
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Scope
                </label>
                <textarea
                  value={formData.scope}
                  onChange={(e) => handleInputChange('scope', e.target.value)}
                  placeholder="Define the scope and boundaries of the project..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Riyadh, Saudi Arabia"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter the complete project address"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Select duration</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2-3 months">2-3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
            </div>

            {/* Milestones */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  Project Milestones
                </h4>
                <Button
                  type="button"
                  onClick={() => handleArrayAdd('milestones', { title: '', dueDate: '', description: '' })}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Milestone
                </Button>
              </div>

              <div className="space-y-4">
                {formData.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={milestone.title}
                          onChange={(e) => {
                            const updated = formData.milestones.map(m => 
                              m.id === milestone.id ? { ...m, title: e.target.value } : m
                            )
                            handleInputChange('milestones', updated)
                          }}
                          placeholder="Milestone title"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Due Date
                        </label>
                        <input
                          type="date"
                          value={milestone.dueDate}
                          onChange={(e) => {
                            const updated = formData.milestones.map(m => 
                              m.id === milestone.id ? { ...m, dueDate: e.target.value } : m
                            )
                            handleInputChange('milestones', updated)
                          }}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          onClick={() => handleArrayRemove('milestones', milestone.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={milestone.description}
                        onChange={(e) => {
                          const updated = formData.milestones.map(m => 
                            m.id === milestone.id ? { ...m, description: e.target.value } : m
                          )
                          handleInputChange('milestones', updated)
                        }}
                        placeholder="Milestone description"
                        rows={2}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      // Add more cases for other steps...
      default:
        return <div>Step content for step {currentStep}</div>
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
                Advanced Job Builder
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleSaveDraft}
                loading={isLoading}
                variant="outline"
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
                      ? 'bg-brand-500 text-white' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive 
                        ? 'text-brand-600 dark:text-brand-400' 
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
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
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
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                loading={isLoading}
                size="lg"
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                {isLoading ? 'Publishing...' : 'Publish Job'}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdvancedJobBuilder

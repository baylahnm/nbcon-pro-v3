import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Clock, 
  DollarSign,
  MapPin,
  FileText,
  Zap,
  Calendar,
  Users
} from 'lucide-react'

const QuickJobPost = () => {
  const { t, i18n } = useTranslation('common')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    urgency: 'normal',
    location: '',
    timeline: '',
    skills: [] as string[]
  })

  const isRTL = i18n.language === 'ar'

  // Categories with translation keys
  const categories = useMemo(() => [
    { key: 'civilEngineering', value: 'Civil Engineering' },
    { key: 'mechanicalEngineering', value: 'Mechanical Engineering' },
    { key: 'electricalEngineering', value: 'Electrical Engineering' },
    { key: 'structuralEngineering', value: 'Structural Engineering' },
    { key: 'architecture', value: 'Architecture' },
    { key: 'environmentalEngineering', value: 'Environmental Engineering' },
    { key: 'other', value: 'Other' }
  ], [])

  // Urgency levels with translation keys
  const urgencyLevels = useMemo(() => [
    { id: 'low', key: 'low', descriptionKey: 'lowDescription', color: 'text-green-600' },
    { id: 'normal', key: 'normal', descriptionKey: 'normalDescription', color: 'text-blue-600' },
    { id: 'high', key: 'high', descriptionKey: 'highDescription', color: 'text-orange-600' },
    { id: 'urgent', key: 'urgent', descriptionKey: 'urgentDescription', color: 'text-red-600' }
  ], [])

  // Budget ranges with translation keys
  const budgetRanges = useMemo(() => [
    { key: 'under5000', value: 'Under SAR 5,000' },
    { key: '5000to10000', value: 'SAR 5,000 - 10,000' },
    { key: '10000to25000', value: 'SAR 10,000 - 25,000' },
    { key: '25000to50000', value: 'SAR 25,000 - 50,000' },
    { key: '50000to100000', value: 'SAR 50,000 - 100,000' },
    { key: 'over100000', value: 'Over SAR 100,000' }
  ], [])

  // Timeline options with translation keys
  const timelineOptions = useMemo(() => [
    { key: 'asap', value: 'ASAP' },
    { key: '1to2weeks', value: '1-2 weeks' },
    { key: '1month', value: '1 month' },
    { key: '2to3months', value: '2-3 months' },
    { key: '6months', value: '6 months' },
    { key: 'flexible', value: 'Flexible' }
  ], [])

  // Skills with translation keys
  const commonSkills = useMemo(() => [
    { key: 'projectManagement', value: 'Project Management' },
    { key: 'autocad', value: 'AutoCAD' },
    { key: 'revit', value: 'Revit' },
    { key: 'structuralAnalysis', value: 'Structural Analysis' },
    { key: 'hvacDesign', value: 'HVAC Design' },
    { key: 'electricalSystems', value: 'Electrical Systems' },
    { key: 'buildingCodes', value: 'Building Codes' },
    { key: 'sustainability', value: 'Sustainability' },
    { key: '3dModeling', value: '3D Modeling' },
    { key: 'costEstimation', value: 'Cost Estimation' },
    { key: 'qualityControl', value: 'Quality Control' },
    { key: 'safetyManagement', value: 'Safety Management' }
  ], [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSkillToggle = (skillKey: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillKey)
        ? prev.skills.filter(s => s !== skillKey)
        : [...prev.skills, skillKey]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to AI matches
      navigate('/ai-matches')
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className={isRTL ? 'ms-4' : 'me-4'} onClick={handleBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('jobs.quickJobPost.title', 'Quick Job Post')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {t('jobs.quickJobPost.quickPost', 'Quick Post')}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Post Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start">
            <Zap className={`w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 ${isRTL ? 'ms-3' : 'me-3'}`} />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                {t('jobs.quickJobPost.title', 'Quick Job Post')}
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {t('jobs.quickJobPost.description', 'Get your job posted in minutes with our streamlined form. Our AI will find the best engineers for your project.')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <FileText className={`w-5 h-5 text-brand-500 ${isRTL ? 'ms-2' : 'me-2'}`} />
              {t('jobs.quickJobPost.basicInformation', 'Basic Information')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('jobs.quickJobPost.jobTitle', 'Job Title')} *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={t('jobs.quickJobPost.jobTitlePlaceholder', 'e.g., Office Building Design')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('jobs.quickJobPost.category', 'Category')} *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">{t('jobs.quickJobPost.selectCategory', 'Select category')}</option>
                  {categories.map((category) => (
                    <option key={category.key} value={category.value}>
                      {t(`jobs.quickJobPost.categories.${category.key}`, category.value)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('jobs.quickJobPost.budgetRange', 'Budget Range')} *
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">{t('jobs.quickJobPost.selectBudget', 'Select budget')}</option>
                  {budgetRanges.map((range) => (
                    <option key={range.key} value={range.value}>
                      {t(`jobs.quickJobPost.budgetRanges.${range.key}`, range.value)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('jobs.quickJobPost.description', 'Description')} *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder={t('jobs.quickJobPost.descriptionPlaceholder', 'Describe your project requirements...')}
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Urgency & Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Clock className={`w-5 h-5 text-brand-500 ${isRTL ? 'ms-2' : 'me-2'}`} />
              {t('jobs.quickJobPost.urgencyTimeline', 'Urgency & Timeline')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('jobs.quickJobPost.urgencyLevel', 'Urgency Level')} *
                </label>
                <div className="space-y-2">
                  {urgencyLevels.map((level) => (
                    <label key={level.id} className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="radio"
                        name="urgency"
                        value={level.id}
                        checked={formData.urgency === level.id}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className={isRTL ? 'ms-3' : 'me-3'}
                      />
                      <div>
                        <div className={`font-medium ${level.color}`}>
                          {t(`jobs.quickJobPost.urgencyLevels.${level.key}`, level.id)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {t(`jobs.quickJobPost.urgencyLevels.${level.descriptionKey}`, level.id)}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('jobs.quickJobPost.timeline', 'Timeline')}
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">{t('jobs.quickJobPost.selectTimeline', 'Select timeline')}</option>
                  {timelineOptions.map((option) => (
                    <option key={option.key} value={option.value}>
                      {t(`jobs.quickJobPost.timelineOptions.${option.key}`, option.value)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <MapPin className={`w-5 h-5 text-brand-500 ${isRTL ? 'ms-2' : 'me-2'}`} />
              {t('jobs.quickJobPost.location', 'Location')}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('jobs.quickJobPost.projectLocation', 'Project Location')} *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder={t('jobs.quickJobPost.locationPlaceholder', 'e.g., Riyadh, Saudi Arabia')}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Required Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Users className={`w-5 h-5 text-brand-500 ${isRTL ? 'ms-2' : 'me-2'}`} />
              {t('jobs.quickJobPost.requiredSkills', 'Required Skills')}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {commonSkills.map((skill) => (
                <button
                  key={skill.key}
                  type="button"
                  onClick={() => handleSkillToggle(skill.key)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.skills.includes(skill.key)
                      ? 'bg-brand-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {t(`jobs.quickJobPost.skills.${skill.key}`, skill.value)}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} space-x-4`}>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBack}
            >
              {t('jobs.quickJobPost.cancel', 'Cancel')}
            </Button>
            
            <Button
              type="submit"
              loading={isLoading}
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              {isLoading 
                ? t('jobs.quickJobPost.postingJob', 'Posting Job...')
                : t('jobs.quickJobPost.postJob', 'Post Job & Find Engineers')
              }
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

export default QuickJobPost

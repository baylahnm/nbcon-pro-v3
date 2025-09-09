import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { ArrowLeft, User, Mail, Calendar, MapPin } from 'lucide-react'
import { validateEmail } from '@/lib/utils'

const ProfileSetup = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language } = useThemeStore()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    nationality: '',
    specialization: '',
    experience: '',
    location: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  
  const isRTL = language === 'ar'

  const nationalities = [
    { value: 'Saudi Arabia', label: isRTL ? 'المملكة العربية السعودية' : 'Saudi Arabia' },
    { value: 'United Arab Emirates', label: isRTL ? 'الإمارات العربية المتحدة' : 'United Arab Emirates' },
    { value: 'Egypt', label: isRTL ? 'مصر' : 'Egypt' },
    { value: 'Jordan', label: isRTL ? 'الأردن' : 'Jordan' },
    { value: 'Lebanon', label: isRTL ? 'لبنان' : 'Lebanon' },
    { value: 'Syria', label: isRTL ? 'سوريا' : 'Syria' },
    { value: 'Iraq', label: isRTL ? 'العراق' : 'Iraq' },
    { value: 'Kuwait', label: isRTL ? 'الكويت' : 'Kuwait' },
    { value: 'Qatar', label: isRTL ? 'قطر' : 'Qatar' },
    { value: 'Bahrain', label: isRTL ? 'البحرين' : 'Bahrain' },
    { value: 'Oman', label: isRTL ? 'عُمان' : 'Oman' },
    { value: 'Yemen', label: isRTL ? 'اليمن' : 'Yemen' },
    { value: 'Pakistan', label: isRTL ? 'باكستان' : 'Pakistan' },
    { value: 'India', label: isRTL ? 'الهند' : 'India' },
    { value: 'Bangladesh', label: isRTL ? 'بنغلاديش' : 'Bangladesh' },
    { value: 'Philippines', label: isRTL ? 'الفلبين' : 'Philippines' },
    { value: 'Other', label: isRTL ? 'أخرى' : 'Other' }
  ]

  const specializations = [
    { value: 'Civil Engineering', label: isRTL ? 'الهندسة المدنية' : 'Civil Engineering' },
    { value: 'Mechanical Engineering', label: isRTL ? 'الهندسة الميكانيكية' : 'Mechanical Engineering' },
    { value: 'Electrical Engineering', label: isRTL ? 'الهندسة الكهربائية' : 'Electrical Engineering' },
    { value: 'Chemical Engineering', label: isRTL ? 'الهندسة الكيميائية' : 'Chemical Engineering' },
    { value: 'Industrial Engineering', label: isRTL ? 'الهندسة الصناعية' : 'Industrial Engineering' },
    { value: 'Computer Engineering', label: isRTL ? 'هندسة الحاسوب' : 'Computer Engineering' },
    { value: 'Architecture', label: isRTL ? 'العمارة' : 'Architecture' },
    { value: 'Structural Engineering', label: isRTL ? 'الهندسة الإنشائية' : 'Structural Engineering' },
    { value: 'Environmental Engineering', label: isRTL ? 'الهندسة البيئية' : 'Environmental Engineering' },
    { value: 'Petroleum Engineering', label: isRTL ? 'هندسة البترول' : 'Petroleum Engineering' },
    { value: 'Aerospace Engineering', label: isRTL ? 'الهندسة الجوية' : 'Aerospace Engineering' },
    { value: 'Biomedical Engineering', label: isRTL ? 'الهندسة الطبية الحيوية' : 'Biomedical Engineering' },
    { value: 'Other', label: isRTL ? 'أخرى' : 'Other' }
  ]

  const experienceLevels = [
    { value: '0-1 years', label: isRTL ? '0-1 سنة' : '0-1 years' },
    { value: '1-3 years', label: isRTL ? '1-3 سنوات' : '1-3 years' },
    { value: '3-5 years', label: isRTL ? '3-5 سنوات' : '3-5 years' },
    { value: '5-10 years', label: isRTL ? '5-10 سنوات' : '5-10 years' },
    { value: '10+ years', label: isRTL ? '10+ سنوات' : '10+ years' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('errors.required', { ns: 'common' })
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('errors.required', { ns: 'common' })
    }

    if (!formData.email.trim()) {
      newErrors.email = t('errors.required', { ns: 'common' })
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('errors.invalid', { ns: 'common' })
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = t('errors.required', { ns: 'common' })
    }

    if (!formData.nationality) {
      newErrors.nationality = t('errors.required', { ns: 'common' })
    }

    if (!formData.specialization) {
      newErrors.specialization = t('errors.required', { ns: 'common' })
    }

    if (!formData.experience) {
      newErrors.experience = t('errors.required', { ns: 'common' })
    }

    if (!formData.location.trim()) {
      newErrors.location = t('errors.required', { ns: 'common' })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store profile data in localStorage
      localStorage.setItem('profileData', JSON.stringify(formData))
      
      navigate('/credentials-upload')
    } catch (err) {
      setErrors({ submit: t('errors.network', { ns: 'common' }) })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/otp-verification')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-dark-surface dark:to-dark-surface2 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 bg-brand-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          >
            <User className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {t('profileSetup.title', { ns: 'auth' })}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300"
          >
            {t('profileSetup.subtitle', { ns: 'auth' })}
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Personal Information Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className={`w-5 h-5 text-brand-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('profileSetup.personalInfo', { ns: 'auth' })}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {t('profileSetup.firstName', { ns: 'auth' })} *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full h-[50px] p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('profileSetup.firstNamePlaceholder', { ns: 'auth' })}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {t('profileSetup.lastName', { ns: 'auth' })} *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full h-[50px] p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('profileSetup.lastNamePlaceholder', { ns: 'auth' })}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {t('profileSetup.email', { ns: 'auth' })} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full h-[50px] p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('profileSetup.emailPlaceholder', { ns: 'auth' })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {t('profileSetup.dateOfBirth', { ns: 'auth' })} *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={`w-full h-[50px] p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {t('profileSetup.nationality', { ns: 'auth' })} *
                </label>
                <select
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className={`w-full h-[50px] pt-[9px] pb-3 px-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                    errors.nationality ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">{t('profileSetup.nationalityPlaceholder', { ns: 'auth' })}</option>
                  {nationalities.map((nationality) => (
                    <option key={nationality.value} value={nationality.value}>
                      {nationality.label}
                    </option>
                  ))}
                </select>
                {errors.nationality && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.nationality}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {t('profileSetup.location', { ns: 'auth' })} *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full h-[50px] p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                    errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('profileSetup.locationPlaceholder', { ns: 'auth' })}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className={`w-5 h-5 text-brand-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('profileSetup.professionalInfo', { ns: 'auth' })}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {t('profileSetup.specialization', { ns: 'auth' })} *
                </label>
                <select
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className={`w-full h-[50px] pt-[9px] pb-3 px-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                    errors.specialization ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">{t('profileSetup.specializationPlaceholder', { ns: 'auth' })}</option>
                  {specializations.map((spec) => (
                    <option key={spec.value} value={spec.value}>
                      {spec.label}
                    </option>
                  ))}
                </select>
                {errors.specialization && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.specialization}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}>
                  {t('profileSetup.experience', { ns: 'auth' })} *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className={`w-full h-[50px] pt-[9px] pb-3 px-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                    errors.experience ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">{t('profileSetup.experiencePlaceholder', { ns: 'auth' })}</option>
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isLoading}
            size="lg"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white"
          >
            {isLoading ? t('loading.saving', { ns: 'common' }) : t('profileSetup.continue', { ns: 'auth' })}
          </Button>
        </motion.form>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6"
        >
          <Button
            onClick={handleBack}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('actions.back', { ns: 'common' })}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ProfileSetup

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { ArrowLeft, Upload, FileText, Award, Briefcase, X } from 'lucide-react'

const CredentialsUpload = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language } = useThemeStore()
  const [isLoading, setIsLoading] = useState(false)
  
  const isRTL = language === 'ar'
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({
    sce: [],
    certificates: [],
    portfolio: []
  })

  const handleFileUpload = (category: string, files: FileList | null) => {
    if (!files) return
    const fileArray = Array.from(files)
    setUploadedFiles(prev => ({
      ...prev,
      [category]: [...prev[category], ...fileArray]
    }))
  }

  const handleFileRemove = (category: string, index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleFileUpload(category, files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      localStorage.setItem('credentialsData', JSON.stringify(uploadedFiles))
      navigate('/service-area')
    } catch (err) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    navigate('/service-area')
  }

  const handleBack = () => {
    navigate('/profile-setup')
  }

  const uploadSections = [
    {
      id: 'sce',
      title: t('credentialsUpload.sceCard', { ns: 'auth' }),
      description: t('credentialsUpload.sceDescription', { ns: 'auth' }),
      icon: Award,
      required: true
    },
    {
      id: 'certificates',
      title: t('credentialsUpload.certificates', { ns: 'auth' }),
      description: t('credentialsUpload.certificatesDescription', { ns: 'auth' }),
      icon: FileText,
      required: false
    },
    {
      id: 'portfolio',
      title: t('credentialsUpload.portfolio', { ns: 'auth' }),
      description: t('credentialsUpload.portfolioDescription', { ns: 'auth' }),
      icon: Briefcase,
      required: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-dark-surface dark:to-dark-surface2 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 bg-brand-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          >
            <Upload className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center"
          >
            {t('credentialsUpload.title', { ns: 'auth' })}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300 text-center"
          >
            {t('credentialsUpload.subtitle', { ns: 'auth' })}
          </motion.p>
        </div>

        {/* Upload Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-6"
        >
          {uploadSections.map((section, index) => {
            const Icon = section.icon
            const files = uploadedFiles[section.id]
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
              >
                <div className={`flex items-start mb-4 ${isRTL ? 'flex-row-reverse justify-start' : ''}`}>
                  <div className={`w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center ${
                    isRTL ? 'ml-4' : 'mr-4'
                  }`}>
                    <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-1 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}>
                      {isRTL ? (
                        <>
                          {section.title}
                          {section.required && <span className="text-red-500 mr-1">*</span>}
                        </>
                      ) : (
                        <>
                          {section.title}
                          {section.required && <span className="text-red-500 ml-1">*</span>}
                        </>
                      )}
                    </h3>
                    <p className={`text-gray-600 dark:text-gray-300 text-sm ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}>
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Upload Area */}
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-brand-500 dark:hover:border-brand-400 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section.id)}
                  onClick={() => document.getElementById(`file-input-${section.id}`)?.click()}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className={`text-gray-600 dark:text-gray-300 mb-1 ${
                    isRTL ? 'text-right' : 'text-center'
                  }`}>
                    {t('credentialsUpload.dragDrop', { ns: 'auth' })}
                  </p>
                  <p className={`text-sm text-gray-500 dark:text-gray-400 ${
                    isRTL ? 'text-right' : 'text-center'
                  }`}>
                    {t('credentialsUpload.acceptedFormats', { ns: 'auth' })}
                  </p>
                  <input
                    id={`file-input-${section.id}`}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(section.id, e.target.files)}
                    className="hidden"
                  />
                </div>

                {/* Uploaded Files */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, fileIndex) => (
                      <div
                        key={fileIndex}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">{file.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({formatFileSize(file.size)})</span>
                        </div>
                        <button
                          onClick={() => handleFileRemove(section.id, fileIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button onClick={handleBack} variant="outline" size="lg" className="sm:w-auto">
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('actions.back', { ns: 'common' })}
          </Button>
          <Button onClick={handleSkip} variant="ghost" size="lg" className="sm:w-auto">
            {t('credentialsUpload.skip', { ns: 'auth' })}
          </Button>
          <Button onClick={handleSubmit} loading={isLoading} size="lg" className="sm:w-auto bg-brand-500 hover:bg-brand-600 text-white">
            {isLoading ? t('loading.uploading', { ns: 'common' }) : t('credentialsUpload.continue', { ns: 'auth' })}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CredentialsUpload

 

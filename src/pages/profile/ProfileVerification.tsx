import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Upload,
  FileText,
  Award,
  Clock,
  X
} from 'lucide-react'

const ProfileVerification = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const verificationItems = [
    {
      id: 'sce',
      title: 'Saudi Council of Engineers (SCE)',
      description: 'Professional engineering license verification',
      status: 'pending',
      required: true,
      icon: Award,
      documents: [
        { name: 'SCE License Certificate', status: 'uploaded', uploadedAt: '2024-01-15' },
        { name: 'Professional ID Card', status: 'pending', uploadedAt: null }
      ]
    },
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Government-issued ID verification',
      status: 'verified',
      required: true,
      icon: Shield,
      documents: [
        { name: 'National ID', status: 'verified', uploadedAt: '2024-01-10' },
        { name: 'Passport', status: 'verified', uploadedAt: '2024-01-10' }
      ]
    },
    {
      id: 'education',
      title: 'Educational Credentials',
      description: 'University degree and certifications',
      status: 'under_review',
      required: false,
      icon: FileText,
      documents: [
        { name: 'Bachelor Degree', status: 'under_review', uploadedAt: '2024-01-12' },
        { name: 'Master Degree', status: 'uploaded', uploadedAt: '2024-01-12' },
        { name: 'Professional Certifications', status: 'uploaded', uploadedAt: '2024-01-12' }
      ]
    },
    {
      id: 'experience',
      title: 'Work Experience',
      description: 'Previous employment and project history',
      status: 'pending',
      required: false,
      icon: Clock,
      documents: [
        { name: 'Employment Letters', status: 'pending', uploadedAt: null },
        { name: 'Project Portfolio', status: 'uploaded', uploadedAt: '2024-01-14' }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'under_review':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-400" />
      case 'rejected':
        return <X className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const handleUploadDocument = async (verificationId: string, documentName: string) => {
    setIsLoading(true)
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log(`Uploading document: ${documentName} for verification: ${verificationId}`)
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleResubmit = async (verificationId: string) => {
    setIsLoading(true)
    
    try {
      // Simulate resubmission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log(`Resubmitting verification: ${verificationId}`)
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const verifiedCount = verificationItems.filter(item => item.status === 'verified').length
  const totalRequired = verificationItems.filter(item => item.required).length
  const verificationProgress = (verifiedCount / totalRequired) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Profile Verification
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Verification Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Verification Progress
            </h2>
            <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
              {Math.round(verificationProgress)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-brand-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${verificationProgress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {verifiedCount} of {totalRequired} required verifications completed
          </p>
        </motion.div>

        {/* Verification Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          {verificationItems.map((item, index) => {
            const Icon = item.icon
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        {item.required && (
                          <span className="ml-2 px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(item.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-3">
                  {item.documents.map((doc, docIndex) => (
                    <div key={docIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {doc.name}
                          </p>
                          {doc.uploadedAt && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Uploaded: {doc.uploadedAt}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                          {doc.status.replace('_', ' ')}
                        </span>
                        
                        {doc.status === 'pending' && (
                          <Button
                            onClick={() => handleUploadDocument(item.id, doc.name)}
                            loading={isLoading}
                            size="sm"
                            variant="outline"
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Upload
                          </Button>
                        )}
                        
                        {doc.status === 'rejected' && (
                          <Button
                            onClick={() => handleResubmit(item.id)}
                            loading={isLoading}
                            size="sm"
                            className="bg-brand-500 hover:bg-brand-600 text-white"
                          >
                            Resubmit
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                {item.status === 'pending' && (
                  <div className="mt-4 flex space-x-3">
                    <Button
                      onClick={() => handleUploadDocument(item.id, 'all')}
                      loading={isLoading}
                      size="sm"
                      className="bg-brand-500 hover:bg-brand-600 text-white"
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      Upload Documents
                    </Button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Verification Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Verification Benefits
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Higher Visibility
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Verified profiles appear first in search results
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Trust & Credibility
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Build trust with potential clients
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Premium Features
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Access to advanced project tools
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Priority Support
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Get faster customer support
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfileVerification

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Monitor, 
  Smartphone,
  Download,
  Upload,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'

export default function Settings() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { theme, setTheme } = useThemeStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  })
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowMessages: true,
    dataSharing: false
  })

  const tabs = [
    { id: 'profile', label: t('settings.profile', 'Profile'), icon: User },
    { id: 'notifications', label: t('settings.notifications', 'Notifications'), icon: Bell },
    { id: 'privacy', label: t('settings.privacy', 'Privacy & Security'), icon: Shield },
    { id: 'appearance', label: t('settings.appearance', 'Appearance'), icon: Palette },
    { id: 'language', label: t('settings.language', 'Language & Region'), icon: Globe },
    { id: 'data', label: t('settings.data', 'Data & Storage'), icon: Download }
  ]

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    setIsRTL(lang === 'ar')
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'system')
  }

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved')
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('settings.profileInfo', 'Profile Information')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.displayName', 'Display Name')}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder={t('settings.enterDisplayName', 'Enter your display name')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.email', 'Email Address')}
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder={t('settings.enterEmail', 'Enter your email')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.bio', 'Bio')}
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              placeholder={t('settings.enterBio', 'Tell us about yourself')}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('settings.notificationPreferences', 'Notification Preferences')}
        </h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {t(`settings.${key}`, key.charAt(0).toUpperCase() + key.slice(1))}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t(`settings.${key}Description`, `Receive ${key} notifications`)}
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('settings.privacySettings', 'Privacy Settings')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.profileVisibility', 'Profile Visibility')}
            </label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="public">{t('settings.public', 'Public')}</option>
              <option value="private">{t('settings.private', 'Private')}</option>
              <option value="contacts">{t('settings.contactsOnly', 'Contacts Only')}</option>
            </select>
          </div>
          {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {t(`settings.${key}`, key.charAt(0).toUpperCase() + key.slice(1))}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t(`settings.${key}Description`, `Allow ${key}`)}
                </p>
              </div>
              <button
                onClick={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('settings.appearance', 'Appearance')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.theme', 'Theme')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: t('settings.light', 'Light'), icon: Monitor },
                { value: 'dark', label: t('settings.dark', 'Dark'), icon: Smartphone },
                { value: 'system', label: t('settings.system', 'System'), icon: Globe }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => handleThemeChange(value)}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                    theme === value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('settings.languageRegion', 'Language & Region')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.language', 'Language')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'ar', name: 'العربية', flag: '🇸🇦' }
              ].map(({ code, name, flag }) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`flex items-center p-3 rounded-lg border-2 transition-colors ${
                    i18n.language === code
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="text-2xl mr-3">{flag}</span>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('settings.dataStorage', 'Data & Storage')}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <Download className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('settings.exportData', 'Export Data')}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('settings.exportDataDescription', 'Download your data in JSON format')}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {t('settings.export', 'Export')}
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              <Trash2 className="w-5 h-5 text-red-400 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('settings.deleteAccount', 'Delete Account')}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('settings.deleteAccountDescription', 'Permanently delete your account and data')}
                </p>
              </div>
            </div>
            <Button variant="destructive" size="sm">
              {t('settings.delete', 'Delete')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'privacy':
        return renderPrivacySettings()
      case 'appearance':
        return renderAppearanceSettings()
      case 'language':
        return renderLanguageSettings()
      case 'data':
        return renderDataSettings()
      default:
        return renderProfileSettings()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('settings.title', 'Settings')}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t('settings.description', 'Manage your account settings and preferences')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSave} className="flex items-center">
                <Save className="w-4 h-4 mr-2" />
                {t('settings.save', 'Save Changes')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useAuthStore } from './stores/authStore'
import { useThemeStore } from './stores/themeStore'

// Auth & Onboarding Pages
import SplashScreen from './pages/auth/SplashScreen'
import RoleSelection from './pages/auth/RoleSelection'
import PhoneVerification from './pages/auth/PhoneVerification'
import OtpVerification from './pages/auth/OtpVerification'
import ProfileSetup from './pages/auth/ProfileSetup'
import CredentialsUpload from './pages/auth/CredentialsUpload'
import ServiceArea from './pages/auth/ServiceArea'
import RateSetting from './pages/auth/RateSetting'
import Welcome from './pages/auth/Welcome'
import Permissions from './pages/auth/Permissions'
import AccountConfirmation from './pages/auth/AccountConfirmation'

// Dashboard Pages
import ClientDashboard from './pages/dashboard/ClientDashboard'
import EngineerDashboard from './pages/dashboard/EngineerDashboard'
import EnterpriseDashboard from './pages/dashboard/EnterpriseDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'

// Browse Services
import BrowseServices from './pages/services/BrowseServices'

// Job Management
import JobRequestWizard from './pages/jobs/JobRequestWizard'
import AIMatches from './pages/jobs/AIMatches'
import JobTimeline from './pages/jobs/JobTimeline'
import GeofencedCheckIn from './pages/jobs/GeofencedCheckIn'

// Profile & Verification
import ProfileVerification from './pages/profile/ProfileVerification'

function App() {
  const { i18n } = useTranslation()
  const { isAuthenticated, user } = useAuthStore()
  const { theme } = useThemeStore()

  // Set document direction based on language
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  // Set theme class
  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  // Show splash screen if not authenticated
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/credentials-upload" element={<CredentialsUpload />} />
        <Route path="/service-area" element={<ServiceArea />} />
        <Route path="/rate-setting" element={<RateSetting />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/account-confirmation" element={<AccountConfirmation />} />
      </Routes>
    )
  }

  // Show appropriate dashboard based on user role
  return (
    <Routes>
      <Route path="/" element={
        user?.role === 'client' ? <ClientDashboard /> :
        user?.role === 'engineer' ? <EngineerDashboard /> :
        user?.role === 'enterprise' ? <EnterpriseDashboard /> :
        user?.role === 'admin' ? <AdminDashboard /> :
        <ClientDashboard />
      } />
      <Route path="/browse-services" element={<BrowseServices />} />
      <Route path="/job-request" element={<JobRequestWizard />} />
      <Route path="/ai-matches" element={<AIMatches />} />
      <Route path="/job-timeline" element={<JobTimeline />} />
      <Route path="/check-in" element={<GeofencedCheckIn />} />
      <Route path="/profile-verification" element={<ProfileVerification />} />
    </Routes>
  )
}

export default App

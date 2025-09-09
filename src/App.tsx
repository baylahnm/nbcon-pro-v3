import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useAuthStore } from './stores/authStore'
import { useThemeStore } from './stores/themeStore'
import Layout from './components/layout/Layout'

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

// Patch 2 — Core Job Management screens
import QuickJobPost from './pages/jobs/QuickJobPost'
import AdvancedJobBuilder from './pages/jobs/AdvancedJobBuilder'
import JobTemplatesLibrary from './pages/jobs/JobTemplatesLibrary'
import EngineerFiltering from './pages/engineers/EngineerFiltering'
import PortfolioViewer from './pages/engineers/PortfolioViewer'
import RealTimeMatching from './pages/jobs/RealTimeMatching'
import QuoteComparison from './pages/jobs/QuoteComparison'
import JobStatusTracking from './pages/jobs/JobStatusTracking'
import EmergencyJobRequest from './pages/jobs/EmergencyJobRequest'
import JobArchive from './pages/jobs/JobArchive'
import MessagingHub from './pages/messaging/MessagingHub'
import VideoCalls from './pages/video/VideoCalls'
import FileManager from './pages/files/FileManager'
import DiscussionForum from './pages/forum/DiscussionForum'
import LiveChat from './pages/chat/LiveChat'
import VoiceNotes from './pages/voice/VoiceNotes'
import NotificationCenter from './pages/notifications/NotificationCenter'
import FeedbackRating from './pages/feedback/FeedbackRating'
import SupportHelp from './pages/support/SupportHelp'
import CommunityForums from './pages/community/CommunityForums'

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

  // Show appropriate dashboard based on user role with Layout
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={
          user?.role === 'client' ? <ClientDashboard /> :
          user?.role === 'engineer' ? <EngineerDashboard /> :
          user?.role === 'enterprise' ? <EnterpriseDashboard /> :
          user?.role === 'admin' ? <AdminDashboard /> :
          <ClientDashboard />
        } />
        
        {/* Common Routes */}
        <Route path="/browse-services" element={<BrowseServices />} />
        <Route path="/job-request" element={<JobRequestWizard />} />
        <Route path="/ai-matches" element={<AIMatches />} />
        <Route path="/job-timeline" element={<JobTimeline />} />
        <Route path="/check-in" element={<GeofencedCheckIn />} />
        <Route path="/profile-verification" element={<ProfileVerification />} />

        {/* Jobs Routes */}
        <Route path="/jobs/quick-post" element={<QuickJobPost />} />
        <Route path="/jobs/advanced-builder" element={<AdvancedJobBuilder />} />
        <Route path="/jobs/templates" element={<JobTemplatesLibrary />} />
        <Route path="/jobs/real-time-matching" element={<RealTimeMatching />} />
        <Route path="/jobs/quote-comparison" element={<QuoteComparison />} />
        <Route path="/jobs/status-tracking" element={<JobStatusTracking />} />
        <Route path="/jobs/emergency" element={<EmergencyJobRequest />} />
        <Route path="/jobs/archive" element={<JobArchive />} />
        <Route path="/jobs/browse" element={<BrowseServices />} />
        <Route path="/jobs/recommendations" element={<AIMatches />} />
        <Route path="/jobs/drafts" element={<JobRequestWizard />} />
        <Route path="/jobs/bulk-post" element={<AdvancedJobBuilder />} />
        <Route path="/jobs/clone" element={<JobTemplatesLibrary />} />

        {/* Engineers Routes */}
        <Route path="/engineers/filter" element={<EngineerFiltering />} />
        <Route path="/engineers/portfolio" element={<PortfolioViewer />} />
        <Route path="/engineers/browse" element={<EngineerFiltering />} />
        <Route path="/engineers/favorites" element={<EngineerFiltering />} />

        {/* Financial Routes */}
        <Route path="/financial/earnings" element={<ClientDashboard />} />
        <Route path="/financial/payment-methods" element={<ClientDashboard />} />
        <Route path="/financial/escrow" element={<ClientDashboard />} />
        <Route path="/financial/payouts" element={<ClientDashboard />} />
        <Route path="/financial/time-billing" element={<ClientDashboard />} />
        <Route path="/financial/quote-builder" element={<QuoteComparison />} />

        {/* Budget Routes */}
        <Route path="/budget/tracker" element={<ClientDashboard />} />
        <Route path="/payments/methods" element={<ClientDashboard />} />
        <Route path="/payments/escrow" element={<ClientDashboard />} />
        <Route path="/budget/intelligence" element={<ClientDashboard />} />

        {/* Profile Routes */}
        <Route path="/profile/view" element={<ProfileVerification />} />
        <Route path="/profile/edit" element={<ProfileSetup />} />
        <Route path="/profile/portfolio" element={<PortfolioViewer />} />
        <Route path="/profile/posts" element={<CommunityForums />} />
        <Route path="/profile/manager" element={<ProfileVerification />} />

        {/* Tools Routes */}
        <Route path="/tools/availability" element={<ClientDashboard />} />
        <Route path="/tools/deliverables" element={<FileManager />} />
        <Route path="/tools/collaboration" element={<MessagingHub />} />
        <Route path="/tools/certificates" element={<FileManager />} />
        <Route path="/tools/search" element={<EngineerFiltering />} />
        <Route path="/tools/quality" element={<ClientDashboard />} />

        {/* Projects Routes */}
        <Route path="/projects/deliverables" element={<FileManager />} />
        <Route path="/projects/collaboration" element={<MessagingHub />} />
        <Route path="/projects/certificates" element={<FileManager />} />
        <Route path="/projects/quality" element={<ClientDashboard />} />

        {/* Communication Routes */}
        <Route path="/messaging" element={<MessagingHub />} />
        <Route path="/video-calls" element={<VideoCalls />} />
        <Route path="/files" element={<FileManager />} />
        <Route path="/forum" element={<DiscussionForum />} />
        <Route path="/chat/live" element={<LiveChat />} />
        <Route path="/voice/notes" element={<VoiceNotes />} />
        <Route path="/notifications" element={<NotificationCenter />} />
        <Route path="/notifications/advanced" element={<NotificationCenter />} />

        {/* Analytics Routes */}
        <Route path="/analytics" element={<ClientDashboard />} />
        <Route path="/analytics/business" element={<ClientDashboard />} />
        <Route path="/analytics/dashboard" element={<ClientDashboard />} />
        <Route path="/analytics/visualization" element={<ClientDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
        <Route path="/admin/roles" element={<AdminDashboard />} />
        <Route path="/admin/revenue" element={<AdminDashboard />} />
        <Route path="/admin/transactions" element={<AdminDashboard />} />
        <Route path="/admin/payment-gateway" element={<AdminDashboard />} />
        <Route path="/admin/config" element={<AdminDashboard />} />
        <Route path="/admin/maintenance" element={<AdminDashboard />} />
        <Route path="/admin/performance" element={<AdminDashboard />} />
        <Route path="/admin/status" element={<AdminDashboard />} />
        <Route path="/admin/reports" element={<AdminDashboard />} />
        <Route path="/admin/growth" element={<AdminDashboard />} />
        <Route path="/admin/data-visualization" element={<AdminDashboard />} />
        <Route path="/admin/security" element={<AdminDashboard />} />
        <Route path="/admin/audit" element={<AdminDashboard />} />
        <Route path="/admin/compliance" element={<AdminDashboard />} />
        <Route path="/admin/moderation" element={<AdminDashboard />} />
        <Route path="/admin/quality" element={<AdminDashboard />} />
        <Route path="/admin/integrations" element={<AdminDashboard />} />
        <Route path="/admin/financial" element={<AdminDashboard />} />
        <Route path="/admin/system" element={<AdminDashboard />} />

        {/* Settings Routes */}
        <Route path="/settings" element={<ClientDashboard />} />
        <Route path="/settings/theme" element={<ClientDashboard />} />
        <Route path="/settings/notifications" element={<NotificationCenter />} />
        <Route path="/settings/accessibility" element={<ClientDashboard />} />
        <Route path="/settings/performance" element={<ClientDashboard />} />

        {/* Support Routes */}
        <Route path="/support" element={<SupportHelp />} />
        <Route path="/feedback" element={<FeedbackRating />} />
        <Route path="/community" element={<CommunityForums />} />

        {/* Advanced Features Routes */}
        <Route path="/ai/matching" element={<AIMatches />} />
        <Route path="/ai/recommendations" element={<AIMatches />} />
        <Route path="/ai/smart-contracts" element={<ClientDashboard />} />
        <Route path="/geo/geofencing" element={<GeofencedCheckIn />} />
        <Route path="/geo/time-tracking" element={<JobTimeline />} />
        <Route path="/blockchain/verification" element={<ProfileVerification />} />
        <Route path="/blockchain/security" element={<ClientDashboard />} />
        <Route path="/blockchain/escrow" element={<ClientDashboard />} />
        <Route path="/tech/ar-vr" element={<ClientDashboard />} />
        <Route path="/tech/innovation" element={<ClientDashboard />} />

        {/* Dashboard Routes for different roles */}
        <Route path="/engineer/dashboard" element={<EngineerDashboard />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
      </Route>
    </Routes>
  )
}

export default App
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

export default function LogoutHandler() {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  useEffect(() => {
    // Perform logout
    logout()
    
    // Redirect to splash screen after logout
    navigate('/', { replace: true })
  }, [logout, navigate])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Logging out...</p>
      </div>
    </div>
  )
}

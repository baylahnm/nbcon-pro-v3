import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'
type Language = 'en' | 'ar'

interface ThemeState {
  theme: Theme
  language: Language
  highContrast: boolean
  reducedMotion: boolean
  
  // Actions
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  setHighContrast: (enabled: boolean) => void
  setReducedMotion: (enabled: boolean) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'en',
      highContrast: false,
      reducedMotion: false,

      setTheme: (theme) => set({ theme }),
      
      setLanguage: (language) => set({ language }),
      
      setHighContrast: (highContrast) => set({ highContrast }),
      
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
)

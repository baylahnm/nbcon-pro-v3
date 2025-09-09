// NBCON Pro Design System
// Comprehensive UI/UX framework for Saudi engineering marketplace

// Design tokens
export * from './tokens'

// Component library
export * from './components'

// Accessibility utilities
export * from './accessibility'

// RTL support
export * from './rtl'

// Performance optimization
export * from './performance'

// Testing framework
export * from './testing'

// Styles
import './styles.css'

// Re-export commonly used utilities
export { cn } from '../lib/utils'

// Design system configuration
export const designSystem = {
  version: '1.0.0',
  name: 'NBCON Pro Design System',
  description: 'Comprehensive UI/UX framework for Saudi engineering marketplace',
  
  // Features
  features: {
    accessibility: 'WCAG 2.2 AA compliant',
    rtl: 'Full Arabic RTL support',
    performance: 'Mobile-first optimization',
    theming: 'Light/Dark mode support',
    testing: 'Comprehensive testing framework'
  },
  
  // Usage
  usage: {
    install: 'npm install @nbcon/design-system',
    import: "import { Button, Card } from '@nbcon/design-system'",
    docs: 'https://design.nbcon.pro'
  }
}

// Default theme configuration
export const defaultTheme = {
  light: {
    colors: {
      primary: '#00D084',
      secondary: '#0D1B0F',
      background: '#ffffff',
      foreground: '#111827'
    }
  },
  dark: {
    colors: {
      primary: '#00D084',
      secondary: '#0D1B0F',
      background: '#0D1B0F',
      foreground: '#ffffff'
    }
  }
}

// RTL configuration
export const rtlConfig = {
  languages: ['ar', 'he', 'fa'],
  defaultDirection: 'ltr',
  autoDetect: true
}

// Performance configuration
export const performanceConfig = {
  budget: {
    loadTime: 2000,
    firstPaint: 1000,
    firstContentfulPaint: 1500,
    timeToInteractive: 3000
  },
  optimization: {
    lazyLoading: true,
    codeSplitting: true,
    imageOptimization: true,
    caching: true
  }
}

// Accessibility configuration
export const accessibilityConfig = {
  standards: ['WCAG 2.2 AA'],
  features: {
    keyboardNavigation: true,
    screenReader: true,
    colorContrast: true,
    focusManagement: true
  },
  testing: {
    automated: true,
    manual: true,
    tools: ['axe', 'WAVE', 'Lighthouse']
  }
}

export type DesignSystem = typeof designSystem
export type DefaultTheme = typeof defaultTheme
export type RTLConfig = typeof rtlConfig
export type PerformanceConfig = typeof performanceConfig
export type AccessibilityConfig = typeof accessibilityConfig

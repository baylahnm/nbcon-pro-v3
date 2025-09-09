# NBCON Pro Design System

A comprehensive UI/UX framework for the Saudi engineering marketplace, built with accessibility, RTL support, and performance optimization in mind.

## 🎯 Overview

The NBCON Pro Design System provides a complete set of tools, components, and guidelines for building accessible, performant, and culturally appropriate user interfaces for the Saudi market.

## ✨ Features

- **WCAG 2.2 AA Compliant** - Full accessibility support
- **RTL Support** - Complete Arabic language and layout support
- **Mobile-First** - Optimized for mobile devices
- **Performance Optimized** - Built for speed and efficiency
- **Comprehensive Testing** - Built-in testing framework
- **Saudi-Specific** - Tailored for Saudi market requirements

## 🚀 Quick Start

```typescript
import { Button, Card, LanguageSelector } from '@/design-system'
import '@/design-system/styles.css'

function App() {
  return (
    <div>
      <LanguageSelector
        languages={[
          { code: 'en', name: 'English', flag: '🇺🇸', numeralFormat: 'latin' },
          { code: 'ar', name: 'العربية', flag: '🇸🇦', numeralFormat: 'arabic' }
        ]}
        selectedLanguage="en"
        onLanguageChange={(code) => console.log(code)}
      />
    </div>
  )
}
```

## 📚 Components

### Core Components

- **LanguageSelector** - Language and numeral format selection
- **RoleCard** - User role selection with features
- **PhoneInput** - Saudi phone number input with validation
- **OtpCodeInput** - OTP code input with auto-advance
- **Stepper** - Multi-step progress indicator
- **SlideToAct** - Slide-to-activate component

### Enhanced Features

- **Accessibility** - Full keyboard navigation and screen reader support
- **RTL Support** - Automatic layout mirroring for Arabic
- **Performance** - Optimized for mobile and desktop
- **Validation** - Built-in form validation
- **Theming** - Light and dark mode support

## 🎨 Design Tokens

```typescript
import { designTokens } from '@/design-system'

// Brand colors
const primary = designTokens.brand.primary // #00D084
const secondary = designTokens.brand.secondary // #0D1B0F

// Typography
const fontFamily = designTokens.typography.fontFamily.primary
const fontSize = designTokens.typography.fontSize.lg

// Spacing
const spacing = designTokens.spacing[4] // 1rem
```

## 🌍 RTL Support

The design system automatically handles RTL layout for Arabic content:

```typescript
import { rtl, logicalProperties } from '@/design-system'

// Check if RTL is active
const isRTL = rtl.isRTL()

// Use logical properties
const marginStart = logicalProperties.margin.start('1rem')
const textAlign = logicalProperties.textAlign.start()
```

## ♿ Accessibility

Built-in accessibility features ensure WCAG 2.2 AA compliance:

```typescript
import { focusManagement, keyboardNavigation } from '@/design-system'

// Announce to screen readers
focusManagement.announce('Action completed')

// Handle keyboard navigation
const handleKeyDown = keyboardNavigation.handleArrowKeys(event, items, currentIndex)
```

## 🚀 Performance

Optimized for performance with built-in monitoring:

```typescript
import { performanceMonitor, imageOptimization } from '@/design-system'

// Monitor performance
performanceMonitor.measure('Component Render', () => {
  // Component logic
})

// Optimize images
imageOptimization.lazyLoad(img, src, srcSet)
```

## 🧪 Testing

Comprehensive testing framework included:

```typescript
import { userTestingScenarios, testingUtils } from '@/design-system'

// Run accessibility tests
const result = testingUtils.testAccessibility(element)

// Test color contrast
const contrast = testingUtils.testColorContrast('#000000', '#ffffff')
```

## 📱 Mobile Optimization

Mobile-first approach with touch optimization:

```typescript
import { mobileOptimization } from '@/design-system'

// Optimize for mobile
mobileOptimization.optimizeViewport()
mobileOptimization.optimizeTouch(element)
```

## 🎯 Usage Guidelines

### 1. Language Selection

Always provide both English and Arabic options:

```typescript
<LanguageSelector
  languages={[
    { code: 'en', name: 'English', flag: '🇺🇸', numeralFormat: 'latin' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', numeralFormat: 'arabic' }
  ]}
  selectedLanguage={currentLanguage}
  onLanguageChange={setLanguage}
/>
```

### 2. Phone Input

Use Saudi-specific formatting:

```typescript
<PhoneInput
  countryCode="+966"
  value={phoneNumber}
  onChange={setPhoneNumber}
  onCountryChange={setCountryCode}
  error={phoneError}
/>
```

### 3. RTL Layout

Ensure proper RTL support:

```typescript
// Use logical properties
<div className="ps-4 pe-2">Content</div>

// Check RTL state
const { isRTL } = useRTL()
```

### 4. Accessibility

Always provide proper labels and descriptions:

```typescript
<button
  aria-label="Close dialog"
  aria-describedby="dialog-description"
  onClick={onClose}
>
  <CloseIcon aria-hidden="true" />
</button>
```

## 🔧 Configuration

### Theme Configuration

```typescript
import { defaultTheme } from '@/design-system'

const customTheme = {
  ...defaultTheme,
  light: {
    ...defaultTheme.light,
    colors: {
      ...defaultTheme.light.colors,
      primary: '#custom-color'
    }
  }
}
```

### Performance Configuration

```typescript
import { performanceConfig } from '@/design-system'

const customPerformanceConfig = {
  ...performanceConfig,
  budget: {
    loadTime: 1500, // 1.5 seconds
    firstPaint: 800
  }
}
```

## 📊 Analytics

Built-in analytics for user behavior:

```typescript
import { analytics } from '@/design-system'

// Track user interactions
analytics.track('button_click', {
  component: 'LanguageSelector',
  action: 'language_change',
  value: 'ar'
})
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- React 18+
- TypeScript 5+

### Installation

```bash
npm install @nbcon/design-system
```

### Development

```bash
npm run dev
npm run test
npm run build
```

## 📖 API Reference

### Components

#### LanguageSelector

```typescript
interface LanguageSelectorProps {
  languages: Language[]
  selectedLanguage: string
  onLanguageChange: (code: string) => void
  className?: string
}
```

#### PhoneInput

```typescript
interface PhoneInputProps {
  countryCode: string
  value: string
  onChange: (value: string) => void
  onCountryChange: (code: string) => void
  error?: string
  disabled?: boolean
  className?: string
}
```

### Utilities

#### RTL Utils

```typescript
const rtl = {
  isRTL: () => boolean
  isLTR: () => boolean
  getDirection: () => 'ltr' | 'rtl'
  setDirection: (direction: 'ltr' | 'rtl') => void
}
```

#### Accessibility Utils

```typescript
const focusManagement = {
  trapFocus: (element: HTMLElement) => () => void
  restoreFocus: () => void
  announce: (message: string, priority?: 'polite' | 'assertive') => void
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Documentation: https://design.nbcon.pro
- Issues: https://github.com/nbcon/design-system/issues
- Discussions: https://github.com/nbcon/design-system/discussions

## 🎉 Acknowledgments

- Saudi Council of Engineers (SCE) for verification requirements
- WCAG 2.2 guidelines for accessibility standards
- React community for excellent tooling
- Tailwind CSS for utility-first approach

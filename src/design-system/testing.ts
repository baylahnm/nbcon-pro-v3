// Testing framework for NBCON Pro
// Comprehensive testing utilities for UI/UX validation

import { designTokens } from './tokens'
import { colorContrast, formValidation } from './accessibility'

// Test scenarios for user testing
export const userTestingScenarios = {
  // Onboarding flow testing
  onboarding: {
    engineer: [
      {
        id: 'engineer-onboarding-complete',
        title: 'Complete Engineer Onboarding',
        description: 'Navigate through the complete engineer onboarding flow',
        steps: [
          'Select Arabic language',
          'Choose Engineer role',
          'Enter Saudi phone number (+966 5XXXXXXXX)',
          'Enter OTP code',
          'Fill personal information',
          'Upload credentials (degree, CV)',
          'Select specializations',
          'Set service area on map',
          'Configure rates',
          'Start SCE verification',
          'Grant permissions',
          'Complete tutorial',
          'Reach engineer dashboard'
        ],
        successCriteria: [
          'All steps completed within 10 minutes',
          'SCE verification initiated',
          'Profile completion > 90%',
          'No accessibility errors',
          'RTL layout working correctly'
        ]
      }
    ],
    client: [
      {
        id: 'client-onboarding-complete',
        title: 'Complete Client Onboarding',
        description: 'Navigate through the complete client onboarding flow',
        steps: [
          'Select English language',
          'Choose Client role',
          'Enter phone number',
          'Enter OTP code',
          'Fill personal information',
          'Enter company details',
          'Grant permissions',
          'Complete tutorial',
          'Reach client dashboard'
        ],
        successCriteria: [
          'All steps completed within 8 minutes',
          'Company details saved',
          'Profile completion > 90%',
          'No accessibility errors'
        ]
      }
    ]
  },

  // Component interaction testing
  components: [
    {
      id: 'language-selector',
      title: 'Language Selector Interaction',
      description: 'Test language selection and RTL switching',
      steps: [
        'Click on Arabic language option',
        'Verify RTL layout activation',
        'Check numeral format change',
        'Navigate with keyboard',
        'Test screen reader announcements'
      ],
      successCriteria: [
        'RTL layout activates correctly',
        'Numeral format changes to Arabic',
        'Keyboard navigation works',
        'Screen reader announces changes'
      ]
    },
    {
      id: 'phone-input',
      title: 'Phone Input Validation',
      description: 'Test Saudi phone number input and validation',
      steps: [
        'Enter invalid phone number',
        'Verify error message display',
        'Enter valid Saudi number (+966 5XXXXXXXX)',
        'Verify formatting',
        'Test with different input methods'
      ],
      successCriteria: [
        'Invalid numbers show error',
        'Valid numbers format correctly',
        'Error messages are accessible',
        'RTL input direction works'
      ]
    },
    {
      id: 'otp-input',
      title: 'OTP Input Functionality',
      description: 'Test OTP code input and auto-advance',
      steps: [
        'Enter first digit',
        'Verify auto-advance to next field',
        'Test paste functionality',
        'Enter invalid code',
        'Enter valid code',
        'Test keyboard navigation'
      ],
      successCriteria: [
        'Auto-advance works correctly',
        'Paste functionality works',
        'Invalid codes show error',
        'Valid codes complete flow',
        'Keyboard navigation works'
      ]
    },
    {
      id: 'slide-to-act',
      title: 'Slide to Act Component',
      description: 'Test slide-to-act functionality',
      steps: [
        'Start sliding the handle',
        'Verify progress indication',
        'Complete slide action',
        'Test keyboard activation',
        'Test with different states (loading, success, error)'
      ],
      successCriteria: [
        'Slide progress is smooth',
        'Threshold activation works',
        'Keyboard activation works',
        'State changes are clear',
        'Accessibility announcements work'
      ]
    }
  ],

  // Accessibility testing
  accessibility: [
    {
      id: 'keyboard-navigation',
      title: 'Keyboard Navigation',
      description: 'Test complete keyboard navigation',
      steps: [
        'Navigate through all interactive elements',
        'Test focus management',
        'Verify focus indicators',
        'Test skip links',
        'Test modal focus trapping'
      ],
      successCriteria: [
        'All elements are reachable',
        'Focus order is logical',
        'Focus indicators are visible',
        'Skip links work',
        'Focus trapping works'
      ]
    },
    {
      id: 'screen-reader',
      title: 'Screen Reader Compatibility',
      description: 'Test with screen readers',
      steps: [
        'Test with NVDA (Windows)',
        'Test with VoiceOver (Mac)',
        'Verify ARIA labels',
        'Test live regions',
        'Test form validation announcements'
      ],
      successCriteria: [
        'All content is announced',
        'ARIA labels are descriptive',
        'Live regions work',
        'Form validation is announced',
        'Navigation is clear'
      ]
    },
    {
      id: 'color-contrast',
      title: 'Color Contrast Compliance',
      description: 'Test WCAG 2.2 AA color contrast',
      steps: [
        'Test all text combinations',
        'Test interactive elements',
        'Test focus states',
        'Test error states',
        'Test in both light and dark themes'
      ],
      successCriteria: [
        'All text meets 4.5:1 contrast ratio',
        'Interactive elements meet 3:1 ratio',
        'Focus states are clearly visible',
        'Error states are distinguishable'
      ]
    }
  ],

  // RTL testing
  rtl: [
    {
      id: 'rtl-layout',
      title: 'RTL Layout Testing',
      description: 'Test right-to-left layout functionality',
      steps: [
        'Switch to Arabic language',
        'Verify layout mirroring',
        'Test text alignment',
        'Test icon directions',
        'Test form layouts'
      ],
      successCriteria: [
        'Layout mirrors correctly',
        'Text aligns to right',
        'Icons flip appropriately',
        'Forms work in RTL',
        'Navigation flows correctly'
      ]
    },
    {
      id: 'arabic-typography',
      title: 'Arabic Typography',
      description: 'Test Arabic text rendering and spacing',
      steps: [
        'Test Arabic text display',
        'Verify font family',
        'Test line height',
        'Test letter spacing',
        'Test mixed content (Arabic + English)'
      ],
      successCriteria: [
        'Arabic text renders correctly',
        'Font family is appropriate',
        'Line height is comfortable',
        'Letter spacing is appropriate',
        'Mixed content flows well'
      ]
    }
  ],

  // Performance testing
  performance: [
    {
      id: 'loading-performance',
      title: 'Loading Performance',
      description: 'Test application loading performance',
      steps: [
        'Measure initial load time',
        'Test on slow connections',
        'Test component lazy loading',
        'Test image optimization',
        'Test bundle size'
      ],
      successCriteria: [
        'Initial load < 2 seconds',
        'Works on 3G connections',
        'Components load on demand',
        'Images are optimized',
        'Bundle size is reasonable'
      ]
    },
    {
      id: 'interaction-performance',
      title: 'Interaction Performance',
      description: 'Test user interaction responsiveness',
      steps: [
        'Test button click response',
        'Test form input response',
        'Test navigation speed',
        'Test animation performance',
        'Test scroll performance'
      ],
      successCriteria: [
        'Button clicks respond < 100ms',
        'Form inputs are responsive',
        'Navigation is smooth',
        'Animations are smooth',
        'Scrolling is smooth'
      ]
    }
  ]
}

// Automated testing utilities
export const testingUtils = {
  // Color contrast testing
  testColorContrast: (foreground: string, background: string) => {
    const ratio = colorContrast.getContrastRatio(foreground, background)
    const meetsWCAGAA = colorContrast.meetsWCAGAA(foreground, background)
    
    return {
      ratio,
      meetsWCAGAA,
      level: meetsWCAGAA ? 'AA' : 'Fail',
      recommendation: meetsWCAGAA 
        ? 'Meets WCAG 2.2 AA standards'
        : 'Does not meet WCAG 2.2 AA standards. Consider increasing contrast.'
    }
  },

  // Form validation testing
  testFormValidation: (value: string, type: 'email' | 'phone' | 'otp') => {
    let isValid = false
    let errorMessage = ''

    switch (type) {
      case 'email':
        isValid = formValidation.validateEmail(value)
        errorMessage = isValid ? '' : formValidation.getErrorMessage('Email', 'email')
        break
      case 'phone':
        isValid = formValidation.validatePhone(value)
        errorMessage = isValid ? '' : formValidation.getErrorMessage('Phone', 'phone')
        break
      case 'otp':
        isValid = formValidation.validateOTP(value)
        errorMessage = isValid ? '' : formValidation.getErrorMessage('OTP', 'otp')
        break
    }

    return {
      isValid,
      errorMessage,
      value
    }
  },

  // Accessibility testing
  testAccessibility: (element: HTMLElement) => {
    const issues: string[] = []
    
    // Check for required ARIA attributes
    if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
      issues.push('Missing aria-label or aria-labelledby')
    }
    
    // Check for proper roles
    const interactiveElements = ['button', 'link', 'input', 'select', 'textarea']
    if (interactiveElements.includes(element.tagName.toLowerCase()) && !element.getAttribute('role')) {
      // This is okay, native elements have implicit roles
    }
    
    // Check for focus management
    if (element.tabIndex === -1 && element.getAttribute('role') === 'button') {
      issues.push('Button with role="button" should be focusable')
    }
    
    // Check for color contrast
    const computedStyle = window.getComputedStyle(element)
    const color = computedStyle.color
    const backgroundColor = computedStyle.backgroundColor
    
    if (color && backgroundColor) {
      const contrast = colorContrast.getContrastRatio(color, backgroundColor)
      if (contrast < 4.5) {
        issues.push(`Color contrast ratio ${contrast.toFixed(2)} is below WCAG 2.2 AA standard (4.5)`)
      }
    }
    
    return {
      hasIssues: issues.length > 0,
      issues,
      score: Math.max(0, 100 - (issues.length * 20))
    }
  },

  // RTL testing
  testRTL: (element: HTMLElement) => {
    const issues: string[] = []
    
    // Check if element respects RTL direction
    const computedStyle = window.getComputedStyle(element)
    const direction = computedStyle.direction
    
    if (direction === 'rtl') {
      // Check for proper text alignment
      const textAlign = computedStyle.textAlign
      if (textAlign === 'left') {
        issues.push('Text should be aligned to the right in RTL mode')
      }
      
      // Check for proper margins/padding
      const marginLeft = computedStyle.marginLeft
      const marginRight = computedStyle.marginRight
      if (marginLeft !== '0px' && marginRight === '0px') {
        issues.push('Consider using logical properties for margins in RTL')
      }
    }
    
    return {
      hasIssues: issues.length > 0,
      issues,
      direction
    }
  },

  // Performance testing
  testPerformance: (callback: () => void) => {
    const start = performance.now()
    callback()
    const end = performance.now()
    
    return {
      duration: end - start,
      isAcceptable: end - start < 16, // 60fps threshold
      recommendation: end - start < 16 
        ? 'Performance is acceptable'
        : 'Consider optimizing for better performance'
    }
  }
}

// Test result aggregation
export const testResults = {
  // Aggregate test results
  aggregate: (results: any[]) => {
    const total = results.length
    const passed = results.filter(r => r.passed).length
    const failed = total - passed
    const score = (passed / total) * 100
    
    return {
      total,
      passed,
      failed,
      score: Math.round(score),
      status: score >= 80 ? 'PASS' : score >= 60 ? 'WARN' : 'FAIL'
    }
  },

  // Generate test report
  generateReport: (results: any[]) => {
    const aggregated = testResults.aggregate(results)
    
    return {
      summary: {
        total: aggregated.total,
        passed: aggregated.passed,
        failed: aggregated.failed,
        score: aggregated.score,
        status: aggregated.status
      },
      details: results.map(result => ({
        test: result.test,
        status: result.passed ? 'PASS' : 'FAIL',
        issues: result.issues || [],
        recommendations: result.recommendations || []
      })),
      recommendations: aggregated.status === 'FAIL' 
        ? ['Review failed tests and address issues', 'Consider additional testing']
        : aggregated.status === 'WARN'
        ? ['Address warning issues for better quality']
        : ['Great job! All tests passed']
    }
  }
}

// Test configuration
export const testConfig = {
  // Test timeouts
  timeouts: {
    short: 1000,
    medium: 5000,
    long: 10000
  },
  
  // Test thresholds
  thresholds: {
    performance: {
      maxLoadTime: 2000,
      maxInteractionTime: 100
    },
    accessibility: {
      minContrastRatio: 4.5,
      maxIssues: 0
    },
    usability: {
      minCompletionRate: 0.8,
      maxErrorRate: 0.1
    }
  },
  
  // Test environments
  environments: {
    desktop: {
      viewport: { width: 1920, height: 1080 },
      userAgent: 'desktop'
    },
    tablet: {
      viewport: { width: 768, height: 1024 },
      userAgent: 'tablet'
    },
    mobile: {
      viewport: { width: 375, height: 667 },
      userAgent: 'mobile'
    }
  }
}

export type UserTestingScenarios = typeof userTestingScenarios
export type TestingUtils = typeof testingUtils
export type TestResults = typeof testResults
export type TestConfig = typeof testConfig

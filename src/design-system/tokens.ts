// Design System Tokens for NBCON Pro
// Based on Saudi market requirements and WCAG 2.2 AA compliance

export const designTokens = {
  // Brand Colors
  brand: {
    primary: '#00D084',
    primaryDark: '#00B875',
    primaryLight: '#33D99A',
    secondary: '#0D1B0F',
    tertiary: '#1A2D1C',
    surface: '#243027',
  },

  // Semantic Colors
  semantic: {
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
  },

  // Neutral Colors
  neutral: {
    0: '#ffffff',
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Typography
  typography: {
    fontFamily: {
      primary: ['Inter', 'system-ui', 'sans-serif'],
      arabic: ['Noto Sans Arabic', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },

  // Spacing Scale
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Focus States
  focus: {
    ring: '2px solid #00D084',
    ringOffset: '2px',
    ringOffsetColor: '#ffffff',
    ringDark: '2px solid #0D1B0F',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Animation
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Accessibility
  accessibility: {
    touchTarget: '44px',
    minContrast: 4.5,
    focusVisible: '2px solid #00D084',
  },
} as const;

// Theme variants
export const lightTheme = {
  ...designTokens,
  colors: {
    background: designTokens.neutral[0],
    foreground: designTokens.neutral[900],
    muted: designTokens.neutral[100],
    mutedForeground: designTokens.neutral[500],
    border: designTokens.neutral[200],
    input: designTokens.neutral[200],
    primary: designTokens.brand.primary,
    primaryForeground: designTokens.neutral[0],
    secondary: designTokens.neutral[100],
    secondaryForeground: designTokens.neutral[900],
    accent: designTokens.neutral[100],
    accentForeground: designTokens.neutral[900],
    destructive: designTokens.semantic.error[500],
    destructiveForeground: designTokens.neutral[0],
    ring: designTokens.brand.primary,
  },
};

export const darkTheme = {
  ...designTokens,
  colors: {
    background: designTokens.brand.secondary,
    foreground: designTokens.neutral[0],
    muted: designTokens.brand.tertiary,
    mutedForeground: designTokens.neutral[400],
    border: designTokens.brand.surface,
    input: designTokens.brand.surface,
    primary: designTokens.brand.primary,
    primaryForeground: designTokens.brand.secondary,
    secondary: designTokens.brand.tertiary,
    secondaryForeground: designTokens.neutral[0],
    accent: designTokens.brand.surface,
    accentForeground: designTokens.neutral[0],
    destructive: designTokens.semantic.error[500],
    destructiveForeground: designTokens.neutral[0],
    ring: designTokens.brand.primary,
  },
};

// RTL Support
export const rtlTokens = {
  direction: {
    ltr: 'ltr',
    rtl: 'rtl',
  },
  textAlign: {
    start: 'start',
    end: 'end',
  },
  margin: {
    start: 'margin-inline-start',
    end: 'margin-inline-end',
  },
  padding: {
    start: 'padding-inline-start',
    end: 'padding-inline-end',
  },
  border: {
    start: 'border-inline-start',
    end: 'border-inline-end',
  },
} as const;

export type DesignTokens = typeof designTokens;
export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
export type RTLTokens = typeof rtlTokens;

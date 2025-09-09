// Accessibility utilities for NBCON Pro
// WCAG 2.2 AA compliance helpers

import { designTokens } from './tokens';

// Focus management utilities
export const focusManagement = {
  // Trap focus within an element
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  // Restore focus to previous element
  restoreFocus: (() => {
    let previousElement: HTMLElement | null = null;
    
    return {
      save: () => {
        previousElement = document.activeElement as HTMLElement;
      },
      restore: () => {
        if (previousElement) {
          previousElement.focus();
          previousElement = null;
        }
      }
    };
  })(),

  // Announce to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
};

// Keyboard navigation utilities
export const keyboardNavigation = {
  // Arrow key navigation for lists
  handleArrowKeys: (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    orientation: 'horizontal' | 'vertical' = 'vertical'
  ) => {
    const isVertical = orientation === 'vertical';
    const isRTL = document.documentElement.dir === 'rtl';
    
    let nextIndex = currentIndex;
    
    switch (event.key) {
      case isVertical ? 'ArrowDown' : (isRTL ? 'ArrowLeft' : 'ArrowRight'):
        nextIndex = Math.min(currentIndex + 1, items.length - 1);
        break;
      case isVertical ? 'ArrowUp' : (isRTL ? 'ArrowRight' : 'ArrowLeft'):
        nextIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      default:
        return currentIndex;
    }
    
    event.preventDefault();
    items[nextIndex]?.focus();
    return nextIndex;
  },

  // Escape key handler
  handleEscape: (callback: () => void) => {
    return (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        callback();
      }
    };
  },

  // Enter/Space key handler
  handleActivation: (callback: () => void) => {
    return (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callback();
      }
    };
  }
};

// Screen reader utilities
export const screenReader = {
  // Hide element from screen readers
  hide: (element: HTMLElement) => {
    element.setAttribute('aria-hidden', 'true');
  },

  // Show element to screen readers
  show: (element: HTMLElement) => {
    element.removeAttribute('aria-hidden');
  },

  // Create screen reader only text
  createSRText: (text: string) => {
    const element = document.createElement('span');
    element.className = 'sr-only';
    element.textContent = text;
    return element;
  },

  // Update live region
  updateLiveRegion: (element: HTMLElement, message: string) => {
    element.textContent = message;
  }
};

// Color contrast utilities
export const colorContrast = {
  // Calculate relative luminance
  getLuminance: (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Calculate contrast ratio
  getContrastRatio: (color1: string, color2: string) => {
    const parseColor = (color: string) => {
      const hex = color.replace('#', '');
      return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16)
      };
    };

    const c1 = parseColor(color1);
    const c2 = parseColor(color2);
    
    const l1 = colorContrast.getLuminance(c1.r, c1.g, c1.b);
    const l2 = colorContrast.getLuminance(c2.r, c2.g, c2.b);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Check if contrast meets WCAG AA standards
  meetsWCAGAA: (foreground: string, background: string) => {
    const ratio = colorContrast.getContrastRatio(foreground, background);
    return ratio >= designTokens.accessibility.minContrast;
  }
};

// RTL utilities
export const rtlUtils = {
  // Get appropriate margin/padding direction
  getLogicalProperty: (property: 'margin' | 'padding', side: 'start' | 'end') => {
    const isRTL = document.documentElement.dir === 'rtl';
    const logicalSide = isRTL ? (side === 'start' ? 'end' : 'start') : side;
    return `${property}-${logicalSide}`;
  },

  // Get appropriate text alignment
  getTextAlign: (align: 'start' | 'end' | 'left' | 'right') => {
    const isRTL = document.documentElement.dir === 'rtl';
    
    switch (align) {
      case 'start':
        return isRTL ? 'right' : 'left';
      case 'end':
        return isRTL ? 'left' : 'right';
      default:
        return align;
    }
  },

  // Get appropriate transform for icons
  getIconTransform: (baseTransform: string = '') => {
    const isRTL = document.documentElement.dir === 'rtl';
    return isRTL ? `${baseTransform} scaleX(-1)`.trim() : baseTransform;
  }
};

// Form validation utilities
export const formValidation = {
  // Validate required fields
  validateRequired: (value: string | number | boolean) => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  // Validate email format
  validateEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number (Saudi format)
  validatePhone: (phone: string) => {
    const phoneRegex = /^\+966\s?5\d{8}$/;
    return phoneRegex.test(phone);
  },

  // Validate OTP code
  validateOTP: (code: string, length: number = 4) => {
    const otpRegex = new RegExp(`^\\d{${length}}$`);
    return otpRegex.test(code);
  },

  // Get validation error message
  getErrorMessage: (field: string, error: string) => {
    const errorMessages: Record<string, Record<string, string>> = {
      en: {
        required: `${field} is required`,
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid Saudi phone number (+966 5XXXXXXXX)',
        otp: 'Please enter a valid verification code',
        minLength: `Please enter at least ${field} characters`,
        maxLength: `Please enter no more than ${field} characters`
      },
      ar: {
        required: `${field} مطلوب`,
        email: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
        phone: 'يرجى إدخال رقم هاتف سعودي صحيح (+966 5XXXXXXXX)',
        otp: 'يرجى إدخال رمز التحقق الصحيح',
        minLength: `يرجى إدخال ${field} أحرف على الأقل`,
        maxLength: `يرجى إدخال ${field} أحرف كحد أقصى`
      }
    };

    const locale = document.documentElement.lang || 'en';
    return errorMessages[locale]?.[error] || errorMessages.en[error] || error;
  }
};

// Animation utilities for accessibility
export const accessibleAnimation = {
  // Respect user's motion preferences
  shouldAnimate: () => {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Get appropriate animation duration
  getDuration: (baseDuration: number = 300) => {
    return accessibleAnimation.shouldAnimate() ? baseDuration : 0;
  },

  // Create accessible transition
  createTransition: (properties: string[], duration: number = 300) => {
    if (!accessibleAnimation.shouldAnimate()) {
      return 'none';
    }
    
    return properties
      .map(prop => `${prop} ${duration}ms ${designTokens.animation.easing.inOut}`)
      .join(', ');
  }
};

// High contrast mode detection
export const highContrast = {
  // Check if high contrast mode is enabled
  isEnabled: () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Apply high contrast styles
  applyStyles: (element: HTMLElement) => {
    if (highContrast.isEnabled()) {
      element.style.border = '2px solid';
      element.style.outline = '2px solid';
    }
  }
};

// Touch target utilities
export const touchTargets = {
  // Ensure minimum touch target size
  ensureMinSize: (element: HTMLElement) => {
    const minSize = designTokens.accessibility.touchTarget;
    element.style.minWidth = minSize;
    element.style.minHeight = minSize;
  },

  // Add touch target padding
  addPadding: (element: HTMLElement, padding: number = 8) => {
    element.style.padding = `${padding}px`;
  }
};

export type FocusManagement = typeof focusManagement;
export type KeyboardNavigation = typeof keyboardNavigation;
export type ScreenReader = typeof screenReader;
export type ColorContrast = typeof colorContrast;
export type RTLUtils = typeof rtlUtils;
export type FormValidation = typeof formValidation;
export type AccessibleAnimation = typeof accessibleAnimation;
export type HighContrast = typeof highContrast;
export type TouchTargets = typeof touchTargets;

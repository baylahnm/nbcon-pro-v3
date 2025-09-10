// RTL (Right-to-Left) support utilities for NBCON Pro
// Comprehensive Arabic language and layout support

import { rtlTokens } from './tokens';

// RTL direction detection
export const rtl = {
  isRTL: () => document.documentElement.dir === 'rtl',
  isLTR: () => document.documentElement.dir === 'ltr',
  
  // Get current language direction
  getDirection: () => document.documentElement.dir as 'ltr' | 'rtl',
  
  // Set document direction
  setDirection: (direction: 'ltr' | 'rtl') => {
    document.documentElement.dir = direction;
    document.documentElement.setAttribute('data-direction', direction);
  }
};

// Logical properties for RTL-aware styling
export const logicalProperties = {
  // Margin logical properties
  margin: {
    start: (value: string) => rtl.isRTL() ? `margin-right: ${value}` : `margin-left: ${value}`,
    end: (value: string) => rtl.isRTL() ? `margin-left: ${value}` : `margin-right: ${value}`,
    inlineStart: (value: string) => `margin-inline-start: ${value}`,
    inlineEnd: (value: string) => `margin-inline-end: ${value}`,
  },
  
  // Padding logical properties
  padding: {
    start: (value: string) => rtl.isRTL() ? `padding-right: ${value}` : `padding-left: ${value}`,
    end: (value: string) => rtl.isRTL() ? `padding-left: ${value}` : `padding-right: ${value}`,
    inlineStart: (value: string) => `padding-inline-start: ${value}`,
    inlineEnd: (value: string) => `padding-inline-end: ${value}`,
  },
  
  // Border logical properties
  border: {
    start: (value: string) => rtl.isRTL() ? `border-right: ${value}` : `border-left: ${value}`,
    end: (value: string) => rtl.isRTL() ? `border-left: ${value}` : `border-right: ${value}`,
    inlineStart: (value: string) => `border-inline-start: ${value}`,
    inlineEnd: (value: string) => `border-inline-end: ${value}`,
  },
  
  // Text alignment
  textAlign: {
    start: () => 'text-start',
    end: () => 'text-end',
    inlineStart: 'text-inline-start',
    inlineEnd: 'text-inline-end',
  }
};

// Icon direction utilities
export const iconDirection = {
  // Flip horizontal icons for RTL
  flipHorizontal: (baseTransform: string = '') => {
    return rtl.isRTL() ? `${baseTransform} scaleX(-1)`.trim() : baseTransform;
  },
  
  // Flip vertical icons for RTL (if needed)
  flipVertical: (baseTransform: string = '') => {
    return rtl.isRTL() ? `${baseTransform} scaleY(-1)`.trim() : baseTransform;
  },
  
  // Get appropriate chevron direction
  getChevronDirection: (direction: 'left' | 'right') => {
    if (rtl.isRTL()) {
      return direction === 'left' ? 'right' : 'left';
    }
    return direction;
  },
  
  // Get appropriate arrow direction
  getArrowDirection: (direction: 'left' | 'right') => {
    return iconDirection.getChevronDirection(direction);
  }
};

// Layout utilities for RTL
export const layout = {
  // Get flex direction for RTL
  getFlexDirection: (baseDirection: 'row' | 'row-reverse') => {
    if (rtl.isRTL() && baseDirection === 'row') {
      return 'row-reverse';
    }
    return baseDirection;
  },
  
  // Get grid column order for RTL
  getGridOrder: (baseOrder: number) => {
    return rtl.isRTL() ? -baseOrder : baseOrder;
  },
  
  // Get appropriate float direction
  getFloat: (direction: 'left' | 'right') => {
    return rtl.isRTL() ? (direction === 'left' ? 'right' : 'left') : direction;
  }
};

// Typography utilities for Arabic
export const typography = {
  // Get appropriate font family
  getFontFamily: (isArabic: boolean = false) => {
    return isArabic ? rtlTokens.fontFamily.arabic : rtlTokens.fontFamily.primary;
  },
  
  // Get appropriate line height for Arabic
  getLineHeight: (baseLineHeight: number) => {
    // Arabic text typically needs more line height
    return rtl.isRTL() ? baseLineHeight * 1.2 : baseLineHeight;
  },
  
  // Get appropriate letter spacing for Arabic
  getLetterSpacing: (baseSpacing: number) => {
    // Arabic text typically needs less letter spacing
    return rtl.isRTL() ? baseSpacing * 0.8 : baseSpacing;
  }
};

// Form utilities for RTL
export const form = {
  // Get appropriate input direction
  getInputDirection: (type: 'text' | 'email' | 'tel' | 'number') => {
    if (rtl.isRTL() && type === 'number') {
      return 'ltr'; // Numbers should always be LTR
    }
    return rtl.getDirection();
  },
  
  // Get appropriate placeholder alignment
  getPlaceholderAlign: () => {
    return 'text-start';
  },
  
  // Get appropriate label alignment
  getLabelAlign: () => {
    return 'text-start';
  }
};

// Navigation utilities for RTL
export const navigation = {
  // Get appropriate breadcrumb direction
  getBreadcrumbDirection: () => {
    return rtl.isRTL() ? 'flex-row-reverse' : 'flex-row';
  },
  
  // Get appropriate menu alignment
  getMenuAlign: (baseAlign: 'left' | 'right') => {
    return rtl.isRTL() ? (baseAlign === 'left' ? 'right' : 'left') : baseAlign;
  },
  
  // Get appropriate dropdown direction
  getDropdownDirection: (baseDirection: 'left' | 'right') => {
    return rtl.isRTL() ? (baseDirection === 'left' ? 'right' : 'left') : baseDirection;
  }
};

// Date and time utilities for RTL
export const dateTime = {
  // Get appropriate date format
  getDateFormat: (includeHijri: boolean = false) => {
    if (rtl.isRTL() && includeHijri) {
      return 'DD/MM/YYYY (Hijri)';
    }
    return rtl.isRTL() ? 'DD/MM/YYYY' : 'MM/DD/YYYY';
  },
  
  // Get appropriate time format
  getTimeFormat: () => {
    return rtl.isRTL() ? 'HH:mm' : 'h:mm A';
  },
  
  // Get appropriate number format
  getNumberFormat: (useArabicNumerals: boolean = false) => {
    if (rtl.isRTL() && useArabicNumerals) {
      return 'arabic';
    }
    return 'latin';
  }
};

// Animation utilities for RTL
export const animation = {
  // Get appropriate slide direction
  getSlideDirection: (baseDirection: 'left' | 'right') => {
    return rtl.isRTL() ? (baseDirection === 'left' ? 'right' : 'left') : baseDirection;
  },
  
  // Get appropriate transform for RTL
  getTransform: (baseTransform: string) => {
    if (rtl.isRTL() && baseTransform.includes('translateX')) {
      return baseTransform.replace('translateX', 'translateX').replace(/-/g, '+').replace(/\+/g, '-');
    }
    return baseTransform;
  }
};

// Utility function to apply RTL-aware classes
export const applyRTLClasses = (baseClasses: string, rtlClasses: string = '') => {
  return rtl.isRTL() ? `${baseClasses} ${rtlClasses}` : baseClasses;
};

// Utility function to get RTL-aware value
export const getRTLValue = <T>(ltrValue: T, rtlValue: T): T => {
  return rtl.isRTL() ? rtlValue : ltrValue;
};

// Hook for RTL state management
export const useRTL = () => {
  const [isRTL, setIsRTL] = React.useState(rtl.isRTL());
  
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsRTL(rtl.isRTL());
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    });
    
    return () => observer.disconnect();
  }, []);
  
  return {
    isRTL,
    isLTR: !isRTL,
    direction: rtl.getDirection(),
    setDirection: rtl.setDirection
  };
};

export type RTL = typeof rtl;
export type LogicalProperties = typeof logicalProperties;
export type IconDirection = typeof iconDirection;
export type Layout = typeof layout;
export type Typography = typeof typography;
export type Form = typeof form;
export type Navigation = typeof navigation;
export type DateTime = typeof dateTime;
export type Animation = typeof animation;

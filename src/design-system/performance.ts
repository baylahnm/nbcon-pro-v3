// Performance optimization utilities for NBCON Pro
// Mobile-first performance enhancements

import { designTokens } from './tokens'

// Performance monitoring
export const performanceMonitor = {
  // Measure performance metrics
  measure: (name: string, fn: () => void) => {
    const start = performance.now()
    fn()
    const end = performance.now()
    const duration = end - start
    
    // Log performance metrics
    console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`)
    
    return {
      name,
      duration,
      isAcceptable: duration < 16, // 60fps threshold
      timestamp: Date.now()
    }
  },

  // Measure async operations
  measureAsync: async (name: string, fn: () => Promise<void>) => {
    const start = performance.now()
    await fn()
    const end = performance.now()
    const duration = end - start
    
    console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`)
    
    return {
      name,
      duration,
      isAcceptable: duration < 100, // 100ms threshold for async
      timestamp: Date.now()
    }
  },

  // Get performance metrics
  getMetrics: () => {
    if ('performance' in window && 'getEntriesByType' in window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')
      
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        timeToInteractive: navigation.loadEventEnd - navigation.fetchStart
      }
    }
    
    return null
  }
}

// Image optimization
export const imageOptimization = {
  // Generate responsive image sources
  generateSrcSet: (baseUrl: string, sizes: number[]) => {
    return sizes.map(size => `${baseUrl}?w=${size} ${size}w`).join(', ')
  },

  // Generate responsive image sizes
  generateSizes: (breakpoints: { [key: string]: string }) => {
    return Object.entries(breakpoints)
      .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
      .join(', ')
  },

  // Lazy load images
  lazyLoad: (img: HTMLImageElement, src: string, srcSet?: string) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement
          image.src = src
          if (srcSet) image.srcset = srcSet
          image.classList.remove('lazy')
          observer.unobserve(image)
        }
      })
    })
    
    observer.observe(img)
  },

  // Preload critical images
  preload: (src: string, as: 'image' = 'image') => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = src
    link.as = as
    document.head.appendChild(link)
  }
}

// Code splitting utilities
export const codeSplitting = {
  // Lazy load components
  lazyLoad: <T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
  ) => {
    return React.lazy(importFunc)
  },

  // Preload components
  preload: (importFunc: () => Promise<any>) => {
    return importFunc()
  },

  // Load components on demand
  loadOnDemand: (importFunc: () => Promise<any>, condition: boolean) => {
    if (condition) {
      return importFunc()
    }
    return Promise.resolve(null)
  }
}

// Bundle optimization
export const bundleOptimization = {
  // Analyze bundle size
  analyzeBundle: () => {
    if ('performance' in window && 'getEntriesByType' in window.performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      const scripts = resources.filter(r => r.name.includes('.js'))
      const styles = resources.filter(r => r.name.includes('.css'))
      
      return {
        scripts: scripts.map(s => ({
          name: s.name,
          size: s.transferSize,
          duration: s.duration
        })),
        styles: styles.map(s => ({
          name: s.name,
          size: s.transferSize,
          duration: s.duration
        })),
        totalSize: scripts.reduce((sum, s) => sum + s.transferSize, 0) + 
                  styles.reduce((sum, s) => sum + s.transferSize, 0)
      }
    }
    
    return null
  },

  // Optimize imports
  optimizeImports: (imports: string[]) => {
    // Group imports by type
    const grouped = imports.reduce((acc, imp) => {
      const type = imp.split('/')[0]
      if (!acc[type]) acc[type] = []
      acc[type].push(imp)
      return acc
    }, {} as Record<string, string[]>)
    
    return grouped
  }
}

// Memory management
export const memoryManagement = {
  // Clean up event listeners
  cleanup: (element: HTMLElement, eventType: string, handler: EventListener) => {
    element.removeEventListener(eventType, handler)
  },

  // Clean up intervals
  cleanupInterval: (intervalId: number) => {
    clearInterval(intervalId)
  },

  // Clean up timeouts
  cleanupTimeout: (timeoutId: number) => {
    clearTimeout(timeoutId)
  },

  // Clean up observers
  cleanupObserver: (observer: IntersectionObserver | MutationObserver) => {
    observer.disconnect()
  }
}

// Caching utilities
export const caching = {
  // Simple in-memory cache
  createCache: <T>(maxSize: number = 100) => {
    const cache = new Map<string, T>()
    
    return {
      get: (key: string) => cache.get(key),
      set: (key: string, value: T) => {
        if (cache.size >= maxSize) {
          const firstKey = cache.keys().next().value
          cache.delete(firstKey)
        }
        cache.set(key, value)
      },
      clear: () => cache.clear(),
      size: () => cache.size
    }
  },

  // Local storage cache
  createLocalStorageCache: <T>(key: string, ttl: number = 3600000) => {
    return {
      get: (): T | null => {
        try {
          const item = localStorage.getItem(key)
          if (!item) return null
          
          const { value, timestamp } = JSON.parse(item)
          if (Date.now() - timestamp > ttl) {
            localStorage.removeItem(key)
            return null
          }
          
          return value
        } catch {
          return null
        }
      },
      set: (value: T) => {
        try {
          localStorage.setItem(key, JSON.stringify({
            value,
            timestamp: Date.now()
          }))
        } catch {
          // Handle storage quota exceeded
        }
      },
      clear: () => localStorage.removeItem(key)
    }
  }
}

// Animation optimization
export const animationOptimization = {
  // Use requestAnimationFrame for smooth animations
  animate: (callback: (progress: number) => void, duration: number = 300) => {
    const start = performance.now()
    
    const frame = (currentTime: number) => {
      const progress = Math.min((currentTime - start) / duration, 1)
      callback(progress)
      
      if (progress < 1) {
        requestAnimationFrame(frame)
      }
    }
    
    requestAnimationFrame(frame)
  },

  // Debounce animations
  debounce: (func: Function, wait: number) => {
    let timeout: number
    return (...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  },

  // Throttle animations
  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean
    return (...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}

// Network optimization
export const networkOptimization = {
  // Retry failed requests
  retry: async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    let lastError: Error
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error as Error
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
        }
      }
    }
    
    throw lastError!
  },

  // Batch requests
  batch: <T>(requests: (() => Promise<T>)[], batchSize: number = 5) => {
    const batches: (() => Promise<T>)[][] = []
    for (let i = 0; i < requests.length; i += batchSize) {
      batches.push(requests.slice(i, i + batchSize))
    }
    
    return batches.map(batch => Promise.all(batch.map(req => req())))
  },

  // Prefetch resources
  prefetch: (url: string, as: 'script' | 'style' | 'image' = 'script') => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    link.as = as
    document.head.appendChild(link)
  }
}

// Mobile optimization
export const mobileOptimization = {
  // Touch event optimization
  optimizeTouch: (element: HTMLElement) => {
    element.style.touchAction = 'manipulation'
    element.style.userSelect = 'none'
  },

  // Viewport optimization
  optimizeViewport: () => {
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      )
    }
  },

  // Reduce motion for better performance
  reduceMotion: () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-duration', '0ms')
    }
  }
}

// Performance budget
export const performanceBudget = {
  // Check if performance is within budget
  checkBudget: () => {
    const metrics = performanceMonitor.getMetrics()
    if (!metrics) return null
    
    const budget = {
      loadTime: 2000,
      firstPaint: 1000,
      firstContentfulPaint: 1500,
      timeToInteractive: 3000
    }
    
    return {
      loadTime: {
        value: metrics.loadTime,
        budget: budget.loadTime,
        withinBudget: metrics.loadTime <= budget.loadTime
      },
      firstPaint: {
        value: metrics.firstPaint,
        budget: budget.firstPaint,
        withinBudget: metrics.firstPaint <= budget.firstPaint
      },
      firstContentfulPaint: {
        value: metrics.firstContentfulPaint,
        budget: budget.firstContentfulPaint,
        withinBudget: metrics.firstContentfulPaint <= budget.firstContentfulPaint
      },
      timeToInteractive: {
        value: metrics.timeToInteractive,
        budget: budget.timeToInteractive,
        withinBudget: metrics.timeToInteractive <= budget.timeToInteractive
      }
    }
  },

  // Get performance score
  getScore: () => {
    const budget = performanceBudget.checkBudget()
    if (!budget) return null
    
    const scores = Object.values(budget).map(metric => 
      metric.withinBudget ? 100 : Math.max(0, 100 - (metric.value / metric.budget) * 100)
    )
    
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }
}

export type PerformanceMonitor = typeof performanceMonitor
export type ImageOptimization = typeof imageOptimization
export type CodeSplitting = typeof codeSplitting
export type BundleOptimization = typeof bundleOptimization
export type MemoryManagement = typeof memoryManagement
export type Caching = typeof caching
export type AnimationOptimization = typeof animationOptimization
export type NetworkOptimization = typeof networkOptimization
export type MobileOptimization = typeof mobileOptimization
export type PerformanceBudget = typeof performanceBudget

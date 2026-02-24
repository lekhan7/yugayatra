// Google Analytics Hook for React SPA
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Google Analytics tracking ID
const GA_TRACKING_ID = 'G-ZSD8RSE41D'

// Initialize gtag function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

// Track page views
export const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversions
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: `${GA_TRACKING_ID}/${conversionId}`,
      value: value,
      currency: 'INR',
    })
  }
}

// Track contact form submissions
export const trackContactForm = () => {
  trackEvent('submit', 'contact_form', 'contact_submission')
}

// Track internship applications
export const trackInternshipApplication = () => {
  trackEvent('submit', 'internship_form', 'internship_application')
}

// Track project requests
export const trackProjectRequest = () => {
  trackEvent('submit', 'project_form', 'project_request')
}

// Track page scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll', 'engagement', `scroll_${depth}%`)
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'button', `${buttonName}_${location}`)
}

// Track navigation clicks
export const trackNavigation = (section: string) => {
  trackEvent('navigate', 'navigation', section)
}

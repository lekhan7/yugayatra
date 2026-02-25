import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const DEFAULT_SETTINGS = {
  themeMode: 'light',
  customPrimaryColor: '#E8834A',
  customTextColor: '#2D1810',
  fontFamily: 'Inter',
  fontSize: 'medium',
  animationsEnabled: true,
  animationSpeed: 'normal',
  uiDensity: 'comfortable'
}

const FONT_FAMILIES = {
  'Inter': 'Inter, system-ui, sans-serif',
  'Poppins': 'Poppins, system-ui, sans-serif',
  'Roboto': 'Roboto, system-ui, sans-serif',
  'Open Sans': 'Open Sans, system-ui, sans-serif',
  'Lato': 'Lato, system-ui, sans-serif'
}

const FONT_SIZES = {
  'small': '14px',
  'medium': '16px',
  'large': '18px'
}

const ANIMATION_SPEEDS = {
  'slow': '0.5s',
  'normal': '0.3s',
  'fast': '0.15s'
}

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('admin-settings')
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        setSettings(prev => ({ ...prev, ...parsed }))
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Apply CSS variables whenever settings change
  useEffect(() => {
    if (!isLoaded) return

    const root = document.documentElement
    
    // Apply theme mode
    if (settings.themeMode === 'dark') {
      document.body.classList.add('dark')
      document.body.removeAttribute('data-theme')
    } else if (settings.themeMode === 'custom') {
      document.body.classList.remove('dark')
      document.body.setAttribute('data-theme', 'custom')
    } else {
      document.body.classList.remove('dark')
      document.body.removeAttribute('data-theme')
    }

    // Apply CSS variables
    root.style.setProperty('--primary-color', settings.customPrimaryColor)
    root.style.setProperty('--text-color', settings.customTextColor)
    root.style.setProperty('--font-family', FONT_FAMILIES[settings.fontFamily])
    root.style.setProperty('--font-size', FONT_SIZES[settings.fontSize])
    root.style.setProperty('--animation-speed', ANIMATION_SPEEDS[settings.animationSpeed])
    
    // Apply animations toggle
    if (settings.animationsEnabled) {
      root.style.setProperty('--animation-duration', ANIMATION_SPEEDS[settings.animationSpeed])
      document.body.classList.remove('no-animations')
    } else {
      document.body.classList.add('no-animations')
      root.style.setProperty('--animation-duration', '0s')
    }

    // Apply UI density
    document.body.classList.remove('ui-compact', 'ui-comfortable')
    document.body.classList.add(`ui-${settings.uiDensity}`)

  }, [settings, isLoaded])

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const saveSettings = useCallback(() => {
    try {
      localStorage.setItem('admin-settings', JSON.stringify(settings))
      return true
    } catch (error) {
      console.error('Failed to save settings:', error)
      return false
    }
  }, [settings])

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
    try {
      localStorage.removeItem('admin-settings')
      return true
    } catch (error) {
      console.error('Failed to reset settings:', error)
      return false
    }
  }, [])

  const value = {
    settings,
    updateSetting,
    saveSettings,
    resetSettings,
    isLoaded
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const DashboardSettingsContext = createContext()

const defaultSettings = {
  // Layout Settings
  layout: {
    gridColumns: {
      mobile: 1,
      tablet: 2,
      desktop: 4
    },
    componentOrder: [
      'stats',
      'charts',
      'monthly',
      'activity'
    ],
    componentVisibility: {
      stats: true,
      charts: true,
      monthly: true,
      activity: true
    },
    spacing: 'medium',
    cardHeight: 'auto'
  },

  // Theme Settings
  theme: {
    mode: 'light',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    accentColor: '#10b981',
    backgroundGradient: true,
    cardShadows: true,
    borderRadius: 'medium',
    // Admin page specific colors
    adminBackground: '#f9fafb',
    adminCardBackground: '#ffffff',
    adminTextPrimary: '#111827',
    adminTextSecondary: '#6b7280',
    adminBorderColor: '#e5e7eb',
    sidebarBackground: '#ffffff',
    sidebarText: '#374151'
  },

  // Component Settings
  components: {
    stats: {
      showTrends: true,
      showIcons: true,
      animationSpeed: 'normal',
      chartType: 'number'
    },
    charts: {
      animationSpeed: 'normal',
      showGrid: true,
      showLegend: true,
      chartHeight: 250
    },
    activity: {
      maxItems: 5,
      showTimestamps: true,
      animationSpeed: 'normal'
    }
  },

  // Animation Settings
  animations: {
    enabled: true,
    duration: 'normal',
    easing: 'ease-out',
    stagger: 0.1
  }
}

const colorPresets = {
  olive: {
    primaryColor: '#8D9A3A',
    secondaryColor: '#252B0D',
    accentColor: '#BEC87A',
    adminBackground: '#f6f7f0',
    adminCardBackground: '#ffffff',
    adminTextPrimary: '#252B0D',
    adminTextSecondary: '#5B6B7C',
    adminBorderColor: '#E4E9C8',
    sidebarBackground: '#ffffff',
    sidebarText: '#1f2937'
  },
  purple: {
    primaryColor: '#8b5cf6',
    secondaryColor: '#7c3aed',
    accentColor: '#a855f7',
    adminBackground: '#faf5ff',
    adminCardBackground: '#ffffff',
    adminTextPrimary: '#581c87',
    adminTextSecondary: '#6b21a8',
    adminBorderColor: '#e9d5ff',
    sidebarBackground: '#ffffff',
    sidebarText: '#1f2937'
  },
  green: {
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    accentColor: '#34d399',
    adminBackground: '#f0fdf4',
    adminCardBackground: '#ffffff',
    adminTextPrimary: '#064e3b',
    adminTextSecondary: '#047857',
    adminBorderColor: '#d1fae5',
    sidebarBackground: '#ffffff',
    sidebarText: '#1f2937'
  },
  orange: {
    primaryColor: '#f97316',
    secondaryColor: '#ea580c',
    accentColor: '#fb923c',
    adminBackground: '#fff7ed',
    adminCardBackground: '#ffffff',
    adminTextPrimary: '#7c2d12',
    adminTextSecondary: '#c2410c',
    adminBorderColor: '#fed7aa',
    sidebarBackground: '#ffffff',
    sidebarText: '#1f2937'
  },
  dark: {
    primaryColor: '#6366f1',
    secondaryColor: '#4f46e5',
    accentColor: '#818cf8',
    adminBackground: '#111827',
    adminCardBackground: '#1f2937',
    adminTextPrimary: '#f9fafb',
    adminTextSecondary: '#d1d5db',
    adminBorderColor: '#374151',
    sidebarBackground: '#1f2937',
    sidebarText: '#f9fafb'
  }
}

export const DashboardSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('dashboardSettings')
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('dashboardSettings', JSON.stringify(settings))
      } catch (error) {
        console.error('Error saving settings:', error)
      }
    }
  }, [settings, isLoading])

  const updateSettings = (category, updates) => {
    if (isLoading) return
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...updates
      }
    }))
  }

  const updateNestedSettings = (path, value) => {
    if (isLoading) return
    const keys = path.split('.')
    setSettings(prev => {
      const newSettings = { ...prev }
      let current = newSettings
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newSettings
    })
  }

  const applyColorPreset = (presetName) => {
    if (colorPresets[presetName]) {
      setSettings(prev => ({
        ...prev,
        theme: {
          ...prev.theme,
          ...colorPresets[presetName]
        }
      }))
      toast.success(`${presetName.charAt(0).toUpperCase() + presetName.slice(1)} theme applied!`)
    }
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem('dashboardSettings')
  }

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'dashboard-settings.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importSettings = (settingsData) => {
    try {
      const imported = JSON.parse(settingsData)
      setSettings({ ...defaultSettings, ...imported })
      return true
    } catch (error) {
      console.error('Error importing settings:', error)
      return false
    }
  }

  const value = {
    settings,
    isLoading,
    updateSettings,
    updateNestedSettings,
    applyColorPreset,
    resetSettings,
    exportSettings,
    importSettings,
    colorPresets
  }

  return (
    <DashboardSettingsContext.Provider value={value}>
      {children}
    </DashboardSettingsContext.Provider>
  )
}

export const useDashboardSettings = () => {
  const context = useContext(DashboardSettingsContext)
  if (!context) {
    throw new Error('useDashboardSettings must be used within DashboardSettingsProvider')
  }
  return context
}

export default DashboardSettingsContext

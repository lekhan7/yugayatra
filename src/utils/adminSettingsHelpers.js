// Helper functions for admin settings management

export const loadAdminSettings = () => {
  try {
    const savedSettings = localStorage.getItem('adminSettings')
    if (savedSettings) {
      return JSON.parse(savedSettings)
    }
  } catch (error) {
    console.error('Error loading admin settings:', error)
  }
  return null
}

export const saveAdminSettings = (settings) => {
  try {
    localStorage.setItem('adminSettings', JSON.stringify(settings))
    return true
  } catch (error) {
    console.error('Error saving admin settings:', error)
    return false
  }
}

export const getDefaultAdminSettings = () => ({
  layout: {
    componentOrder: ['header', 'sidebar', 'content'],
    sidebarPosition: 'left',
    contentDirection: 'ltr',
    spacing: 'normal'
  },
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#10b981',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    border: '#e5e7eb',
    hover: '#f3f4f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 'medium',
    fontWeight: 'normal',
    lineHeight: 'relaxed'
  },
  animations: {
    enabled: true,
    duration: 300,
    easing: 'ease-in-out',
    reducedMotion: false
  },
  components: {
    header: { visible: true, height: 'auto', sticky: true },
    sidebar: { visible: true, width: 'medium', collapsible: true },
    content: { padding: 'normal', maxWidth: 'full' }
  }
})

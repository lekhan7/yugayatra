import { useDashboardSettings } from '../contexts/DashboardSettingsContext'

export const useDashboardSettings = () => {
  const context = useDashboardSettings()
  
  // Helper function to get responsive grid classes
  const getGridClasses = () => {
    const { gridColumns } = context.settings.layout
    return `grid-cols-${gridColumns.mobile} md:grid-cols-${gridColumns.tablet} lg:grid-cols-${gridColumns.desktop}`
  }

  // Helper function to get animation duration
  const getAnimationDuration = () => {
    const { duration } = context.settings.animations
    switch (duration) {
      case 'slow': return 0.8
      case 'fast': return 0.2
      default: return 0.5
    }
  }

  // Helper function to get theme colors
  const getThemeColors = () => {
    const { theme } = context.settings
    return {
      primary: theme.primaryColor,
      secondary: theme.secondaryColor,
      accent: theme.accentColor
    }
  }

  return {
    ...context,
    getGridClasses,
    getAnimationDuration,
    getThemeColors
  }
}

export default useDashboardSettings

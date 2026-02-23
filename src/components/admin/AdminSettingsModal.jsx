import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Layout, 
  Palette, 
  Type, 
  Zap, 
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  GripVertical,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import toast from 'react-hot-toast'
import './AdminSettings.css'

const AdminSettingsModal = ({ isOpen, onClose, onSettingsChange }) => {
  const [activeTab, setActiveTab] = useState('layout')
  const [settings, setSettings] = useState({
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
  const [hasChanges, setHasChanges] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        if (hasChanges) {
          saveSettings()
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, hasChanges, settings])

  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('adminSettings')
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const saveSettings = () => {
    if (!hasChanges) {
      toast('No changes to save', {
        icon: 'ℹ️',
        duration: 2000,
        position: 'top-center'
      })
      return
    }

    try {
      // Validate settings before saving
      const validatedSettings = JSON.parse(JSON.stringify(settings))
      
      // Save to localStorage
      localStorage.setItem('adminSettings', JSON.stringify(validatedSettings))
      
      // Apply changes immediately
      onSettingsChange?.(validatedSettings)
      setHasChanges(false)
      
      // Show success message
      toast.success('Settings saved successfully! Changes applied immediately.', {
        duration: 4000,
        position: 'top-center',
        icon: '✅'
      })
      
      // Optional: Close modal after successful save
      setTimeout(() => {
        if (window.confirm('Settings saved successfully! Would you like to close the settings panel?')) {
          onClose()
        }
      }, 1000)
      
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings. Please try again.', {
        duration: 4000,
        position: 'top-center',
        icon: '❌'
      })
    }
  }

  const resetSettings = () => {
    const defaultSettings = {
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
    }
    setSettings(defaultSettings)
    setHasChanges(true)
    toast.success('Settings reset to defaults')
  }

  const exportSettings = () => {
    try {
      const dataStr = JSON.stringify(settings, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      const exportFileDefaultName = 'admin-settings.json'
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      
      toast.success('Settings exported successfully!')
    } catch (error) {
      console.error('Error exporting settings:', error)
      toast.error('Failed to export settings')
    }
  }

  const importSettings = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result)
          setSettings(importedSettings)
          setHasChanges(true)
          toast.success('Settings imported successfully!')
        } catch (error) {
          console.error('Error importing settings:', error)
          toast.error('Failed to import settings - invalid file format')
        }
      }
      reader.readAsText(file)
    }
  }

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  const updateNestedSetting = (category, nestedKey, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [nestedKey]: {
          ...prev[category][nestedKey],
          [key]: value
        }
      }
    }))
    setHasChanges(true)
  }

  const tabs = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'animations', label: 'Animations', icon: Zap },
    { id: 'components', label: 'Components', icon: SettingsIcon }
  ]

  const renderLayoutSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Component Layout</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sidebar Position
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['left', 'right'].map(position => (
                <button
                  key={position}
                  onClick={() => updateSetting('layout', 'sidebarPosition', position)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    settings.layout.sidebarPosition === position
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-center">
                    {position === 'left' ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                  </div>
                  <span className="text-sm capitalize">{position}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content Direction
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['ltr', 'rtl'].map(direction => (
                <button
                  key={direction}
                  onClick={() => updateSetting('layout', 'contentDirection', direction)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    settings.layout.contentDirection === direction
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm uppercase">{direction}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Spacing
            </label>
            <select
              value={settings.layout.spacing}
              onChange={(e) => updateSetting('layout', 'spacing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="relaxed">Relaxed</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Component Order</h3>
        <div className="space-y-2">
          {settings.layout.componentOrder.map((component, index) => (
            <div key={component} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <GripVertical size={16} className="text-gray-400" />
              <span className="flex-1 capitalize">{component}</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => {
                    const newOrder = [...settings.layout.componentOrder]
                    if (index > 0) {
                      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
                      updateSetting('layout', 'componentOrder', newOrder)
                    }
                  }}
                  disabled={index === 0}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => {
                    const newOrder = [...settings.layout.componentOrder]
                    if (index < newOrder.length - 1) {
                      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
                      updateSetting('layout', 'componentOrder', newOrder)
                    }
                  }}
                  disabled={index === settings.layout.componentOrder.length - 1}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  <ArrowDown size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderColorSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Color Scheme</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              const oliveTheme = {
                primary: '#8D9A3A',
                secondary: '#BEC87A',
                accent: '#252B0D',
                background: '#F6F7F0',
                surface: '#E4E9C8',
                text: '#252B0D',
                border: '#BEC87A',
                hover: '#E4E9C8',
                success: '#8D9A3A',
                warning: '#F6F7F0',
                error: '#ef4444'
              }
              setSettings(prev => ({ ...prev, colors: oliveTheme }))
              setHasChanges(true)
            }}
            className="px-3 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-200"
          >
            Olive Theme
          </button>
          <button
            onClick={() => {
              const blueTheme = {
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
              }
              setSettings(prev => ({ ...prev, colors: blueTheme }))
              setHasChanges(true)
            }}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-200"
          >
            Blue Theme
          </button>
          <button
            onClick={() => {
              const darkTheme = {
                primary: '#60a5fa',
                secondary: '#a78bfa',
                accent: '#34d399',
                background: '#1f2937',
                surface: '#374151',
                text: '#f9fafb',
                border: '#4b5563',
                hover: '#4b5563',
                success: '#34d399',
                warning: '#fbbf24',
                error: '#f87171'
              }
              setSettings(prev => ({ ...prev, colors: darkTheme }))
              setHasChanges(true)
            }}
            className="px-3 py-1 text-xs bg-gray-800 text-gray-100 rounded-lg hover:bg-gray-700"
          >
            Dark Theme
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(settings.colors).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={value}
                onChange={(e) => updateSetting('colors', key, e.target.value)}
                className="h-10 w-16 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => updateSetting('colors', key, e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="#000000"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Live Preview</h4>
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div 
            className="p-4 rounded-lg text-center space-y-4"
            style={{
              backgroundColor: settings.colors.background,
              color: settings.colors.text,
              border: `2px solid ${settings.colors.border}`
            }}
          >
            <h4 style={{ color: settings.colors.primary }}>Sample Header</h4>
            <p style={{ color: settings.colors.secondary }}>Secondary text example with more content</p>
            <div className="flex justify-center space-x-2">
              <button 
                className="px-4 py-2 rounded text-white text-sm"
                style={{ backgroundColor: settings.colors.accent }}
              >
                Primary Action
              </button>
              <button 
                className="px-4 py-2 rounded text-white text-sm"
                style={{ backgroundColor: settings.colors.primary }}
              >
                Secondary Action
              </button>
            </div>
            <div className="flex justify-center space-x-4 text-sm">
              <span style={{ color: settings.colors.success }}>✓ Success</span>
              <span style={{ color: settings.colors.warning }}>⚠ Warning</span>
              <span style={{ color: settings.colors.error }}>✗ Error</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTypographySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Typography</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Font Family
          </label>
          <select
            value={settings.typography.fontFamily}
            onChange={(e) => updateSetting('typography', 'fontFamily', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Poppins">Poppins</option>
            <option value="system-ui">System UI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Font Size
          </label>
          <select
            value={settings.typography.fontSize}
            onChange={(e) => updateSetting('typography', 'fontSize', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="extra-large">Extra Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Font Weight
          </label>
          <select
            value={settings.typography.fontWeight}
            onChange={(e) => updateSetting('typography', 'fontWeight', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="semibold">Semibold</option>
            <option value="bold">Bold</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Line Height
          </label>
          <select
            value={settings.typography.lineHeight}
            onChange={(e) => updateSetting('typography', 'lineHeight', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="tight">Tight</option>
            <option value="normal">Normal</option>
            <option value="relaxed">Relaxed</option>
            <option value="loose">Loose</option>
          </select>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Preview</h4>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div style={{
            fontFamily: settings.typography.fontFamily,
            fontSize: settings.typography.fontSize === 'small' ? '14px' : 
                     settings.typography.fontSize === 'medium' ? '16px' :
                     settings.typography.fontSize === 'large' ? '18px' : '20px',
            fontWeight: settings.typography.fontWeight === 'light' ? '300' :
                       settings.typography.fontWeight === 'normal' ? '400' :
                       settings.typography.fontWeight === 'medium' ? '500' :
                       settings.typography.fontWeight === 'semibold' ? '600' : '700',
            lineHeight: settings.typography.lineHeight === 'tight' ? '1.25' :
                        settings.typography.lineHeight === 'normal' ? '1.5' :
                        settings.typography.lineHeight === 'relaxed' ? '1.75' : '2'
          }}>
            <h4 className="text-xl mb-2">Sample Heading</h4>
            <p className="mb-2">This is a sample paragraph to preview your typography settings. The quick brown fox jumps over the lazy dog.</p>
            <p className="text-sm">This is smaller text with the same font settings applied.</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAnimationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Animations</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Animations
          </label>
          <button
            onClick={() => updateSetting('animations', 'enabled', !settings.animations.enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.animations.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.animations.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Animation Duration (ms)
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={settings.animations.duration}
            onChange={(e) => updateSetting('animations', 'duration', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>100ms</span>
            <span>{settings.animations.duration}ms</span>
            <span>1000ms</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Easing Function
          </label>
          <select
            value={settings.animations.easing}
            onChange={(e) => updateSetting('animations', 'easing', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="linear">Linear</option>
            <option value="ease">Ease</option>
            <option value="ease-in">Ease In</option>
            <option value="ease-out">Ease Out</option>
            <option value="ease-in-out">Ease In Out</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Reduced Motion (Accessibility)
          </label>
          <button
            onClick={() => updateSetting('animations', 'reducedMotion', !settings.animations.reducedMotion)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.animations.reducedMotion ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.animations.reducedMotion ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Preview</h4>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <motion.div
            animate={{
              x: [0, 50, 0],
            }}
            transition={{
              duration: settings.animations.duration / 1000,
              ease: settings.animations.easing,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="w-16 h-16 bg-blue-500 rounded-lg"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Animation preview - Duration: {settings.animations.duration}ms, Easing: {settings.animations.easing}
          </p>
        </div>
      </div>
    </div>
  )

  const renderComponentSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Component Settings</h3>
      
      <div className="space-y-6">
        {Object.entries(settings.components).map(([component, config]) => (
          <div key={component} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3 capitalize">
              {component}
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Visible
                </label>
                <button
                  onClick={() => updateNestedSetting('components', component, 'visible', !config.visible)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.visible ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.visible ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {component === 'header' && (
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Sticky Header
                  </label>
                  <button
                    onClick={() => updateNestedSetting('components', component, 'sticky', !config.sticky)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.sticky ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.sticky ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              )}

              {component === 'sidebar' && (
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Collapsible
                  </label>
                  <button
                    onClick={() => updateNestedSetting('components', component, 'collapsible', !config.collapsible)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.collapsible ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.collapsible ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'layout':
        return renderLayoutSettings()
      case 'colors':
        return renderColorSettings()
      case 'typography':
        return renderTypographySettings()
      case 'animations':
        return renderAnimationSettings()
      case 'components':
        return renderComponentSettings()
      default:
        return renderLayoutSettings()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <SettingsIcon className="text-blue-600 dark:text-blue-400" size={24} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Settings</h2>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`p-2 rounded-lg transition-colors ${
                    previewMode 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                  title={previewMode ? 'Exit Preview' : 'Preview Mode'}
                >
                  {previewMode ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                
                <button
                  onClick={resetSettings}
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                  title="Reset to Defaults"
                >
                  <RotateCcw size={18} />
                </button>
                
                <button
                  onClick={exportSettings}
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                  title="Export Settings"
                >
                  <Download size={18} />
                </button>
                
                <label className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 cursor-pointer" title="Import Settings">
                  <Upload size={18} />
                  <input
                    type="file"
                    accept=".json"
                    onChange={importSettings}
                    className="hidden"
                  />
                </label>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex h-[calc(90vh-80px)]">
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {renderTabContent()}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm">
                {hasChanges ? (
                  <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 font-medium">
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                    <span>You have unsaved changes</span>
                  </div>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">All changes saved</span>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSettings}
                  disabled={!hasChanges}
                  title={hasChanges ? "Save changes (Ctrl+S)" : "No changes to save"}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105 ${
                    hasChanges 
                      ? 'bg-green-600 text-white hover:bg-green-700 animate-pulse' 
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Save size={18} />
                  <span>{hasChanges ? 'Save Changes' : 'No Changes'}</span>
                  {hasChanges && (
                    <span className="text-xs opacity-75 ml-1">(Ctrl+S)</span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default AdminSettingsModal

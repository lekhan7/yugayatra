import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Layout, 
  Palette, 
  Settings as SettingsIcon, 
  Sliders,
  RotateCcw,
  Download,
  Upload,
  Check,
  Eye,
  EyeOff,
  Move,
  Grid3X3,
  Sparkles
} from 'lucide-react'
import { useDashboardSettings } from '../../contexts/DashboardSettingsContext'
import toast from 'react-hot-toast'

const DashboardSettings = ({ isOpen, onClose }) => {
  const { settings, updateSettings, updateNestedSettings, applyColorPreset, resetSettings, exportSettings, importSettings, colorPresets } = useDashboardSettings()
  const [activeTab, setActiveTab] = useState('layout')
  const [isImporting, setIsImporting] = useState(false)

  const tabs = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'colors', label: 'Dashboard Colors', icon: Palette },
    { id: 'adminColors', label: 'Admin Page Colors', icon: SettingsIcon },
    { id: 'components', label: 'Components', icon: SettingsIcon },
    { id: 'advanced', label: 'Advanced', icon: Sliders }
  ]

  const handleImportSettings = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const success = importSettings(e.target.result)
        if (success) {
          toast.success('Settings imported successfully!')
        } else {
          toast.error('Failed to import settings. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      resetSettings()
      toast.success('Settings reset to defaults')
    }
  }

  const handleExport = () => {
    exportSettings()
    toast.success('Settings exported successfully!')
  }

  const toggleComponentVisibility = (component) => {
    updateNestedSettings(
      `layout.componentVisibility.${component}`,
      !settings.layout.componentVisibility[component]
    )
  }

  const moveComponent = (component, direction) => {
    const currentOrder = [...settings.layout.componentOrder]
    const currentIndex = currentOrder.indexOf(component)
    
    if (direction === 'up' && currentIndex > 0) {
      [currentOrder[currentIndex], currentOrder[currentIndex - 1]] = 
      [currentOrder[currentIndex - 1], currentOrder[currentIndex]]
    } else if (direction === 'down' && currentIndex < currentOrder.length - 1) {
      [currentOrder[currentIndex], currentOrder[currentIndex + 1]] = 
      [currentOrder[currentIndex + 1], currentOrder[currentIndex]]
    }
    
    updateSettings('layout', { componentOrder: currentOrder })
  }

  const LayoutTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Grid Columns */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Grid3X3 className="mr-2" size={20} />
          Grid Layout
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { key: 'mobile', label: 'Mobile' },
            { key: 'tablet', label: 'Tablet' },
            { key: 'desktop', label: 'Desktop' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} Columns
              </label>
              <select
                value={settings.layout.gridColumns[key]}
                onChange={(e) => updateNestedSettings(`layout.gridColumns.${key}`, parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>1 Column</option>
                <option value={2}>2 Columns</option>
                <option value={3}>3 Columns</option>
                <option value={4}>4 Columns</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Component Order */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Move className="mr-2" size={20} />
          Component Order
        </h3>
        <div className="space-y-2">
          {settings.layout.componentOrder.map((component, index) => (
            <div
              key={component}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <span className="font-medium text-gray-900 dark:text-white capitalize">
                {component}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => moveComponent(component, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveComponent(component, 'down')}
                  disabled={index === settings.layout.componentOrder.length - 1}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Visibility */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Eye className="mr-2" size={20} />
          Component Visibility
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(settings.layout.componentVisibility).map(([component, isVisible]) => (
            <button
              key={component}
              onClick={() => toggleComponentVisibility(component)}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                isVisible
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
              }`}
            >
              <span className="font-medium text-gray-900 dark:text-white capitalize">
                {component}
              </span>
              {isVisible ? <Eye size={18} className="text-blue-500" /> : <EyeOff size={18} className="text-gray-400" />}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const ColorsTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Color Presets */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Sparkles className="mr-2" size={20} />
          Color Presets
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(colorPresets).map(([name, colors]) => (
            <button
              key={name}
              onClick={() => applyColorPreset(name)}
              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 transition-all"
            >
              <div className="flex space-x-1 mb-2">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: colors.primaryColor }}
                />
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: colors.secondaryColor }}
                />
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: colors.accentColor }}
                />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                {name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Custom Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { key: 'primaryColor', label: 'Primary Color' },
            { key: 'secondaryColor', label: 'Secondary Color' },
            { key: 'accentColor', label: 'Accent Color' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.theme[key]}
                  onChange={(e) => updateNestedSettings(`theme.${key}`, e.target.value)}
                  className="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme[key]}
                  onChange={(e) => updateNestedSettings(`theme.${key}`, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Options */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme Options</h3>
        <div className="space-y-4">
          {[
            { key: 'backgroundGradient', label: 'Background Gradients' },
            { key: 'cardShadows', label: 'Card Shadows' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
              <button
                onClick={() => updateNestedSettings(`theme.${key}`, !settings.theme[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.theme[key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.theme[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const ComponentsTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Settings */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stats Cards</h3>
        <div className="space-y-4">
          {[
            { key: 'showTrends', label: 'Show Trends' },
            { key: 'showIcons', label: 'Show Icons' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
              <button
                onClick={() => updateNestedSettings(`components.stats.${key}`, !settings.components.stats[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.components.stats[key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.components.stats[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </div>

      {/* Charts Settings */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Charts</h3>
        <div className="space-y-4">
          {[
            { key: 'showGrid', label: 'Show Grid Lines' },
            { key: 'showLegend', label: 'Show Legend' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
              <button
                onClick={() => updateNestedSettings(`components.charts.${key}`, !settings.components.charts[key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.components.charts[key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.components.charts[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </div>

      {/* Activity Settings */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Feed</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Items to Show
            </label>
            <select
              value={settings.components.activity.maxItems}
              onChange={(e) => updateNestedSettings('components.activity.maxItems', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={3}>3 Items</option>
              <option value={5}>5 Items</option>
              <option value={10}>10 Items</option>
              <option value={15}>15 Items</option>
            </select>
          </div>
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Show Timestamps
            </span>
            <button
              onClick={() => updateNestedSettings('components.activity.showTimestamps', !settings.components.activity.showTimestamps)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.components.activity.showTimestamps ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.components.activity.showTimestamps ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
      </div>
    </motion.div>
  )

  const AdminColorsTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Admin Page Color Presets */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Sparkles className="mr-2" size={20} />
          Admin Page Themes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(colorPresets).map(([name, colors]) => (
            <button
              key={name}
              onClick={() => {
                updateSettings('theme', colors)
                toast.success(`${name.charAt(0).toUpperCase() + name.slice(1)} admin theme applied!`)
              }}
              className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 transition-all"
            >
              <div className="flex space-x-1 mb-2">
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: colors.adminBackground || colors.primaryColor }}
                />
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: colors.adminCardBackground || colors.secondaryColor }}
                />
                <div 
                  className="w-6 h-6 rounded-full" 
                  style={{ backgroundColor: colors.adminTextPrimary || colors.accentColor }}
                />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                {name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Admin Colors */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Custom Admin Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'adminBackground', label: 'Page Background' },
            { key: 'adminCardBackground', label: 'Card Background' },
            { key: 'adminTextPrimary', label: 'Primary Text' },
            { key: 'adminTextSecondary', label: 'Secondary Text' },
            { key: 'adminBorderColor', label: 'Border Color' },
            { key: 'sidebarBackground', label: 'Sidebar Background' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.theme[key] || '#ffffff'}
                  onChange={(e) => updateNestedSettings(`theme.${key}`, e.target.value)}
                  className="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.theme[key] || '#ffffff'}
                  onChange={(e) => updateNestedSettings(`theme.${key}`, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
        <div 
          className="p-6 rounded-xl border-2"
          style={{
            backgroundColor: settings.theme.adminCardBackground,
            borderColor: settings.theme.adminBorderColor,
            color: settings.theme.adminTextPrimary
          }}
        >
          <h4 className="text-xl font-bold mb-2">Sample Admin Page</h4>
          <p style={{ color: settings.theme.adminTextSecondary }}>
            This is how your admin page will look with the selected colors.
          </p>
          <div className="mt-4 flex space-x-2">
            <button 
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: settings.theme.primaryColor }}
            >
              Primary Button
            </button>
            <button 
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: settings.theme.accentColor }}
            >
              Accent Button
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const AdvancedTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Animation Settings */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Animations</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enable Animations
            </span>
            <button
              onClick={() => updateNestedSettings('animations.enabled', !settings.animations.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.animations.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.animations.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
          
          {settings.animations.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Animation Speed
                </label>
                <select
                  value={settings.animations.duration}
                  onChange={(e) => updateNestedSettings('animations.duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="slow">Slow</option>
                  <option value="normal">Normal</option>
                  <option value="fast">Fast</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Import/Export */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="flex space-x-3">
            <button
              onClick={handleExport}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={18} />
              <span>Export Settings</span>
            </button>
            <label className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
              <Upload size={18} />
              <span>Import Settings</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="hidden"
              />
            </label>
          </div>
          
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RotateCcw size={18} />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>
    </motion.div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'layout':
        return <LayoutTab />
      case 'colors':
        return <ColorsTab />
      case 'adminColors':
        return <AdminColorsTab />
      case 'components':
        return <ComponentsTab />
      case 'advanced':
        return <AdvancedTab />
      default:
        return <LayoutTab />
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
        
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-[9999]"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <SettingsIcon className="w-6 h-6 mr-3" />
                  Dashboard Settings
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-olive-500 text-olive-600 dark:text-olive-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderTabContent()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Settings are automatically saved
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-olive-600 text-white rounded-lg hover:bg-olive-700 transition-colors flex items-center space-x-2"
                >
                  <Check size={18} />
                  <span>Done</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default DashboardSettings

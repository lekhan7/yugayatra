import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Palette, Type, Zap, Layout, Save, RotateCcw } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const SettingsModal = ({ isOpen, onClose }) => {
  const { settings, updateSetting, saveSettings, resetSettings } = useTheme()
  const [hasChanges, setHasChanges] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')

  const handleSettingChange = (key, value) => {
    updateSetting(key, value)
    setHasChanges(true)
    setSaveStatus('')
  }

  const handleSave = () => {
    const success = saveSettings()
    if (success) {
      setHasChanges(false)
      setSaveStatus('success')
      setTimeout(() => setSaveStatus(''), 2000)
    } else {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(''), 2000)
    }
  }

  const handleReset = () => {
    const success = resetSettings()
    if (success) {
      setHasChanges(false)
      setSaveStatus('reset')
      setTimeout(() => setSaveStatus(''), 2000)
    }
  }

  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: '100%'
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0,
      y: '100%',
      transition: {
        duration: 0.2
      }
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-white dark:bg-gray-900 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="space-y-8">
              {/* Theme Mode */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Palette className="text-blue-600 dark:text-blue-400" size={24} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Theme Mode</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['light', 'dark', 'custom'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleSettingChange('themeMode', mode)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        settings.themeMode === mode
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="capitalize font-medium text-gray-900 dark:text-white">
                        {mode === 'custom' ? 'Custom Theme' : `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`}
                      </div>
                    </button>
                  ))}
                </div>
                
                {settings.themeMode === 'custom' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.customPrimaryColor}
                          onChange={(e) => handleSettingChange('customPrimaryColor', e.target.value)}
                          className="h-10 w-20 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.customPrimaryColor}
                          onChange={(e) => handleSettingChange('customPrimaryColor', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Text Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.customTextColor}
                          onChange={(e) => handleSettingChange('customTextColor', e.target.value)}
                          className="h-10 w-20 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.customTextColor}
                          onChange={(e) => handleSettingChange('customTextColor', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Typography */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Type className="text-blue-600 dark:text-blue-400" size={24} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Typography</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Font Family
                    </label>
                    <select
                      value={settings.fontFamily}
                      onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Font Size
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['small', 'medium', 'large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSettingChange('fontSize', size)}
                          className={`p-3 rounded-lg border-2 transition-all capitalize ${
                            settings.fontSize === size
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Animation Control */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="text-blue-600 dark:text-blue-400" size={24} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Animation Control</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Enable Animations</span>
                    <button
                      onClick={() => handleSettingChange('animationsEnabled', !settings.animationsEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.animationsEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  {settings.animationsEnabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Animation Speed
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['slow', 'normal', 'fast'].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => handleSettingChange('animationSpeed', speed)}
                            className={`p-3 rounded-lg border-2 transition-all capitalize ${
                              settings.animationSpeed === speed
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                            }`}
                          >
                            {speed}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* UI Density */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Layout className="text-blue-600 dark:text-blue-400" size={24} />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">UI Density</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['compact', 'comfortable'].map((density) => (
                    <button
                      key={density}
                      onClick={() => handleSettingChange('uiDensity', density)}
                      className={`p-4 rounded-lg border-2 transition-all capitalize ${
                        settings.uiDensity === density
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      {density}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <RotateCcw size={18} />
                <span>Reset to Default</span>
              </button>
              
              <div className="flex items-center space-x-4">
                {saveStatus === 'success' && (
                  <span className="text-green-600 dark:text-green-400">Settings saved!</span>
                )}
                {saveStatus === 'error' && (
                  <span className="text-red-600 dark:text-red-400">Failed to save</span>
                )}
                {saveStatus === 'reset' && (
                  <span className="text-blue-600 dark:text-blue-400">Settings reset!</span>
                )}
                
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all ${
                    hasChanges
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Save size={18} />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SettingsModal

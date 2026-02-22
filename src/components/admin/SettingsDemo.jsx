import { useState } from 'react'
import AdminSettingsModal from './AdminSettingsModal'

const SettingsDemo = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [currentSettings, setCurrentSettings] = useState(null)

  const handleSettingsChange = (newSettings) => {
    setCurrentSettings(newSettings)
    console.log('Settings updated:', newSettings)
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Settings Demo</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings Panel</h2>
          <p className="text-gray-600 mb-4">
            Click the button below to open the comprehensive admin settings modal.
            You can customize layout, colors, typography, animations, and component settings.
          </p>
          
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Settings
          </button>
        </div>

        {currentSettings && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Settings</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(currentSettings, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <AdminSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  )
}

export default SettingsDemo

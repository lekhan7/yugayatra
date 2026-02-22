import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  RefreshCw, 
  Download, 
  Settings,
  X,
  Zap
} from 'lucide-react'
import toast from 'react-hot-toast'
import { exportDataService } from '../../services/exportDataService'

const FloatingActions = ({ onRefresh, onExport, onSettings, dashboardData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const actions = [
    {
      icon: RefreshCw,
      label: 'Refresh Data',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => {
        onRefresh?.()
        toast.success('Dashboard refreshed')
        setIsOpen(false)
      }
    },
    {
      icon: Download,
      label: 'Export Data',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: async () => {
        if (!dashboardData) {
          toast.error('No data available to export')
          setIsOpen(false)
          return
        }

        setIsExporting(true)
        try {
          // Collect all dashboard data
          const exportData = exportDataService.collectDashboardData(
            dashboardData.applications,
            dashboardData.testimonials,
            dashboardData.projects,
            dashboardData.stats,
            dashboardData.applicationTrends,
            dashboardData.monthlyData,
            dashboardData.recentActivity
          )

          // Export using direct URL population method
          const result = await exportDataService.exportToGoogleSheets(exportData)
          
          if (result.success) {
            if (result.method === 'csv_import') {
              toast.success('CSV downloaded! Google Sheets opened with import instructions.')
            } else {
              toast.success('Google Sheets opened - please follow import instructions.')
            }
          } else {
            toast.error(result.message)
          }
        } catch (error) {
          console.error('Export error:', error)
          toast.error('Export failed - please try again')
        } finally {
          setIsExporting(false)
          setIsOpen(false)
        }
      }
    },
    {
      icon: Settings,
      label: 'Settings',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => {
        onSettings?.()
        setIsOpen(false)
      }
    }
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.onClick}
                disabled={isExporting && action.label === 'Export Data'}
                className={`flex items-center space-x-3 px-4 py-3 ${action.color} text-white rounded-full shadow-lg whitespace-nowrap transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isExporting && action.label === 'Export Data' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span className="text-sm font-medium">Exporting...</span>
                  </>
                ) : (
                  <>
                    <action.icon size={18} />
                    <span className="text-sm font-medium">{action.label}</span>
                  </>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 45, opacity: 1 }}
              exit={{ rotate: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Zap size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulsing ring effect */}
      {isOpen && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.3, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </div>
  )
}

export default FloatingActions

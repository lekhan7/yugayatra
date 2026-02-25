import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../services/supabase'
import { ThemeProvider } from '../../contexts/ThemeContext'
import AdminSidebar from './AdminSidebar'
import AnimatedDashboard from './AnimatedDashboard'
import AdminApplications from './AdminApplications'
import ProjectRequestsManager from './ProjectRequestsManager'
import TestimonialsManager from './TestimonialsManager'
import ServicesManager from './ServicesManager'
import ProjectsManager from './ProjectsManager'
import AlumniManager from './AlumniManager'
import BlogManager from './BlogManager'
import TeamManager from './TeamManager'
import SettingsModal from './SettingsModal'
import '../../styles/admin-theme-variables.css'

const AdminDashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      onLogout()
    } catch (error) {
      console.error('Error signing out:', error)
      onLogout()
    }
  }

  const handleSettingsClick = () => {
    setIsSettingsOpen(true)
  }

  const handleCloseSettings = () => {
    setIsSettingsOpen(false)
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AnimatedDashboard />
      case 'applications':
        return <AdminApplications />
      case 'project-requests':
        return <ProjectRequestsManager />
      case 'testimonials':
        return <TestimonialsManager />
      case 'services':
        return <ServicesManager />
      case 'projects':
        return <ProjectsManager />
      case 'alumni':
        return <AlumniManager />
      case 'team':
        return <TeamManager />
      case 'blog':
        return <BlogManager />
      default:
        return <AnimatedDashboard />
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 admin-panel">
        <div className="flex">
          {/* Sidebar */}
          <AdminSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            user={user}
            onLogout={handleLogout}
            onSettingsClick={handleSettingsClick}
          />
          
          {/* Main Content */}
          <div className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
        
        {/* Settings Modal */}
        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={handleCloseSettings}
        />
      </div>
    </ThemeProvider>
  )
}

export default AdminDashboard
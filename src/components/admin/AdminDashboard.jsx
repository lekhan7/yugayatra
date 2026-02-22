import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../services/supabase'
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
import ToastProvider from './ToastProvider'
import AdminSettingsModal from './AdminSettingsModal'
import './AdminSettings.css'

const AdminDashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [adminSettings, setAdminSettings] = useState(null)

  useEffect(() => {
    // Load saved settings on component mount
    try {
      const savedSettings = localStorage.getItem('adminSettings')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        setAdminSettings(settings)
        applySettingsToDocument(settings)
      }
    } catch (error) {
      console.error('Error loading saved settings:', error)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      onLogout()
    } catch (error) {
      console.error('Error signing out:', error)
      // Still call onLogout even if signOut fails
      onLogout()
    }
  }

  const handleSettingsOpen = () => {
    setIsSettingsModalOpen(true)
  }

  const handleSettingsChange = (newSettings) => {
    setAdminSettings(newSettings)
    // Apply settings to the document or global state here
    applySettingsToDocument(newSettings)
  }

  const applySettingsToDocument = (settings) => {
    // Apply CSS custom properties for colors
    const root = document.documentElement
    if (settings.colors) {
      root.style.setProperty('--admin-primary-color', settings.colors.primary)
      root.style.setProperty('--admin-secondary-color', settings.colors.secondary)
      root.style.setProperty('--admin-accent-color', settings.colors.accent)
      root.style.setProperty('--admin-background-color', settings.colors.background)
      root.style.setProperty('--admin-surface-color', settings.colors.surface)
      root.style.setProperty('--admin-text-color', settings.colors.text)
      
      // Also apply background color directly to the admin panel
      const adminPanel = document.querySelector('.admin-panel')
      if (adminPanel) {
        adminPanel.style.backgroundColor = settings.colors.background
        adminPanel.style.color = settings.colors.text
      }
    }

    // Apply typography settings
    if (settings.typography) {
      root.style.setProperty('--admin-font-family', settings.typography.fontFamily)
      root.style.setProperty('--admin-font-size', settings.typography.fontSize === 'small' ? '14px' : 
                     settings.typography.fontSize === 'medium' ? '16px' :
                     settings.typography.fontSize === 'large' ? '18px' : '20px')
      root.style.setProperty('--admin-font-weight', settings.typography.fontWeight === 'light' ? '300' :
                     settings.typography.fontWeight === 'normal' ? '400' :
                     settings.typography.fontWeight === 'medium' ? '500' :
                     settings.typography.fontWeight === 'semibold' ? '600' : '700')
      root.style.setProperty('--admin-line-height', settings.typography.lineHeight === 'tight' ? '1.25' :
                     settings.typography.lineHeight === 'normal' ? '1.5' :
                     settings.typography.lineHeight === 'relaxed' ? '1.75' : '2')
    }

    // Apply animation settings
    if (settings.animations) {
      root.style.setProperty('--admin-animation-duration', `${settings.animations.duration}ms`)
      root.style.setProperty('--admin-animation-easing', settings.animations.easing)
      if (settings.animations.reducedMotion) {
        root.style.setProperty('--admin-reduced-motion', 'reduce')
      } else {
        root.style.removeProperty('--admin-reduced-motion')
      }
    }

    // Apply layout classes to the admin panel
    const adminPanel = document.querySelector('.admin-panel') || document.body
    if (settings.layout) {
      // Remove existing layout classes
      adminPanel.classList.remove('sidebar-left', 'sidebar-right', 'spacing-compact', 'spacing-normal', 'spacing-relaxed', 'spacing-spacious')
      
      // Add new layout classes
      adminPanel.classList.add(`sidebar-${settings.layout.sidebarPosition}`)
      adminPanel.classList.add(`spacing-${settings.layout.spacing}`)
      
      // Set direction
      adminPanel.setAttribute('dir', settings.layout.contentDirection)
    }

    // Apply typography classes
    if (settings.typography) {
      adminPanel.classList.remove('font-small', 'font-medium', 'font-large', 'font-extra-large',
                                   'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold',
                                   'leading-tight', 'leading-normal', 'leading-relaxed', 'leading-loose')
      
      adminPanel.classList.add(`font-${settings.typography.fontSize}`)
      adminPanel.classList.add(`font-${settings.typography.fontWeight}`)
      adminPanel.classList.add(`leading-${settings.typography.lineHeight}`)
    }

    // Apply component visibility
    if (settings.components) {
      Object.entries(settings.components).forEach(([component, config]) => {
        const element = document.querySelector(`.admin-${component}`)
        if (element) {
          if (config.visible) {
            element.classList.remove('component-hidden')
          } else {
            element.classList.add('component-hidden')
          }
        }
      })
    }
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
    <div 
      className="min-h-screen admin-panel sidebar-left spacing-normal"
      style={{
        backgroundColor: adminSettings?.colors?.background || '#f9fafb',
        color: adminSettings?.colors?.text || '#111827'
      }}
    >
      <ToastProvider />
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          user={user}
          onLogout={handleLogout}
          className="admin-sidebar"
        />
        
        {/* Main Content */}
        <div className="flex-1 p-6 admin-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'dashboard' ? (
              <AnimatedDashboard onSettingsOpen={handleSettingsOpen} />
            ) : (
              renderContent()
            )}
          </motion.div>
        </div>
      </div>

      {/* Settings Modal */}
      <AdminSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  )
}

export default AdminDashboard

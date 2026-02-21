import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../services/supabase'
import AdminSidebar from './AdminSidebar'
import Dashboard from './Dashboard'
import ApplicationsManager from './ApplicationsManager'
import ContentManager from './ContentManager'
import TestimonialsManager from './TestimonialsManager'
import ServicesManager from './ServicesManager'

const AdminDashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [internshipApplications, setInternshipApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInternshipApplications()
  }, [])

  const fetchInternshipApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('internship_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInternshipApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      onLogout()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard 
          internshipApplications={internshipApplications} 
          loading={loading}
        />
      case 'applications':
        return <ApplicationsManager 
          applications={internshipApplications}
          onApplicationsChange={setInternshipApplications}
        />
      case 'content':
        return <ContentManager />
      case 'testimonials':
        return <TestimonialsManager />
      case 'services':
        return <ServicesManager />
      default:
        return <Dashboard 
          internshipApplications={internshipApplications} 
          loading={loading}
        />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          user={user}
          onLogout={handleLogout}
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
    </div>
  )
}

export default AdminDashboard

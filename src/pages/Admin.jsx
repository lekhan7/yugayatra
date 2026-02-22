import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../services/supabase'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'

const Admin = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        
        if (currentUser) {
          // Check if user is admin
          const { data: adminData } = await supabase
            .from('admins')
            .select('email')
            .eq('email', currentUser.email)
            .maybeSingle()
          
          if (adminData) {
            setUser(currentUser)
          }
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser)
  }

  const handleLogout = () => {
    setUser(null)
  }

  // Show loading spinner while checking session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // Show login page if no authenticated user
  if (!user) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  // Show dashboard if user is authenticated
  return <AdminDashboard user={user} onLogout={handleLogout} />
}

export default Admin

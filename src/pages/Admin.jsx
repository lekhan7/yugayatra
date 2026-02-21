import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../services/supabase'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'

const Admin = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser)
  }

  const handleLogout = () => {
    setUser(null)
  }

  // Always show login page - no automatic session checking
  if (!user) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />
}

export default Admin

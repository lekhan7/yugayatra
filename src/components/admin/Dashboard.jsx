import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../services/supabase'
import AnimatedDashboard from './AnimatedDashboard'

const Dashboard = ({ internshipApplications, loading }) => {
  const [dashboardLoading, setDashboardLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for animation effect
    const timer = setTimeout(() => {
      setDashboardLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (dashboardLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedDashboard />
    </motion.div>
  )
}

export default Dashboard

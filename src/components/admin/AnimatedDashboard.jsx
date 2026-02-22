import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  TrendingUp,
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Clock,
  Star,
  Zap,
  Target
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RePieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { format, subDays, startOfDay } from 'date-fns'
import { useRealtimeData, useRealtimeStats } from '../../hooks/useRealtimeData'
import toast from 'react-hot-toast'
import ParticleBackground from './ParticleBackground'
import DashboardSkeleton from './DashboardSkeleton'
import AnimatedNumber from './AnimatedNumber'
import FloatingActions from './FloatingActions'

const AnimatedDashboard = () => {
  // Use custom hooks for real-time data
  const { data: applications, loading: applicationsLoading } = useRealtimeData('internship_applications')
  const { data: testimonials, loading: testimonialsLoading } = useRealtimeData('testimonials')
  const { data: projects, loading: projectsLoading } = useRealtimeData('projects')
  const { stats, loading: statsLoading } = useRealtimeStats()
  
  const [realtimeUpdates, setRealtimeUpdates] = useState(0)
  
  const loading = applicationsLoading || testimonialsLoading || projectsLoading || statsLoading

  // Process data for charts
  const applicationTrends = useMemo(() => {
    const last30Days = []
    for (let i = 29; i >= 0; i--) {
      const date = startOfDay(subDays(new Date(), i))
      const count = applications?.filter(app => {
        const appDate = startOfDay(new Date(app.created_at))
        return appDate.getTime() === date.getTime()
      }).length || 0
      
      last30Days.push({
        date: format(date, 'MMM dd'),
        applications: count,
        date_obj: date
      })
    }
    return last30Days
  }, [applications])

  const statusDistribution = useMemo(() => {
    const distribution = [
      { name: 'Pending', value: stats.pendingApplications, color: '#f59e0b' },
      { name: 'Accepted', value: stats.acceptedApplications, color: '#10b981' },
      { name: 'Rejected', value: stats.rejectedApplications, color: '#ef4444' }
    ]
    return distribution.filter(item => item.value > 0)
  }, [stats])

  const monthlyData = useMemo(() => {
    const months = []
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    // Show months from January (0) to current month
    for (let i = 0; i <= currentMonth; i++) {
      const monthName = monthNames[i]
      
      const count = applications?.filter(app => {
        const appDate = new Date(app.created_at)
        return appDate.getMonth() === i && appDate.getFullYear() === currentYear
      }).length || 0
      
      months.push({
        month: monthName,
        applications: count
      })
    }
    return months
  }, [applications])

  const recentActivity = useMemo(() => {
    const activities = []
    
    // Add recent applications
    applications?.slice(0, 3).forEach(app => {
      activities.push({
        id: app.id,
        type: 'application',
        title: `New application from ${app.full_name || 'Unknown User'}`,
        subtitle: app.email,
        time: format(new Date(app.created_at), 'MMM dd, HH:mm'),
        icon: Users,
        color: 'bg-blue-500'
      })
    })
    
    // Add recent testimonials
    testimonials?.slice(0, 2).forEach(testimonial => {
      activities.push({
        id: testimonial.id,
        type: 'testimonial',
        title: `New testimonial from ${testimonial.name}`,
        subtitle: testimonial.position,
        time: format(new Date(testimonial.created_at), 'MMM dd, HH:mm'),
        icon: MessageSquare,
        color: 'bg-purple-500'
      })
    })
    
    return activities.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5)
  }, [applications, testimonials])

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleExport = () => {
    // Export functionality is now handled in FloatingActions component
    console.log('Export data available...')
  }

  const handleSettings = () => {
    // Settings functionality to be implemented
    console.log('Opening settings...')
  }

  // Prepare dashboard data for export
  const dashboardData = {
    applications,
    testimonials,
    projects,
    stats,
    applicationTrends,
    monthlyData,
    recentActivity
  }

  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      trend: stats.monthlyGrowth > 0 ? `+${stats.monthlyGrowth}%` : `${stats.monthlyGrowth}%`,
      trendUp: stats.monthlyGrowth > 0
    },
    {
      title: 'Pending Review',
      value: stats.pendingApplications,
      icon: FileText,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      trend: '+5%',
      trendUp: true
    },
    {
      title: 'Accepted',
      value: stats.acceptedApplications,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      trend: '+3%',
      trendUp: true
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  if (loading) {
    return (
      <div className="relative">
        <ParticleBackground />
        <div className="relative z-10 p-6">
          <DashboardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative">
        <ParticleBackground />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 relative z-10"
        >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real-time admin control panel
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-700 dark:text-green-300">Live</span>
          </div>
          {realtimeUpdates > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full"
            >
              <span className="text-xs text-blue-700 dark:text-blue-300">
                {realtimeUpdates} updates
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-2xl p-6 relative overflow-hidden group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  <stat.icon size={20} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trendUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mt-1"
                >
                  <AnimatedNumber 
                    value={stat.value} 
                    duration={1500}
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                  />
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trends */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Application Trends</h2>
            <Activity className="text-blue-500" size={20} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={applicationTrends}>
              <defs>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#1f2937',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                labelStyle={{ color: '#1f2937', fontWeight: '600' }}
              />
              <Area 
                type="monotone" 
                dataKey="applications" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorApplications)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status Distribution */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Status Distribution</h2>
            <PieChart className="text-purple-500" size={20} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RePieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: '#1f2937',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                labelStyle={{ color: '#1f2937', fontWeight: '600' }}
              />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Monthly Bar Chart */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Monthly Overview</h2>
          <BarChart3 className="text-green-500" size={20} />
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#1f2937',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              labelStyle={{ color: '#1f2937', fontWeight: '600' }}
            />
            <Bar 
              dataKey="applications" 
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <Clock className="text-orange-500" size={20} />
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}>
                      <Icon className="text-white" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.subtitle} • {activity.time}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
            <Zap className="text-yellow-500" size={20} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: 'Review Applications', color: 'blue' },
              { icon: FileText, label: 'Manage Content', color: 'green' },
              { icon: MessageSquare, label: 'Testimonials', color: 'purple' }
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 bg-${action.color}-50 dark:bg-${action.color}-900/20 border border-${action.color}-200 dark:border-${action.color}-800 rounded-xl hover:bg-${action.color}-100 dark:hover:bg-${action.color}-900/30 transition-all duration-200 group`}
              >
                <action.icon className={`text-${action.color}-600 dark:text-${action.color}-400 mb-2 group-hover:scale-110 transition-transform`} size={24} />
                <p className="text-sm font-medium text-gray-900 dark:text-white">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
      </motion.div>
    </div>
    <FloatingActions 
      onRefresh={handleRefresh}
      onExport={handleExport}
      onSettings={handleSettings}
      dashboardData={dashboardData}
    />
    </>
  )
}

export default AnimatedDashboard

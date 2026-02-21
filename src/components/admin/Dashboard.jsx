import { useState, useEffect } from 'react'
import { Users, FileText, MessageSquare, Briefcase, TrendingUp } from 'lucide-react'
import { supabase } from '../../services/supabase'

const Dashboard = ({ internshipApplications, loading }) => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
    totalTestimonials: 0
  })

  useEffect(() => {
    fetchStats()
  }, [internshipApplications])

  const fetchStats = async () => {
    try {
      // Calculate stats from props
      const pending = internshipApplications?.filter(app => app.status === 'pending' || !app.status).length || 0
      const accepted = internshipApplications?.filter(app => app.status === 'accepted').length || 0
      const rejected = internshipApplications?.filter(app => app.status === 'rejected').length || 0

      // Fetch testimonials count
      const { count: testimonialsCount, error: testimonialError } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })

      if (testimonialError && testimonialError.code !== 'PGRST116') {
        // Table doesn't exist yet, count as 0
      }

      setStats({
        totalApplications: internshipApplications?.length || 0,
        pendingApplications: pending,
        acceptedApplications: accepted,
        rejectedApplications: rejected,
        totalTestimonials: testimonialsCount || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Pending Review',
      value: stats.pendingApplications,
      icon: FileText,
      color: 'bg-yellow-500',
      trend: '+5%'
    },
    {
      title: 'Accepted',
      value: stats.acceptedApplications,
      icon: TrendingUp,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      icon: MessageSquare,
      color: 'bg-purple-500',
      trend: '+3%'
    }
  ]

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome to the admin control panel</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 mt-2">{stat.trend}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    New application received
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Application approved
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    New testimonial added
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Users className="text-blue-600 dark:text-blue-400 mb-2" size={24} />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Review Applications</p>
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <FileText className="text-green-600 dark:text-green-400 mb-2" size={24} />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Update Content</p>
              </button>
              <button className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <MessageSquare className="text-purple-600 dark:text-purple-400 mb-2" size={24} />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Manage Testimonials</p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard

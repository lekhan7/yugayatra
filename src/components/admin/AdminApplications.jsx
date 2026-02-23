import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import StatusTabs from './StatusTabs'
import ApplicationsTable from './ApplicationsTable'
import { sendInternshipAcceptanceEmail } from '../../services/emailService'

const AdminApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('internship_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setApplications(data || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      setApplications([])
      setToast({
        show: true,
        message: 'Failed to load applications',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (id, status) => {
    try {
      // First get the application details
      const { data: application, error: fetchError } = await supabase
        .from('internship_applications')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Update the status
      const { error } = await supabase
        .from('internship_applications')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status } : app
        )
      )

      // Send email if accepted
      if (status === 'accepted') {
        try {
          await sendInternshipAcceptanceEmail(application)
          setToast({
            show: true,
            message: 'Application Accepted & Email Sent',
            type: 'success'
          })
        } catch (emailError) {
          console.error('Email sending failed:', emailError)
          setToast({
            show: true,
            message: 'Application Accepted but Email Failed',
            type: 'warning'
          })
        }
      } else {
        setToast({
          show: true,
          message: `Application ${status === 'rejected' ? 'Rejected' : 'Updated'}`,
          type: 'success'
        })
      }

      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
    } catch (error) {
      console.error('Error updating status:', error)
      setToast({
        show: true,
        message: 'Error updating application',
        type: 'error'
      })
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
    }
  }

  const viewResume = (resumeUrl) => {
    if (!resumeUrl) {
      alert('Resume not available')
      return
    }
    window.open(resumeUrl, '_blank')
  }

  const getFilteredApplications = () => {
    let filtered = applications

    // Filter by active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(app => {
        const status = app.status || 'pending'
        return status === activeTab
      })
    }

    // Apply additional status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => {
        const status = app.status || 'pending'
        return status === statusFilter
      })
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(app => !app.status || app.status === 'pending').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Applications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage internship applications</p>
        </div>
        <button
          onClick={fetchApplications}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <span>🔄 Refresh</span>
          )}
        </button>
      </div>

      {/* Status Tabs */}
      <StatusTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
      />

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <ApplicationsTable
        applications={getFilteredApplications()}
        loading={loading}
        onUpdateStatus={updateApplicationStatus}
        onViewResume={viewResume}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
          toast.type === 'success' 
            ? 'bg-green-600 text-white' 
            : toast.type === 'warning'
            ? 'bg-yellow-600 text-white'
            : 'bg-red-600 text-white'
        }`}>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  )
}

export default AdminApplications
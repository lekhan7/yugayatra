import { useState, useEffect } from 'react'
import { Search, Filter, Eye, Check, X, Download, Mail, User, Calendar, Briefcase, GraduationCap } from 'lucide-react'
import { supabase, createSignedUrl } from '../../services/supabase'

const ApplicationsManager = ({ applications, onApplicationsChange }) => {
  const [filteredApplications, setFilteredApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updatingId, setUpdatingId] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    filterApplications()
  }, [applications, searchTerm, statusFilter])

  const filterApplications = () => {
    let filtered = applications

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => {
        const status = app.status || 'pending'
        return status === statusFilter
      })
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.role?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredApplications(filtered)
  }

  const updateApplicationStatus = async (id, status) => {
    if (updatingId === id) return // Prevent double-click
    
    setUpdatingId(id)
    try {
      const { error } = await supabase
        .from('internship_applications')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      // Update local state using parent callback
      onApplicationsChange(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status } : app
        )
      )

      // Send email notification
      await sendEmailNotification(id, status)

      // Show success toast
      setToast({
        show: true,
        message: `Application ${status === 'accepted' ? 'Accepted' : 'Rejected'}`,
        type: 'success'
      })
    } catch (error) {
      console.error('Error updating status:', error)
      setToast({
        show: true,
        message: 'Error updating application status',
        type: 'error'
      })
    } finally {
      setUpdatingId(null)
      // Hide toast after 3 seconds
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
    }
  }

  const sendEmailNotification = async (applicationId, status) => {
    const application = applications.find(app => app.id === applicationId)
    
    if (!application) return

    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-application-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            to: application.email,
            fullName: application.full_name,
            role: application.role,
            status: status,
            companyName: 'YugYatra'
          })
        }
      )

      if (!response.ok) {
        const error = await response.json()
        console.error('Email service error:', error)
        // Don't throw error, just log it since status update is more important
      }
    } catch (error) {
      console.error('Error sending email:', error)
      // Don't throw error, just log it since status update is more important
    }
  }

  const viewResume = async (resumeUrl, resumeFilename) => {
    if (!resumeUrl) {
      alert('Resume not available')
      return
    }

    try {
      // Generate signed URL for secure access
      const signedUrl = await createSignedUrl('resumes', resumeUrl, 60)
      window.open(signedUrl, '_blank')
    } catch (error) {
      console.error('Error generating resume URL:', error)
      alert('Error opening resume. Please try again.')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-accent-main/20 text-accent-dark dark:bg-accent-dark dark:text-accent-light border-accent-main/30 dark:border-accent-dark'
      case 'rejected':
        return 'bg-accent-gold/20 text-accent-gold dark:bg-accent-gold dark:text-accent-gold border-accent-gold/30 dark:border-accent-gold'
      default:
        return 'bg-accent-gold/20 text-accent-gold dark:bg-accent-gold dark:text-accent-gold border-accent-gold/30 dark:border-accent-gold'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <Check size={12} className="inline mr-1" />
      case 'rejected':
        return <X size={12} className="inline mr-1" />
      default:
        return <Calendar size={12} className="inline mr-1" />
    }
  }

  const viewApplicationDetails = (application) => {
    setSelectedApplication(application)
    setShowDetailsModal(true)
  }

  const closeModal = () => {
    setShowDetailsModal(false)
    setSelectedApplication(null)
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Applications Manager</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage internship applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-accent-gold">{stats.pending}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
          <p className="text-2xl font-bold text-accent-dark">{stats.accepted}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
          <p className="text-2xl font-bold text-accent-gold">{stats.rejected}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {application.full_name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {application.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {application.role}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {application.education}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                      {application.skills}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      {(application.status || 'pending').charAt(0).toUpperCase() + (application.status || 'pending').slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(application.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => viewApplicationDetails(application)}
                        className="text-accent-main hover:text-accent-dark/60 dark:text-accent-light/60 dark:hover:text-accent-light/40 p-1 hover:bg-accent-light/10 dark:hover:bg-accent-dark/60/20 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {application.resume_url && (
                        <button
                          onClick={() => viewResume(application.resume_url, application.resume_filename)}
                          className="text-accent-dark hover:text-accent-gold dark:text-accent-light dark:hover:text-accent-light p-1 hover:bg-accent-gold/10 dark:hover:bg-accent-dark/20 rounded transition-colors"
                          title="View Resume"
                        >
                          <Download size={16} />
                        </button>
                      )}
                      {(!application.status || application.status === 'pending') && (
                        <>
                          <button
                            onClick={() => updateApplicationStatus(application.id, 'accepted')}
                            disabled={updatingId === application.id}
                            className="text-accent-dark hover:text-accent-dark dark:text-accent-light dark:hover:text-accent-light disabled:opacity-50 disabled:cursor-not-allowed p-1 hover:bg-accent-main/10 dark:hover:bg-accent-dark/20 rounded transition-colors"
                            title="Accept"
                          >
                            {updatingId === application.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-dark"></div>
                            ) : (
                              <Check size={16} />
                            )}
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                            disabled={updatingId === application.id}
                            className="text-accent-gold hover:text-accent-gold dark:text-accent-gold/80 dark:hover:text-accent-gold disabled:opacity-50 disabled:cursor-not-allowed p-1 hover:bg-accent-gold/10 dark:hover:bg-accent-gold/20 rounded transition-colors"
                            title="Reject"
                          >
                            {updatingId === application.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-gold"></div>
                            ) : (
                              <X size={16} />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No applications found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Applications will appear here when submitted'}
            </p>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
          toast.type === 'success' 
            ? 'bg-accent-main/100 text-white' 
            : 'bg-accent-gold/100 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            {toast.type === 'success' ? (
              <Check size={20} />
            ) : (
              <X size={20} />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedApplication.full_name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Applied for {selectedApplication.role}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <User size={18} className="mr-2" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white">{selectedApplication.phone}</p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <GraduationCap size={18} className="mr-2" />
                  Education
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedApplication.education}</p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Briefcase size={18} className="mr-2" />
                  Experience
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedApplication.experience}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Skills</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedApplication.skills}</p>
              </div>

              {/* Motivation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Motivation</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedApplication.motivation}</p>
              </div>

              {/* Status and Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current Status</p>
                    <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${getStatusColor(selectedApplication.status)}`}>
                      {getStatusIcon(selectedApplication.status)}
                      {(selectedApplication.status || 'pending').charAt(0).toUpperCase() + (selectedApplication.status || 'pending').slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex space-x-3">
                    {selectedApplication.resume_url && (
                      <button
                        onClick={() => viewResume(selectedApplication.resume_url, selectedApplication.resume_filename)}
                        className="px-4 py-2 bg-accent-dark text-white rounded-lg hover:bg-accent-gold flex items-center space-x-2"
                      >
                        <Download size={16} />
                        <span>View Resume</span>
                      </button>
                    )}
                    {(!selectedApplication.status || selectedApplication.status === 'pending') && (
                      <>
                        <button
                          onClick={() => {
                            updateApplicationStatus(selectedApplication.id, 'accepted')
                            closeModal()
                          }}
                          disabled={updatingId === selectedApplication.id}
                          className="px-4 py-2 bg-accent-dark text-white rounded-lg hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          {updatingId === selectedApplication.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <Check size={16} />
                          )}
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => {
                            updateApplicationStatus(selectedApplication.id, 'rejected')
                            closeModal()
                          }}
                          disabled={updatingId === selectedApplication.id}
                          className="px-4 py-2 bg-accent-gold text-white rounded-lg hover:bg-accent-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          {updatingId === selectedApplication.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <X size={16} />
                          )}
                          <span>Reject</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApplicationsManager

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  DollarSign,
  Clock,
  FileText,
  Check,
  X,
  Edit2,
  Trash2,
  Search,
  Filter,
  Send
} from 'lucide-react'
import { 
  getProjectRequests, 
  updateProjectRequestStatus, 
  deleteProjectRequest 
} from '../../services/supabase'
import { sendProjectAcceptanceEmail, validateEmailConfig } from '../../services/emailService'
import { useNotification } from '../../context/NotificationContext'

const ProjectRequestsManager = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const { success, error: showError } = useNotification()

  useEffect(() => {
    fetchRequests()
    validateEmailConfig()
  }, [])

  const fetchRequests = async () => {
    try {
      const data = await getProjectRequests()
      setRequests(data)
    } catch (error) {
      console.error('Error fetching project requests:', error)
      showError('Failed to fetch project requests')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (requestId, newStatus, notes = null) => {
    setIsUpdating(true)
    try {
      const updatedRequest = await updateProjectRequestStatus(requestId, newStatus, notes)
      
      // Update local state
      setRequests(prev =>
        prev.map(request =>
          request.id === requestId ? updatedRequest : request
        )
      )

      // Send email if accepted
      if (newStatus === 'accepted') {
        try {
          await sendProjectAcceptanceEmail(updatedRequest)
          success('Project request accepted and email sent successfully!')
        } catch (emailError) {
          console.error('Email sending failed:', emailError)
          success('Project request accepted, but email notification failed. Please contact the client manually.')
        }
      } else {
        success(`Project request ${newStatus} successfully!`)
      }

      setShowNotesModal(false)
      setSelectedRequest(null)
      setAdminNotes('')
    } catch (error) {
      console.error('Error updating request status:', error)
      showError('Failed to update request status')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (requestId) => {
    if (!confirm('Are you sure you want to delete this project request?')) {
      return
    }

    try {
      await deleteProjectRequest(requestId)
      setRequests(prev => prev.filter(request => request.id !== requestId))
      success('Project request deleted successfully!')
    } catch (error) {
      console.error('Error deleting request:', error)
      showError('Failed to delete project request')
    }
  }

  const openNotesModal = (request, status) => {
    setSelectedRequest({ ...request, status })
    setAdminNotes(request.admin_notes || '')
    setShowNotesModal(true)
  }

  const filteredRequests = requests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.project_description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    accepted: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  }

  const statusIcons = {
    pending: Clock,
    accepted: Check,
    rejected: X
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Requests</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage client project requests and inquiries</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            All Requests ({filteredRequests.length})
          </h2>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No project requests found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Requests will appear here when clients submit them'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRequests.map((request) => {
              const StatusIcon = statusIcons[request.status]
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    {/* Request Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {request.project_title}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusColors[request.status]}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {request.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <User className="w-4 h-4 mr-2" />
                          {request.name}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4 mr-2" />
                          {request.email}
                        </div>
                        {request.phone && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="w-4 h-4 mr-2" />
                            {request.phone}
                          </div>
                        )}
                        {request.budget_range && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <DollarSign className="w-4 h-4 mr-2" />
                            {request.budget_range}
                          </div>
                        )}
                        {request.timeline && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4 mr-2" />
                            {request.timeline}
                          </div>
                        )}
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(request.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <FileText className="w-4 h-4 mr-2" />
                          Project Description
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {request.project_description}
                        </p>
                      </div>

                      {request.admin_notes && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                          <div className="flex items-center text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Admin Notes
                          </div>
                          <p className="text-sm text-blue-600 dark:text-blue-300">
                            {request.admin_notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 ml-4">
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => openNotesModal(request, 'accepted')}
                            disabled={isUpdating}
                            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
                          >
                            <Check className="w-4 h-4" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => openNotesModal(request, 'rejected')}
                            disabled={isUpdating}
                            className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Notes Modal */}
      <AnimatePresence>
        {showNotesModal && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowNotesModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {selectedRequest.status === 'accepted' ? 'Accept Request' : 'Reject Request'}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {selectedRequest.status === 'accepted' 
                  ? 'This will send an approval email to the client.'
                  : 'This will mark the request as rejected. No email will be sent.'
                }
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Admin Notes (Optional)
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  placeholder="Add any notes about this decision..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNotesModal(false)}
                  disabled={isUpdating}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedRequest.id, selectedRequest.status, adminNotes)}
                  disabled={isUpdating}
                  className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2 ${
                    selectedRequest.status === 'accepted'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      {selectedRequest.status === 'accepted' ? (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Accept & Send Email</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectRequestsManager

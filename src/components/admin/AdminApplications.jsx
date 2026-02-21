import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import StatusTabs from './StatusTabs'
import ApplicationsTable from './ApplicationsTable'
import emailjs from '@emailjs/browser'

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

const AdminApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  // Debug environment variables
  console.log('🔧 Environment check:', {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing',
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
    emailjsKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? '✅ Set' : '❌ Missing',
    emailjsService: import.meta.env.VITE_EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Missing',
    emailjsTemplate: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? '✅ Set' : '❌ Missing'
  })

  useEffect(() => {
    checkAuthAndFetch()
  }, [])

  const checkAuthAndFetch = async () => {
    try {
      console.log('🔐 Checking authentication...')
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        console.error('❌ Auth error:', error)
        throw error
      }
      
      if (!user) {
        console.error('❌ No authenticated user found')
        setToast({
          show: true,
          message: 'Please login to access applications',
          type: 'error'
        })
        return
      }
      
      console.log('✅ User authenticated:', user.email)
      
      // Test database access with a simple count query
      console.log('🔍 Testing database access...')
      const { count, error: countError } = await supabase
        .from('internship_applications')
        .select('*', { count: 'exact', head: true })
      
      if (countError) {
        console.error('❌ Database access error:', countError)
        
        // Check for RLS-specific errors
        if (countError.code === '42501' || countError.message?.includes('permission denied')) {
          console.error('🔒 RLS Policy Error detected during count test!')
          throw new Error('Row Level Security policy is blocking database access. Run the RLS fix script.')
        }
        
        throw new Error(`Database access failed: ${countError.message}`)
      }
      
      console.log('✅ Database access successful. Total records:', count)
      
      fetchApplications()
    } catch (error) {
      console.error('💥 Authentication check failed:', error)
      setToast({
        show: true,
        message: `Access failed: ${error.message}`,
        type: 'error'
      })
    }
  }

  const fetchApplications = async () => {
    try {
      setLoading(true)
      console.log('🔄 Starting to fetch applications from Supabase...')
      
      // Check if Supabase client is properly initialized
      if (!supabase) {
        throw new Error('Supabase client not initialized')
      }
      
      console.log('📡 Making request to internship_applications table...')
      const { data, error } = await supabase
        .from('internship_applications')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('📊 Supabase response:', { data, error })

      if (error) {
        console.error('❌ Supabase error:', error)
        
        // Check for specific RLS-related errors
        if (error.code === '42501' || error.message?.includes('permission denied')) {
          console.error('🔒 RLS Policy Error detected!')
          throw new Error('Row Level Security policy is blocking access. Please check RLS policies in Supabase.')
        }
        
        throw error
      }
      
      console.log('✅ Successfully fetched applications:', data?.length || 0, 'records')
      console.log('📋 Sample data:', data?.[0])
      
      // If no data, create a test record to verify the system works
      if (!data || data.length === 0) {
        console.log('📝 No applications found. Creating test data...')
        await createTestApplication()
      }
      
      setApplications(data || [])
    } catch (error) {
      console.error('💥 Error fetching applications:', error)
      console.error('🔍 Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      setApplications([])
      
      // Show error toast
      setToast({
        show: true,
        message: `Failed to load applications: ${error.message}`,
        type: 'error'
      })
      
      // Hide error toast after 5 seconds
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 5000)
    } finally {
      setLoading(false)
      console.log('🏁 Fetch applications completed')
    }
  }

  const createTestApplication = async () => {
    try {
      const testData = {
        full_name: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890',
        role: 'Software Developer',
        education: 'Bachelor of Computer Science',
        experience: '2 years of experience',
        skills: 'JavaScript, React, Node.js',
        status: 'pending'
      }

      const { data, error } = await supabase
        .from('internship_applications')
        .insert([testData])
        .select()

      if (error) {
        console.error('❌ Failed to create test data:', error)
        return
      }

      console.log('✅ Test application created:', data)
      
      // Show success toast
      setToast({
        show: true,
        message: 'Test application created for demonstration',
        type: 'success'
      })
      
      // Refetch applications after creating test data
      setTimeout(() => fetchApplications(), 1000)
    } catch (error) {
      console.error('💥 Error creating test application:', error)
    }
  }

  // Test function to verify template interpolation
  const testEmailTemplate = () => {
    const testApplication = {
      full_name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Software Developer'
    }
    
    console.log('🧪 Testing email template with:', testApplication)
    
    const testMessage = `
Hi ${testApplication.full_name},

We're excited to inform you that your application for the ${testApplication.role} Internship has been successfully reviewed and approved.

Best regards,
Team
`
    
    console.log('✅ Test message generated:', testMessage)
    return testMessage
  }

  // Test function to verify template parameters
  const testEmailParameters = (application) => {
    console.log('🧪 Testing email parameters with application:', application)
    
    const testParams = {
      fullName: application.full_name,
      name: application.full_name,
      role: application.role,
      email: application.email,
      subject: "Congratulations! Your Internship Application Has Been Approved"
    }
    
    console.log('✅ EmailJS parameters that will be sent:', testParams)
    
    // Verify all required fields exist
    const missing = []
    if (!testParams.fullName) missing.push('fullName')
    if (!testParams.role) missing.push('role')
    if (!testParams.email) missing.push('email')
    
    if (missing.length > 0) {
      console.error('❌ Missing required parameters:', missing)
      return false
    }
    
    console.log('✅ All required parameters present')
    return true
  }

  const sendAcceptanceEmail = async (application) => {
    try {
      console.log('📧 Sending acceptance email to:', application.email)
      console.log('👤 Applicant data:', {
        fullName: application.full_name,
        role: application.role,
        email: application.email
      })
      
      // Test parameters before sending
      if (!testEmailParameters(application)) {
        throw new Error('Email parameters validation failed')
      }
      
      // Simple template parameters for EmailJS - let EmailJS handle the template
      const templateParams = {
        fullName: application.full_name,
        name: application.full_name,
        role: application.role,
        email: application.email,
        subject: "Congratulations! Your Internship Application Has Been Approved"
      }

      console.log('📨 Template params being sent to EmailJS:', templateParams)

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      console.log('📬 EmailJS response:', response)

      if (response.status === 200) {
        console.log('✅ Email sent successfully')
        return { success: true, result: response }
      } else {
        console.error('❌ Email sending failed:', response.text)
        throw new Error(response.text || 'Email send failed')
      }

    } catch (error) {
      console.error('❌ Error sending email:', error)
      return { success: false, error: error.message }
    }
  }

  const updateApplicationStatus = async (id, status) => {
    try {
      console.log(`🔄 Updating application ${id} to status: ${status}`)
      
      // First, get the application details before updating
      const { data: application, error: fetchError } = await supabase
        .from('internship_applications')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) {
        console.error('❌ Error fetching application details:', fetchError)
        throw fetchError
      }

      console.log('📋 Retrieved application for status update:', {
        id: application.id,
        fullName: application.full_name,
        role: application.role,
        email: application.email,
        currentStatus: application.status,
        newStatus: status
      })

      // Verify required fields for email sending
      if (status === 'accepted' && (!application.full_name || !application.role)) {
        console.error('❌ Cannot accept application - missing required fields:', {
          fullName: application.full_name,
          role: application.role
        })
        throw new Error('Application is missing required name or role information')
      }

      // Update the status in Supabase
      const { error } = await supabase
        .from('internship_applications')
        .update({ status })
        .eq('id', id)

      if (error) {
        console.error('❌ Error updating status:', error)
        throw error
      }

      console.log('✅ Successfully updated application status')

      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status } : app
        )
      )

      // Send email only if status is 'accepted'
      if (status === 'accepted') {
        console.log('📧 Application accepted, sending email...')
        
        const emailResult = await sendAcceptanceEmail(application)
        
        if (emailResult.success) {
          setToast({
            show: true,
            message: 'Application Accepted & Email Sent',
            type: 'success'
          })
        } else {
          setToast({
            show: true,
            message: 'Application Accepted but Email Failed',
            type: 'warning'
          })
        }
      } else {
        // For rejected status, don't send email
        setToast({
          show: true,
          message: `Application ${status === 'rejected' ? 'Rejected' : 'Updated'}`,
          type: 'success'
        })
      }

      // Hide toast after 3 seconds
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
    } catch (error) {
      console.error('💥 Error updating status:', error)
      setToast({
        show: true,
        message: `Error updating application: ${error.message}`,
        type: 'error'
      })
      
      // Hide error toast after 5 seconds
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 5000)
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
    
    console.log('🔍 Filtering applications:', {
      total: applications.length,
      activeTab,
      statusFilter,
      searchTerm
    })

    // Filter by active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(app => {
        const status = app.status || 'pending'
        return status === activeTab
      })
      console.log(`📋 After tab filter (${activeTab}):`, filtered.length)
    }

    // Apply additional status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => {
        const status = app.status || 'pending'
        return status === statusFilter
      })
      console.log(`📋 After status filter (${statusFilter}):`, filtered.length)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      console.log(`📋 After search filter ("${searchTerm}"):`, filtered.length)
    }

    console.log('✅ Final filtered count:', filtered.length)
    return filtered
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(app => !app.status || app.status === 'pending').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  }

  console.log('📊 Application stats:', stats)

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
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
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

      {/* Debug Panel - Remove in production */}
    

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
            ? 'bg-green-500 text-white' 
            : toast.type === 'warning'
            ? 'bg-yellow-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  )
}

export default AdminApplications

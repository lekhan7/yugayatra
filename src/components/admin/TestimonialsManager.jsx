import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Plus, Edit2, Trash2, Save, X, MessageSquare, Star, Check, XCircle, Clock, User, Mail, Link2, Calendar } from 'lucide-react'
import { getAllTestimonials, updateTestimonialStatus, deleteTestimonial, subscribeToTestimonials } from '../../services/testimonials'

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pending')
  const [updatingId, setUpdatingId] = useState(null)

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  useEffect(() => {
    fetchTestimonials()
  }, [activeTab])

  // Set up real-time subscription
  useEffect(() => {
    const unsubscribe = subscribeToTestimonials((payload) => {
      if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT' || payload.eventType === 'DELETE') {
        fetchTestimonials()
      }
    })

    return unsubscribe
  }, [activeTab])

  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const result = await getAllTestimonials(activeTab === 'all' ? null : activeTab)
      if (result.success) {
        setTestimonials(result.data)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    setUpdatingId(id)
    try {
      const result = await updateTestimonialStatus(id, 'accepted')
      if (result.success) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error('Error approving testimonial:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleReject = async (id) => {
    if (!confirm('Are you sure you want to reject this testimonial?')) {
      return
    }
    
    setUpdatingId(id)
    try {
      const result = await updateTestimonialStatus(id, 'rejected')
      if (result.success) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error('Error rejecting testimonial:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial permanently?')) {
      return
    }

    setUpdatingId(id)
    try {
      const result = await deleteTestimonial(id)
      if (result.success) {
        fetchTestimonials()
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-accent-gold/80 fill-current' : 'text-gray-300'}
      />
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Testimonials Manager</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Review and manage customer testimonials</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'pending', label: 'Pending', icon: Clock, color: 'text-accent-gold' },
              { id: 'accepted', label: 'Accepted', icon: Check, color: 'text-accent-dark' },
              { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-accent-gold' },
              { id: 'all', label: 'All', icon: MessageSquare, color: 'text-gray-600' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-accent-main text-accent-main'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-accent-main' : tab.color}`} />
                <span>{tab.label}</span>
                {tab.id !== 'all' && (
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                    {testimonials.filter(t => t.status === tab.id).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 dark:text-gray-400">
                No {activeTab === 'all' ? '' : activeTab} testimonials
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent-main to-accent-main rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {testimonial.full_name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {testimonial.full_name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <Mail className="w-4 h-4" />
                            <span>{testimonial.email}</span>
                          </div>
                          {testimonial.linkedin_url && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                              <Link2 className="w-4 h-4" />
                              <a 
                                href={testimonial.linkedin_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-accent-main hover:underline"
                              >
                                LinkedIn Profile
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-3">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                          testimonial.status === 'pending' ? 'bg-accent-gold/20 text-accent-gold dark:bg-accent-gold/20 dark:text-accent-gold/80' :
                          testimonial.status === 'accepted' ? 'bg-accent-main/20 text-accent-dark dark:bg-accent-dark/20 dark:text-accent-light' :
                          'bg-accent-gold/20 text-red-800 dark:bg-accent-gold/20 dark:text-accent-gold/80'
                        }`}>
                          {testimonial.status === 'pending' && <Clock className="w-3 h-3" />}
                          {testimonial.status === 'accepted' && <Check className="w-3 h-3" />}
                          {testimonial.status === 'rejected' && <XCircle className="w-3 h-3" />}
                          <span className="capitalize">{testimonial.status}</span>
                        </span>
                      </div>

                      {/* Testimonial Content */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {testimonial.description}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Submitted {new Date(testimonial.created_at).toLocaleDateString()}</span>
                        </div>
                        {testimonial.updated_at !== testimonial.created_at && (
                          <div className="flex items-center space-x-1">
                            <span>Updated {new Date(testimonial.updated_at).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 ml-4">
                      {testimonial.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(testimonial.id)}
                            disabled={updatingId === testimonial.id}
                            className="flex items-center space-x-1 px-3 py-2 bg-accent-dark text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleReject(testimonial.id)}
                            disabled={updatingId === testimonial.id}
                            className="flex items-center space-x-1 px-3 py-2 bg-accent-gold text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        disabled={updatingId === testimonial.id}
                        className="flex items-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsManager

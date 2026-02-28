import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { submitTestimonial } from '../services/testimonials'

const TestimonialSubmissionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    linkedin_url: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      linkedin_url: '',
      description: ''
    })
    setSubmitStatus(null)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm()
      onClose()
    }
  }

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      return 'Please enter your full name'
    }
    if (!formData.email.trim()) {
      return 'Please enter your email address'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please enter a valid email address'
    }
    if (formData.linkedin_url && !/^https?:\/\/(www\.)?linkedin\.com\/.*/.test(formData.linkedin_url)) {
      return 'Please enter a valid LinkedIn URL'
    }
    if (!formData.description.trim()) {
      return 'Please enter your testimonial'
    }
    if (formData.description.trim().length < 20) {
      return 'Testimonial must be at least 20 characters long'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setSubmitStatus({ type: 'error', message: validationError })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await submitTestimonial({
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        linkedin_url: formData.linkedin_url.trim() || null,
        description: formData.description.trim()
      })

      if (result.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Your testimonial is being sent to Yuga Yatra for review!' 
        })
        setTimeout(() => {
          handleClose()
        }, 3000)
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: result.error || 'Failed to submit testimonial. Please try again.' 
        })
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'An unexpected error occurred. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (submitStatus?.type === 'error') {
      setSubmitStatus(null)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-main to-accent-main rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Share Your Experience
              </h2>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 text-black bg-white border border-black hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="john@example.com"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* LinkedIn URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn URL (Optional)
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://linkedin.com/in/johndoe"
                disabled={isSubmitting}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Testimonial *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Share your experience working with YugaYatra..."
                disabled={isSubmitting}
                required
              />
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formData.description.trim().length}/20 characters minimum
              </div>
            </div>

            {/* Status Message */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg flex items-center space-x-2 ${
                  submitStatus.type === 'success' 
                    ? 'bg-accent-main/10 dark:bg-accent-dark/20 text-accent-dark dark:text-accent-light' 
                    : 'bg-accent-gold/10 dark:bg-accent-gold/20 text-accent-gold dark:text-accent-gold/80'
                }`}
              >
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">{submitStatus.message}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || submitStatus?.type === 'success'}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-white text-black border border-black font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : submitStatus?.type === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Submitted Successfully!</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Testimonial</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TestimonialSubmissionModal

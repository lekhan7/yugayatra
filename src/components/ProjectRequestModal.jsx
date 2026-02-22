import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, User, Mail, Phone, Briefcase, FileText, DollarSign, Clock } from 'lucide-react'
import { submitProjectRequest } from '../services/supabase'

const ProjectRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_title: '',
    project_description: '',
    budget_range: '',
    timeline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('')

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      project_title: '',
      project_description: '',
      budget_range: '',
      timeline: ''
    })
    setSubmitStatus(null)
    setErrorMessage('')
  }

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm()
      onClose()
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    const required = ['name', 'email', 'project_title', 'project_description']
    const missing = required.filter(field => !formData[field].trim())
    
    if (missing.length > 0) {
      setErrorMessage('Please fill in all required fields')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      await submitProjectRequest(formData)
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setTimeout(() => {
        handleClose()
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting project request:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Failed to submit project request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formFields = [
    {
      name: 'name',
      label: 'Full Name *',
      type: 'text',
      icon: User,
      placeholder: 'John Doe',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address *',
      type: 'email',
      icon: Mail,
      placeholder: 'john@example.com',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      icon: Phone,
      placeholder: '+1 (555) 123-4567',
      required: false
    },
    {
      name: 'project_title',
      label: 'Project Title *',
      type: 'text',
      icon: Briefcase,
      placeholder: 'E-commerce Website Redesign',
      required: true
    },
    {
      name: 'project_description',
      label: 'Project Description *',
      type: 'textarea',
      icon: FileText,
      placeholder: 'Describe your project in detail...',
      required: true,
      rows: 4
    },
    {
      name: 'budget_range',
      label: 'Budget Range',
      type: 'select',
      icon: DollarSign,
      options: [
        { value: '', label: 'Select budget range' },
        { value: '$5,000 - $10,000', label: '$5,000 - $10,000' },
        { value: '$10,000 - $25,000', label: '$10,000 - $25,000' },
        { value: '$25,000 - $50,000', label: '$25,000 - $50,000' },
        { value: '$50,000+', label: '$50,000+' }
      ],
      required: false
    },
    {
      name: 'timeline',
      label: 'Expected Timeline',
      type: 'select',
      icon: Clock,
      options: [
        { value: '', label: 'Select timeline' },
        { value: 'ASAP', label: 'ASAP' },
        { value: '1-2 months', label: '1-2 months' },
        { value: '3-6 months', label: '3-6 months' },
        { value: '6+ months', label: '6+ months' }
      ],
      required: false
    }
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Start Your Project
            </h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Project Request Submitted!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Thank you for your interest! We'll review your project and get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <p className="text-red-600 dark:text-red-400 text-sm">{errorMessage}</p>
                  </motion.div>
                )}

                {/* Form Fields */}
                {formFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      {field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          rows={field.rows || 3}
                          required={field.required}
                          disabled={isSubmitting}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-olive-300 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 disabled:opacity-50"
                        />
                      ) : field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-olive-300 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50 appearance-none"
                        >
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          disabled={isSubmitting}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-olive-300 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 disabled:opacity-50"
                        />
                      )}
                    </div>
                  </div>
                ))}

                {/* Submit Button */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-olive-200 to-olive-300 text-white rounded-lg hover:from-olive-300 hover:to-olive-900 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectRequestModal

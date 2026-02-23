import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, Clock, TrendingUp } from 'lucide-react'
import { submitContactForm } from '../../services/supabase'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await submitContactForm(formData)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      })
    } catch (err) {
      setError('Failed to submit form. Please try again.')
      console.error('Error submitting form:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hr@yugayatraretail.com',
      href: 'mailto:hr@yugayatraretail.com'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: '24h',
      href: '#'
    },
    {
      icon: TrendingUp,
      title: 'Satisfaction Rate',
      content: '100%',
      href: '#'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-card-bg dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-accent-main dark:text-dark-blue-accent mb-6">
            Get in Touch
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>
      </div>

      {/* Contact Content */}
      <div className="py-20 bg-bg-main dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Send Message and Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 items-stretch">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-text-main dark:text-dark-text-primary mb-6">
                Send us a Message
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent-main/10 dark:bg-dark-blue-accent/20 border border-accent-main/30 dark:border-dark-blue-primary rounded-2xl p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-accent-main dark:text-dark-blue-accent mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-accent-dark dark:text-dark-text-primary mb-2">
                    Thank You!
                  </h4>
                  <p className="text-accent-dark dark:text-dark-text-secondary">
                    Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-main dark:text-white/70 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border-light dark:border-dark-border rounded-lg focus:ring-2 focus:ring-accent-main dark:focus:ring-dark-blue-accent focus:border-transparent bg-card-bg dark:bg-dark-card text-text-main dark:text-dark-text-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-main dark:text-white/70 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border-light dark:border-dark-border rounded-lg focus:ring-2 focus:ring-accent-main dark:focus:ring-dark-blue-accent focus:border-transparent bg-card-bg dark:bg-dark-card text-text-main dark:text-dark-text-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-main dark:text-white/70 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border-light dark:border-dark-border rounded-lg focus:ring-2 focus:ring-accent-main dark:focus:ring-dark-blue-accent focus:border-transparent bg-card-bg dark:bg-dark-card text-text-main dark:text-dark-text-primary transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-text-main dark:text-white/70 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border-light dark:border-dark-border rounded-lg focus:ring-2 focus:ring-accent-main dark:focus:ring-dark-blue-accent focus:border-transparent bg-card-bg dark:bg-dark-card text-text-main dark:text-dark-text-primary transition-colors"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-main dark:text-white/70 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent bg-card-bg dark:bg-card-bg/10 text-text-main dark:text-white transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {error && (
                    <div className="bg-accent-gold/10 dark:bg-dark-blue-accent/20 border border-accent-gold/30 dark:border-dark-blue-primary rounded-lg p-4">
                      <p className="text-accent-gold dark:text-dark-blue-accent">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-accent-main to-accent-gold dark:from-dark-blue-accent dark:to-dark-blue-primary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-text-main dark:text-dark-text-primary mb-6">
                  Contact Information
                </h3>
                <p className="text-text-light dark:text-dark-text-secondary mb-8">
                  Reach out to us through any of the following channels. We're here to help and answer any questions you might have.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-6 bg-card-bg dark:bg-dark-card rounded-xl border border-border-light dark:border-dark-border hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-main to-accent-gold dark:from-dark-blue-accent dark:to-dark-blue-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-text-main dark:text-dark-text-primary mb-1">
                        {info.title}
                      </h4>
                      {info.href.startsWith('mailto') || info.href.startsWith('tel') ? (
                        <a
                          href={info.href}
                          className="text-accent-main dark:text-dark-blue-accent hover:text-accent-dark dark:hover:text-dark-blue-primary transition-colors duration-200"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-text-light dark:text-dark-text-secondary">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle Section: Maps and Business Hours */}
          <div className="mb-12">
            {/* Headings Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
              <div>
                <h4 className="text-xl font-semibold text-text-main dark:text-dark-text-primary mb-4 text-center">
                  Our Location
                </h4>
              </div>
              <div>
                <h4 className="text-xl font-bold text-text-main dark:text-dark-text-primary mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  BUSINESS HOURS
                </h4>
              </div>
            </div>
            
            {/* Content Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-bg-main dark:bg-dark-card rounded-xl h-80 flex items-center justify-center border border-border-light dark:border-dark-border">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-text-light dark:text-dark-text-secondary mx-auto mb-2" />
                    <p className="text-text-light dark:text-white/70">
                      Interactive map coming soon
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-accent-main to-accent-gold dark:from-dark-blue-accent dark:to-dark-blue-primary rounded-xl p-6 text-white h-80 overflow-y-auto"
              >
                <div className="space-y-4 w-full">
                  <div className="border-l-4 border-blue-400 dark:border-dark-blue-light pl-4">
                    <p className="text-sm uppercase text-gray-200">Mon - Fri</p>
                    <p className="text-lg font-bold">9:00 AM - 6:00 PM</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4 mt-4">
                    <p className="text-sm uppercase text-gray-200">Saturday</p>
                    <p className="text-lg font-bold">10:00 AM - 4:00 PM</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-4 mt-4">
                    <p className="text-sm uppercase text-gray-200">Sunday</p>
                    <p className="text-lg font-bold">Closed</p>
                  </div>
                  <div className="border-t border-white/30 my-4"></div>
                  <div className="mt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center" style={{marginLeft: '-8px'}}>
                        <MapPin className="w-4 h-4 text-blue-400 dark:text-dark-blue-light mr-2" />
                        <p className="text-lg font-bold">Electronic City, Phase 1, Bengaluru</p>
                      </div>
                      <div className="flex items-center" style={{marginLeft: '-8px'}}>
                        <Phone className="w-4 h-4 text-blue-400 dark:text-dark-blue-light mr-2" />
                        <p className="text-lg font-bold">+91 8757728679</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

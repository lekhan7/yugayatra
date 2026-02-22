import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Building, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    botcheck: ''
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
      const web3FormData = new FormData()
      web3FormData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
      web3FormData.append('name', formData.name)
      web3FormData.append('email', formData.email)
      web3FormData.append('phone', formData.phone)
      web3FormData.append('company', formData.company)
      web3FormData.append('message', formData.message)
      web3FormData.append('botcheck', formData.botcheck)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          botcheck: ''
        })
      } else {
        setError('Failed to submit form. Please try again.')
      }
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
      content: 'info@yugyatra.com',
      href: 'mailto:info@yugyatra.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'Bangalore, Karnataka 560001, India',
      href: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-bg-main dark:bg-text-main transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-bg-main via-olive-50 to-olive-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold" style={{color: '#252B0D'}}>
              Get in <span className="text-accent-main">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-light dark:text-white/70 max-w-3xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-text-main dark:text-white mb-6">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-green-700 dark:text-green-400">
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
                        className="w-full px-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent dark:bg-card-bg/10 dark:text-white transition-colors"
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
                        className="w-full px-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent dark:bg-card-bg/10 dark:text-white transition-colors"
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
                        className="w-full px-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent dark:bg-card-bg/10 dark:text-white transition-colors"
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
                        className="w-full px-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent dark:bg-card-bg/10 dark:text-white transition-colors"
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
                      className="w-full px-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent dark:bg-card-bg/10 dark:text-white transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <p className="text-red-700 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-accent-main to-olive-200 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

                  {/* Honeypot Spam Protection */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    checked={formData.botcheck}
                    onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked })}
                  />
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
                <h2 className="text-3xl font-bold text-text-main dark:text-white mb-6">
                  Contact Information
                </h2>
                <p className="text-text-light dark:text-white/70 mb-8">
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
                    className="flex items-start space-x-4 p-6 bg-card-bg dark:bg-card-bg/10 rounded-xl border border-border-light dark:border-white/10 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-main to-olive-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-main dark:text-white mb-1">
                        {info.title}
                      </h3>
                      {info.href.startsWith('mailto') || info.href.startsWith('tel') ? (
                        <a
                          href={info.href}
                          className="text-accent-main dark:text-olive-300 hover:text-olive-600 transition-colors duration-200"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-text-light dark:text-white/70">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-accent-main to-olive-200 rounded-xl p-6 text-white"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card-bg dark:bg-card-bg/10 rounded-xl p-6 border border-border-light dark:border-white/10"
              >
                <h3 className="text-xl font-semibold text-text-main dark:text-white mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Our Location
                </h3>
                <div className="bg-bg-main dark:bg-card-bg/10 rounded-xl h-48 flex items-center justify-center border border-border-light dark:border-white/10">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-text-light mx-auto mb-2" />
                    <p className="text-text-light dark:text-white/70">
                      Bangalore, India
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact

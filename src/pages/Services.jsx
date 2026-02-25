import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Code, 
  Palette, 
  TrendingUp, 
  Users, 
  Globe,
  Monitor,
  PenTool,
  Brain,
  CheckCircle,
  ArrowRight,
  Zap,
  Eye
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { getServices } from '../services/supabase'
import React from 'react'

// Icon mapping function
const getIcon = (iconName) => {
  const iconMap = {
    Code,
    Palette,
    TrendingUp,
    Users,
    Globe,
    Monitor,
    PenTool,
    Brain
  }
  return iconMap[iconName] || Code
}

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices()
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Ensure Consulting service is always visible
  const displayedServices = showAll ? services : services.slice(0, 6)
  
  // Always include Consulting service if it exists and is not already in displayed services
  const consultingService = services.find(s => s.slug === 'consulting')
  const finalDisplayedServices = consultingService && !displayedServices.find(s => s.slug === 'consulting') 
    ? [consultingService, ...displayedServices.slice(0, 5)] 
    : displayedServices

  return (
    <div className="min-h-screen bg-bg-main dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-bg-main via-white to-accent-light/20 dark:from-dark-bg dark:via-dark-surface dark:to-dark-blue-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-mint-clarity mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-accent-main max-w-3xl mx-auto">
              Comprehensive digital solutions to accelerate your business growth and transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-bg-main dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {finalDisplayedServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <div className="bg-card-bg dark:bg-dark-card rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 border border-border-light dark:border-dark-border hover:border-border-light flex flex-col">
                      <div className="w-16 h-16 bg-accent-main dark:bg-dark-blue-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        {React.createElement(getIcon(service.icon_name), { className: "w-8 h-8 text-white" })}
                      </div>
                      <h3 className="text-2xl font-bold text-text-main dark:text-dark-text-primary mb-4">
                        {service.title}
                      </h3>
                      <p className="text-text-light dark:text-dark-text-secondary mb-6">
                        {service.short_description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-text-light dark:text-dark-text-secondary">
                            <CheckCircle className="w-4 h-4 text-accent-main mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-dark-blue-accent/20 text-dark-blue-primary rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            const encodedRole = encodeURIComponent(service.title)
                            window.location.href = `/internship/apply/${encodedRole}`
                          }}
                          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-main to-accent-light dark:from-dark-blue-accent dark:to-dark-blue-primary text-white text-sm font-semibold hover:shadow-lg transition-all duration-200"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show More Button */}
              {services.length > 6 && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAll(!showAll)}
                    className="bg-dark-blue-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-dark-blue-primary transition-colors duration-300 inline-flex items-center"
                  >
                    {showAll ? 'Show Less' : 'Show More'}
                    <Eye className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Detailed Service Section */}
      <section className="py-20 bg-bg-main dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-accent-main mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-text-light dark:text-white/70 max-w-2xl mx-auto">
              Our comprehensive suite of services designed to meet all your digital needs
            </p>
          </motion.div>

          {!loading && services.length > 0 && (() => {
                const consultingService = services.find(s => s.slug === 'consulting')
                const otherServices = services.filter(s => s.slug !== 'consulting')
                const featuredServices = consultingService 
                  ? [consultingService, ...otherServices.slice(0, 1)]
                  : services.slice(0, 2)
                
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {featuredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-dark-card rounded-2xl p-8 shadow-lg border border-border-light dark:border-dark-border"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-dark-blue-accent rounded-xl flex items-center justify-center flex-shrink-0">
                        {React.createElement(getIcon(service.icon_name), { className: "w-10 h-10 text-white" })}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                          {service.title}
                        </h3>
                        <p className="text-text-light dark:text-white/70 mb-6">
                          {service.short_description}
                        </p>
                        <div className="space-y-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-text-light dark:text-white/70">
                              <CheckCircle className="w-5 h-5 text-accent-main mr-3 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-dark-card text-white/70 rounded-full text-sm font-medium border border-border-light dark:border-dark-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                    ))}
                  </div>
                )
              })()
            }
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-bg-main dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-accent-dark via-accent-main to-accent-gold dark:from-dark-blue-accent dark:via-dark-blue-primary dark:to-dark-blue-secondary bg-clip-text text-transparent mb-4">
              Our Process
            </h2>
            <p className="text-xl text-text-light dark:text-dark-text-secondary">
              How we deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
              { step: '02', title: 'Strategy', description: 'Creating a comprehensive plan' },
              { step: '03', title: 'Development', description: 'Building your solution' },
              { step: '04', title: 'Delivery', description: 'Launching and supporting' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent-main dark:bg-dark-blue-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-text-main dark:text-dark-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-light dark:text-dark-text-secondary">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-main to-accent-light dark:from-dark-blue-accent dark:to-dark-blue-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-accent-dark via-accent-main to-accent-gold dark:from-dark-blue-accent dark:via-dark-blue-primary dark:to-dark-blue-secondary bg-clip-text text-transparent mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how our services can help transform your business
            </p>
            <Link to="/contact" className="bg-dark-card text-dark-blue-primary px-8 py-3 rounded-full font-semibold hover:bg-dark-surface transition-colors duration-300 inline-flex items-center">
              Get a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Services

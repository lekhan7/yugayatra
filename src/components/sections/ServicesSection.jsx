import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import React from 'react'
import { 
  Code, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe,
  Terminal,
  GitBranch,
  Cpu,
  Server,
  Monitor,
  Code2,
  Braces,
  FileCode,
  Package,
  Layers,
  Zap,
  Settings,
  Target,
  CheckCircle,
  ArrowRight,
  Eye
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getServices } from '../../services/supabase'

// Icon mapping function
const getIcon = (iconName) => {
  const iconMap = {
    Code,
    Database,
    Cloud,
    Smartphone,
    Globe,
    Terminal,
    GitBranch,
    Cpu,
    Server,
    Monitor,
    Code2,
    Braces,
    FileCode,
    Package,
    Layers,
    Zap,
    Settings,
    Target
  }
  return iconMap[iconName] || Code
}

const ServicesSection = () => {
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices()
        console.log('Services data:', servicesData) // Debug log
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

  // Debug log
  console.log('Final displayed services:', finalDisplayedServices)

  return (
    <section id="services" className="py-20 bg-card-bg dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main dark:text-dark-text-primary mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light dark:text-dark-text-secondary max-w-3xl mx-auto">
            Comprehensive digital solutions to accelerate your business growth and transformation
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-bg-main dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main dark:border-dark-blue-primary"></div>
            </div>
          ) : finalDisplayedServices.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {finalDisplayedServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="bg-card-bg dark:bg-dark-card rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 border border-border-light dark:border-white/10 group-hover:scale-105 flex flex-col">
                      <div className="w-16 h-16 bg-gradient-to-r from-accent-main to-accent-gold dark:from-dark-blue-accent dark:to-dark-blue-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {React.createElement(getIcon(service.icon_name || 'Code'), { className: "w-8 h-8 text-white drop-shadow-lg" })}
                      </div>
                      <h3 className="text-2xl font-bold text-text-main dark:text-dark-text-primary mb-4">
                        {service.title}
                      </h3>
                      <p className="text-text-light dark:text-white/70 mb-6">
                        {service.short_description}
                      </p>
                    
                      <div className="space-y-3 mb-6">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-text-light dark:text-white/70">
                            <CheckCircle className="w-4 h-4 text-green-500 dark:text-dark-blue-primary mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-bg-main dark:bg-dark-card text-text-light dark:text-white/70 rounded-full text-xs font-medium border border-border-light dark:border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex justify-center">
                        {service.apply_enabled && (
                          <button
                            type="button"
                            onClick={() => {
                              const encodedRole = encodeURIComponent(service.title)
                              navigate(`/internship/apply/${encodedRole}`)
                            }}
                            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-main to-accent-gold dark:from-dark-blue-accent dark:to-dark-blue-primary text-white text-sm font-semibold hover:shadow-lg transition-all duration-200"
                          >
                            Apply
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
              ))}
              </div>

              {/* Show More/Less Button */}
              {services.length > 6 && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAll(!showAll)}
                    className="bg-accent-main dark:bg-dark-blue-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-accent-dark dark:hover:bg-dark-blue-primary transition-colors duration-300 inline-flex items-center"
                  >
                    {showAll ? 'Show Less' : 'Show More'}
                    <Eye className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-light dark:text-white/70 text-lg">No services available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-accent-main to-accent-gold dark:from-dark-blue-accent dark:to-dark-blue-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-4xl font-bold mb-4 text-white dark:text-white">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how our services can help transform your business
            </p>
            <a href="#contact" className="bg-card-bg dark:bg-dark-card text-accent-main dark:text-dark-blue-accent px-8 py-3 rounded-full font-semibold hover:bg-olive-50 dark:hover:bg-white/10 transition-colors duration-300 inline-flex items-center">
              Get a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

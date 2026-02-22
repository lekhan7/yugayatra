import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import React from 'react'
import { 
  Code, 
  Palette, 
  TrendingUp, 
  Users, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Eye
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getServices } from '../../services/supabase'

// Icon mapping function
const getIcon = (iconName) => {
  const iconMap = {
    Code,
    Palette,
    TrendingUp,
    Users,
    Database,
    Cloud,
    Smartphone,
    Globe
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
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const displayedServices = showAll ? services : services.slice(0, 6)

  return (
    <section id="services" className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            Comprehensive digital solutions to accelerate your business growth and transformation
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="bg-card-bg rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 border border-border-light group-hover:scale-105 flex flex-col">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.icon_bg_color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {React.createElement(getIcon(service.icon_name), { className: "w-8 h-8 text-white" })}
                    </div>
                    <h3 className="text-2xl font-bold text-text-main mb-4">
                      {service.title}
                    </h3>
                    <p className="text-text-light mb-6">
                      {service.short_description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-text-light">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-bg-main text-text-light rounded-full text-xs font-medium border border-border-light"
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
                          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-main to-blue-600 text-white text-sm font-semibold hover:shadow-lg transition-all duration-200"
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
                    className="bg-accent-main text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 inline-flex items-center"
                  >
                    {showAll ? 'Show Less' : 'Show More'}
                    <Eye className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-accent-main to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how our services can help transform your business
            </p>
            <a href="#contact" className="bg-card-bg text-accent-main px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center">
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

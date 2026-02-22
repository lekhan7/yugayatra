import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import React from 'react'
import { 
  Code, 
  Terminal,
  Cpu,
  Server,
  GitBranch,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Monitor,
  Keyboard,
  MousePointer,
  Wifi,
  HardDrive,
  Package,
  TestTube,
  Bug,
  Shield,
  Zap,
  Settings,
  Layers,
  Braces,
  CheckCircle,
  ArrowRight,
  Eye
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getServices } from '../../services/supabase'

// Tech icon mapping function
const getTechIcon = (iconName) => {
  const iconMap = {
    Code,
    Terminal,
    Cpu,
    Server,
    GitBranch,
    Database,
    Cloud,
    Smartphone,
    Globe,
    Monitor,
    Keyboard,
    MousePointer,
    Wifi,
    HardDrive,
    Package,
    TestTube,
    Bug,
    Shield,
    Zap,
    Settings,
    Layers,
    Braces
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
    <section id="services" className="py-20 bg-olive-700 dark:bg-olive-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold dark:text-olive-200 mb-6" style={{color: '#1A1F14'}}>
            Our <span className="text-olive-800">Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-olive-900 dark:text-olive-300 max-w-3xl mx-auto">
            Comprehensive digital solutions to accelerate your business growth and transformation
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-[#BEF0DA] bg-olive-800 dark:bg-olive-900">
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
                  <div className="bg-[#0D3D2B] dark:bg-olive-800 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 border border-olive-600 dark:border-olive-600 group-hover:scale-105 flex flex-col">
                    <div className="w-16 h-16 bg-olive-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {React.createElement(getTechIcon(service.icon_name), { className: "w-8 h-8 text-white" })}
                    </div>
                    <h3 className="text-2xl font-bold text-white dark:text-dark-text mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/80 dark:text-olive-900/70 mb-6">
                      {service.short_description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-white/80 dark:text-olive-900/70">
                          <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/20 dark:bg-dark-card text-white dark:text-olive-900/70 rounded-full text-xs font-medium border border-border-light dark:border-white/10"
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
                          className="w-full px-6 py-3 rounded-lg bg-white text-[#0D3D2B] text-sm font-semibold hover:bg-gray-100 transition-all duration-200"
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
                    className="bg-white text-[#0D3D2B] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center"
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
      <div className="py-20" style={{backgroundColor: '#0D3D2B'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-4xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-white mb-8">
              Let's discuss how our services can help transform your business
            </p>
            <a href="#contact" className="bg-white text-[#0D3D2B] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center">
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

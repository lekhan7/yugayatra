import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { Star, Quote, ArrowRight, TrendingUp, Users, Award, Clock, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import TestimonialSubmissionModal from '../TestimonialSubmissionModal'
import ProjectRequestModal from '../ProjectRequestModal'
import { getApprovedTestimonials } from '../../services/testimonials'

const TestimonialsSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])
  
  // Spring animations
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 })

  // Fetch testimonials from database
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await getApprovedTestimonials()
        if (result.success) {
          setTestimonials(result.data)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring"
      }
    },
    hover: {
      y: -15,
      scale: 1.05,
      rotateX: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const statVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
    },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring"
      }
    }),
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  }

  return (
    <section ref={containerRef} id="testimonials" className="py-20 bg-card-bg dark:bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-main dark:bg-dark-blue-accent rounded-full filter blur-3xl" />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent-main dark:bg-dark-blue-accent rounded-full filter blur-3xl"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-google-dark mb-6">Client Testimonials</h2>
          <motion.p 
            className="text-xl md:text-2xl text-google-dark/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            What our clients say about working with us
          </motion.p>
        </motion.div>
      </div>

      {/* Testimonials Grid */}
      <motion.div 
        style={{ y: y2 }}
        className="py-20 bg-bg-main dark:bg-black relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add Review Button */}
          <div className="flex justify-center mb-8">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-google-blue text-google-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" style={{ color: '#000000' }} />
              <span>Add Your Review</span>
            </motion.button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <Quote className="w-16 h-16 mx-auto mb-4" style={{ color: '#000000' }} />
                  <p className="text-xl text-gray-500 dark:text-dark-text-secondary">
                    No testimonials yet. Be the first to share your experience!
                  </p>
                </div>
              ) : (
                testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    variants={cardVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="bg-card-bg dark:bg-dark-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-border-light dark:border-dark-border relative overflow-hidden group"
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent-main/10 to-accent-main/10 dark:from-dark-blue-accent/10 dark:to-dark-blue-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 2, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative z-10">
                  {/* Quote Icon with Animation */}
                  <motion.div 
                    className="flex justify-center mb-4"
                    animate={{
                      rotate: hoveredCard === index ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{
                        scale: hoveredCard === index ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Quote className="w-8 h-8 mx-0.5" style={{ color: '#000000' }} />
                    </motion.div>
                  </motion.div>

                  {/* Rating with Star Animation */}
                  <motion.div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1 + i * 0.1,
                          type: "spring"
                        }}
                        whileHover={{ scale: 1.3, rotate: 360 }}
                      >
                        <Star className="w-5 h-5 fill-current mx-0.5" style={{ color: '#000000' }} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Testimonial Content */}
                  <motion.p 
                    className="text-text-light dark:text-dark-text-secondary text-center mb-6 italic leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  >
                    "{testimonial.description}"
                  </motion.p>

                  {/* Author Info */}
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-google-yellow rounded-full flex items-center justify-center mx-auto mb-3"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-white font-bold text-xl">
                        {testimonial.full_name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </motion.div>
                    <motion.h4 
                      className="text-lg font-semibold text-text-main dark:text-dark-blue-primary mb-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {testimonial.full_name}
                    </motion.h4>
                    <motion.p 
                      className="text-accent-main dark:text-dark-blue-primary text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.7 }}
                    >
                      {testimonial.email}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="py-20 bg-google-yellow relative z-10"
        style={{ y: y1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-accent-main dark:text-dark-blue-primary mb-4">
              Our Impact
            </h3>
            <motion.p 
              className="text-xl text-text-light dark:text-dark-text-secondary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Numbers that speak for themselves
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { number: '150+', label: 'Projects Completed', icon: TrendingUp },
              { number: '98%', label: 'Client Satisfaction', icon: Users },
              { number: '50+', label: 'Team Members', icon: Award },
              { number: '5+', label: 'Years Experience', icon: Clock }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={statVariants}
                whileHover="hover"
                className="text-center p-6 bg-card-bg dark:bg-dark-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-border-light dark:border-dark-border relative overflow-hidden group"
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent-main/5 to-accent-main/5 dark:from-dark-blue-accent/5 dark:to-dark-blue-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative z-10">
                  {/* Icon Animation */}
                  <motion.div
                    className="flex justify-center mb-4"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8" style={{ color: '#000000' }} />
                  </motion.div>
                  
                  {/* Number with Counter Animation */}
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-accent-main dark:text-dark-blue-primary mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      type: "spring"
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  {/* Label */}
                  <motion.p 
                    className="text-text-light dark:text-dark-text-secondary"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  >
                    {stat.label}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="py-20 bg-gradient-to-r from-accent-main to-accent-main dark:from-dark-blue-accent dark:to-dark-blue-primary relative overflow-hidden"
        style={{ scale: springScale }}
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"
          />
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
            className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full"
          />
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h3 
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span style={{ color: '#1A73E8' }}>Ready to Join Our Happy Clients?</span>
            </motion.h3>
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span style={{ color: '#1A73E8' }}>Let us help you achieve your digital transformation goals</span>
            </motion.p>
            <motion.button 
              onClick={() => setIsProjectModalOpen(true)}
              className="bg-google-blue text-google-white px-8 py-3 rounded-full font-semibold hover:bg-google-blue/90 transition-all duration-300 inline-flex items-center group"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <motion.div
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-5 h-5" style={{ color: '#000000' }} />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonial Submission Modal */}
      <TestimonialSubmissionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Project Request Modal */}
      <ProjectRequestModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </section>
  )
}

export default TestimonialsSection

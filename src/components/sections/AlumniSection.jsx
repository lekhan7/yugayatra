import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Users, Star, Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight, Quote, Award, Building } from 'lucide-react'
import { getAlumni } from '../../services/supabase'

const AlumniSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlumni()
  }, [])

  const fetchAlumni = async () => {
    try {
      const data = await getAlumni()
      setAlumni(data)
    } catch (error) {
      console.error('Error fetching alumni:', error)
      // Fallback to empty array if there's an error
      setAlumni([])
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % alumni.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + alumni.length) % alumni.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Handle loading state
  if (loading) {
    return (
      <section id="alumni" className="py-20 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  // Handle empty state
  if (alumni.length === 0) {
    return (
      <section id="alumni" className="py-20 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
              Our <span className="gradient-text">Alumni</span>
            </h2>
            <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
              Success stories from our talented graduates who are making waves in the industry
            </p>
          </motion.div>
          <div className="text-center py-12">
            <Users className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No alumni featured yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Check back soon to see success stories from our graduates
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="alumni" className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
            Our <span className="gradient-text">Alumni</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            Success stories from our talented graduates who are making waves in the industry
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Total Alumni', value: '500+', icon: Users },
              { label: 'Placement Rate', value: '95%', icon: Award },
              { label: 'Companies', value: '200+', icon: Building },
              { label: 'Countries', value: '15+', icon: MapPin }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-accent-main mb-2">{stat.value}</h3>
                <p className="text-text-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Alumni Carousel */}
      <div className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-text-main mb-4">
              Featured Alumni
            </h3>
            <p className="text-lg text-text-light">
              Meet some of our successful graduates
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {alumni.map((person) => (
                  <div key={person.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-card-bg rounded-2xl shadow-xl p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Image and Basic Info */}
                        <div className="text-center lg:text-left">
                          <div className="relative mb-6">
                            {person.image ? (
                              <img
                                src={person.image}
                                alt={person.name}
                                className="w-48 h-48 mx-auto lg:mx-0 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-48 h-48 mx-auto lg:mx-0 bg-gradient-to-br from-accent-main to-blue-600 rounded-full flex items-center justify-center">
                                <Users className="w-24 h-24 text-white/50" />
                              </div>
                            )}
                            <div className="absolute bottom-0 right-0 lg:right-0 lg:bottom-0 bg-accent-main text-white px-3 py-1 rounded-full text-xs font-medium">
                              Batch {person.batch}
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-text-main mb-2">
                            {person.name}
                          </h3>
                          
                          <p className="text-accent-main font-semibold mb-1">
                            {person.role}
                          </p>
                          
                          <p className="text-text-light mb-4">
                            {person.company}
                          </p>

                          <div className="flex items-center justify-center lg:justify-start text-sm text-text-light mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{person.location}</span>
                          </div>

                          <div className="flex space-x-3 justify-center lg:justify-start">
                            {person.linkedin && (
                              <a
                                href={person.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-bg-main text-accent-main rounded-lg border border-border-light hover:bg-card-bg transition-colors duration-200"
                              >
                                <Users className="w-5 h-5" />
                              </a>
                            )}
                            {person.github && (
                              <a
                                href={person.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-bg-main text-text-light rounded-lg border border-border-light hover:bg-card-bg transition-colors duration-200"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Right Column - Quote and Details */}
                        <div>
                          <div className="bg-bg-main rounded-xl p-6 mb-6 border border-border-light">
                            <Quote className="w-8 h-8 text-accent-main mb-3" />
                            <p className="text-text-light italic leading-relaxed">
                              "{person.quote}"
                            </p>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-semibold text-text-main mb-3">
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {person.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start">
                                  <Star className="w-4 h-4 text-accent-main mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-text-light text-sm">
                                    {achievement}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-text-main mb-3">
                              Technical Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {person.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="bg-bg-main text-text-light px-3 py-1 rounded-full text-xs font-medium border border-border-light"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card-bg p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-text-light" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card-bg p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6 text-text-light" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {alumni.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-accent-main w-8'
                      : 'bg-border-light'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Alumni Grid */}
      <div className="py-20 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-text-main mb-4">
              All Alumni Success Stories
            </h3>
            <p className="text-lg text-text-light">
              More inspiring journeys from our graduates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card-bg dark:bg-card-bg/10 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-border-light dark:border-white/10"
              >
                <div className="flex items-center space-x-4 mb-4">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-main to-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white/50" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-text-main dark:text-white">
                      {person.name}
                    </h3>
                    <p className="text-accent-main font-medium text-sm">
                      {person.role}
                    </p>
                  </div>
                </div>

                <p className="text-text-light dark:text-white/70 text-sm mb-3">
                  {person.company} • {person.location}
                </p>

                <div className="flex items-center text-xs text-text-light dark:text-white/70">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Batch {person.batch}</span>
                </div>
              </motion.div>
            ))}
          </div>
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
            <Award className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-4">
              Join Our Success Stories
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Start your journey with YugaYatra Retail (OPC) Pvt Ltd and become part of our growing alumni network
            </p>
            <a
              href="#contact"
              className="bg-card-bg text-accent-main px-8 py-3 rounded-full font-semibold hover:bg-bg-main transition-colors duration-300 inline-flex items-center"
            >
              Apply Now
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AlumniSection

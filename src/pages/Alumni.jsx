import { motion } from 'framer-motion'
import { useState } from 'react'
import { Users, Star, Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight, Quote, Award, Building } from 'lucide-react'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

const Alumni = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const alumni = [
    {
      id: 1,
      name: 'Ganesh Lagad',
      role: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      location: 'Bangalore, India',
      image: '/api/placeholder/300/300',
      batch: '2024',
      quote: 'YugaYatra Retail (OPC) Pvt Ltd provided me with the perfect platform to transition from learning to real-world application. The mentorship and hands-on projects were invaluable.',
      achievements: [
        'Led development of 5+ enterprise applications',
        'Mentored 20+ junior developers',
        'Published technical articles on Medium'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
      linkedin: '#',
      github: '#'
    },
    {
      id: 2,
      name: 'Aashritha Reddy',
      role: 'Digital Marketing Manager',
      company: 'Growth Labs',
      location: 'Hyderabad, India',
      image: '/api/placeholder/300/300',
      batch: '2024',
      quote: 'The digital marketing program at YugaYatra Retail (OPC) Pvt Ltd gave me practical skills that I could immediately apply. The industry connections I made were crucial for my career.',
      achievements: [
        'Increased brand engagement by 150%',
        'Managed $500K+ ad spend budget',
        'Won Digital Marketing Excellence Award 2024'
      ],
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Strategy'],
      linkedin: '#',
      github: '#'
    },
    {
      id: 3,
      name: 'Samyuktha Nakirikanti',
      role: 'UX/UI Designer',
      company: 'Design Studio Pro',
      location: 'Pune, India',
      image: '/api/placeholder/300/300',
      batch: '2024',
      quote: 'The design training at YugaYatra Retail (OPC) Pvt Ltd was comprehensive and industry-relevant. I learned not just tools, but the thinking process behind great design.',
      achievements: [
        'Designed 15+ mobile applications',
        'Improved user conversion by 40%',
        'Featured in Design Weekly Magazine'
      ],
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
      linkedin: '#',
      github: '#'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % alumni.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + alumni.length) % alumni.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

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
              Our <span className="text-accent-main">Alumni</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-light dark:text-white/70 max-w-3xl mx-auto">
              Success stories from our talented graduates who are making waves in the industry
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-bg-main dark:bg-text-main">
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
                <div className="w-16 h-16 bg-gradient-to-r from-accent-main to-olive-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-accent-main mb-2">{stat.value}</h3>
                <p className="text-text-light dark:text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Carousel */}
      <section className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4" style={{color: '#252B0D'}}>
              Featured Alumni
            </h2>
            <p className="text-xl text-text-light dark:text-white/70">
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
                    <div className="bg-card-bg dark:bg-card-bg/10 rounded-2xl shadow-xl p-8 border border-border-light dark:border-white/10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Image and Basic Info */}
                        <div className="text-center lg:text-left">
                          <div className="relative mb-6">
                            <div className="w-48 h-48 mx-auto lg:mx-0 bg-gradient-to-br from-accent-main to-olive-200 rounded-full flex items-center justify-center">
                              <Users className="w-24 h-24 text-white/50" />
                            </div>
                            <div className="absolute bottom-0 right-0 lg:right-0 lg:bottom-0 bg-accent-main text-white px-3 py-1 rounded-full text-xs font-medium">
                              Batch {person.batch}
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-text-main dark:text-white mb-2">
                            {person.name}
                          </h3>
                          
                          <p className="text-accent-main font-semibold mb-1">
                            {person.role}
                          </p>
                          
                          <p className="text-text-light mb-4">
                            {person.company}
                          </p>

                          <div className="flex items-center justify-center lg:justify-start text-sm text-text-light dark:text-white/70 mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{person.location}</span>
                          </div>

                          <div className="flex space-x-3 justify-center lg:justify-start">
                            <a
                              href={person.linkedin}
                              className="p-2 bg-bg-main text-accent-main rounded-lg border border-border-light hover:bg-card-bg transition-colors duration-200"
                            >
                              <Users className="w-5 h-5" />
                            </a>
                            <a
                              href={person.github}
                              className="p-2 bg-bg-main text-text-light rounded-lg border border-border-light hover:bg-card-bg transition-colors duration-200"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>

                          <div className="flex items-center text-text-light">
                            <Mail className="w-3 h-3 mr-2" />
                            <span>{person.email}</span>
                          </div>
                          <div className="flex items-center text-text-light">
                            <Phone className="w-3 h-3 mr-2" />
                            <span>{person.phone}</span>
                          </div>
                        </div>

                        {/* Right Column - Quote and Details */}
                        <div>
                          <div className="bg-bg-main dark:bg-card-bg/10 rounded-xl p-6 mb-6 border border-border-light dark:border-white/10">
                            <Quote className="w-8 h-8 text-accent-main mb-3" />
                            <p className="text-text-light dark:text-white/70 italic leading-relaxed">
                              "{person.quote}"
                            </p>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-semibold text-text-main dark:text-white mb-3">
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {person.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start">
                                  <Star className="w-4 h-4 text-accent-main mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-text-light dark:text-white/70 text-sm">
                                    {achievement}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-text-main dark:text-white mb-3">
                              Technical Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {person.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="bg-olive-100 text-olive-800 px-3 py-1 rounded-full text-xs font-medium dark:bg-olive-900/30 dark:text-olive-300"
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card-bg dark:bg-card-bg/10 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-border-light dark:border-white/10"
            >
              <ChevronLeft className="w-6 h-6 text-text-light dark:text-white/70" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card-bg dark:bg-card-bg/10 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-border-light dark:border-white/10"
            >
              <ChevronRight className="w-6 h-6 text-text-light dark:text-white/70" />
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
                      : 'bg-border-light dark:bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Alumni Grid */}
      <section className="py-20 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-main mb-4">
              All Alumni Success Stories
            </h2>
            <p className="text-xl md:text-2xl text-text-light">
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
                className="bg-card-bg rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-border-light"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-main to-olive-200 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-main">
                      {person.name}
                    </h3>
                    <p className="text-accent-main font-medium text-sm">
                      {person.role}
                    </p>
                  </div>
                </div>

                <p className="text-text-light text-sm mb-3">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-main to-olive-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Award className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4" style={{color: '#252B0D'}}>
              Join Our Success Stories
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Start your journey with YugaYatra Retail (OPC) Pvt Ltd and become part of our growing alumni network
            </p>
            <a
              href="/contact"
              className="bg-card-bg text-accent-main px-8 py-3 rounded-full font-semibold hover:bg-bg-main transition-colors duration-300 inline-flex items-center"
            >
              Apply Now
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default Alumni

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, Users, Calendar, MapPin, Building, FileText, Globe, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const About = () => {
  const timeline = [
    {
      year: '2024',
      title: 'Company Founded',
      description: 'YugaYatra Retail (OPC) Pvt Ltd Retail (OPC) Pvt Ltd established with vision to bridge education and industry gap'
    },
    {
      year: '2024',
      title: 'Legal Registration',
      description: 'Incorporated with all necessary legal compliances and certifications'
    },
    {
      year: '2024',
      title: 'Service Launch',
      description: 'Launched comprehensive digital services and internship programs'
    },
    {
      year: '2024',
      title: 'Partnership Expansion',
      description: 'Built strategic partnerships with 50+ industry leaders'
    }
  ]

  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To bridge the gap between education and industry by providing practical, hands-on training and real-world project experience to aspiring professionals while delivering innovative digital solutions to businesses.'
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'To become the leading platform for workforce development and digital transformation, empowering individuals with skills needed for the digital economy while helping businesses thrive through innovative solutions.'
    },
    {
      icon: Heart,
      title: 'Values',
      description: 'Excellence, Innovation, Integrity, and Customer Success are at the core of everything we do. We believe in continuous learning and adaptation to stay ahead in the digital landscape.'
    }
  ]

  const legalInfo = [
    { label: 'Company Name', value: 'YugaYatra Retail (OPC) Pvt Ltd Retail (OPC) Pvt Ltd' },
    { label: 'PAN', value: 'AABCY8389C' },
    { label: 'UDYAM Registration', value: 'KR-03-0421327' },
    { label: 'CIN', value: 'U47912KA2024OPC188603' },
    { label: 'FSSAI License', value: '21224007001166' },
    { label: 'Trademark Application', value: '6508313' }
  ]

  const services = [
    {
      icon: Target,
      title: 'Digital Solutions',
      description: 'Website development, mobile apps, and custom software solutions'
    },
    {
      icon: Users,
      title: 'Training Programs',
      description: 'Internship programs and skill development courses'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving clients across 50+ countries worldwide'
    },
    {
      icon: Award,
      title: 'Certified Excellence',
      description: 'Fully certified and compliant with industry standards'
    }
  ]

  const stats = [
    {
      number: '500+',
      label: 'Successful Alumni',
      description: 'Professionals placed in top companies'
    },
    {
      number: '50+',
      label: 'Corporate Partners',
      description: 'Leading companies we work with'
    },
    {
      number: '95%',
      label: 'Placement Rate',
      description: 'Of our graduates get placed'
    },
    {
      number: '2400+',
      label: 'Professionals Trained',
      description: 'Across various programs'
    }
  ]

  return (
    <div className="min-h-screen bg-bg-main transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-bg-main via-card-bg to-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-text-main mb-6">
              About <span className="text-accent-main">YugaYatra Retail (OPC) Pvt Ltd</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-light max-w-4xl mx-auto">
              YugaYatra Retail (OPC) Pvt Ltd Retail (OPC) Pvt Ltd is a dynamic technology company specializing in 
              digital solutions, workforce development, and innovative services that bridge 
              the gap between education and industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-bg-main hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-4">
                  {value.title}
                </h3>
                <p className="text-text-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-main mb-4">
              What We Do
            </h2>
            <p className="text-xl text-text-light">
              Comprehensive solutions for digital transformation and workforce development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-card-bg rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2">
                  {service.title}
                </h3>
                <p className="text-text-light text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-bg-main to-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-main mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-text-light">
              Statistics that showcase our success and growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-card-bg border-2 border-border-light rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent-main"
              >
                <div className="text-5xl font-bold text-accent-main mb-4">
                  {stat.number}
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2">
                  {stat.label}
                </h3>
                <p className="text-text-light text-sm">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Information */}
 

      {/* Timeline */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-main mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-text-light">
              Milestones that shaped our success
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent-main to-blue-600"></div>
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-1/2"></div>
                <div className="w-8 h-8 bg-card-bg border-4 border-accent-main rounded-full z-10"></div>
                <div className="w-1/2 px-8">
                  <div className="bg-card-bg p-6 rounded-xl shadow-lg border border-border-light">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-accent-main mr-2" />
                      <span className="text-sm font-semibold text-accent-main">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-main mb-2">
                      {item.title}
                    </h3>
                    <p className="text-text-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-main mb-4">
              Why Choose YugaYatra Retail (OPC) Pvt Ltd?
            </h2>
            <p className="text-xl text-text-light">
              What sets us apart from the rest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Our Strengths
              </h3>
              <div className="space-y-4">
                {[
                  'Industry-experienced mentors and trainers',
                  'Real-world project-based learning',
                  'Comprehensive curriculum aligned with industry needs',
                  'Strong network of hiring partners',
                  'Continuous support and guidance'
                ].map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-text-light">{strength}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Our Impact
              </h3>
              <div className="space-y-4">
                {[
                  '500+ successful alumni',
                  '50+ corporate partnerships',
                  '95% placement assistance rate',
                  '2.4K+ trained professionals',
                  'Global presence across multiple countries'
                ].map((impact, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-accent-main mt-1 flex-shrink-0" />
                    <p className="text-text-light">{impact}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-main to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Building className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Join Our Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Whether you're looking to enhance your skills or transform your business, we're here to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://mail.google.com/mail/?view=cm&to=info@yugyatra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card-bg text-accent-main px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get in Touch
              </a>
              <Link
                to="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-accent-main transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About

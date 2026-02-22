import { motion } from 'framer-motion'
import { Award, FileText, Shield, CheckCircle, Calendar, Building, Star } from 'lucide-react'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

const Achievements = () => {
  const certificates = [
    {
      id: 1,
      title: 'Company Incorporation',
      description: 'Officially incorporated as YugaYatra Retail (OPC) Pvt Ltd Retail (OPC) Pvt Ltd under the Companies Act, 2013',
      date: '2024',
      type: 'Legal',
      icon: Building,
      details: 'CIN: U47912KA2024OPC188603',
      status: 'Active'
    },
    {
      id: 2,
      title: 'DIPP Recognition',
      description: 'Recognized by Department of Industrial Policy and Promotion as a startup',
      date: '2024',
      type: 'Government',
      icon: Shield,
      details: 'Startup India Recognition Certificate',
      status: 'Certified'
    },
    {
      id: 3,
      title: 'UDYAM Registration',
      description: 'Registered under UDYAM scheme for Micro, Small and Medium Enterprises',
      date: '2024',
      type: 'Government',
      icon: FileText,
      details: 'UDYAM: KR-03-0421327',
      status: 'Valid'
    },
    {
      id: 4,
      title: 'GST Registration',
      description: 'Goods and Services Tax registration for compliance with tax regulations',
      date: '2024',
      type: 'Tax',
      icon: FileText,
      details: 'GSTIN Registered',
      status: 'Active'
    },
    {
      id: 5,
      title: 'Trademark Application',
      description: 'Trademark filed for brand protection and intellectual property rights',
      date: '2024',
      type: 'Legal',
      icon: Shield,
      details: 'TM Application No: 6508313',
      status: 'Pending'
    },
    {
      id: 6,
      title: 'FSSAI License',
      description: 'Food Safety and Standards Authority of India license for food business operations',
      date: '2024',
      type: 'Food Safety',
      icon: CheckCircle,
      details: 'FSSAI: 21224007001166',
      status: 'Active'
    }
  ]

  const milestones = [
    {
      year: '2024',
      title: 'Company Founded',
      description: 'YugaYatra Retail (OPC) Pvt Ltd Retail (OPC) Pvt Ltd was established with a vision to bridge education and industry gap',
      icon: Star
    },
    {
      year: '2024',
      title: 'Legal Compliance',
      description: 'Achieved complete legal compliance with all necessary registrations and certifications',
      icon: CheckCircle
    },
    {
      year: '2024',
      title: 'Service Launch',
      description: 'Successfully launched comprehensive digital services and internship programs',
      icon: Award
    },
    {
      year: '2024',
      title: 'Partnership Network',
      description: 'Built strategic partnerships with 50+ industry leaders and organizations',
      icon: Building
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'Legal':
        return 'from-olive-500 to-olive-600'
      case 'Government':
        return 'from-green-500 to-green-600'
      case 'Tax':
        return 'from-purple-500 to-purple-600'
      case 'Food Safety':
        return 'from-olive-500 to-olive-600'
      default:
        return 'from-olive-500 to-olive-600'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'Certified':
        return 'bg-olive-100 text-olive-800 dark:bg-olive-900/30 dark:text-olive-300'
      case 'Valid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      default:
        return 'bg-bg-main text-text-main dark:bg-card-bg/10 dark:text-white/70'
    }
  }

  return (
    <div className="min-h-screen bg-bg-main dark:bg-text-main transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-[#BEF0DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold" style={{color: '#252B0D'}}>
              Our <span className="text-accent-main">Achievements</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-light dark:text-white/70 max-w-3xl mx-auto">
              Certifications, milestones, and recognition that validate our commitment to excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4" style={{color: '#252B0D'}}>
              Certifications & Licenses
            </h2>
            <p className="text-xl text-text-light dark:text-white/70">
              Official certifications and compliance documents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card-bg dark:bg-card-bg/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light dark:border-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getTypeColor(cert.type)} rounded-xl flex items-center justify-center`}>
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                  {cert.title}
                </h3>

                <p className="text-text-light dark:text-white/70 mb-4 text-sm">
                  {cert.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-text-light dark:text-white/70">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{cert.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-text-light dark:text-white/70">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>{cert.details}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-accent-main rounded-full mr-2"></span>
                    <span className="text-accent-main font-medium">{cert.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4" style={{color: '#252B0D'}}>
              Our Journey Timeline
            </h2>
            <p className="text-xl text-text-light dark:text-white/70">
              Key milestones in our growth story
            </p>
          </motion.div>

          <div className="relative">
            {/* Animated main timeline line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-accent-main to-olive-200"
            />
            
            {/* Animated dotted line overlay */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 overflow-hidden">
              <motion.div
                initial={{ y: -100 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                className="w-full h-20"
              >
                <div className="w-full h-full bg-gradient-to-b from-transparent via-accent-main to-transparent opacity-60"></div>
              </motion.div>
            </div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-1/2"></div>
                
                {/* Connection line to milestone */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "40px" }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                  className={`absolute h-0.5 bg-accent-main origin-${index % 2 === 0 ? 'right' : 'left'}`}
                  style={{ 
                    [index % 2 === 0 ? 'right' : 'left']: '50%',
                    top: `${index * 96 + 24}px`
                  }}
                />
                
                {/* Milestone circle with animation */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10"
                >
                  <motion.div 
                    animate={{ 
                      boxShadow: [
                        '0 0 0 0 rgba(251, 146, 60, 0.4)',
                        '0 0 0 10px rgba(251, 146, 60, 0)',
                        '0 0 0 0 rgba(251, 146, 60, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="w-12 h-12 bg-card-bg dark:bg-card-bg/10 border-4 border-accent-main rounded-full flex items-center justify-center"
                  >
                    <milestone.icon className="w-6 h-6 text-accent-main" />
                  </motion.div>
                </motion.div>
                
                <div className="w-1/2 px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                    className="bg-card-bg dark:bg-card-bg/10 p-6 rounded-xl shadow-lg border border-border-light dark:border-white/10 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-accent-main mr-2" />
                      <span className="text-sm font-semibold text-accent-main">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-text-light dark:text-white/70">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4" style={{color: '#252B0D'}}>
              Our Impact
            </h2>
            <p className="text-xl text-text-light dark:text-white/70">
              Numbers that speak for our success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Certifications', value: '6+', icon: Award },
              { label: 'Legal Compliance', value: '100%', icon: CheckCircle },
              { label: 'Government Recognition', value: '2', icon: Shield },
              { label: 'Active Licenses', value: '5', icon: FileText }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-accent-main to-olive-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-accent-main mb-2">{stat.value}</h3>
                <p className="text-text-light dark:text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Achievements

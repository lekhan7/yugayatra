import { motion } from 'framer-motion'
import { Award, FileText, Shield, CheckCircle, Calendar, Building, Star } from 'lucide-react'

const AchievementSection = () => {
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
        return 'from-accent-main to-blue-600'
      case 'Government':
        return 'from-accent-main to-blue-600'
      case 'Tax':
        return 'from-accent-main to-blue-600'
      case 'Food Safety':
        return 'from-accent-main to-blue-600'
      default:
        return 'from-accent-main to-blue-600'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Certified':
        return 'bg-blue-100 text-blue-800'
      case 'Valid':
        return 'bg-purple-100 text-purple-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-bg-main text-text-main'
    }
  }

  return (
    <section id="achievements" className="py-20 bg-bg-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
            Our <span className="text-accent-main">Achievements</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            Certifications, milestones, and recognition that validate our commitment to excellence
          </p>
        </motion.div>
      </div>

      {/* Certificates Section */}
      <div className="py-20 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-text-main mb-4">
              Certifications & Licenses
            </h3>
            <p className="text-lg text-text-light">
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
                className="bg-card-bg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getTypeColor(cert.type)} rounded-xl flex items-center justify-center`}>
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                    {cert.status}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-text-main mb-2">
                  {cert.title}
                </h4>

                <p className="text-text-light mb-4 text-sm">
                  {cert.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-text-light">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{cert.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-text-light">
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
      </div>

    

      {/* Stats Section */}
      <div className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-4">
              Our Impact
            </h3>
            <p className="text-lg text-text-light dark:text-white/70">
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
                <div className="w-20 h-20 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-accent-main mb-2">{stat.value}</h4>
                <p className="text-text-light dark:text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AchievementSection

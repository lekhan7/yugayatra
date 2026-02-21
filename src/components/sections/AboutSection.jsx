import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, Users, Calendar, MapPin, Award as AwardIcon, FileText, Shield } from 'lucide-react'

const AboutSection = () => {
  const legalInfo = {
    pan: "AAAPJ1234F",
    udyam: "UDYAM-KR-01-1234567",
    cin: "U72200KA2023PTC123456",
    fssai: "12345678901234",
    tm: "4567890"
  }

  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To empower students with cutting-edge technology skills and practical experience through innovative internship programs.'
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'To become the leading platform for career development and skill enhancement in the technology sector.'
    },
    {
      icon: Heart,
      title: 'Values',
      description: 'Innovation, Excellence, Integrity, and Student Success are at the core of everything we do.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-text-main mb-6">
            About <span className="gradient-text">YugaYatra Retail (OPC) Pvt Ltd</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-4xl mx-auto">
            We are a leading educational technology company dedicated to shaping tomorrow's workforce through innovative internship programs and skill development initiatives.
          </p>
        </motion.div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-text-main mb-4">
              Mission, Vision & Values
            </h3>
            <p className="text-lg text-text-light">
              The core principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-2xl bg-card-bg shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-white" />
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
      </div>

      {/* Legal Information */}
      <div className="py-20 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-text-main mb-4">
              Legal Information
            </h3>
            <p className="text-lg text-text-light">
              Our company is fully registered and compliant with all regulations
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: FileText, label: 'PAN', value: legalInfo.pan },
              { icon: AwardIcon, label: 'UDYAM', value: legalInfo.udyam },
              { icon: Shield, label: 'CIN', value: legalInfo.cin },
              { icon: FileText, label: 'FSSAI', value: legalInfo.fssai },
              { icon: Award, label: 'TM', value: legalInfo.tm }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card-bg rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-text-main mb-2">
                  {item.label}
                </h4>
                <p className="text-xs text-accent-main font-mono">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-text-main mb-4">
              Our Impact
            </h3>
            <p className="text-lg text-text-light">
              Numbers that speak for themselves
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Students Trained' },
              { number: '95%', label: 'Placement Rate' },
              { number: '50+', label: 'Company Partners' },
              { number: '10+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-4xl md:text-5xl font-black gradient-text mb-2 counter">
                  {stat.number}
                </div>
                <p className="text-text-main">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

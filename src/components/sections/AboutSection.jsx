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
      icon: 'https://cdn-icons-png.flaticon.com/128/6745/6745066.png',
      title: 'Mission',
      description: 'To empower students with cutting-edge technology skills and practical experience through innovative internship programs.'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/15189/15189288.png',
      title: 'Vision',
      description: 'To become the leading platform for career development and skill enhancement in the technology sector.'
    },
    {
      icon: '	https://cdn-icons-png.flaticon.com/128/17699/17699184.png',
      title: 'Values',
      description: 'Innovation, Excellence, Integrity, and Student Success are at the core of everything we do.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-card-bg dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-text-main dark:text-dark-text-primary mb-6">
            <span style={{ color: '#FFFFFF' }}>About YugaYatra Retail (OPC) Pvt Ltd</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light dark:text-dark-text-secondary max-w-4xl mx-auto">
            We are a leading educational technology company dedicated to shaping tomorrow's workforce through innovative internship programs and skill development initiatives.
          </p>
        </motion.div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="py-20 bg-bg-main dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-text-main dark:text-dark-text-primary mb-4">
              Mission, Vision & Values
            </h3>
            <p className="text-lg text-text-light dark:text-dark-text-secondary">
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
                className="text-center p-8 rounded-2xl bg-card-bg dark:bg-dark-card shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light dark:border-dark-border"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-accent-main to-accent-main dark:from-dark-blue-accent dark:to-dark-blue-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  {typeof value.icon === 'string' ? (
                    <img src={value.icon} alt={value.title} className="w-10 h-10" />
                  ) : (
                    <value.icon className="w-10 h-10 text-white" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-text-main dark:text-dark-text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-text-light dark:text-dark-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Stats Section */}
      <div className="py-20 bg-bg-main dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-text-main dark:text-dark-blue-primary mb-4">
              Our Impact
            </h3>
            <p className="text-lg text-text-light dark:text-dark-text-secondary">
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
                <div className="text-4xl md:text-5xl font-black mb-2 counter" style={{ color: '#000000' }}>
                  {stat.number}
                </div>
                <p className="text-text-main dark:text-dark-blue-primary">
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

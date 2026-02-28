import { motion } from 'framer-motion'
import { Briefcase, Clock, Users, DollarSign, ArrowRight, Code, Award, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

const InternshipsSection = () => {
  const internships = [
    {
      title: 'Full-Stack Development',
      duration: '6 months',
      type: 'Full-time',
      stipend: '₹15,000/month',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      highlights: ['Real-world projects', 'Mentorship', 'Certificate'],
      description: 'Build production-ready web applications with modern frameworks. Work on live projects with our development team.',
      icon: Code,
      color: 'from-accent to-secondary'
    },
    {
      title: 'UI/UX Design',
      duration: '3 months',
      type: 'Part-time',
      stipend: '₹10,000/month',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
      highlights: ['Portfolio building', 'Design system creation', 'Client collaboration'],
      description: 'Create stunning user interfaces and experiences. Learn from industry experts and build your professional portfolio.',
      icon: Briefcase,
      color: 'from-primary to-accent'
    },
    {
      title: 'Digital Marketing',
      duration: '4 months',
      type: 'Full-time',
      stipend: '₹12,000/month',
      skills: ['Google Analytics', 'SEO', 'Content Marketing', 'Social Media'],
      highlights: ['Campaign management', 'Analytics reporting', 'Growth strategies'],
      description: 'Drive business growth through data-driven marketing strategies. Learn to create effective campaigns and analyze performance metrics.',
      icon: Users,
      color: 'from-secondary to-primary'
    },
    {
      title: 'Data Science',
      duration: '6 months',
      type: 'Full-time',
      stipend: '₹18,000/month',
      skills: ['Python', 'Machine Learning', 'Data Visualization', 'SQL'],
      highlights: ['Research projects', 'Model deployment', 'Industry tools'],
      description: 'Work on cutting-edge data science projects. Learn to analyze complex datasets and build predictive models.',
      icon: Award,
      color: 'from-accent to-primary'
    }
  ]

  const stats = [
    { number: '500+', label: 'Students Placed' },
    { number: '95%', label: 'Success Rate' },
    { number: '50+', label: 'Partner Companies' }
  ]

  return (
    <section id="internships" className="py-20 bg-card-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white text-text-main">
            Internship <span className="text-dark-blue-accent dark:text-dark-blue-primary">Programs</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            Launch your career with our cutting-edge internship programs. Gain hands-on experience with industry experts.
          </p>
        </motion.div>
      </div>

      {/* Internship Cards */}
      <div className="py-20 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className={`bg-card-bg dark:bg-dark-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light dark:border-dark-border ${internship.color}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={`w-16 h-16 bg-gradient-to-r ${internship.color} rounded-xl flex items-center justify-center mb-4`}>
                      <internship.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-main mb-2">
                        {internship.title}
                      </h3>
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="px-3 py-1 bg-dark-blue-accent/20 dark:bg-dark-blue-primary/20 text-dark-blue-accent dark:text-dark-blue-primary text-xs font-medium rounded-full">
                          {internship.type}
                        </span>
                        <span className="text-text-light">
                          • {internship.duration}
                        </span>
                        <span className="text-accent font-semibold">{internship.stipend}</span>
                      </div>
                    </div>
                    <p className="text-text-light text-sm mb-4">
                      {internship.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent mb-2">
                      {internship.stipend}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      per month
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-dark dark:text-white mb-3">Skills You'll Learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-dark dark:text-white mb-3">Highlights:</h4>
                  <ul className="space-y-2">
                    {internship.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <Link to="/apply" className="block">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-black border border-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-accent to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h3 className="text-4xl font-bold text-accent-main mb-4">Our Impact</h3>
            <p className="text-xl mb-8">Numbers that speak for themselves</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8"
                >
                  <div className="text-5xl md:text-6xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <p className="text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white dark:bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-bold mb-4 text-text-main">
              Ready to Launch Your Career?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join our internship programs and gain valuable industry experience with mentorship from leading experts.
            </p>
            <Link to="/apply" className="bg-white text-black border border-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center">
              Apply for Internship
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default InternshipsSection

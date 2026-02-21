import { motion } from 'framer-motion'
import { Briefcase, MapPin, DollarSign, Clock, Users, ArrowRight } from 'lucide-react'

const CareersSection = () => {
  const jobs = [
    {
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '5+ years',
      description: 'We are looking for an experienced full-stack developer to join our engineering team and help build amazing products.',
      requirements: [
        '5+ years of experience in full-stack development',
        'Strong knowledge of React, Node.js, and databases',
        'Experience with cloud platforms (AWS/Azure)',
        'Excellent problem-solving skills'
      ]
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Join our creative team to design beautiful and intuitive user experiences for our clients.',
      requirements: [
        '3+ years of experience in UI/UX design',
        'Proficiency in Figma, Adobe Creative Suite',
        'Strong portfolio demonstrating design skills',
        'Understanding of user-centered design principles'
      ]
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Help us grow our brand and reach new audiences through innovative digital marketing strategies.',
      requirements: [
        '3+ years of digital marketing experience',
        'Experience with SEO, SEM, and social media marketing',
        'Knowledge of analytics tools',
        'Creative thinking and analytical skills'
      ]
    },
    {
      title: 'Project Manager',
      department: 'Management',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead our projects and ensure successful delivery of digital solutions to our clients.',
      requirements: [
        '5+ years of project management experience',
        'PMP or similar certification preferred',
        'Experience with Agile/Scrum methodologies',
        'Excellent communication and leadership skills'
      ]
    }
  ]

  return (
    <section id="careers" className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
            Join Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            Build your career with us and shape the future of digital innovation
          </p>
        </motion.div>
      </div>

      {/* Job Listings */}
      <div className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card-bg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-text-main flex-1">
                    {job.title}
                  </h3>
                  <span className="px-3 py-1 bg-accent-main/20 text-accent-main text-xs font-medium rounded-full">
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-text-light">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {job.department}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {job.experience}
                  </div>
                </div>

                <p className="text-text-light dark:text-white/70 mb-6">
                  {job.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-text-main dark:text-white mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start text-sm text-text-light dark:text-white/70">
                        <span className="w-2 h-2 bg-accent-main rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-gradient-to-r from-accent-main to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  Apply Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-text-main dark:text-white mb-4">
              Why Work With Us?
            </h3>
            <p className="text-xl text-text-light dark:text-white/70">
              We offer more than just a job - we offer a career
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: 'Competitive Salary',
                description: 'Market-leading compensation packages'
              },
              {
                icon: Users,
                title: 'Great Team',
                description: 'Work with talented and passionate professionals'
              },
              {
                icon: Briefcase,
                title: 'Growth Opportunities',
                description: 'Continuous learning and career advancement'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-text-main dark:text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-text-light dark:text-white/70">
                  {benefit.description}
                </p>
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
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Join Us?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Take the first step towards an exciting career
            </p>
            <a href="#contact" className="bg-card-bg text-accent-main px-8 py-3 rounded-full font-semibold hover:bg-bg-main transition-colors duration-300 inline-flex items-center">
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CareersSection

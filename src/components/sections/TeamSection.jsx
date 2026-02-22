import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Users, Linkedin, Twitter, Mail, ExternalLink, Briefcase, MapPin } from 'lucide-react'
import { getTeamMembers } from '../../services/supabase'

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const data = await getTeamMembers()
      setTeamMembers(data)
    } catch (error) {
      console.error('Error fetching team members:', error)
      setTeamMembers([])
    } finally {
      setLoading(false)
    }
  }

  // Handle loading state
  if (loading) {
    return (
      <section id="team" className="py-20" style={{backgroundColor: '#0D3D2B'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
          </div>
        </div>
      </section>
    )
  }

  // Handle empty state
  if (teamMembers.length === 0) {
    return (
      <section id="team" className="py-20" style={{backgroundColor: '#0D3D2B'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              The talented individuals behind YugaYatra's success
            </p>
          </motion.div>
          <div className="text-center py-12">
            <Users className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-white dark:text-gray-300">Team members will be featured here soon</p>
            <p className="text-sm text-white/80 dark:text-gray-400 mt-2">
              Check back soon to meet the amazing people behind our mission
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="team" className="py-20" style={{backgroundColor: '#0D3D2B'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            The talented individuals behind YugaYatra's success, dedicated to shaping the future of retail innovation
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-card-bg dark:bg-card-bg/10 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border-light dark:border-white/10">
                {/* Image Section */}
                <div className="relative h-64 bg-gradient-to-br from-accent-main/20 to-olive-200/20 overflow-hidden">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-24 h-24 text-accent-main/50" />
                    </div>
                  )}
                  
                  {/* Overlay with social links */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200"
                        >
                          <Linkedin className="w-4 h-4 text-olive-600" />
                        </a>
                      )}
                      {member.twitter_url && (
                        <a
                          href={member.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200"
                        >
                          <Twitter className="w-4 h-4 text-sky-500" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href="mailto:hr@yugayatraretail.com"
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200"
                        >
                          <Mail className="w-4 h-4 text-gray-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-main mb-2">
                    {member.name}
                  </h3>
                  
                  <div className="flex items-center text-accent-main font-medium mb-3">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {member.position}
                  </div>

                  {member.bio && (
                    <p className="text-text-light text-sm mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                  )}

                  {/* Additional Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-text-light">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>YugaYatra Team</span>
                    </div>
                    
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-main hover:text-olive-600 transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-8">
              Our Team by the Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Team Members', value: teamMembers.length.toString() },
                { label: 'Departments', value: '6+' },
                { label: 'Years Experience', value: '50+' },
                { label: 'Projects Completed', value: '100+' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to Join Our Team?
          </h3>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for innovation and excellence
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&to=hr@yugayatraretail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#0D3D2B] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center"
          >
            Get in Touch
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection

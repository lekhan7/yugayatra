import { motion } from 'framer-motion'
import { Users, Award, BookOpen, Target, Heart, Star, Mail, Phone, MapPin, Calendar } from 'lucide-react'

const ProfileSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Satya Pandey',
      role: 'Founder & CEO',
      image: '/api/placeholder/300/300',
      bio: 'Visionary leader with over 10 years of experience in technology and education. Passionate about bridging the gap between academia and industry.',
      expertise: ['Strategic Planning', 'Business Development', 'Technology Innovation', 'Team Leadership'],
      achievements: [
        'Led 50+ successful digital transformation projects',
        'Mentored 1000+ students and professionals',
        'Recognized as Top 40 Under 40 in Tech'
      ],
      email: 'satya@yugyatra.com',
      phone: '+91 98765 43210',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Chief Technology Officer',
      image: '/api/placeholder/300/300',
      bio: 'Full-stack architect with expertise in scalable systems and cloud technologies. Driving innovation through cutting-edge technical solutions.',
      expertise: ['Cloud Architecture', 'Full-Stack Development', 'DevOps', 'System Design'],
      achievements: [
        'Architected systems serving 1M+ users',
        'Published 20+ technical papers',
        'AWS Certified Solutions Architect'
      ],
      email: 'priya@yugyatra.com',
      phone: '+91 98765 43211',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      role: 'Head of Operations',
      image: '/api/placeholder/300/300',
      bio: 'Operations expert focused on streamlining processes and ensuring excellence in service delivery. Committed to operational efficiency and quality.',
      expertise: ['Process Optimization', 'Quality Assurance', 'Project Management', 'Team Building'],
      achievements: [
        'Reduced operational costs by 40%',
        'Improved service delivery time by 60%',
        'ISO 9001 Certified Professional'
      ],
      email: 'rahul@yugyatra.com',
      phone: '+91 98765 43212',
      linkedin: '#',
      twitter: '#'
    },
    {
      id: 4,
      name: 'Anjali Patel',
      role: 'Head of Training & Development',
      image: '/api/placeholder/300/300',
      bio: 'Education specialist dedicated to creating impactful learning experiences. Expert in curriculum design and skill development programs.',
      expertise: ['Curriculum Design', 'Skill Development', 'Educational Technology', 'Assessment Design'],
      achievements: [
        'Designed 50+ training programs',
        '95% student satisfaction rate',
        'Certified Professional in Learning Design'
      ],
      email: 'anjali@yugyatra.com',
      phone: '+91 98765 43213',
      linkedin: '#',
      twitter: '#'
    }
  ]

  const companyValues = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To empower individuals with cutting-edge technology skills and practical experience through innovative internship programs.'
    },
    {
      icon: Heart,
      title: 'Vision', 
      description: 'To become the leading platform for career development and skill enhancement in the technology sector.'
    },
    {
      icon: BookOpen,
      title: 'Values',
      description: 'Innovation, Excellence, Integrity, and Student Success are at the core of everything we do.'
    }
  ]

  const companyStats = [
    { label: 'Team Members', value: '50+', icon: Users },
    { label: 'Years Experience', value: '10+', icon: Calendar },
    { label: 'Projects Delivered', value: '500+', icon: Award },
    { label: 'Client Satisfaction', value: '98%', icon: Star }
  ]

  return (
    <section id="profile" className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
            Meet Our <span className="text-accent-main">Team</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            The passionate professionals behind YugaYatra Retail (OPC) Pvt Ltd's success story
          </p>
        </motion.div>
      </div>

      {/* Company Values */}
      <div className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-text-main mb-4">
              Our Core Values
            </h3>
            <p className="text-lg text-text-light">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-2xl bg-card-bg hover:shadow-xl transition-all duration-300 border border-border-light"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-text-main mb-4">
                  {value.title}
                </h4>
                <p className="text-text-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-text-main mb-4">
              Leadership Team
            </h3>
            <p className="text-lg text-text-light">
              Meet the experts driving our vision forward
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-card-bg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light">
                  {/* Profile Image */}
                  <div className="relative h-48 bg-gradient-to-br from-accent-main to-blue-600 flex items-center justify-center">
                    <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    {/* Name and Role */}
                    <h4 className="text-xl font-bold text-text-main mb-1">{member.name}</h4>
                    <p className="text-accent-main font-semibold mb-3">{member.role}</p>

                    {/* Bio */}
                    <p className="text-text-light text-sm mb-4 line-clamp-3">{member.bio}</p>

                    {/* Expertise */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-text-main dark:text-white mb-2 text-sm">Expertise:</h5>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.slice(0, 2).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-accent-main/20 text-accent-main text-xs font-medium rounded-full px-2 py-1"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 2 && (
                          <span className="text-xs text-text-light">
                            +{member.expertise.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center text-text-light">
                        <Mail className="w-3 h-3 mr-2" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center text-text-light">
                        <Phone className="w-3 h-3 mr-2" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Team Member Profiles */}
      <div className="py-20 bg-card-bg dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-4">
              Detailed Profiles
            </h3>
            <p className="text-lg text-text-light dark:text-white/70">
              Learn more about our team members' expertise and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {teamMembers.slice(0, 2).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card-bg dark:bg-card-bg/10 rounded-2xl p-8 shadow-lg border border-border-light dark:border-white/10"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent-main to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-12 h-12 text-white/50" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-text-main dark:text-white mb-2">
                      {member.name}
                    </h4>
                    <p className="text-accent-main font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-text-light dark:text-white/70 mb-4">
                      {member.bio}
                    </p>

                    <div className="mb-6">
                      <h5 className="font-semibold text-text-main dark:text-white mb-3">
                        Key Achievements
                      </h5>
                      <ul className="space-y-2">
                        {member.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start text-text-light dark:text-white/70">
                            <Star className="w-4 h-4 text-accent-main mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-bg-main dark:bg-card-bg/10 text-text-main dark:text-white/70 px-3 py-1 rounded-full text-sm font-medium border border-border-light dark:border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-4">
              Our Company at a Glance
            </h3>
            <p className="text-lg text-text-light dark:text-white/70">
              Key metrics that define our success and growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-card-bg dark:bg-card-bg/10 rounded-2xl border border-border-light dark:border-white/10"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-accent-main mb-2">{stat.value}</h4>
                <p className="text-text-light dark:text-white/70">{stat.label}</p>
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
            <Users className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-4">
              Join Our Amazing Team
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Be part of a dynamic team that's shaping the future of education and technology
            </p>
            <a
              href="#careers"
              className="bg-card-bg text-accent-main px-8 py-3 rounded-full font-semibold hover:bg-bg-main transition-colors duration-300 inline-flex items-center"
            >
              View Open Positions
              <Award className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProfileSection

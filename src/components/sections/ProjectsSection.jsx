import { motion } from 'framer-motion'
import { ExternalLink, Globe, Calendar, Users, Code, Palette, TrendingUp, ShoppingBag, User, FileText, Briefcase, Zap, Bell, School, Utensils, BookOpen, Newspaper, GraduationCap, Scale } from 'lucide-react'

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      name: 'GateBell.in',
      category: 'IoT, Web App',
      description: 'A smart visitor management system designed to streamline office operations by automating guest check-ins, enhancing security, and providing real-time analytics for office administrators.',
      icon: Bell,
      features: [
        'Automated visitor registration and check-in process',
        'Real-time notifications for office staff',
        'Integration with IoT-enabled doorbells',
        'Detailed visitor logs and analytics dashboard'
      ],
      technologies: ['React', 'Node.js', 'MQTT', 'AWS IoT', 'MongoDB'],
      link: 'https://gatebell.in',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 2,
      name: 'SchoolDekho.in',
      category: 'EdTech, Location-based',
      description: 'A comprehensive platform for parents and students to find and compare schools nearby based on location, ratings, facilities, and educational offerings, making the school selection process easier and more informed.',
      icon: School,
      features: [
        'Location-based school search with interactive map',
        'Detailed school profiles with photos and virtual tours',
        'Parent reviews and ratings system',
        'School comparison tool for informed decision making'
      ],
      technologies: ['React', 'Express', 'MongoDB', 'Google Maps API', 'Cloudinary'],
      link: 'https://schooldekho.in',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 3,
      name: 'FoodCaravan.in',
      category: 'FoodTech, Web App',
      description: 'An online food delivery platform that connects local customers with nearby restaurants, offering a seamless ordering experience with real-time tracking and personalized recommendations.',
      icon: Utensils,
      features: [
        'User-friendly interface for browsing menus',
        'Real-time order tracking with GPS',
        'Personalized restaurant and dish recommendations',
        'Secure payment gateway integration'
      ],
      technologies: ['Next.js', 'Express', 'PostgreSQL', 'Firebase', 'Stripe'],
      link: 'https://foodcaravan.in',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 4,
      name: 'SatyaPandey.com',
      category: 'Portfolio, Blog',
      description: 'A personal portfolio and blog for Satya Pandey, showcasing professional achievements, projects, and thought leadership articles on technology, design, and innovation.',
      icon: User,
      features: [
        'Responsive portfolio showcasing projects',
        'Blog section with rich text formatting',
        'SEO optimization for better visibility',
        'Contact form for inquiries'
      ],
      technologies: ['Gatsby', 'GraphQL', 'Tailwind CSS', 'Contentful'],
      link: 'https://satyapandey.com',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 5,
      name: 'MyPressWala.in',
      category: 'Media, SaaS',
      description: 'A SaaS platform for businesses to distribute press releases and news updates, providing tools for creating, scheduling, and analyzing the reach of media content across multiple channels.',
      icon: Newspaper,
      features: [
        'Press release creation with templates',
        'Distribution to major news outlets',
        'Analytics for tracking media reach',
        'Scheduling and automated publishing'
      ],
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Analytics API'],
      link: 'https://mypresswala.in',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 6,
      name: '12thFailJobs.com',
      category: 'Job Portal, EdTech',
      description: 'A job portal dedicated to freshers and students with a 12th pass qualification, offering access to entry-level job opportunities, career guidance, and resume-building tools.',
      icon: Briefcase,
      features: [
        'Job listings tailored for 12th pass candidates',
        'Resume builder with templates',
        'Career advice and interview preparation resources',
        'Employer dashboard for posting jobs'
      ],
      technologies: ['Angular', 'Django', 'SQLite', 'AWS S3'],
      link: 'https://12thfailjobs.com',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 7,
      name: 'TheBrightLearn.in',
      category: 'EdTech, LMS',
      description: 'An online learning management system (LMS) for students and professionals, offering courses, quizzes, and progress tracking to support continuous learning and skill development.',
      icon: BookOpen,
      features: [
        'Interactive courses with video and text content',
        'Quizzes and assessments for knowledge checks',
        'Progress tracking and certificates of completion',
        'Discussion forums for peer interaction'
      ],
      technologies: ['React', 'Ruby on Rails', 'PostgreSQL', 'AWS CloudFront'],
      link: 'https://thebrightlearn.in',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 8,
      name: 'MyDivorce.in',
      category: 'LegalTech, Consultation',
      description: 'A comprehensive online platform providing legal assistance and guidance for divorce proceedings, offering expert consultation, document preparation, and step-by-step support throughout the legal process.',
      icon: Scale,
      features: [
        'Expert legal consultation and guidance',
        'Document preparation and filing assistance',
        'Step-by-step divorce process guidance',
        'Confidential and secure case management'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      link: 'https://mydivorce.in',
      color: 'from-slate-500 to-gray-600'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-bg-main dark:bg-text-main transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main dark:text-white mb-6">
            Our <span className="text-accent-main">Projects</span>
          </h2>
          <p className="text-xl text-text-light dark:text-white/70 max-w-4xl mx-auto leading-relaxed">
            Showcasing our diverse portfolio of innovative solutions, from visitor management systems to educational platforms, 
            each project reflects our commitment to excellence and digital innovation.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-card-bg dark:bg-card-bg/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border-light dark:border-white/10 h-full flex flex-col">
                
                {/* Project Header */}
                <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <project.icon className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm font-medium opacity-90">{project.category}</p>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-text-main dark:text-white mb-3 group-hover:text-accent-main transition-colors duration-300">
                    {project.name}
                  </h3>
                  
                  <p className="text-text-light dark:text-white/70 text-sm mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-text-main dark:text-white mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="text-xs text-text-light dark:text-white/60 flex items-start">
                          <span className="w-1 h-1 bg-accent-main rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 2 && (
                        <li className="text-xs text-text-light dark:text-white/60">
                          +{project.features.length - 2} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-text-main dark:text-white mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-text-light dark:text-white/60 text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visit Website Button */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent-main text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visit Website</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-accent-main to-blue-600 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Explore Our Work</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Dive into our projects and see how we're transforming ideas into impactful digital solutions. 
            Let's collaborate to bring your vision to life.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-accent-main px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Get In Touch
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}

export default ProjectsSection

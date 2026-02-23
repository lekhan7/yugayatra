import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, Globe, Calendar, Users, Code, Palette, TrendingUp, ShoppingBag, User, FileText, Briefcase, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      name: 'GateBell.in',
      description: 'Smart doorbell system with mobile app integration for modern homes and offices.',
      image: '/api/placeholder/400/250',
      techStack: ['React', 'Node.js', 'MongoDB', 'IoT', 'Mobile App'],
      category: 'IoT & Smart Home',
      link: 'https://gatebell.in',
      github: '#',
      features: [
        'Real-time notifications',
        'Mobile app control',
        'Video streaming',
        'Cloud storage'
      ],
      status: 'Live',
      year: '2024'
    },
    {
      id: 2,
      name: 'SchoolDekho.in',
      description: 'Educational platform connecting students with schools and providing comprehensive learning resources.',
      image: '/api/placeholder/400/250',
      techStack: ['React', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
      category: 'Education',
      link: 'https://schooldekho.in',
      github: '#',
      features: [
        'School search and comparison',
        'Admission guidance',
        'Study materials',
        'Parent dashboard'
      ],
      status: 'Live',
      year: '2024'
    },
    {
      id: 3,
      name: 'FoodCaravan.in',
      description: 'Food delivery platform connecting local restaurants with customers for seamless ordering.',
      image: '/api/placeholder/400/250',
      techStack: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      category: 'Food & Beverage',
      link: 'https://foodcaravan.in',
      github: '#',
      features: [
        'Real-time order tracking',
        'Multiple payment options',
        'Restaurant dashboard',
        'Customer reviews'
      ],
      status: 'Live',
      year: '2024'
    },
    {
      id: 4,
      name: 'SatyaPandey.com',
      description: 'Personal portfolio and blog platform for a renowned digital marketing expert.',
      image: '/api/placeholder/400/250',
      techStack: ['Next.js', 'React', 'MDX', 'Tailwind CSS'],
      category: 'Personal Portfolio',
      link: 'https://satyapandey.com',
      github: '#',
      features: [
        'Blog integration',
        'SEO optimized',
        'Responsive design',
        'Fast loading'
      ],
      status: 'Live',
      year: '2024'
    },
    {
      id: 5,
      name: 'MyPressWala.in',
      description: 'Digital press release distribution service for businesses and media outlets.',
      image: '/api/placeholder/400/250',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Payment Gateway'],
      category: 'Media & PR',
      link: 'https://mypresswala.in',
      github: '#',
      features: [
        'Press release creation',
        'Media distribution',
        'Analytics dashboard',
        'Multi-language support'
      ],
      status: 'Live',
      year: '2024'
    },
    {
      id: 6,
      name: '12thFailJobs.com',
      description: 'Job portal specifically designed for 12th pass students to find employment opportunities.',
      image: '/api/placeholder/400/250',
      techStack: ['React', 'Node.js', 'MongoDB', 'Job Board API'],
      category: 'Job Portal',
      link: 'https://12thfailjobs.com',
      github: '#',
      features: [
        'Job matching algorithm',
        'Resume builder',
        'Skill assessment',
        'Employer dashboard'
      ],
      status: 'Live',
      year: '2024'
    },
    {
      id: 7,
      name: 'TheBrightLearn.in',
      description: 'Online learning platform offering courses in technology and business skills.',
      image: '/api/placeholder/400/250',
      techStack: ['React', 'Node.js', 'MongoDB', 'Video Streaming'],
      category: 'E-Learning',
      link: 'https://thebrightlearn.in',
      github: '#',
      features: [
        'Video courses',
        'Live sessions',
        'Progress tracking',
        'Certificates'
      ],
      status: 'Live',
      year: '2024'
    },
    {
      id: 8,
      name: 'MyDivorce.in',
      description: 'Legal services platform providing divorce consultation and documentation services.',
      image: '/api/placeholder/400/250',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Secure Payments'],
      category: 'Legal Services',
      link: 'https://mydivorce.in',
      github: '#',
      features: [
        'Legal consultation',
        'Document preparation',
        'Case tracking',
        'Secure communication'
      ],
      status: 'Live',
      year: '2024'
    }
  ]

  const categories = ['All', 'IoT & Smart Home', 'Education', 'Food & Beverage', 'Personal Portfolio', 'Media & PR', 'Job Portal', 'E-Learning', 'Legal Services']

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'IoT & Smart Home':
        return Zap
      case 'Education':
      case 'E-Learning':
        return FileText
      case 'Food & Beverage':
        return ShoppingBag
      case 'Personal Portfolio':
        return User
      case 'Media & PR':
        return TrendingUp
      case 'Job Portal':
        return Briefcase
      case 'Legal Services':
        return Code
      default:
        return Globe
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'bg-dark-blue-accent/20 text-dark-blue-primary dark:bg-dark-blue-primary/30 dark:text-dark-blue-primary'
      case 'In Development':
        return 'bg-dark-blue-accent/20 text-dark-blue-primary dark:bg-dark-blue-primary/30 dark:text-dark-blue-primary'
      case 'Coming Soon':
        return 'bg-dark-blue-accent/20 text-dark-blue-primary dark:bg-dark-blue-primary/30 dark:text-dark-blue-primary'
      default:
        return 'bg-bg-main text-text-main dark:bg-card-bg/10 dark:text-white/70'
    }
  }

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen bg-bg-main dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-bg-main via-white to-accent-light/20 dark:from-dark-bg dark:via-dark-surface dark:to-dark-blue-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-text-main dark:text-dark-text-primary mb-6">
              <span className="bg-gradient-to-r from-accent-dark via-accent-main to-accent-gold dark:from-dark-blue-accent dark:via-dark-blue-primary dark:to-dark-blue-secondary bg-clip-text text-transparent">Our Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-light dark:text-dark-text-secondary max-w-3xl mx-auto">
              Explore our portfolio of innovative digital solutions across various industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-bg-main dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card-bg dark:bg-dark-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-border-light dark:border-dark-border"
                onClick={() => openModal(project)}
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-dark-blue-accent to-dark-blue-primary dark:from-dark-blue-accent dark:to-dark-blue-primary relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🚀</div>
                      <p className="text-sm opacity-90">Project</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-dark-blue-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-main dark:text-dark-text-primary mb-2">
                    {project.name}
                  </h3>
                  
                  <p className="text-text-light dark:text-dark-text-secondary mb-4 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center text-xs text-text-light dark:text-dark-text-secondary mb-4">
                    <Globe className="w-3 h-3 mr-1" />
                    <span>{project.category}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-dark-blue-accent/20 dark:bg-dark-blue-accent/20 text-dark-blue-primary dark:text-dark-blue-primary px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-text-light dark:text-dark-text-secondary text-xs">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-dark-blue-accent text-white rounded-lg hover:bg-dark-blue-primary transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-card-bg dark:bg-dark-card text-text-main dark:text-dark-text-primary rounded-lg border border-border-light dark:border-dark-border hover:bg-bg-main dark:hover:bg-dark-surface transition-colors duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <button className="text-dark-blue-accent dark:text-dark-blue-accent font-medium text-sm hover:text-dark-blue-primary transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card-bg dark:bg-dark-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border-light dark:border-dark-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-main dark:text-dark-text-primary mb-2">
                    {selectedProject.name}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                    <span className="bg-dark-blue-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      {selectedProject.year}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 bg-bg-main dark:bg-dark-card rounded-lg border border-border-light dark:border-dark-border hover:bg-card-bg dark:hover:bg-dark-surface transition-colors duration-200"
                >
                  <span className="text-text-light dark:text-dark-text-secondary text-xl">×</span>
                </button>
              </div>

              {/* Project Image */}
              <div className="h-64 bg-gradient-to-br from-dark-blue-accent to-dark-blue-primary rounded-xl mb-6 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-2">🚀</div>
                  <p className="text-lg opacity-90">{selectedProject.name}</p>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-text-main dark:text-white mb-4">
                    Project Overview
                  </h3>
                  <p className="text-text-light dark:text-dark-text-secondary mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-text-main dark:text-white mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-dark-blue-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-text-light dark:text-dark-text-secondary text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-main dark:text-white mb-3">
                      Category
                    </h4>
                    <div className="flex items-center text-text-light dark:text-white/70">
                      {(() => {
                        const Icon = getCategoryIcon(selectedProject.category)
                        return <Icon className="w-5 h-5 mr-2" />
                      })()}
                      <span>{selectedProject.category}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-main dark:text-white mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-dark-blue-accent/20 dark:bg-dark-blue-accent/20 text-dark-blue-primary dark:text-dark-blue-primary px-3 py-2 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-text-main dark:text-white mb-3">
                      Quick Links
                    </h4>
                    <div className="flex space-x-3">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-dark-blue-accent text-white px-4 py-2 rounded-lg hover:bg-dark-blue-primary transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Visit Website</span>
                      </a>
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-card-bg dark:bg-dark-card text-text-main dark:text-dark-text-primary px-4 py-2 rounded-lg border border-border-light dark:border-dark-border hover:bg-bg-main dark:hover:bg-dark-surface transition-colors duration-200"
                        >
                          <Github className="w-4 h-4" />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  )
}

export default Projects

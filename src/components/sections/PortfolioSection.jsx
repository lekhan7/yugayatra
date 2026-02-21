import { motion } from 'framer-motion'
import { Eye, ExternalLink } from 'lucide-react'

const PortfolioSection = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'Modern e-commerce solution with advanced features',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      description: 'Secure and user-friendly banking application',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase']
    },
    {
      title: 'Healthcare Dashboard',
      category: 'UI/UX Design',
      description: 'Intuitive dashboard for healthcare professionals',
      image: '/api/placeholder/400/300',
      technologies: ['Figma', 'React']
    },
    {
      title: 'Marketing Automation',
      category: 'Digital Marketing',
      description: 'AI-powered marketing automation platform',
      image: '/api/placeholder/400/300',
      technologies: ['Python', 'AWS', 'React']
    },
    {
      title: 'Real Estate Platform',
      category: 'Web Development',
      description: 'Comprehensive property management system',
      image: '/api/placeholder/400/300',
      technologies: ['Vue.js', 'Laravel', 'MySQL']
    },
    {
      title: 'Fitness Tracking App',
      category: 'Mobile Development',
      description: 'Personal fitness and wellness companion',
      image: '/api/placeholder/400/300',
      technologies: ['Flutter', 'Firebase']
    }
  ]

  const categories = ['All', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Digital Marketing']

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-bg-main via-blue-50 to-card-bg dark:from-text-main dark:via-text-main dark:to-text-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main dark:text-white mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light dark:text-white/70 max-w-3xl mx-auto">
            Explore our recent projects and success stories
          </p>
        </motion.div>
      </div>

      {/* Filter Categories */}
      <div className="py-10 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-card-bg dark:bg-card-bg/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light dark:border-white/10">
                  <div className="relative h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Eye className="w-12 h-12 text-white/50" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs font-medium rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-text-light dark:text-white/70 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-bg-main dark:bg-card-bg/10 text-text-main dark:text-white/70 rounded text-xs font-medium border border-border-light dark:border-white/10"
                        >
                          {tech}
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
    </section>
  )
}

export default PortfolioSection

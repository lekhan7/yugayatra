import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase'
import { ExternalLink, Globe, Calendar, Users, Code, Palette, TrendingUp, ShoppingBag, User, FileText, Briefcase, Zap, Bell, School, Utensils, BookOpen, Newspaper, GraduationCap, Scale } from 'lucide-react'

const ProjectsSection = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (projectsError) throw projectsError

      // Fetch features and technologies for each project
      const projectsWithDetails = await Promise.all(
        projectsData.map(async (project) => {
          const [{ data: featuresData }, { data: technologiesData }] = await Promise.all([
            supabase
              .from('project_features')
              .select('*')
              .eq('project_id', project.id)
              .order('display_order', { ascending: true }),
            supabase
              .from('project_technologies')
              .select('*')
              .eq('project_id', project.id)
              .order('display_order', { ascending: true })
          ])

          return {
            ...project,
            icon: getIconComponent(project.icon_name),
            features: featuresData?.map(f => f.feature_text) || [],
            technologies: technologiesData?.map(t => t.technology_name) || [],
            link: project.website_url
          }
        })
      )

      setProjects(projectsWithDetails)
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Fallback to empty array if error occurs
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (iconName) => {
    const iconMap = {
      'Bell': Bell,
      'School': School,
      'Utensils': Utensils,
      'User': User,
      'Newspaper': Newspaper,
      'Briefcase': Briefcase,
      'BookOpen': BookOpen,
      'Scale': Scale,
      'Globe': Globe,
      'Code': Code,
      'Palette': Palette,
      'TrendingUp': TrendingUp,
      'ShoppingBag': ShoppingBag,
      'FileText': FileText,
      'Zap': Zap,
      'Calendar': Calendar
    }
    return iconMap[iconName] || Globe
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-bg-main dark:bg-text-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
          </div>
        </div>
      </section>
    )
  }

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
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-6" style={{color: '#252B0D'}}>
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
                <div className={`h-32 bg-gradient-to-br ${project.color_gradient} relative overflow-hidden`}>
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
                          className="bg-olive-100 text-olive-800 px-2 py-1 rounded-full text-xs font-medium dark:bg-olive-900/30 dark:text-olive-300"
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
                    className="w-full bg-accent-main text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-olive-200 transition-colors duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg"
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
          className="text-center bg-gradient-to-r from-accent-main to-olive-200 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Explore Our Work</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Dive into our projects and see how we're transforming ideas into impactful digital solutions. 
            Let's collaborate to bring your vision to life.
          </p>
          <motion.a
            href="mailto:hr@yugayatraretail.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-accent-main px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-block"
          >
            Get In Touch
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}

export default ProjectsSection

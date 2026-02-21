import { motion } from 'framer-motion'
import { 
  Code, 
  Palette, 
  TrendingUp, 
  Users, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ServicesSection = () => {
  const navigate = useNavigate()

  const services = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'End-to-end web and mobile application development with cutting-edge technologies.',
      longDescription: 'We build robust, scalable applications using modern frameworks like React, Node.js, Python, and more. Our full-stack development services cover everything from frontend design to backend architecture and database management.',
      features: [
        'React, Vue.js, Angular development',
        'Node.js, Python, Java backend',
        'RESTful APIs and GraphQL',
        'Database design and optimization',
        'Cloud deployment and DevOps'
      ],
      color: 'from-blue-500 to-blue-600',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker']
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that captivate users and drive engagement.',
      longDescription: 'Our design team creates stunning user interfaces and exceptional user experiences. We focus on user-centered design principles to ensure your digital products are both beautiful and functional.',
      features: [
        'User research and analysis',
        'Wireframing and prototyping',
        'Visual design and branding',
        'Responsive design',
        'Design systems and components'
      ],
      color: 'from-purple-500 to-purple-600',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer']
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic marketing solutions to boost your online presence and growth.',
      longDescription: 'We help businesses grow through comprehensive digital marketing strategies. From SEO and content marketing to social media and paid advertising, we cover all aspects of digital marketing.',
      features: [
        'Search Engine Optimization (SEO)',
        'Content marketing strategy',
        'Social media management',
        'PPC advertising campaigns',
        'Analytics and reporting'
      ],
      color: 'from-green-500 to-green-600',
      technologies: ['Google Analytics', 'SEMrush', 'HubSpot', 'Facebook Ads', 'Google Ads']
    },
    {
      icon: Users,
      title: 'Consulting',
      description: 'Expert guidance to transform your business with digital innovation.',
      longDescription: 'Our consulting services provide strategic guidance for digital transformation. We help businesses leverage technology to improve processes, enhance customer experiences, and drive growth.',
      features: [
        'Digital transformation strategy',
        'Technology roadmap planning',
        'Process optimization',
        'Team training and development',
        'Project management consulting'
      ],
      color: 'from-accent-main to-blue-600',
      technologies: ['Agile', 'Scrum', 'JIRA', 'Confluence', 'Miro']
    },
    {
      icon: Database,
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights with advanced analytics.',
      longDescription: 'We help businesses make data-driven decisions through comprehensive analytics solutions. From data visualization to predictive modeling, we turn raw data into valuable business intelligence.',
      features: [
        'Data visualization dashboards',
        'Business intelligence reporting',
        'Predictive analytics',
        'Data warehousing',
        'Real-time analytics'
      ],
      color: 'from-red-500 to-red-600',
      technologies: ['Tableau', 'Power BI', 'Python', 'R', 'SQL']
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services.',
      longDescription: 'We help businesses leverage the power of cloud computing. From cloud migration to managed services, we ensure your infrastructure is secure, scalable, and cost-effective.',
      features: [
        'Cloud migration services',
        'Infrastructure as code',
        'Cloud security and compliance',
        'Cost optimization',
        'Multi-cloud strategies'
      ],
      color: 'from-cyan-500 to-cyan-600',
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Kubernetes']
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      longDescription: 'We create high-performance mobile applications that deliver exceptional user experiences. Whether native or cross-platform, we ensure your app runs smoothly on all devices.',
      features: [
        'iOS and Android native apps',
        'React Native development',
        'Flutter applications',
        'App store optimization',
        'Mobile app maintenance'
      ],
      color: 'from-indigo-500 to-indigo-600',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin']
    },
    {
      icon: Globe,
      title: 'Web Solutions',
      description: 'Custom web applications tailored to your business needs.',
      longDescription: 'We build custom web solutions that solve complex business problems. From e-commerce platforms to enterprise portals, we create web applications that drive results.',
      features: [
        'Custom web applications',
        'E-commerce solutions',
        'Content management systems',
        'Progressive web apps',
        'Web application security'
      ],
      color: 'from-pink-500 to-pink-600',
      technologies: ['React', 'Next.js', 'Django', 'Laravel', 'Magento']
    }
  ]

  return (
    <section id="services" className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            Comprehensive digital solutions to accelerate your business growth and transformation
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-card-bg rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 border border-border-light group-hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-4">
                    {service.title}
                  </h3>
                  <p className="text-text-light mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-text-light">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-bg-main text-text-light rounded-full text-xs font-medium border border-border-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <button className="text-accent-main font-semibold flex items-center hover:text-blue-700 transition-colors duration-200">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const encodedRole = encodeURIComponent(service.title)
                        navigate(`/internship/apply/${encodedRole}`)
                      }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-main to-blue-600 text-white text-sm font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Apply
                    </button>
                  </div>
                </div>
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
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how our services can help transform your business
            </p>
            <a href="#contact" className="bg-card-bg text-accent-main px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center">
              Get a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

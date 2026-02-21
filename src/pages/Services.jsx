import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Code, 
  Palette, 
  TrendingUp, 
  Users, 
  Globe,
  Monitor,
  PenTool,
  Brain,
  CheckCircle,
  ArrowRight,
  Zap,
  Eye
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Website Development',
      description: 'Custom websites built with modern technologies and best practices.',
      longDescription: 'We create stunning, responsive websites that deliver exceptional user experiences and drive business results. From simple landing pages to complex web applications.',
      features: [
        'Responsive design',
        'SEO optimization',
        'Fast loading speeds',
        'Cross-browser compatibility',
        'Content management systems'
      ],
      color: 'from-blue-500 to-blue-600',
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS']
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic marketing solutions to boost your online presence and growth.',
      longDescription: 'Comprehensive digital marketing services including SEO, social media marketing, content marketing, and paid advertising to grow your online presence.',
      features: [
        'Search Engine Optimization (SEO)',
        'Social Media Management',
        'Content Marketing',
        'PPC Advertising',
        'Email Marketing'
      ],
      color: 'from-green-500 to-green-600',
      technologies: ['Google Analytics', 'SEMrush', 'HubSpot', 'Facebook Ads', 'Google Ads']
    },
    {
      icon: Users,
      title: 'Social Media Management',
      description: 'Build and manage your social media presence across all platforms.',
      longDescription: 'Professional social media management to increase brand awareness, engage with your audience, and drive conversions through strategic content and community management.',
      features: [
        'Content creation and scheduling',
        'Community engagement',
        'Social media strategy',
        'Performance analytics',
        'Brand reputation management'
      ],
      color: 'from-purple-500 to-purple-600',
      technologies: ['Buffer', 'Hootsuite', 'Canva', 'Instagram', 'LinkedIn']
    },
    {
      icon: PenTool,
      title: 'Content Development',
      description: 'Engaging content that tells your story and drives action.',
      longDescription: 'High-quality content creation including blog posts, articles, videos, infographics, and more to attract and retain your target audience.',
      features: [
        'Blog writing and articles',
        'Video content creation',
        'Infographic design',
        'Copywriting services',
        'Content strategy development'
      ],
      color: 'from-accent-main to-blue-600',
      technologies: ['WordPress', 'Medium', 'YouTube', 'Adobe Creative Suite', 'Canva']
    },
    {
      icon: Brain,
      title: 'AI Training',
      description: 'Cutting-edge AI solutions and training for modern businesses.',
      longDescription: 'AI-powered solutions and training programs to help businesses leverage artificial intelligence for automation, insights, and competitive advantage.',
      features: [
        'AI model training',
        'Machine learning implementation',
        'AI consulting',
        'Automation solutions',
        'AI literacy training'
      ],
      color: 'from-red-500 to-red-600',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Azure AI']
    },
    {
      icon: Palette,
      title: 'Graphic Designing',
      description: 'Stunning visual designs that capture your brand essence.',
      longDescription: 'Professional graphic design services including branding, logo design, marketing materials, and digital assets to make your business stand out.',
      features: [
        'Logo and brand identity',
        'Marketing materials',
        'Social media graphics',
        'Website design assets',
        'Print design services'
      ],
      color: 'from-pink-500 to-pink-600',
      technologies: ['Adobe Photoshop', 'Illustrator', 'Figma', 'Sketch', 'InDesign']
    }
  ]

  const [showAll, setShowAll] = useState(false)
  const displayedServices = showAll ? services : services.slice(0, 3)

  return (
    <div className="min-h-screen bg-bg-main dark:bg-text-main transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-bg-main via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-text-main dark:text-white mb-6">
              Our <span className="text-accent-main">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-light dark:text-white/70 max-w-3xl mx-auto">
              Comprehensive digital solutions to accelerate your business growth and transformation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-card-bg dark:bg-card-bg/10 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 border border-border-light dark:border-white/10 hover:border-border-light">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-text-light dark:text-white/70 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-text-light dark:text-white/70">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="text-accent-main dark:text-blue-300 font-semibold flex items-center group-hover:text-blue-700 transition-colors duration-200">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More Button */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="bg-accent-main text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 inline-flex items-center"
            >
              {showAll ? 'Show Less' : 'Show More'}
              <Eye className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Detailed Service Section */}
      <section className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-main dark:text-white mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-text-light dark:text-white/70 max-w-2xl mx-auto">
              Our comprehensive suite of services designed to meet all your digital needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.slice(0, 2).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card-bg dark:bg-card-bg/10 rounded-2xl p-8 shadow-lg border border-border-light dark:border-white/10"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-text-light dark:text-white/70 mb-6">
                      {service.longDescription}
                    </p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-text-light dark:text-white/70">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-bg-main dark:bg-card-bg/10 text-text-main dark:text-white/70 rounded-full text-sm font-medium border border-border-light dark:border-white/10"
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
      </section>

      {/* Process Section */}
      <section className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-main dark:text-white mb-4">
              Our Process
            </h2>
            <p className="text-xl text-text-light dark:text-white/70">
              How we deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
              { step: '02', title: 'Strategy', description: 'Creating a comprehensive plan' },
              { step: '03', title: 'Development', description: 'Building your solution' },
              { step: '04', title: 'Delivery', description: 'Launching and supporting' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-text-light dark:text-white/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-main to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how our services can help transform your business
            </p>
            <Link to="/contact" className="bg-card-bg text-accent-main px-8 py-3 rounded-full font-semibold hover:bg-bg-main transition-colors duration-300 inline-flex items-center">
              Get a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Services

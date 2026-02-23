import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Code, Palette } from 'lucide-react'
import HeroAnimation from '../HeroAnimation'

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen bg-bg-main dark:bg-dark-bg relative overflow-hidden">
      {/* Hero Animation */}
      <HeroAnimation />

      {/* CTA Buttons positioned at bottom */}
      <div className="absolute bottom-20 left-0 right-0 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center px-4"
        >
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center group bg-gradient-to-r from-accent-main to-accent-dark dark:from-dark-blue-accent dark:to-dark-blue-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Code className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Explore Opportunities
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/yuga-yatra-retail-opc-pvt-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center group bg-white/10 backdrop-blur-sm text-gray-800 border border-gray-300/20 dark:bg-dark-card/50 dark:text-dark-text-secondary dark:border-dark-border px-8 py-4 rounded-full font-semibold hover:bg-white/20 dark:hover:bg-dark-card/70 transition-all duration-300"
          >
            <Palette className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Learn More
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

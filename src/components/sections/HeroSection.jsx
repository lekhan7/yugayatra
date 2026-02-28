import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Code, Palette } from 'lucide-react'
import HeroAnimation from '../HeroAnimation'

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen bg-google-blue relative overflow-hidden">
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
            className="inline-flex items-center justify-center group bg-white text-black px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
          >
            Explore Opportunities →
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/yuga-yatra-retail-opc-pvt-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center group bg-white text-black border-2 border-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
          >
            Learn More →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

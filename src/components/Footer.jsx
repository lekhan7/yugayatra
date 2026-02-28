import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp,
  Users,
  Globe,
  MessageSquare
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Achievements', href: '/achievements' },
      { name: 'Alumni', href: '/alumni' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
    ],
  }

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/yugayatra-retail-opc-private-ltd', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/yugayatra', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/yugayatra/', label: 'Instagram' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-google-dark text-google-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-google-yellow rounded-lg flex items-center justify-center">
                <span className="text-google-dark font-bold text-sm">Y</span>
              </div>
              <h3 className="text-xl font-bold">YugaYatra Retail (OPC) Pvt Ltd</h3>
            </div>
            <p className="text-google-white/70 text-sm leading-relaxed">
              Shaping tomorrow's workforce today through innovative digital solutions and transformative technology.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white text-black border border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="w-5 h-5 text-google-white/70 hover:text-google-yellow" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-google-white/70 hover:text-google-yellow transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-google-white/70">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@yugyatra.com</span>
              </div>
              <div className="flex items-center space-x-3 text-google-white/70">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-google-white/70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Bangalore, India</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-google-white/70 text-sm mb-4">
              Subscribe to get updates on our latest projects and news.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-google-white/20 border border-google-white/30 rounded-lg text-google-white placeholder-google-white/50 focus:outline-none focus:ring-2 focus:ring-google-yellow focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-white text-black border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Developer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-google-white/10 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Developer Contact</h4>
              <div className="flex items-center space-x-2 text-google-white/70">
                <Users className="w-4 h-4" />
                <span className="text-sm">Ganesh Lagad</span>
              </div>
            </div>
            <div className="flex space-x-6">
              {footerLinks.resources.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-google-white/70 hover:text-google-yellow transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-google-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-google-white/70 text-sm">
            {currentYear} YugaYatra Retail (OPC) Pvt Ltd Retail (OPC) Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-google-white/70">
            <span className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              Serving 50+ countries
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              2.4K+ users
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black border border-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  )
}

export default Footer

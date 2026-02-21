import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, Code, Briefcase, Users, Award, FileText, Trophy, User, MessageSquare, HelpCircle, Home, Settings, MapPin, Globe } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const navLinks = [
    { name: 'Home', href: '#hero', icon: Home }, 
    { name: 'About', href: '#about', icon: Users },
    { name: 'Journey', href: '#journey-timeline', icon: MapPin },
   { name: 'Services', href: '#services', icon: Briefcase },
   { name: 'Achievements', href: '#achievements', icon: Trophy },
   { name: 'Projects', href: '#projects', icon: Globe },
    { name: 'Alumni', href: '#alumni', icon: User },
    { name: 'Blog', href: '#blog', icon: FileText },
    { name: 'Quiz', href: '#quiz', icon: MessageSquare },
    { name: 'Contact', href: '#contact', icon: MessageSquare }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card-bg/95 backdrop-blur-sm shadow-lg border border-border-light'
          : 'bg-card-bg/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div onClick={() => scrollToSection('hero')} className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-accent-main to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Y</span>
            </div>
            <span className="text-xl font-bold text-text-main">
              YugaYatra Retail 
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href.substring(1))}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-text-light hover:text-accent-main"
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-text-light hover:text-accent-main transition-colors duration-200"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:flex items-center bg-accent-main text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-text-light hover:text-accent-main transition-colors duration-200"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card-bg border-t border-border-light">
          <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href.substring(1))}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-text-light hover:text-accent-main"
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center bg-accent-main text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun, Home, MapPin, Briefcase, Award,Globe, User, MessageSquare, FileText, Brain } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()

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
    { name: 'Home', href: '#hero', icon: Home, isRoute: false }, 
    { name: 'Journey', href: '#journey-timeline', icon: MapPin, isRoute: false },
    { name: 'Services', href: '#services', icon: Briefcase, isRoute: false },
    {name:'Achievements', href:'#achievements', icon: Award, isRoute: false},
    { name: 'Projects', href: '#projects', icon: Globe, isRoute: false },
    { name: 'Alumni', href: '#alumni', icon: User, isRoute: false },
    { name: 'Quiz', href: '#find-perfect-internship', icon: Brain, isRoute: false },
    { name: ' Contac us ', href: '#contact', icon: MessageSquare, isRoute: false },
   
  ]

  const handleNavClick = (link) => {
    if (link.isRoute) {
      // Navigate to route using React Router
      window.location.href = link.href
    } else {
      // Check if we're on the home page
      if (window.location.pathname === '/') {
        // Scroll to section on home page
        const sectionId = link.href.substring(1)
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          console.warn(`Section with id "${sectionId}" not found`)
        }
      } else {
        // Navigate to home page with hash
        window.location.href = '/' + link.href
      }
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card-bg/95 dark:bg-dark-card/95 backdrop-blur-sm shadow-lg border border-border-light dark:border-dark-border'
          : 'bg-card-bg/80 dark:bg-dark-card/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div onClick={() => handleNavClick({ href: '#hero', isRoute: false })} className="flex items-center space-x-2 cursor-pointer">
            <video 
              src="/logogveed2.mp4" 
              alt="YugaYatra Logo" 
              className="w-8 h-8 rounded-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <span className="text-xl font-bold text-text-main dark:text-dark-text-primary">
              YugaYatra Retail 
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="group relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-text-light hover:text-white dark:text-dark-text-secondary dark:hover:text-dark-text-primary hover:bg-accent-main dark:hover:bg-dark-blue-accent hover:scale-105 hover:shadow-lg"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <link.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-all duration-300 group-hover:font-semibold">{link.name}</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-main to-accent-main dark:from-dark-blue-accent dark:to-dark-blue-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-text-light hover:text-accent-main hover:bg-white/10 dark:text-dark-text-secondary dark:hover:text-dark-blue-primary dark:bg-white/5 dark:hover:bg-dark-blue-accent/20 transition-all duration-300"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-text-light hover:text-accent-main hover:bg-white/10 dark:text-dark-text-secondary dark:hover:text-dark-blue-primary dark:bg-white/5 dark:hover:bg-dark-blue-accent/20 transition-all duration-300"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card-bg/95 dark:bg-dark-card/95 backdrop-blur-sm border-t border-border-light dark:border-dark-border animate-in slide-in-from-top duration-300">
          <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-text-light hover:text-white hover:bg-accent-main hover:scale-[1.02] hover:shadow-md dark:text-dark-text-secondary dark:hover:text-dark-text-primary dark:hover:bg-dark-blue-accent"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <link.icon className="w-5 h-5 transition-transform duration-300" />
                <span className="transition-all duration-300">{link.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

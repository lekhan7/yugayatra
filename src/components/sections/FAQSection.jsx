import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, HelpCircle, MessageCircle, Users, Briefcase, Award, Clock, Mail, Phone, ChevronDown, ChevronUp, Star, Globe, Heart, Target, TrendingUp, Shield } from 'lucide-react'

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFAQs, setFilteredFAQs] = useState([])
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "What is YugaYatra?",
      answer: "YugaYatra is a comprehensive platform that connects students with meaningful internship opportunities. We provide personalized internship matching, skill development programs, and career guidance to help young professionals kickstart their careers.",
      icon: Globe,
      category: "About"
    },
    {
      id: 2,
      question: "How do I apply for internships through YugaYatra?",
      answer: "Simply create an account, complete your profile, and browse through available internships. You can also take our quiz to get personalized recommendations. Once you find an internship you like, click 'Apply Now' and submit your application through our streamlined process.",
      icon: Briefcase,
      category: "Application"
    },
    {
      id: 3,
      question: "What types of internships are available?",
      answer: "We offer internships in various fields including Web Development, Digital Marketing, UI/UX Design, Data Analytics, Business Development, and more. Our partnerships with top companies ensure quality opportunities across different industries.",
      icon: Target,
      category: "Internships"
    },
    {
      id: 4,
      question: "Is YugaYatra free for students?",
      answer: "Yes! YugaYatra is completely free for students. We believe in making quality internship opportunities accessible to everyone. You can create an account, take assessments, and apply for internships without any charges.",
      icon: Heart,
      category: "Pricing"
    },
    {
      id: 5,
      question: "How does the quiz matching work?",
      answer: "Our intelligent quiz analyzes your skills, interests, and preferences to match you with the most suitable internships. The algorithm considers multiple factors including your technical skills, work style preferences, and career goals.",
      icon: TrendingUp,
      category: "Quiz"
    },
    {
      id: 6,
      question: "What is the duration of internships?",
      answer: "Internship durations vary from 2 to 6 months depending on the role and company. Part-time and full-time options are available to accommodate different schedules and academic commitments.",
      icon: Clock,
      category: "Internships"
    },
    {
      id: 7,
      question: "Do I get paid during the internship?",
      answer: "Many of our internships are paid, with competitive stipends based on the role, company, and your skill level. Some internships may be unpaid but offer valuable experience, academic credit, or other benefits.",
      icon: Award,
      category: "Compensation"
    },
    {
      id: 8,
      question: "How can companies partner with YugaYatra?",
      answer: "Companies can partner with us by posting internship opportunities, accessing our talent pool, and participating in recruitment events. We offer various partnership packages tailored to different hiring needs.",
      icon: Users,
      category: "Partnerships"
    },
    {
      id: 9,
      question: "What support does YugaYatra provide?",
      answer: "We provide comprehensive support including resume building, interview preparation, skill assessment, career counseling, and ongoing mentorship throughout your internship journey.",
      icon: Shield,
      category: "Support"
    },
    {
      id: 10,
      question: "How do I contact YugaYatra support?",
      answer: "You can reach our support team via email at support@yugayatra.com, call us at +91-XXXXXXXXXX, or use the contact form on our website. We typically respond within 24 hours.",
      icon: MessageCircle,
      category: "Contact"
    }
  ]

  useEffect(() => {
    const filtered = faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredFAQs(filtered)
  }, [searchTerm])

  useEffect(() => {
    setFilteredFAQs(faqs)
  }, [])

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  const categories = [...new Set(faqs.map(faq => faq.category))]

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-accent-main/10 to-accent-main/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-accent-main to-accent-main rounded-full">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-text-main mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Find answers to common questions about YugaYatra and our internship programs
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-accent-main focus:ring-2 focus:ring-accent-main/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-text-main transition-colors"
              >
                ×
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-text-light">
              Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
            </p>
          )}
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSearchTerm(category)}
              className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-text-main hover:bg-accent-main hover:text-white transition-all duration-300 border border-gray-200"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent-main/5 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-accent-main/20 to-accent-main/20 rounded-lg">
                      {React.createElement(faq.icon, { className: "w-5 h-5 text-accent-main" })}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-main">{faq.question}</h3>
                      <span className="text-xs text-text-light">{faq.category}</span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-text-light" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200"
                    >
                      <div className="px-6 py-4">
                        <p className="text-text-light leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-main mb-2">
              No questions found
            </h3>
            <p className="text-text-light mb-4">
              Try adjusting your search terms or browse all questions
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-2 bg-accent-main text-white rounded-lg hover:bg-accent-main/90 transition-colors"
            >
              Clear Search
            </button>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center bg-gradient-to-r from-accent-main/10 to-accent-main/10 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-text-main mb-4">
            Still have questions?
          </h3>
          <p className="text-text-light mb-6">
            Our support team is here to help you with any questions you might have
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="mailto:support@yugayatra.com"
              className="flex items-center space-x-2 px-6 py-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5 text-accent-main" />
              <span className="text-text-main font-medium">support@yugayatra.com</span>
            </a>
            <a
              href="tel:+91XXXXXXXXXX"
              className="flex items-center space-x-2 px-6 py-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-5 h-5 text-accent-main" />
              <span className="text-text-main font-medium">+91-XXXXXXXXXX</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection

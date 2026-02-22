import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Brain, Briefcase, Users, Code, TrendingUp, Heart, CheckCircle, ArrowRight, Sparkles, Target, Lightbulb, Rocket, X, Star } from 'lucide-react'
import { getServices } from '../../services/supabase'

const QuizSection = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [showBlast, setShowBlast] = useState(false)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices()
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const quizQuestions = [
    {
      id: 1,
      question: "What's your primary area of interest?",
      options: [
        { text: "Technology & Software", value: "tech" },
        { text: "Business & Marketing", value: "business" },
        { text: "Creative & Design", value: "creative" },
        { text: "Data & Analytics", value: "data" }
      ]
    },
    {
      id: 2,
      question: "How do you prefer to work?",
      options: [
        { text: "Independently with clear goals", value: "independent" },
        { text: "In collaborative teams", value: "team" },
        { text: "Mixed environment", value: "mixed" },
        { text: "Leading projects", value: "leadership" }
      ]
    },
    {
      id: 3,
      question: "What's your skill level?",
      options: [
        { text: "Beginner - Just starting", value: "beginner" },
        { text: "Intermediate - Some experience", value: "intermediate" },
        { text: "Advanced - Confident skills", value: "advanced" },
        { text: "Expert - Ready to lead", value: "expert" }
      ]
    },
    {
      id: 4,
      question: "What motivates you most?",
      options: [
        { text: "Learning new technologies", value: "learning" },
        { text: "Making an impact", value: "impact" },
        { text: "Career growth", value: "career" },
        { text: "Financial rewards", value: "financial" }
      ]
    },
    {
      id: 5,
      question: "Preferred work environment?",
      options: [
        { text: "Fast-paced startup", value: "startup" },
        { text: "Structured corporate", value: "corporate" },
        { text: "Remote flexible", value: "remote" },
        { text: "Hybrid model", value: "hybrid" }
      ]
    }
  ]

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = (userAnswers) => {
    if (services.length === 0) return

    // Simple matching - for now, just pick the first service that has apply_enabled
    const availableServices = services.filter(service => service.apply_enabled)
    if (availableServices.length > 0) {
      // For demo purposes, match based on first answer
      const firstAnswer = userAnswers[0]
      let bestMatch = availableServices[0] // default
      
      if (firstAnswer === 'tech' && availableServices.find(s => s.title.toLowerCase().includes('web'))) {
        bestMatch = availableServices.find(s => s.title.toLowerCase().includes('web')) || bestMatch
      } else if (firstAnswer === 'business' && availableServices.find(s => s.title.toLowerCase().includes('marketing'))) {
        bestMatch = availableServices.find(s => s.title.toLowerCase().includes('marketing')) || bestMatch
      } else if (firstAnswer === 'creative' && availableServices.find(s => s.title.toLowerCase().includes('design'))) {
        bestMatch = availableServices.find(s => s.title.toLowerCase().includes('design')) || bestMatch
      }

      setSelectedInternship(bestMatch)
      setShowResult(true)
      setShowBlast(true)
      setTimeout(() => setShowBlast(false), 3000)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setSelectedInternship(null)
  }

  return (
    <section id="find-perfect-internship" className="py-20 bg-gradient-to-br from-accent-main/10 to-blue-600/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-accent-main to-blue-600 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-text-main mb-4">
            Find Your Perfect Internship
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Take our quick quiz and discover the ideal internship opportunity tailored to your skills and interests
          </p>
        </motion.div>

        {/* Quiz Container */}
        <div className="relative">
          {loading ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main mx-auto mb-4"></div>
              <p className="text-text-light">Loading internship opportunities...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-light">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-sm text-text-light">
                      {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-accent-main to-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold text-text-main mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-accent-main hover:bg-accent-main/10 transition-all duration-300 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-text-main group-hover:text-accent-main font-medium">
                            {option.text}
                          </span>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent-main transition-colors" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
              >
                {/* Popup Blast Effect */}
                <AnimatePresence>
                  {showBlast && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: [0, 1.2, 1], rotate: [0, 360, 720] }}
                        exit={{ scale: 0, rotate: 720 }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-60 scale-150"></div>
                        <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-12 shadow-2xl">
                          <div className="flex flex-col items-center">
                            <Star className="w-24 h-24 text-white mb-4" />
                            <div className="text-white text-3xl font-bold">Perfect Match!</div>
                          </div>
                        </div>
                        {/* Explosion particles */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ 
                              scale: [0, 2, 0],
                              opacity: [1, 0.5, 0],
                              x: Math.cos((i * 45) * Math.PI / 180) * 200,
                              y: Math.sin((i * 45) * Math.PI / 180) * 200
                            }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="absolute top-1/2 left-1/2 w-8 h-8"
                            style={{ transform: 'translate(-50%, -50%)' }}
                          >
                            <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Result Content */}
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5 }}
                    className="mb-6"
                  >
                    <div className="inline-flex p-4 bg-gradient-to-r from-accent-main to-blue-600 rounded-full mb-4">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-text-main mb-2">
                      Perfect Match Found!
                    </h3>
                    <p className="text-text-light">
                      Based on your answers, we've found the ideal internship for you
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.7 }}
                    className="bg-gradient-to-r from-accent-main/10 to-blue-600/10 rounded-xl p-6 mb-6"
                  >
                    <h4 className="text-2xl font-semibold text-text-main mb-3">
                      {selectedInternship?.title}
                    </h4>
                    <p className="text-text-light mb-4">
                      {selectedInternship?.short_description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-4">
                      {selectedInternship?.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-text-light">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <span className="text-sm text-text-light">Technologies you'll work with</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedInternship?.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-accent-main/20 text-accent-main rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const encodedRole = encodeURIComponent(selectedInternship?.title || '')
                        navigate(`/internship/apply/${encodedRole}`)
                      }}
                      className="bg-gradient-to-r from-accent-main to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Apply Now
                    </motion.button>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.9 }}
                    onClick={resetQuiz}
                    className="text-text-light hover:text-accent-main transition-colors"
                  >
                    Take Quiz Again
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}

export default QuizSection

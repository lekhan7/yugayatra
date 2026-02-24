import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  MessageCircle, 
  Calendar, 
  Play, 
  BarChart3, 
  Users, 
  Clock, 
  Target,
  TrendingUp,
  Award,
  FileText,
  ChevronRight,
  Star,
  Zap,
  Loader2,
  Send,
  Mic,
  Video,
  Download,
  Eye,
  ThumbsUp
} from 'lucide-react'

import { EXAM_CONFIG, EXAM_COLORS, GLASSMORPHISM, ANIMATIONS } from '../constants/examColors'
import AIExamOverview from '../components/exam/AIExamOverview'
import AIQuizGenerator from '../components/exam/AIQuizGenerator'
import AICurrentAffairs from '../components/exam/AICurrentAffairs'
import AIYouTubeSuggestions from '../components/exam/AIYouTubeSuggestions'
import AIExamChatbot from '../components/exam/AIExamChatbot'
import AIPerformanceAnalytics from '../components/exam/AIPerformanceAnalytics'

const ExamDashboard = () => {
  const { examId } = useParams()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [examConfig, setExamConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const config = EXAM_CONFIG[examId?.toLowerCase()]
    if (config) {
      setExamConfig(config)
      setLoading(false)
    } else {
      navigate('/estate')
    }
  }, [examId, navigate])

  const navigationItems = [
    { id: 'overview', label: 'AI Overview', icon: BookOpen },
    { id: 'quiz-generator', label: 'AI Quiz Generator', icon: Brain },
    { id: 'current-affairs', label: 'AI Current Affairs', icon: Calendar },
    { id: 'youtube-suggestions', label: 'AI YouTube', icon: Play },
    { id: 'chatbot', label: 'AI Assistant', icon: MessageCircle },
    { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 }
  ]

  const renderSection = () => {
    if (!examConfig) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <p className="text-white text-lg">Loading exam configuration...</p>
        </div>
      )
    }
    
    switch (activeSection) {
      case 'overview':
        return <AIExamOverview examConfig={examConfig} />
      case 'quiz-generator':
        return <AIQuizGenerator examConfig={examConfig} />
      case 'current-affairs':
        return <AICurrentAffairs examConfig={examConfig} />
      case 'youtube-suggestions':
        return <AIYouTubeSuggestions examConfig={examConfig} />
      case 'chatbot':
        return <AIExamChatbot examConfig={examConfig} />
      case 'analytics':
        return <AIPerformanceAnalytics examConfig={examConfig} />
      default:
        return <AIExamOverview examConfig={examConfig} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
        <p className="ml-4 text-white text-lg">Loading Exam Dashboard...</p>
      </div>
    )
  }

  if (!examConfig) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="bg-slate-800/50 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/estate')}
                  className={`p-3 rounded-xl ${GLASSMORPHISM.hover} transition-all`}
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white">{examConfig.fullName}</h1>
                  <p className="text-gray-400">{examConfig.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 ${GLASSMORPHISM.card} flex items-center space-x-2`}>
                  <Zap className="w-4 h-4 text-indigo-400" />
                  <span className="text-white font-semibold">AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 sticky top-0"
      >
        <div className="bg-slate-800/30 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                      activeSection === item.id
                        ? `${GLASSMORPHISM.active} border-white/30`
                        : `${GLASSMORPHISM.base} ${GLASSMORPHISM.hover}`
                    }`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-white font-medium">{item.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-20"
      >
        <div className={`${GLASSMORPHISM.card} p-4`}>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-xs text-gray-400">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">89%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-xs text-gray-400">Rating</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ExamDashboard

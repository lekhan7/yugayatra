import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Loader2, 
  RefreshCw,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react'
import { EXAM_COLORS, GLASSMORPHISM, ANIMATIONS } from '../../constants/examColors'
import { openRouterAPI } from '../../services/openRouterAPI'

const AIExamOverview = ({ examConfig }) => {
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    generateOverview()
  }, [examConfig])

  const generateOverview = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const overviewData = await openRouterAPI.generateExamOverview(examConfig.name)
      setOverview(overviewData)
    } catch (err) {
      setError('Failed to generate overview. Please try again.')
      console.error('Overview generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatOverviewContent = (content) => {
    // Try to parse as JSON, fallback to formatted text
    try {
      const parsed = JSON.parse(content)
      return parsed
    } catch {
      // If not JSON, return as formatted text
      return {
        raw: content,
        sections: content.split('\n\n').filter(section => section.trim())
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
        <p className="ml-4 text-white text-lg">Generating AI Overview...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <p className="text-white text-lg mb-4">{error}</p>
          <button
            onClick={generateOverview}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    )
  }

  const overviewData = overview ? formatOverviewContent(overview) : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 mb-4">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">AI Exam Overview</h2>
        <p className="text-xl text-gray-400">Dynamically generated insights for {examConfig.fullName}</p>
      </motion.div>

      {overviewData && (
        <>
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Target, label: 'Exam Type', value: examConfig.name },
              { icon: Calendar, label: 'Duration', value: '3 Hours' },
              { icon: Users, label: 'Applicants', value: '10L+' },
              { icon: TrendingUp, label: 'Success Rate', value: '0.2%' }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={GLASSMORPHISM.card}
                >
                  <Icon className="w-8 h-8 text-indigo-400 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Generated Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={GLASSMORPHISM.card}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white flex items-center">
                <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                AI-Generated Insights
              </h3>
              <button
                onClick={generateOverview}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {overviewData.raw ? (
                // Display as formatted text if not JSON
                overviewData.sections.map((section, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-6">
                    <p className="text-white leading-relaxed whitespace-pre-wrap">{section}</p>
                  </div>
                ))
              ) : (
                // Display structured data if JSON
                Object.entries(overviewData).map(([key, value]) => (
                  <div key={key} className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="text-lg font-semibold text-indigo-400 mb-3 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="text-white space-y-2">
                      {typeof value === 'string' ? (
                        <p className="leading-relaxed">{value}</p>
                      ) : Array.isArray(value) ? (
                        value.map((item, itemIndex) => (
                          <div key={itemIndex} className="mb-2">
                            {typeof item === 'string' ? (
                              <p className="leading-relaxed">• {item}</p>
                            ) : (
                              <div>
                                <p className="font-medium text-indigo-400 mb-1">{item.title || item.topic}</p>
                                <p className="text-gray-400 ml-4">{item.description || item.content}</p>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="leading-relaxed">{JSON.stringify(value, null, 2)}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Start Practice',
                description: 'Begin AI-powered practice sessions',
                icon: Target,
                color: 'indigo'
              },
              {
                title: 'Generate Quiz',
                description: 'Create custom quizzes instantly',
                icon: Award,
                color: 'cyan'
              },
              {
                title: 'Study Plan',
                description: 'Get personalized study schedule',
                icon: Clock,
                color: 'green'
              }
            ].map((action, index) => {
              const Icon = action.icon
              return (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${GLASSMORPHISM.card} p-6 text-left hover:bg-white/10 transition-all`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${
                    action.color === 'indigo' ? 'text-indigo-400' :
                    action.color === 'cyan' ? 'text-cyan-400' :
                    'text-green-400'
                  }`} />
                  <h4 className="text-lg font-semibold text-white mb-2">{action.title}</h4>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </motion.button>
              )
            })}
          </motion.div>
        </>
      )}
    </div>
  )
}

export default AIExamOverview

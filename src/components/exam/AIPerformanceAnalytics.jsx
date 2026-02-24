import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  BookOpen, 
  Calendar,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Activity,
  Zap,
  Brain,
  RefreshCw,
  Loader2
} from 'lucide-react'
import { EXAM_COLORS, GLASSMORPHISM } from '../../constants/examColors'
import { openRouterAPI } from '../../services/openRouterAPI'

const AIPerformanceAnalytics = ({ examConfig }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedSubject, setSelectedSubject] = useState('All')
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const periods = [
    { id: '7d', name: 'Last 7 Days' },
    { id: '30d', name: 'Last 30 Days' },
    { id: '90d', name: 'Last 90 Days' },
    { id: '1y', name: 'Last Year' }
  ]

  const subjects = {
    'UPSC': ['All', 'History', 'Polity', 'Geography', 'Economy', 'Current Affairs'],
    'JEE': ['All', 'Physics', 'Chemistry', 'Mathematics'],
    'NEET': ['All', 'Physics', 'Chemistry', 'Biology'],
    'CUET': ['All', 'General Aptitude', 'English', 'Domain Subjects'],
    'KPSC': ['All', 'General Knowledge', 'Regional Studies', 'Kerala History']
  }

  useEffect(() => {
    generateAnalytics()
  }, [examConfig, selectedPeriod, selectedSubject])

  const generateAnalytics = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Mock quiz results for demonstration
      const mockQuizResults = {
        totalQuizzes: 25,
        averageScore: 78,
        timeSpent: 1200, // minutes
        subjectPerformance: {
          'History': { score: 82, attempts: 8 },
          'Polity': { score: 75, attempts: 6 },
          'Geography': { score: 70, attempts: 4 },
          'Economy': { score: 85, attempts: 5 },
          'Current Affairs': { score: 79, attempts: 2 }
        },
        weakTopics: ['Modern History', 'Economic Policies', 'Environmental Geography'],
        strongTopics: ['Ancient History', 'Indian Constitution', 'Physical Geography'],
        studyStreak: 15,
        rank: 245
      }

      const insights = await openRouterAPI.generatePerformanceInsights(
        mockQuizResults,
        examConfig.name
      )

      setAnalyticsData({
        ...mockQuizResults,
        aiInsights: insights
      })
    } catch (err) {
      setError('Failed to generate analytics. Please try again.')
      console.error('Analytics generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getProgressPercentage = (score) => {
    return Math.min(score, 100)
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
        <p className="ml-4 text-white text-lg">Generating AI Analytics...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 mb-4">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">AI Performance Analytics</h2>
        <p className="text-xl text-gray-400">AI-powered insights for {examConfig.name} preparation</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={GLASSMORPHISM.card + " p-6"}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:border-white/20 focus:outline-none"
            >
              {periods.map(period => (
                <option key={period.id} value={period.id} className="bg-gray-800">
                  {period.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:border-white/20 focus:outline-none"
            >
              {subjects[examConfig.name]?.map(subject => (
                <option key={subject} value={subject} className="bg-gray-800">
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={generateAnalytics}
            disabled={loading}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-red-400">{error}</p>
        </motion.div>
      )}

      {analyticsData && (
        <>
          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              {
                label: 'Average Score',
                value: `${analyticsData.averageScore}%`,
                icon: Target,
                color: getPerformanceColor(analyticsData.averageScore),
                trend: 'up'
              },
              {
                label: 'Accuracy',
                value: `${analyticsData.averageScore}%`,
                icon: Activity,
                color: getPerformanceColor(analyticsData.averageScore),
                trend: 'up'
              },
              {
                label: 'Time Management',
                value: `${Math.floor(analyticsData.timeSpent / 60)}h`,
                icon: Clock,
                color: 'text-blue-400',
                trend: 'stable'
              },
              {
                label: 'Rank',
                value: `#${analyticsData.rank}`,
                icon: Award,
                color: 'text-purple-400',
                trend: 'up'
              }
            ].map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={GLASSMORPHISM.card + " p-6"}
                >
                  <Icon className={`w-8 h-8 mb-3 ${metric.color}`} />
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-gray-400 text-sm mb-2">{metric.label}</div>
                  <div className="flex items-center space-x-1">
                    {metric.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-400" />}
                    {metric.trend === 'down' && <ArrowDown className="w-4 h-4 text-red-400" />}
                    {metric.trend === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
                    <span className="text-gray-400 text-xs">
                      {metric.trend === 'up' ? '+12%' : metric.trend === 'down' ? '-5%' : '0%'}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Subject-wise Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={GLASSMORPHISM.card + " p-6"}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <BookOpen className="w-6 h-6 text-indigo-400 mr-3" />
              Subject-wise Performance
            </h3>
            <div className="space-y-4">
              {Object.entries(analyticsData.subjectPerformance).map(([subject, data], index) => (
                <div key={subject} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{subject}</span>
                      <span className={`font-semibold ${getPerformanceColor(data.score)}`}>
                        {data.score}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          data.score >= 80 ? 'bg-green-500' :
                          data.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${getProgressPercentage(data.score)}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {data.attempts} attempts
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={GLASSMORPHISM.card + " p-6"}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white flex items-center">
                <Brain className="w-6 h-6 text-indigo-400 mr-3" />
                AI-Generated Insights
              </h3>
              <button
                onClick={generateAnalytics}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                {analyticsData.aiInsights}
              </pre>
            </div>
          </motion.div>

          {/* Weak Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className={GLASSMORPHISM.card + " p-6"}>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                Weak Topics
              </h3>
              <div className="space-y-2">
                {analyticsData.weakTopics.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <span className="text-red-400">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={GLASSMORPHISM.card + " p-6"}>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                Strong Topics
              </h3>
              <div className="space-y-2">
                {analyticsData.strongTopics.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-green-400">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Study Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={GLASSMORPHISM.card + " p-6"}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Study Streak</h3>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-bold text-indigo-400">
                    {analyticsData.studyStreak}
                  </div>
                  <span className="text-gray-400">days</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                <span className="text-gray-400">Keep it up!</span>
              </div>
            </div>
          </motion.div>

          {/* Weekly Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={GLASSMORPHISM.card + " p-6"}
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 text-indigo-400 mr-2" />
              Weekly Progress
            </h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 72, 78, 85, 82, 88, 91].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-cyan-600 rounded-t-lg transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-gray-400 text-xs mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default AIPerformanceAnalytics

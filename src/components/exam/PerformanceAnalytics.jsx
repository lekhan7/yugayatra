import React, { useState } from 'react'
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
  Timer
} from 'lucide-react'
import { GLASSMORPHISM } from '../../constants/examColors'

const PerformanceAnalytics = ({ examConfig }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedSubject, setSelectedSubject] = useState('All')

  const periods = [
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: '90d', name: '3 Months' },
    { id: '1y', name: '1 Year' }
  ]

  const subjects = {
    'UPSC': ['All', 'History', 'Polity', 'Geography', 'Economy', 'Current Affairs', 'Science'],
    'JEE': ['All', 'Physics', 'Chemistry', 'Mathematics'],
    'NEET': ['All', 'Physics', 'Chemistry', 'Biology'],
    'CUET': ['All', 'General Aptitude', 'English', 'Domain Subjects'],
    'KPSC': ['All', 'General Knowledge', 'Regional Studies', 'Kerala History']
  }

  const performanceData = {
    overall: {
      totalTests: 47,
      averageScore: 78.5,
      accuracy: 82.3,
      timeManagement: 76.8,
      improvement: 12.4,
      rank: 145,
      totalStudents: 2847
    },
    subjectPerformance: [
      { subject: 'History', score: 82, accuracy: 85, timeSpent: 45, improvement: 15, status: 'strong' },
      { subject: 'Polity', score: 78, accuracy: 80, timeSpent: 52, improvement: 8, status: 'average' },
      { subject: 'Geography', score: 75, accuracy: 78, timeSpent: 48, improvement: -3, status: 'weak' },
      { subject: 'Economy', score: 80, accuracy: 83, timeSpent: 50, improvement: 12, status: 'strong' },
      { subject: 'Current Affairs', score: 85, accuracy: 88, timeSpent: 35, improvement: 18, status: 'strong' },
      { subject: 'Science', score: 72, accuracy: 75, timeSpent: 55, improvement: -5, status: 'weak' }
    ],
    weeklyProgress: [
      { week: 'Week 1', score: 65, tests: 3 },
      { week: 'Week 2', score: 72, tests: 4 },
      { week: 'Week 3', score: 78, tests: 5 },
      { week: 'Week 4', score: 82, tests: 6 }
    ],
    weakTopics: [
      { topic: 'Modern Indian History', accuracy: 58, questions: 45, priority: 'high' },
      { topic: 'Physical Geography', accuracy: 62, questions: 38, priority: 'high' },
      { topic: 'Economic Policies', accuracy: 68, questions: 32, priority: 'medium' },
      { topic: 'Environmental Science', accuracy: 70, questions: 28, priority: 'medium' }
    ],
    achievements: [
      { id: 1, title: 'Week Warrior', description: '7 day streak', icon: Zap, unlocked: true },
      { id: 2, title: 'Quiz Master', description: '100 quizzes completed', icon: Brain, unlocked: true },
      { id: 3, title: 'Perfect Score', description: '100% in any test', icon: Target, unlocked: false },
      { id: 4, title: 'Speed Demon', description: 'Complete test in half time', icon: Timer, unlocked: false }
    ]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'strong': return 'text-green-400'
      case 'average': return 'text-yellow-400'
      case 'weak': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getTrendIcon = (value) => {
    if (value > 0) return <ArrowUp className="w-4 h-4 text-green-400" />
    if (value < 0) return <ArrowDown className="w-4 h-4 text-red-400" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Performance Analytics</h2>
        <p className="text-xl text-white/70">Track your {examConfig.name} preparation progress</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${GLASSMORPHISM.card} p-6`}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-white/50" />
            <div className="flex space-x-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-xl border transition-all ${
                    selectedPeriod === period.id
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {period.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-white/50" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:border-white/40 focus:outline-none"
            >
              {subjects[examConfig.name]?.map(subject => (
                <option key={subject} value={subject} className="bg-gray-800">{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Average Score',
            value: `${performanceData.overall.averageScore}%`,
            icon: Target,
            change: performanceData.overall.improvement,
            color: 'from-blue-600 to-cyan-600'
          },
          {
            label: 'Accuracy',
            value: `${performanceData.overall.accuracy}%`,
            icon: Award,
            change: 5.2,
            color: 'from-green-600 to-emerald-600'
          },
          {
            label: 'Time Management',
            value: `${performanceData.overall.timeManagement}%`,
            icon: Clock,
            change: 8.7,
            color: 'from-purple-600 to-pink-600'
          },
          {
            label: 'Rank',
            value: `#${performanceData.overall.rank}`,
            icon: TrendingUp,
            change: -23,
            color: 'from-orange-600 to-red-600'
          }
        ].map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`${GLASSMORPHISM.card} p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.change)}
                  <span className={`text-sm ${metric.change > 0 ? 'text-green-400' : metric.change < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-white/70 text-sm">{metric.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Subject Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`${GLASSMORPHISM.card} p-6`}
      >
        <h3 className="text-xl font-semibold text-white mb-6">Subject Performance</h3>
        <div className="space-y-4">
          {performanceData.subjectPerformance.map((subject, index) => (
            <div key={subject.subject} className="flex items-center space-x-4">
              <div className="w-24">
                <div className="text-white font-medium">{subject.subject}</div>
                <div className={`text-sm ${getStatusColor(subject.status)}`}>
                  {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-white/70 text-sm">Score: {subject.score}%</span>
                  <span className="text-white/70 text-sm">Accuracy: {subject.accuracy}%</span>
                  <span className="text-white/70 text-sm">Time: {subject.timeSpent}min</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      subject.status === 'strong' ? 'from-green-500 to-emerald-500' :
                      subject.status === 'average' ? 'from-yellow-500 to-orange-500' :
                      'from-red-500 to-pink-500'
                    }`}
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {getTrendIcon(subject.improvement)}
                <span className={`text-sm ${subject.improvement > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {Math.abs(subject.improvement)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weak Topics & Achievements */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weak Topics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`${GLASSMORPHISM.card} p-6`}
        >
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-semibold text-white">Weak Topics</h3>
          </div>
          <div className="space-y-3">
            {performanceData.weakTopics.map((topic, index) => (
              <div key={topic.topic} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <div className="text-white font-medium">{topic.topic}</div>
                  <div className="text-white/70 text-sm">
                    {topic.questions} questions • {topic.accuracy}% accuracy
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(topic.priority)}`}>
                  {topic.priority}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
            Create Practice Plan
          </button>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`${GLASSMORPHISM.card} p-6`}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-semibold text-white">Achievements</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {performanceData.achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all ${
                    achievement.unlocked
                      ? 'bg-white/10 border-white/30'
                      : 'bg-white/5 border-white/10 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                    achievement.unlocked ? 'from-yellow-500 to-orange-500' : 'from-gray-600 to-gray-700'
                  } flex items-center justify-center mb-3`}>
                    <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <div className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                    {achievement.title}
                  </div>
                  <div className={`text-sm ${achievement.unlocked ? 'text-white/70' : 'text-gray-500'}`}>
                    {achievement.description}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`${GLASSMORPHISM.card} p-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Weekly Progress</h3>
          <button className="p-2 bg-white/10 text-white/70 border border-white/20 rounded-lg hover:bg-white/20 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
        <div className="h-64 flex items-end justify-between space-x-4">
          {performanceData.weeklyProgress.map((week, index) => (
            <div key={week.week} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-white/10 rounded-t-lg relative">
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg transition-all duration-1000"
                  style={{ height: `${(week.score / 100) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-center">
                <div className="text-white font-medium">{week.score}%</div>
                <div className="text-white/50 text-xs">{week.week}</div>
                <div className="text-white/70 text-sm">{week.tests} tests</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default PerformanceAnalytics

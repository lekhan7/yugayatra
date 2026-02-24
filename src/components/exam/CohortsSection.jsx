import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  BookOpen, 
  Clock, 
  Play, 
  Download, 
  CheckCircle,
  Lock,
  Star,
  TrendingUp,
  Award,
  FileText,
  Calendar,
  Target
} from 'lucide-react'
import { GLASSMORPHISM } from '../../constants/examColors'

const CohortsSection = ({ examConfig }) => {
  const [activeTab, setActiveTab] = useState('prelims')

  const cohortsData = {
    'UPSC': {
      prelims: [
        {
          id: 1,
          title: 'UPSC Prelims 2024 Test Series - Full Package',
          description: 'Comprehensive test series covering all subjects for Prelims 2024',
          totalTests: 45,
          completedTests: 12,
          duration: '3 months',
          difficulty: 'Mixed',
          price: '₹4,999',
          originalPrice: '₹7,999',
          rating: 4.8,
          students: 15420,
          features: [
            '45 Full Syllabus Tests',
            'Subject-wise Tests',
            'Current Affairs Tests',
            'Detailed Solutions',
            'Performance Analysis',
            'All India Rank'
          ],
          status: 'active'
        },
        {
          id: 2,
          title: 'CSAT Focus Program 2024',
          description: 'Dedicated program to master CSAT paper with practice tests',
          totalTests: 30,
          completedTests: 8,
          duration: '2 months',
          difficulty: 'Medium',
          price: '₹2,999',
          originalPrice: '₹4,999',
          rating: 4.7,
          students: 8934,
          features: [
            '30 CSAT Tests',
            'Mathematical Aptitude',
            'Reasoning Practice',
            'Comprehension Tests',
            'Time Management Tips',
            'Video Solutions'
          ],
          status: 'active'
        },
        {
          id: 3,
          title: 'Current Affairs Crash Course 2024',
          description: 'Last 6 months current affairs focused test series',
          totalTests: 20,
          completedTests: 5,
          duration: '1 month',
          difficulty: 'Easy',
          price: '₹1,999',
          originalPrice: '₹3,499',
          rating: 4.6,
          students: 12456,
          features: [
            '20 Current Affairs Tests',
            'Monthly Compilations',
            'PIB Summary',
            'Economic Survey',
            'Budget Analysis',
            'Static GK Integration'
          ],
          status: 'active'
        }
      ],
      mains: [
        {
          id: 4,
          title: 'UPSC Mains 2024 Test Series - GS Papers',
          description: 'Complete Mains test series for General Studies Papers 1-4',
          totalTests: 32,
          completedTests: 6,
          duration: '4 months',
          difficulty: 'Hard',
          price: '₹6,999',
          originalPrice: '₹9,999',
          rating: 4.9,
          students: 7823,
          features: [
            '8 Tests per GS Paper',
            'Essay Writing Practice',
            'Model Answers',
            'Answer Evaluation',
            'Personal Mentorship',
            'Current Affairs Integration'
          ],
          status: 'active'
        },
        {
          id: 5,
          title: 'Optional Subject Test Series',
          description: 'Test series for popular optional subjects',
          totalTests: 24,
          completedTests: 4,
          duration: '3 months',
          difficulty: 'Hard',
          price: '₹4,999',
          originalPrice: '₹7,499',
          rating: 4.7,
          students: 5234,
          features: [
            '12 Tests per Optional',
            'Previous Year Questions',
            'Detailed Evaluation',
            'Answer Writing Tips',
            'Subject Mentorship',
            'Study Material'
          ],
          status: 'active'
        }
      ],
      essay: [
        {
          id: 6,
          title: 'Essay Writing Masterclass 2024',
          description: 'Comprehensive essay writing program with evaluation',
          totalTests: 25,
          completedTests: 3,
          duration: '2 months',
          difficulty: 'Medium',
          price: '₹3,499',
          originalPrice: '₹5,999',
          rating: 4.8,
          students: 6789,
          features: [
            '25 Essay Tests',
            'Topic-wise Practice',
            'Structure Guidance',
            'Content Development',
            'Personal Feedback',
            'Model Essays'
          ],
          status: 'active'
        }
      ],
      previousYear: [
        {
          id: 7,
          title: 'Previous 10 Years Solved Papers',
          description: 'Detailed solutions and analysis of previous year papers',
          totalTests: 40,
          completedTests: 15,
          duration: 'Self-paced',
          difficulty: 'Mixed',
          price: '₹1,999',
          originalPrice: '₹3,499',
          rating: 4.6,
          students: 18934,
          features: [
            '10 Years Papers',
            'Detailed Solutions',
            'Topic Analysis',
            'Trend Analysis',
            'Difficulty Level',
            'Answer Keys'
          ],
          status: 'active'
        }
      ]
    }
  }

  const currentCohorts = cohortsData[examConfig.name] || cohortsData['UPSC']

  const tabs = [
    { id: 'prelims', name: 'Prelims Practice', icon: Target },
    { id: 'mains', name: 'Mains Practice', icon: BookOpen },
    { id: 'essay', name: 'Essay Practice', icon: FileText },
    { id: 'previousYear', name: 'Previous Year', icon: Calendar }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
        }`}
      />
    ))
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Mixed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
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
          <Users className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Practice Cohorts</h2>
        <p className="text-xl text-white/70">Structured practice programs for {examConfig.name} preparation</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${GLASSMORPHISM.card} p-6`}
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/20 border-white/40 text-white'
                    : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Cohorts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {(currentCohorts[activeTab] || []).map((cohort, index) => (
            <motion.div
              key={cohort.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`${GLASSMORPHISM.card} overflow-hidden hover:border-white/30 transition-all`}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{cohort.title}</h3>
                    <p className="text-white/70 text-sm">{cohort.description}</p>
                  </div>
                  {cohort.status === 'active' && (
                    <div className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-xs">
                      Active
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-white/70">
                  <span className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>{cohort.totalTests} Tests</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{cohort.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{cohort.students.toLocaleString()}</span>
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-sm">Progress</span>
                  <span className="text-white text-sm font-medium">
                    {cohort.completedTests}/{cohort.totalTests} Tests
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                    style={{ width: `${(cohort.completedTests / cohort.totalTests) * 100}%` }}
                  />
                </div>
              </div>

              {/* Features */}
              <div className="p-6 border-b border-white/10">
                <div className="grid grid-cols-2 gap-2">
                  {cohort.features.slice(0, 4).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <span className="text-white/70 text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
                {cohort.features.length > 4 && (
                  <div className="mt-2 text-white/50 text-xs">
                    +{cohort.features.length - 4} more features
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {renderStars(cohort.rating)}
                      <span className="text-white/70 text-sm ml-1">{cohort.rating}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs border ${getDifficultyColor(cohort.difficulty)}`}>
                      {cohort.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{cohort.price}</div>
                    <div className="text-white/50 text-sm line-through">{cohort.originalPrice}</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Continue</span>
                  </button>
                  <button className="p-3 bg-white/10 text-white/70 border border-white/20 rounded-lg hover:bg-white/20 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {(!currentCohorts[activeTab] || currentCohorts[activeTab].length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${GLASSMORPHISM.card} p-12 text-center`}
        >
          <Lock className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
          <p className="text-white/70">Practice cohorts for this section will be available soon.</p>
        </motion.div>
      )}
    </div>
  )
}

export default CohortsSection

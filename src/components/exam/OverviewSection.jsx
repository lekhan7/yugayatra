import React from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Target, 
  Calendar, 
  Award,
  CheckCircle,
  AlertCircle,
  Info,
  FileText,
  Download
} from 'lucide-react'
import { GLASSMORPHISM } from '../../constants/examColors'

const OverviewSection = ({ examConfig }) => {
  const examInfo = {
    'UPSC': {
      description: 'The Union Public Service Commission (UPSC) conducts India\'s most prestigious civil services examination to select candidates for various administrative positions.',
      eligibility: [
        'Age: 21-32 years (General), 21-35 years (OBC), 21-37 years (SC/ST)',
        'Educational Qualification: Bachelor\'s degree from recognized university',
        'Nationality: Indian citizen (certain posts for other nationals)',
        'Number of Attempts: 6 (General), 9 (OBC), Unlimited (SC/ST)'
      ],
      pattern: [
        {
          stage: 'Preliminary Examination',
          papers: ['General Studies Paper I', 'General Studies Paper II (CSAT)'],
          marks: '200 marks each',
          duration: '2 hours each',
          type: 'Objective Type'
        },
        {
          stage: 'Main Examination',
          papers: ['Essay', 'General Studies I-IV', 'Optional Paper I-II', 'Language Paper'],
          marks: '1750 marks total',
          duration: '3 hours each',
          type: 'Descriptive Type'
        },
        {
          stage: 'Personality Test',
          papers: ['Interview'],
          marks: '275 marks',
          duration: '30-45 minutes',
          type: 'Personality Assessment'
        }
      ],
      importantDates: [
        { event: 'Preliminary Exam', date: 'May 28, 2024', status: 'upcoming' },
        { event: 'Main Exam', date: 'September 15, 2024', status: 'upcoming' },
        { event: 'Interview', date: 'January 2025', status: 'tentative' },
        { event: 'Final Result', date: 'April 2025', status: 'tentative' }
      ]
    },
    'JEE': {
      description: 'Joint Entrance Examination (JEE) Main is the national level undergraduate engineering entrance exam conducted by NTA.',
      eligibility: [
        'Age: No age limit',
        'Educational Qualification: 10+2 with Physics, Chemistry, Mathematics',
        'Subjects: Physics, Chemistry, Mathematics, and Language',
        'Passing Year: 2022, 2023, or appearing in 2024'
      ],
      pattern: [
        {
          stage: 'JEE Main Paper 1',
          papers: ['Physics', 'Chemistry', 'Mathematics'],
          marks: '300 marks total',
          duration: '3 hours',
          type: 'Multiple Choice Questions'
        }
      ],
      importantDates: [
        { event: 'Registration Start', date: 'November 2023', status: 'completed' },
        { event: 'Exam Session 1', date: 'January 2024', status: 'completed' },
        { event: 'Exam Session 2', date: 'April 2024', status: 'upcoming' },
        { event: 'Result Declaration', date: 'April 2024', status: 'upcoming' }
      ]
    }
  }

  const currentExamInfo = examInfo[examConfig.name] || examInfo['UPSC']

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">{examConfig.fullName}</h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">{currentExamInfo.description}</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Applicants', value: '11.5 Lakhs', icon: Users },
          { label: 'Vacancies', value: '1,105', icon: Target },
          { label: 'Success Rate', value: '0.2%', icon: Award },
          { label: 'Exam Duration', value: '1 Year', icon: Clock }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`${GLASSMORPHISM.card} p-6 text-center`}
            >
              <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Eligibility Criteria */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${GLASSMORPHISM.card} p-6`}
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
          Eligibility Criteria
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {currentExamInfo.eligibility.map((criteria, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-white/80">{criteria}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Exam Pattern */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`${GLASSMORPHISM.card} p-6`}
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <FileText className="w-6 h-6 text-blue-400 mr-3" />
          Exam Pattern
        </h3>
        <div className="space-y-6">
          {currentExamInfo.pattern.map((stage, index) => (
            <div key={stage.stage} className="border-l-4 border-purple-500 pl-6">
              <h4 className="text-xl font-semibold text-white mb-3">{stage.stage}</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <div className="text-white/70 text-sm mb-1">Papers</div>
                  <div className="text-white">{stage.papers.join(', ')}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-1">Marks</div>
                  <div className="text-white">{stage.marks}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-1">Duration</div>
                  <div className="text-white">{stage.duration}</div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-1">Type</div>
                  <div className="text-white">{stage.type}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Important Dates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`${GLASSMORPHISM.card} p-6`}
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Calendar className="w-6 h-6 text-yellow-400 mr-3" />
          Important Dates
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {currentExamInfo.importantDates.map((dateInfo, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  dateInfo.status === 'completed' ? 'bg-green-500' :
                  dateInfo.status === 'upcoming' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`} />
                <div>
                  <div className="text-white font-medium">{dateInfo.event}</div>
                  <div className="text-white/70 text-sm">{dateInfo.date}</div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                dateInfo.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                dateInfo.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {dateInfo.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`${GLASSMORPHISM.card} p-6`}
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Info className="w-6 h-6 text-cyan-400 mr-3" />
          Resources & Downloads
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Official Syllabus PDF', type: 'PDF', size: '2.3 MB' },
            { name: 'Previous Year Papers', type: 'ZIP', size: '15.7 MB' },
            { name: 'Study Schedule Template', type: 'Excel', size: '845 KB' }
          ].map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-white/70" />
                <div>
                  <div className="text-white font-medium">{resource.name}</div>
                  <div className="text-white/50 text-sm">{resource.type} • {resource.size}</div>
                </div>
              </div>
              <Download className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default OverviewSection

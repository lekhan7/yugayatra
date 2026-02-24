import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Target,
  Zap,
  Play,
  RotateCcw,
  Download,
  Eye
} from 'lucide-react'
import { EXAM_COLORS, GLASSMORPHISM } from '../../constants/examColors'
import { openRouterAPI } from '../../services/openRouterAPI'

const AIQuizGenerator = ({ examConfig }) => {
  const [quizSettings, setQuizSettings] = useState({
    subject: 'History',
    difficulty: 'Medium',
    language: 'English',
    questionCount: 10
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [quizGenerated, setQuizGenerated] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState(null)

  const subjects = {
    'UPSC': ['History', 'Polity', 'Geography', 'Economy', 'Current Affairs', 'Science & Tech'],
    'JEE': ['Physics', 'Chemistry', 'Mathematics'],
    'NEET': ['Physics', 'Chemistry', 'Biology'],
    'CUET': ['General Aptitude', 'English', 'Domain Subjects'],
    'KPSC': ['General Knowledge', 'Regional Studies', 'Kerala History']
  }

  const generateQuiz = async () => {
    setIsGenerating(true)
    setError(null)
    
    try {
      const quizData = await openRouterAPI.generateQuiz({
        examType: examConfig.name,
        subject: quizSettings.subject,
        difficulty: quizSettings.difficulty,
        language: quizSettings.language,
        questionCount: quizSettings.questionCount
      })
      
      if (quizData.length === 0) {
        throw new Error('No questions generated. Please try different settings.')
      }
      
      setCurrentQuiz({
        id: Date.now(),
        title: `${quizSettings.subject} - ${quizSettings.difficulty} Quiz`,
        subject: quizSettings.subject,
        difficulty: quizSettings.difficulty,
        language: quizSettings.language,
        timeLimit: quizSettings.questionCount * 2, // 2 minutes per question
        questions: quizData
      })
      setQuizGenerated(true)
      setCurrentQuestion(0)
      setAnswers({})
      setShowResults(false)
    } catch (err) {
      setError('Failed to generate quiz. Please try again.')
      console.error('Quiz generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    })
  }

  const calculateResults = () => {
    if (!currentQuiz) return { correct: 0, total: 0, percentage: 0 }
    
    let correct = 0
    currentQuiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++
      }
    })
    
    return {
      correct,
      total: currentQuiz.questions.length,
      percentage: Math.round((correct / currentQuiz.questions.length) * 100)
    }
  }

  const resetQuiz = () => {
    setQuizGenerated(false)
    setCurrentQuiz(null)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setError(null)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (showResults) {
    const results = calculateResults()
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={GLASSMORPHISM.card + " p-8 text-center"}
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{results.percentage}%</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
          <p className="text-xl text-gray-400 mb-6">
            You got {results.correct} out of {results.total} questions correct
          </p>
          
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowResults(false)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Eye className="w-5 h-5" />
              <span>Review Answers</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg transition-all"
            >
              <RotateCcw className="w-5 h-5 inline mr-2" />
              New Quiz
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!quizGenerated) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 mb-4">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">AI Quiz Generator</h2>
          <p className="text-xl text-gray-400">Generate structured MCQs powered by DeepSeek AI</p>
        </motion.div>

        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={GLASSMORPHISM.card + " p-8"}
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Quiz Configuration</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-400 mb-2">Subject</label>
              <select
                value={quizSettings.subject}
                onChange={(e) => setQuizSettings({...quizSettings, subject: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-white/20 focus:outline-none"
              >
                {subjects[examConfig.name]?.map(subject => (
                  <option key={subject} value={subject} className="bg-gray-800">{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Difficulty</label>
              <select
                value={quizSettings.difficulty}
                onChange={(e) => setQuizSettings({...quizSettings, difficulty: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-white/20 focus:outline-none"
              >
                <option value="Easy" className="bg-gray-800">Easy</option>
                <option value="Medium" className="bg-gray-800">Medium</option>
                <option value="Hard" className="bg-gray-800">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Language</label>
              <select
                value={quizSettings.language}
                onChange={(e) => setQuizSettings({...quizSettings, language: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-white/20 focus:outline-none"
              >
                <option value="English" className="bg-gray-800">English</option>
                <option value="Hindi" className="bg-gray-800">Hindi</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Number of Questions</label>
              <select
                value={quizSettings.questionCount}
                onChange={(e) => setQuizSettings({...quizSettings, questionCount: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-white/20 focus:outline-none"
              >
                <option value="5" className="bg-gray-800">5 Questions</option>
                <option value="10" className="bg-gray-800">10 Questions</option>
                <option value="15" className="bg-gray-800">15 Questions</option>
                <option value="20" className="bg-gray-800">20 Questions</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateQuiz}
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Quiz...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate Quiz</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Target,
              title: 'Adaptive Difficulty',
              description: 'Questions adjust to your skill level'
            },
            {
              icon: Clock,
              title: 'Timed Practice',
              description: 'Simulate real exam conditions'
            },
            {
              icon: Brain,
              title: 'AI Explanations',
              description: 'Detailed solutions for every question'
            }
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={GLASSMORPHISM.card + " p-6 text-center"}
              >
                <Icon className="w-8 h-8 text-indigo-400 mb-4 mx-auto" />
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Quiz Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={GLASSMORPHISM.card + " p-6"}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">{currentQuiz.title}</h3>
            <p className="text-gray-400">
              Question {currentQuestion + 1} of {currentQuiz.questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-400">
              <Clock className="w-5 h-5 inline mr-2" />
              {formatTime(currentQuiz.timeLimit)}
            </div>
            <button
              onClick={resetQuiz}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className={GLASSMORPHISM.card + " p-8"}
      >
        <div className="mb-6">
          <span className="text-gray-400">Question {currentQuestion + 1}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-8">
          {currentQuiz.questions[currentQuestion].question}
        </h2>

        <div className="space-y-3 mb-8">
          {currentQuiz.questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQuestion] === index
                  ? 'border-indigo-500 bg-indigo-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <span className="text-white font-medium">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="ml-2 text-gray-300">{option}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-between">
          <button className="px-6 py-3 bg-white/10 border border-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            Mark for Review
          </button>
          
          {currentQuestion === currentQuiz.questions.length - 1 ? (
            <button
              onClick={() => setShowResults(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg"
            >
              Next Question
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default AIQuizGenerator

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  Filter, 
  Globe, 
  TrendingUp, 
  Award, 
  Target,
  Play,
  FileText,
  BarChart3,
  ChevronRight,
  X,
  CheckCircle,
  AlertCircle,
  Timer
} from 'lucide-react'

const EstateExamHub = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [selectedFilters, setSelectedFilters] = useState({
    examType: 'All',
    difficulty: 'All',
    subject: 'All',
    duration: 'All',
    language: 'All'
  })
  const [showTestInterface, setShowTestInterface] = useState(false)
  const [currentTest, setCurrentTest] = useState(null)
  const [testAnswers, setTestAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour default
  const [testSubmitted, setTestSubmitted] = useState(false)

  // Mock exam data
  const examData = {
    national: [
      {
        id: 'jee-main',
        name: 'JEE Main',
        description: 'Joint Entrance Examination for Engineering',
        difficulty: 'Hard',
        duration: '3 hours',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        icon: '🔬',
        practiceTests: 25,
        mockTests: 10
      },
      {
        id: 'neet',
        name: 'NEET',
        description: 'National Eligibility cum Entrance Test',
        difficulty: 'Hard',
        duration: '3 hours',
        subjects: ['Physics', 'Chemistry', 'Biology'],
        icon: '🏥',
        practiceTests: 30,
        mockTests: 15
      },
      {
        id: 'cuet',
        name: 'CUET',
        description: 'Common University Entrance Test',
        difficulty: 'Medium',
        duration: '2 hours',
        subjects: ['General Aptitude', 'Domain Subjects'],
        icon: '🎓',
        practiceTests: 20,
        mockTests: 8
      }
    ],
    state: [
      {
        id: 'upsc',
        name: 'UPSC',
        description: 'Union Public Service Commission',
        difficulty: 'Hard',
        duration: '3 hours',
        subjects: ['General Studies', 'Optional Subject'],
        icon: '🏛️',
        prelimsTests: 15,
        mainsTests: 10,
        previousYear: 5
      },
      {
        id: 'kpsc',
        name: 'KPSC',
        description: 'Kerala Public Service Commission',
        difficulty: 'Medium',
        duration: '2 hours',
        subjects: ['General Knowledge', 'Regional Studies'],
        icon: '📋',
        prelimsTests: 12,
        mainsTests: 8,
        previousYear: 3
      }
    ],
    language: [
      {
        id: 'english',
        name: 'English',
        description: 'English Language Proficiency',
        difficulty: 'Medium',
        duration: '1 hour',
        icon: '🇬🇧',
        grammar: true,
        vocabulary: true,
        comprehension: true,
        certification: true
      },
      {
        id: 'hindi',
        name: 'Hindi',
        description: 'Hindi Language Proficiency',
        difficulty: 'Easy',
        duration: '1 hour',
        icon: '🇮🇳',
        grammar: true,
        vocabulary: true,
        comprehension: true,
        certification: true
      },
      {
        id: 'sanskrit',
        name: 'Sanskrit',
        description: 'Sanskrit Language Proficiency',
        difficulty: 'Hard',
        duration: '1 hour',
        icon: '📿',
        grammar: true,
        vocabulary: true,
        comprehension: true,
        certification: true
      },
      {
        id: 'french',
        name: 'French',
        description: 'French Language Proficiency',
        difficulty: 'Medium',
        duration: '1 hour',
        icon: '🇫🇷',
        grammar: true,
        vocabulary: true,
        comprehension: true,
        certification: true
      },
      {
        id: 'spanish',
        name: 'Spanish',
        description: 'Spanish Language Proficiency',
        difficulty: 'Medium',
        duration: '1 hour',
        icon: '🇪🇸',
        grammar: true,
        vocabulary: true,
        comprehension: true,
        certification: true
      }
    ]
  }

  // Mock test questions
  const mockQuestions = [
    {
      id: 1,
      question_en: "What is the chemical formula for water?",
      question_hi: "जल का रासायनिक सूत्र क्या है?",
      options_en: ["H2O", "CO2", "O2", "N2"],
      options_hi: ["H2O", "CO2", "O2", "N2"],
      correctAnswer: 0,
      explanation_en: "Water is composed of two hydrogen atoms and one oxygen atom.",
      explanation_hi: "जल दो हाइड्रोजन परमाणुओं और एक ऑक्सीजन परमाणु से बना है।"
    },
    {
      id: 2,
      question_en: "What is the capital of India?",
      question_hi: "भारत की राजधानी क्या है?",
      options_en: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      options_hi: ["मुंबई", "दिल्ली", "कोलकाता", "चेन्नई"],
      correctAnswer: 1,
      explanation_en: "New Delhi is the capital of India.",
      explanation_hi: "नई दिल्ली भारत की राजधानी है।"
    }
  ]

  // Timer effect
  useEffect(() => {
    if (showTestInterface && timeLeft > 0 && !testSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !testSubmitted) {
      handleSubmitTest()
    }
  }, [timeLeft, showTestInterface, testSubmitted])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTest = (exam) => {
    setCurrentTest(exam)
    setShowTestInterface(true)
    setTimeLeft(3600)
    setCurrentQuestion(0)
    setTestAnswers({})
    setTestSubmitted(false)
  }

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setTestAnswers({
      ...testAnswers,
      [questionIndex]: answerIndex
    })
  }

  const handleSubmitTest = () => {
    setTestSubmitted(true)
  }

  const calculateScore = () => {
    let correct = 0
    mockQuestions.forEach((question, index) => {
      if (testAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: mockQuestions.length,
      percentage: Math.round((correct / mockQuestions.length) * 100)
    }
  }

  const translations = {
    English: {
      startPracticing: "Start Practicing",
      exploreExams: "Explore Exams",
      nationalExams: "National Exams",
      stateCivilServices: "State & Civil Services",
      languagePractice: "Language Practice Hub",
      difficulty: "Difficulty",
      practiceNow: "Practice Now",
      fullMockTest: "Full Mock Test",
      prelimsPractice: "Prelims Practice",
      mainsPractice: "Mains Practice",
      previousYear: "Previous Year Questions",
      mockTestSeries: "Mock Test Series",
      grammarPractice: "Grammar Practice",
      vocabularyBuilder: "Vocabulary Builder",
      readingComprehension: "Reading Comprehension",
      timedTest: "Timed Test",
      certificationMock: "Certification Mock",
      question: "Question",
      saveAndNext: "Save & Next",
      markForReview: "Mark for Review",
      submitTest: "Submit Test"
    },
    Hindi: {
      startPracticing: "अभ्यास शुरू करें",
      exploreExams: "परीक्षाएं देखें",
      nationalExams: "राष्ट्रीय परीक्षाएं",
      stateCivilServices: "राज्य और सिविल सेवाएं",
      languagePractice: "भाषा अभ्यास केंद्र",
      difficulty: "कठिनाई",
      practiceNow: "अभी अभ्यास करें",
      fullMockTest: "पूर्ण मॉक टेस्ट",
      prelimsPractice: "प्रीलिम्स अभ्यास",
      mainsPractice: "मेन्स अभ्यास",
      previousYear: "पिछले वर्ष के प्रश्न",
      mockTestSeries: "मॉक टेस्ट सीरीज",
      grammarPractice: "व्याकरण अभ्यास",
      vocabularyBuilder: "शब्दावली निर्माता",
      readingComprehension: "पठन समझ",
      timedTest: "समयबद्ध परीक्षण",
      certificationMock: "प्रमाणन मॉक",
      question: "प्रश्न",
      saveAndNext: "सहेजें और अगला",
      markForReview: "समीक्षा के लिए चिह्नित करें",
      submitTest: "परीक्षा जमा करें"
    }
  }

  const t = translations[selectedLanguage]

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-50 via-white to-olive-100 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg">
      {/* Language Preference Dropdown */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg border-b border-olive-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-olive-600 dark:text-olive-300" />
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1 rounded-lg border border-olive-300 dark:border-dark-border bg-white dark:bg-dark-card text-olive-900 dark:text-olive-100 focus:ring-2 focus:ring-olive-500 focus:border-transparent"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी</option>
              </select>
            </div>
            
            {/* Smart Filter Bar */}
            <div className="flex items-center space-x-4">
              <Filter className="w-4 h-4 text-olive-600 dark:text-olive-300" />
              <select className="px-2 py-1 text-sm rounded border border-olive-300 dark:border-dark-border bg-white dark:bg-dark-card text-olive-900 dark:text-olive-100">
                <option>All Types</option>
                <option>National</option>
                <option>State</option>
                <option>Language</option>
              </select>
              <select className="px-2 py-1 text-sm rounded border border-olive-300 dark:border-dark-border bg-white dark:bg-dark-card text-olive-900 dark:text-olive-100">
                <option>All Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <select className="px-2 py-1 text-sm rounded border border-olive-300 dark:border-dark-border bg-white dark:bg-dark-card text-olive-900 dark:text-olive-100">
                <option>All Duration</option>
                <option>30 min</option>
                <option>1 hour</option>
                <option>3 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden py-20 px-4"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-olive-200/20 via-accent-main/10 to-olive-300/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-olive-900 dark:text-olive-100 mb-6"
          >
            {selectedLanguage === 'Hindi' ? 'अभ्यास करें। ट्रैक करें। परीक्षाएं जीतें।' : 'Practice. Track. Conquer Your Exams.'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-olive-700 dark:text-olive-300 mb-8"
          >
            {selectedLanguage === 'Hindi' ? 'राष्ट्रीय | राज्य | भाषा प्रमाणन — एक ही स्थान पर' : 'National | State | Language Certifications — All in One Place'}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-olive-600 to-olive-700 hover:from-olive-700 hover:to-olive-800 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              {t.startPracticing}
            </button>
            <button className="px-8 py-4 bg-white dark:bg-dark-card border-2 border-olive-600 dark:border-olive-400 text-olive-600 dark:text-olive-400 font-semibold rounded-xl shadow-lg hover:bg-olive-50 dark:hover:bg-dark-border transform hover:scale-105 transition-all duration-200">
              {t.exploreExams}
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* User Dashboard Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-16">
        <h2 className="text-3xl font-bold text-olive-900 dark:text-olive-100 mb-8 flex items-center">
          <BarChart3 className="w-8 h-8 text-olive-600 dark:text-olive-400 mr-3" />
          {selectedLanguage === 'Hindi' ? 'आपकी प्रगति डैशबोर्ड' : 'Your Progress Dashboard'}
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 border border-olive-200 dark:border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-olive-600 dark:text-olive-400" />
              <span className="text-2xl font-bold text-olive-900 dark:text-olive-100">12</span>
            </div>
            <p className="text-sm text-olive-600 dark:text-olive-300">
              {selectedLanguage === 'Hindi' ? 'कुल परीक्षण प्रयास' : 'Total Tests Attempted'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 border border-olive-200 dark:border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-bold text-olive-900 dark:text-olive-100">78%</span>
            </div>
            <p className="text-sm text-olive-600 dark:text-olive-300">
              {selectedLanguage === 'Hindi' ? 'सटीकता' : 'Accuracy'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 border border-olive-200 dark:border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold text-olive-900 dark:text-olive-100">85%</span>
            </div>
            <p className="text-sm text-olive-600 dark:text-olive-300">
              {selectedLanguage === 'Hindi' ? 'समय प्रबंधन' : 'Time Management'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 border border-olive-200 dark:border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              <span className="text-2xl font-bold text-olive-900 dark:text-olive-100">3</span>
            </div>
            <p className="text-sm text-olive-600 dark:text-olive-300">
              {selectedLanguage === 'Hindi' ? 'प्रमाणन अर्जित' : 'Certifications Earned'}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 border border-olive-200 dark:border-dark-border"
          >
            <h3 className="text-lg font-semibold text-olive-900 dark:text-olive-100 mb-4">
              {selectedLanguage === 'Hindi' ? 'प्रदर्शन ग्राफ' : 'Performance Graph'}
            </h3>
            <div className="h-48 bg-olive-50 dark:bg-dark-border rounded-lg flex items-center justify-center">
              <p className="text-olive-500 dark:text-olive-400">
                {selectedLanguage === 'Hindi' ? 'ग्राफ़ विज़ुअलाइज़ेशन (जल्द आ रहा है)' : 'Graph Visualization (Coming Soon)'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 border border-olive-200 dark:border-dark-border"
          >
            <h3 className="text-lg font-semibold text-olive-900 dark:text-olive-100 mb-4">
              {selectedLanguage === 'Hindi' ? 'अनुशंसित अभ्यास' : 'Recommended Practice'}
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-olive-50 dark:bg-olive-900/20 rounded-lg">
                <p className="font-medium text-olive-900 dark:text-olive-100">
                  {selectedLanguage === 'Hindi' ? 'भौतिकी - यांत्रिकी' : 'Physics - Mechanics'}
                </p>
                <p className="text-sm text-olive-600 dark:text-olive-300">
                  {selectedLanguage === 'Hindi' ? 'कमजोर क्षेत्र' : 'Weak Area'}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-medium text-olive-900 dark:text-olive-100">
                  {selectedLanguage === 'Hindi' ? 'रसायन विज्ञान - कार्बनिक' : 'Chemistry - Organic'}
                </p>
                <p className="text-sm text-olive-600 dark:text-olive-300">
                  {selectedLanguage === 'Hindi' ? 'मजबूत क्षेत्र' : 'Strong Area'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exam Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* National Exams */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-olive-900 dark:text-olive-100 mb-8 flex items-center">
            <span className="w-1 h-8 bg-olive-600 dark:bg-olive-400 mr-4" />
            {t.nationalExams}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {examData.national.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 border border-olive-200 dark:border-dark-border hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{exam.icon}</div>
                <h3 className="text-xl font-bold text-olive-900 dark:text-olive-100 mb-2">{exam.name}</h3>
                <p className="text-olive-600 dark:text-olive-300 mb-4">{exam.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    exam.difficulty === 'Hard' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    exam.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {exam.difficulty}
                  </span>
                  <span className="text-sm text-olive-500 dark:text-olive-400 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {exam.duration}
                  </span>
                </div>
                <div className="space-y-2">
                  <button 
                    onClick={() => startTest(exam)}
                    className="w-full px-4 py-2 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-colors duration-200"
                  >
                    {t.practiceNow}
                  </button>
                  <button className="w-full px-4 py-2 border border-olive-600 dark:border-olive-400 text-olive-600 dark:text-olive-400 rounded-lg hover:bg-olive-50 dark:hover:bg-dark-border transition-colors duration-200">
                    {t.fullMockTest}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* State & Civil Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-olive-900 dark:text-olive-100 mb-8 flex items-center">
            <span className="w-1 h-8 bg-olive-600 dark:bg-olive-400 mr-4" />
            {t.stateCivilServices}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {examData.state.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 border border-olive-200 dark:border-dark-border hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{exam.icon}</div>
                <h3 className="text-xl font-bold text-olive-900 dark:text-olive-100 mb-2">{exam.name}</h3>
                <p className="text-olive-600 dark:text-olive-300 mb-4">{exam.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 bg-olive-100 dark:bg-olive-900/30 text-olive-700 dark:text-olive-300 rounded-lg hover:bg-olive-200 dark:hover:bg-olive-900/50 transition-colors duration-200 text-sm">
                    {t.prelimsPractice}
                  </button>
                  <button className="px-3 py-2 bg-olive-100 dark:bg-olive-900/30 text-olive-700 dark:text-olive-300 rounded-lg hover:bg-olive-200 dark:hover:bg-olive-900/50 transition-colors duration-200 text-sm">
                    {t.mainsPractice}
                  </button>
                  <button className="px-3 py-2 bg-olive-100 dark:bg-olive-900/30 text-olive-700 dark:text-olive-300 rounded-lg hover:bg-olive-200 dark:hover:bg-olive-900/50 transition-colors duration-200 text-sm">
                    {t.previousYear}
                  </button>
                  <button className="px-3 py-2 bg-olive-100 dark:bg-olive-900/30 text-olive-700 dark:text-olive-300 rounded-lg hover:bg-olive-200 dark:hover:bg-olive-900/50 transition-colors duration-200 text-sm">
                    {t.mockTestSeries}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Language Practice Hub */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-olive-900 dark:text-olive-100 mb-8 flex items-center">
            <span className="w-1 h-8 bg-olive-600 dark:bg-olive-400 mr-4" />
            {t.languagePractice}
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {examData.language.map((language, index) => (
              <motion.div
                key={language.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-4 border border-olive-200 dark:border-dark-border hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl mb-3 text-center">{language.icon}</div>
                <h3 className="text-lg font-bold text-olive-900 dark:text-olive-100 mb-2 text-center">{language.name}</h3>
                <div className="space-y-1">
                  <button className="w-full px-2 py-1 text-xs bg-olive-100 dark:bg-olive-900/30 text-olive-700 dark:text-olive-300 rounded hover:bg-olive-200 dark:hover:bg-olive-900/50 transition-colors duration-200">
                    {t.grammarPractice}
                  </button>
                  <button className="w-full px-2 py-1 text-xs bg-olive-100 dark:bg-olive-900/30 text-olive-700 dark:text-olive-300 rounded hover:bg-olive-200 dark:hover:bg-olive-900/50 transition-colors duration-200">
                    {t.vocabularyBuilder}
                  </button>
                  <button className="w-full px-2 py-1 text-xs bg-olive-100 dark:bg-olive-900/30 text-olive-700 dark:text-olive-300 rounded hover:bg-olive-200 dark:hover:bg-olive-900/50 transition-colors duration-200">
                    {t.readingComprehension}
                  </button>
                  <button className="w-full px-2 py-1 text-xs bg-olive-100 dark:bg-olive-900/30 text-olive-700 dark:text-olive-300 rounded hover:bg-olive-200 dark:hover:bg-olive-900/50 transition-colors duration-200">
                    {t.timedTest}
                  </button>
                  <button className="w-full px-2 py-1 text-xs bg-olive-600 text-white rounded hover:bg-olive-700 transition-colors duration-200">
                    {t.certificationMock}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Test Interface Modal */}
      <AnimatePresence>
        {showTestInterface && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-4 bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden"
            >
              {!testSubmitted ? (
                <div className="h-full flex">
                  {/* Left Panel - Question Navigation */}
                  <div className="w-64 bg-olive-50 dark:bg-dark-border p-4 border-r border-olive-200 dark:border-dark-border">
                    <div className="mb-6">
                      <h3 className="font-bold text-olive-900 dark:text-olive-100 mb-2">{currentTest?.name}</h3>
                      <div className="flex items-center text-olive-600 dark:text-olive-300">
                        <Timer className="w-4 h-4 mr-2" />
                        <span className="font-mono">{formatTime(timeLeft)}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-olive-700 dark:text-olive-300 mb-2">Questions</h4>
                      <div className="grid grid-cols-5 gap-2">
                        {mockQuestions.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentQuestion(index)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
                              currentQuestion === index
                                ? 'bg-olive-600 text-white'
                                : testAnswers[index] !== undefined
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-white dark:bg-dark-card text-olive-600 dark:text-olive-300 border border-olive-300 dark:border-dark-border'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSubmitTest}
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                    >
                      {t.submitTest}
                    </button>
                  </div>

                  {/* Center - Question */}
                  <div className="flex-1 p-8">
                    <div className="max-w-3xl mx-auto">
                      <div className="mb-6">
                        <span className="text-sm text-olive-500 dark:text-olive-400">
                          {t.question} {currentQuestion + 1} of {mockQuestions.length}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-olive-900 dark:text-olive-100 mb-8">
                        {selectedLanguage === 'Hindi' 
                          ? mockQuestions[currentQuestion].question_hi 
                          : mockQuestions[currentQuestion].question_en
                        }
                      </h2>

                      <div className="space-y-3 mb-8">
                        {(selectedLanguage === 'Hindi' 
                          ? mockQuestions[currentQuestion].options_hi 
                          : mockQuestions[currentQuestion].options_en
                        ).map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(currentQuestion, index)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                              testAnswers[currentQuestion] === index
                                ? 'border-olive-600 bg-olive-50 dark:bg-olive-900/20'
                                : 'border-olive-200 dark:border-dark-border hover:border-olive-400 dark:hover:border-olive-300'
                            }`}
                          >
                            <span className="font-medium text-olive-900 dark:text-olive-100">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            <span className="ml-2 text-olive-800 dark:text-olive-200">{option}</span>
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <button className="px-6 py-2 border border-olive-600 dark:border-olive-400 text-olive-600 dark:text-olive-400 rounded-lg hover:bg-olive-50 dark:hover:bg-dark-border transition-colors duration-200">
                          {t.markForReview}
                        </button>
                        <button
                          onClick={() => {
                            if (currentQuestion < mockQuestions.length - 1) {
                              setCurrentQuestion(currentQuestion + 1)
                            }
                          }}
                          className="px-6 py-2 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-colors duration-200 flex items-center"
                        >
                          {t.saveAndNext}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Progress */}
                  <div className="w-64 bg-olive-50 dark:bg-dark-border p-4 border-l border-olive-200 dark:border-dark-border">
                    <h4 className="font-semibold text-olive-900 dark:text-olive-100 mb-4">Progress</h4>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-olive-600 dark:text-olive-300 mb-2">
                        <span>Completed</span>
                        <span>{Object.keys(testAnswers).length}/{mockQuestions.length}</span>
                      </div>
                      <div className="w-full bg-olive-200 dark:bg-dark-border rounded-full h-2">
                        <div 
                          className="bg-olive-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(Object.keys(testAnswers).length / mockQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Results Screen */
                <div className="h-full p-8 overflow-y-auto">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-olive-100 dark:bg-olive-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-10 h-10 text-olive-600 dark:text-olive-400" />
                      </div>
                      <h2 className="text-3xl font-bold text-olive-900 dark:text-olive-100 mb-2">Test Completed!</h2>
                      <div className="text-5xl font-bold text-olive-600 dark:text-olive-400 mb-2">
                        {calculateScore().percentage}%
                      </div>
                      <p className="text-olive-600 dark:text-olive-300">
                        {calculateScore().correct} out of {calculateScore().total} questions correct
                      </p>
                    </div>

                    <div className="bg-olive-50 dark:bg-dark-border rounded-xl p-6 mb-6">
                      <h3 className="font-semibold text-olive-900 dark:text-olive-100 mb-4">Answer Review</h3>
                      <div className="space-y-4">
                        {mockQuestions.map((question, index) => (
                          <div key={index} className="border-b border-olive-200 dark:border-dark-border pb-4 last:border-b-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-olive-900 dark:text-olive-100 mb-2">
                                  {selectedLanguage === 'Hindi' ? question.question_hi : question.question_en}
                                </p>
                                <p className={`text-sm ${
                                  testAnswers[index] === question.correctAnswer
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                                }`}>
                                  Your answer: {testAnswers[index] !== undefined 
                                    ? (selectedLanguage === 'Hindi' ? question.options_hi[testAnswers[index]] : question.options_en[testAnswers[index]])
                                    : 'Not answered'
                                  }
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-400">
                                  Correct answer: {selectedLanguage === 'Hindi' ? question.options_hi[question.correctAnswer] : question.options_en[question.correctAnswer]}
                                </p>
                                <p className="text-sm text-olive-600 dark:text-olive-300 mt-2">
                                  {selectedLanguage === 'Hindi' ? question.explanation_hi : question.explanation_en}
                                </p>
                              </div>
                              <div className="ml-4">
                                {testAnswers[index] === question.correctAnswer ? (
                                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                                ) : (
                                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => {
                          setShowTestInterface(false)
                          setTestSubmitted(false)
                          setTestAnswers({})
                          setCurrentQuestion(0)
                        }}
                        className="px-6 py-3 bg-olive-600 hover:bg-olive-700 text-white rounded-lg transition-colors duration-200"
                      >
                        Close
                      </button>
                      <button className="px-6 py-3 border border-olive-600 dark:border-olive-400 text-olive-600 dark:text-olive-400 rounded-lg hover:bg-olive-50 dark:hover:bg-dark-border transition-colors duration-200">
                        Download Result PDF
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EstateExamHub

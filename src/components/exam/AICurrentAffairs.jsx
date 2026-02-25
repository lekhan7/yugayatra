import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  ExternalLink, 
  Bookmark, 
  Share2,
  Filter,
  Search,
  Eye,
  ThumbsUp,
  MessageCircle,
  Globe,
  Flag,
  Briefcase,
  Beaker,
  Award,
  RefreshCw,
  Loader2
} from 'lucide-react'
import { EXAM_COLORS, GLASSMORPHISM } from '../../constants/examColors'
import { openRouterAPI } from '../../services/openRouterAPI'

const AICurrentAffairs = ({ examConfig }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [savedArticles, setSavedArticles] = useState(new Set())
  const [currentAffairs, setCurrentAffairs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const categories = [
    { id: 'All', name: 'All News', icon: Globe },
    { id: 'National', name: 'National', icon: Flag },
    { id: 'International', name: 'International', icon: Globe },
    { id: 'Economy', name: 'Economy', icon: TrendingUp },
    { id: 'Science', name: 'Science & Tech', icon: Beaker },
    { id: 'Sports', name: 'Sports', icon: Award },
    { id: 'Business', name: 'Business', icon: Briefcase }
  ]

  useEffect(() => {
    generateCurrentAffairs()
  }, [examConfig])

  const generateCurrentAffairs = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const affairsData = await openRouterAPI.generateCurrentAffairs(examConfig.name)
      setCurrentAffairs(affairsData)
    } catch (err) {
      setError('Failed to generate current affairs. Please try again.')
      console.error('Current affairs generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleSaveArticle = (articleId) => {
    const newSaved = new Set(savedArticles)
    if (newSaved.has(articleId)) {
      newSaved.delete(articleId)
    } else {
      newSaved.add(articleId)
    }
    setSavedArticles(newSaved)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const filteredAffairs = currentAffairs.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
        <p className="ml-4 text-white text-lg">Generating AI Current Affairs...</p>
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
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">AI Current Affairs Engine</h2>
        <p className="text-xl text-gray-400">AI-generated news relevant for {examConfig.name}</p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={GLASSMORPHISM.card + " p-6"}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search current affairs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={GLASSMORPHISM.input + " pl-10"}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-white/20 border-white/30 text-white'
                      : `${GLASSMORPHISM.base} ${GLASSMORPHISM.hover}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-white font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={generateCurrentAffairs}
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

      {/* Articles Grid */}
      <div className="grid gap-6">
        <AnimatePresence>
          {filteredAffairs.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`${GLASSMORPHISM.card} overflow-hidden hover:border-white/20 transition-all`}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Article Image */}
                <div className="lg:w-48 h-32 lg:h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={`https://images.unsplash.com/photo-1586953806812-${article.id}?w=400&h=200&fit=crop`}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-lg text-xs border ${getPriorityColor(article.priority)}`}>
                          {article.priority}
                        </span>
                        <span className="text-gray-400 text-sm">{article.category}</span>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-400 text-sm">{article.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 hover:text-indigo-400 transition-colors cursor-pointer">
                        {article.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSaveArticle(article.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          savedArticles.has(article.id)
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${savedArticles.has(article.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-3">{article.summary}</p>

                  {/* MCQ Section */}
                  {article.mcq && (
                    <div className={`p-4 ${GLASSMORPHISM.base} rounded-lg`}>
                      <h4 className="text-lg font-semibold text-indigo-400 mb-3">Practice Question</h4>
                      <p className="text-white mb-3">{article.mcq.question}</p>
                      <div className="space-y-2">
                        {article.mcq.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg">
                            <span className="text-white font-medium w-6">{String.fromCharCode(65 + optionIndex)}.</span>
                            <span className="text-gray-300">{option}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-gray-400">
                        Correct Answer: {String.fromCharCode(65 + article.mcq.correctAnswer)}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {article.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-xs text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Engagement Metrics */}
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views?.toLocaleString() || '0'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{article.likes || '0'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{article.comments || '0'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-cyan-700 transition-all">
          Load More Articles
        </button>
      </motion.div>
    </div>
  )
}

export default AICurrentAffairs

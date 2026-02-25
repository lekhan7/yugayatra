import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Clock, 
  Eye, 
  ThumbsUp, 
  ExternalLink, 
  Bookmark,
  Filter,
  Search,
  Star,
  TrendingUp,
  Calendar,
  User,
  RefreshCw,
  Loader2
} from 'lucide-react'
import { EXAM_COLORS, GLASSMORPHISM } from '../../constants/examColors'
import { openRouterAPI } from '../../services/openRouterAPI'

const AIYouTubeSuggestions = ({ examConfig }) => {
  const [selectedSubject, setSelectedSubject] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [savedVideos, setSavedVideos] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const subjects = {
    'UPSC': ['All', 'History', 'Polity', 'Geography', 'Economy', 'Current Affairs', 'Science & Tech'],
    'JEE': ['All', 'Physics', 'Chemistry', 'Mathematics'],
    'NEET': ['All', 'Physics', 'Chemistry', 'Biology'],
    'CUET': ['All', 'General Aptitude', 'English', 'Domain Subjects'],
    'KPSC': ['All', 'General Knowledge', 'Regional Studies', 'Kerala History']
  }

  useEffect(() => {
    generateSuggestions()
  }, [examConfig])

  const generateSuggestions = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const suggestionsData = await openRouterAPI.generateYouTubeSuggestions(
        examConfig.name, 
        selectedSubject === 'All' ? null : selectedSubject
      )
      setSuggestions(suggestionsData)
    } catch (err) {
      setError('Failed to generate YouTube suggestions. Please try again.')
      console.error('YouTube suggestions generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleSaveVideo = (videoId) => {
    const newSaved = new Set(savedVideos)
    if (newSaved.has(videoId)) {
      newSaved.delete(videoId)
    } else {
      newSaved.add(videoId)
    }
    setSavedVideos(newSaved)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const filteredSuggestions = suggestions.filter(video => {
    const matchesSubject = selectedSubject === 'All' || video.subject === selectedSubject
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.reasonToWatch.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSubject && matchesSearch
  })

  const openYouTubeSearch = (query) => {
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    window.open(youtubeUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
        <p className="ml-4 text-white text-lg">Generating AI YouTube Suggestions...</p>
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
          <Play className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">AI YouTube Suggestion Engine</h2>
        <p className="text-xl text-gray-400">AI-curated videos for {examConfig.name} preparation</p>
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
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={GLASSMORPHISM.input + " pl-10"}
              />
            </div>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {subjects[examConfig.name]?.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all whitespace-nowrap ${
                  selectedSubject === subject
                    ? 'bg-white/20 border-white/30 text-white'
                    : `${GLASSMORPHISM.base} ${GLASSMORPHISM.hover}`
                }`}
              >
                <span className="text-white font-medium">{subject}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={generateSuggestions}
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

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredSuggestions.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`${GLASSMORPHISM.card} overflow-hidden hover:border-white/20 transition-all group`}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden">
                <img 
                      src={`https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {video.duration || '45:23'}
                </div>

                {/* Watched Indicator */}
                {savedVideos.has(index) && (
                  <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>Watched</span>
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openYouTubeSearch(video.youtubeSearchQuery)}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </button>
                </div>
              </div>

              {/* Video Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{video.channel}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleSaveVideo(index)}
                      className={`p-2 rounded-lg transition-colors ${
                        savedVideos.has(index)
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedVideos.has(index) ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{video.reasonToWatch}</p>

                {/* Tags and Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs border ${getDifficultyColor(video.difficulty)}`}>
                          {video.difficulty}
                        </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white ml-1">{video.rating || '4.8'}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{video.uploadDate || '2024-02-20'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views?.toLocaleString() || '0'}</span>
                    </span>
                  </div>
                </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => openYouTubeSearch(video.youtubeSearchQuery)}
                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Watch Now</span>
                  </button>
                  <button className="p-3 bg-white/10 border border-white/20 text-white/70 rounded-lg hover:bg-white/20 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
            </motion.div>
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
          Load More Videos
        </button>
      </motion.div>
    </div>
  )
}

export default AIYouTubeSuggestions

import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  CheckCircle,
  TrendingUp,
  Calendar,
  User,
  ChevronRight
} from 'lucide-react'
import { GLASSMORPHISM } from '../../constants/examColors'

const YouTubeLearning = ({ examConfig }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [savedVideos, setSavedVideos] = useState(new Set())
  const [watchedVideos, setWatchedVideos] = useState(new Set())

  const categories = [
    { id: 'All', name: 'All Videos' },
    { id: 'Strategy', name: 'Study Strategy' },
    { id: 'Subject', name: 'Subject Wise' },
    { id: 'Mock', name: 'Mock Tests' },
    { id: 'Current', name: 'Current Affairs' },
    { id: 'Motivation', name: 'Motivation' }
  ]

  const videoSuggestions = [
    {
      id: 1,
      title: "Complete UPSC CSE 2024 Strategy - From Beginner to Topper",
      channel: "Study IQ IAS",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "45:23",
      views: "2.3M",
      likes: "124K",
      category: "Strategy",
      uploadDate: "2024-02-20",
      description: "Comprehensive strategy guide for UPSC Civil Services Exam 2024 preparation",
      tags: ["UPSC", "Strategy", "Beginner"],
      rating: 4.8,
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Indian Polity Complete Course - Laxmikanth Summary",
      channel: "Unacademy",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "2:15:30",
      views: "890K",
      likes: "45K",
      category: "Subject",
      uploadDate: "2024-02-18",
      description: "Complete summary of Indian Polity based on M. Laxmikanth book",
      tags: ["Polity", "Laxmikanth", "Complete Course"],
      rating: 4.9,
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "UPSC Mains 2023 Answer Writing Practice - GS Paper 1",
      channel: "Vision IAS",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "1:30:15",
      views: "567K",
      likes: "28K",
      category: "Mock",
      uploadDate: "2024-02-15",
      description: "Practice answer writing for UPSC Mains General Studies Paper 1",
      tags: ["Mains", "Answer Writing", "GS Paper 1"],
      rating: 4.7,
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "Current Affairs February 2024 - Complete Analysis",
      channel: "The Hindu Analysis",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "1:45:00",
      views: "1.2M",
      likes: "67K",
      category: "Current",
      uploadDate: "2024-02-24",
      description: "Complete analysis of important current affairs for February 2024",
      tags: ["Current Affairs", "February 2024", "Analysis"],
      rating: 4.6,
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "Motivational Speech for UPSC Aspirants - Never Give Up",
      channel: "Dr. Vivek Bindra",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "25:30",
      views: "3.4M",
      likes: "234K",
      category: "Motivation",
      uploadDate: "2024-02-10",
      description: "Powerful motivational speech to keep UPSC aspirants motivated",
      tags: ["Motivation", "Inspiration", "Success"],
      rating: 4.8,
      difficulty: "All Levels"
    },
    {
      id: 6,
      title: "Indian Economy Complete Course - Budget 2024 Analysis",
      channel: "Economic Times",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "3:20:45",
      views: "745K",
      likes: "38K",
      category: "Subject",
      uploadDate: "2024-02-22",
      description: "Complete analysis of Indian Economy with special focus on Budget 2024",
      tags: ["Economy", "Budget 2024", "Analysis"],
      rating: 4.7,
      difficulty: "Intermediate"
    }
  ]

  const filteredVideos = videoSuggestions.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleSaveVideo = (videoId) => {
    const newSaved = new Set(savedVideos)
    if (newSaved.has(videoId)) {
      newSaved.delete(videoId)
    } else {
      newSaved.add(videoId)
    }
    setSavedVideos(newSaved)
  }

  const markAsWatched = (videoId) => {
    const newWatched = new Set(watchedVideos)
    newWatched.add(videoId)
    setWatchedVideos(newWatched)
  }

  const formatDuration = (duration) => {
    return duration
  }

  const formatViews = (views) => {
    if (views.includes('M')) return `${views} views`
    if (views.includes('K')) return `${views} views`
    return `${parseInt(views).toLocaleString()} views`
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'All Levels': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
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
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-emerald-600 to-lime-600 mb-4">
          <Play className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Learning Videos</h2>
        <p className="text-xl text-white/70">Curated YouTube content for {examConfig.name} preparation</p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${GLASSMORPHISM.card} p-6`}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/40 focus:outline-none"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl border transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-white/20 border-white/40 text-white'
                    : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`${GLASSMORPHISM.card} overflow-hidden hover:border-white/30 transition-all group`}
            >
              {/* Video Thumbnail */}
              <div className="relative">
                <div className="aspect-video bg-gray-800 overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>

                {/* Watched Indicator */}
                {watchedVideos.has(video.id) && (
                  <div className="absolute top-2 left-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Watched</span>
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => markAsWatched(video.id)}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all transform group-hover:scale-110"
                  >
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </button>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-white/80 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-white/50">
                      <User className="w-3 h-3" />
                      <span>{video.channel}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveVideo(video.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      savedVideos.has(video.id)
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${savedVideos.has(video.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <p className="text-white/70 text-sm line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm text-white/50">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{formatViews(video.views)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{video.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{video.uploadDate}</span>
                    </span>
                  </div>
                </div>

                {/* Tags and Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white/70 text-sm">{video.rating}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs border ${getDifficultyColor(video.difficulty)}`}>
                      {video.difficulty}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-lime-600 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-lime-700 transition-all flex items-center justify-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>Watch</span>
                  </button>
                  <button className="p-2 bg-white/10 text-white/70 border border-white/20 rounded-lg hover:bg-white/20 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
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
        <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-lime-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-lime-700 transition-all">
          Load More Videos
        </button>
      </motion.div>
    </div>
  )
}

export default YouTubeLearning

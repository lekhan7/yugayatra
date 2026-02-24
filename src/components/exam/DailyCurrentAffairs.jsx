import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  Award
} from 'lucide-react'
import { GLASSMORPHISM } from '../../constants/examColors'

const DailyCurrentAffairs = ({ examConfig }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [savedArticles, setSavedArticles] = useState(new Set())

  const categories = [
    { id: 'All', name: 'All News', icon: Globe },
    { id: 'National', name: 'National', icon: Flag },
    { id: 'International', name: 'International', icon: Globe },
    { id: 'Economy', name: 'Economy', icon: TrendingUp },
    { id: 'Science', name: 'Science & Tech', icon: Beaker },
    { id: 'Sports', name: 'Sports', icon: Award },
    { id: 'Business', name: 'Business', icon: Briefcase }
  ]

  const currentAffairs = [
    {
      id: 1,
      title: "Government Announces New Education Policy 2024 Reforms",
      summary: "The Union Cabinet has approved major reforms to the National Education Policy, focusing on digital learning and skill development...",
      category: "National",
      date: "2024-02-24",
      readTime: "5 min",
      source: "The Hindu",
      imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
      tags: ["Education", "Policy", "Reform"],
      views: 15420,
      likes: 892,
      comments: 45,
      importance: "High"
    },
    {
      id: 2,
      title: "India's GDP Growth Surpasses Expectations at 7.2%",
      summary: "Latest economic data shows India's GDP growth rate exceeding projections, driven by strong manufacturing and services sector performance...",
      category: "Economy",
      date: "2024-02-23",
      readTime: "3 min",
      source: "Economic Times",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
      tags: ["GDP", "Economy", "Growth"],
      views: 12350,
      likes: 745,
      comments: 32,
      importance: "High"
    },
    {
      id: 3,
      title: "Breakthrough in Quantum Computing by Indian Scientists",
      summary: "Researchers at IISc Bangalore achieve significant milestone in quantum computing, opening new possibilities for technological advancement...",
      category: "Science",
      date: "2024-02-22",
      readTime: "4 min",
      source: "Science Today",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
      tags: ["Science", "Technology", "Research"],
      views: 9876,
      likes: 623,
      comments: 28,
      importance: "Medium"
    },
    {
      id: 4,
      title: "Climate Summit: India Commits to Net Zero by 2070",
      summary: "At the global climate summit, India reaffirms its commitment to achieve net zero emissions by 2070 with ambitious renewable energy targets...",
      category: "International",
      date: "2024-02-21",
      readTime: "6 min",
      source: "NDTV",
      imageUrl: "https://images.unsplash.com/photo-1569392425088-510eb65834c8?w=400",
      tags: ["Climate", "Environment", "Policy"],
      views: 18765,
      likes: 1204,
      comments: 67,
      importance: "High"
    },
    {
      id: 5,
      title: "RBI Announces New Banking Regulations",
      summary: "The Reserve Bank of India introduces comprehensive reforms in banking sector to strengthen financial stability and digital payments...",
      category: "Economy",
      date: "2024-02-20",
      readTime: "4 min",
      source: "Business Standard",
      imageUrl: "https://images.unsplash.com/photo-1563986768494-815a56adca8d?w=400",
      tags: ["Banking", "RBI", "Finance"],
      views: 11234,
      likes: 567,
      comments: 41,
      importance: "Medium"
    },
    {
      id: 6,
      title: "Indian Space Mission Achieves Historic Milestone",
      summary: "ISRO successfully launches its most ambitious space mission, marking a significant achievement in India's space exploration journey...",
      category: "Science",
      date: "2024-02-19",
      readTime: "5 min",
      source: "The Indian Express",
      imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d579212c5?w=400",
      tags: ["Space", "ISRO", "Technology"],
      views: 25432,
      likes: 1834,
      comments: 89,
      importance: "High"
    }
  ]

  const filteredAffairs = currentAffairs.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleSaveArticle = (articleId) => {
    const newSaved = new Set(savedArticles)
    if (newSaved.has(articleId)) {
      newSaved.delete(articleId)
    } else {
      newSaved.add(articleId)
    }
    setSavedArticles(newSaved)
  }

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30'
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
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Daily Current Affairs</h2>
        <p className="text-xl text-white/70">Stay updated with news that matters for {examConfig.name}</p>
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
                placeholder="Search current affairs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/40 focus:outline-none"
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
                  className={`px-4 py-2 rounded-xl border transition-all whitespace-nowrap flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </motion.div>

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
              className={`${GLASSMORPHISM.card} p-6 hover:border-white/30 transition-all`}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Article Image */}
                <div className="lg:w-48 h-32 lg:h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getImportanceColor(article.importance)}`}>
                          {article.importance} Priority
                        </span>
                        <span className="text-white/50 text-sm">{article.category}</span>
                        <span className="text-white/50 text-sm">•</span>
                        <span className="text-white/50 text-sm">{article.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2 hover:text-white/80 transition-colors cursor-pointer">
                        {article.title}
                      </h3>
                      
                      <p className="text-white/70 mb-3 line-clamp-2">
                        {article.summary}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-white/50">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{article.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{article.comments}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSaveArticle(article.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          savedArticles.has(article.id)
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${savedArticles.has(article.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 rounded-lg bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-xs text-white/70"
                      >
                        #{tag}
                      </span>
                    ))}
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
        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all">
          Load More Articles
        </button>
      </motion.div>
    </div>
  )
}

export default DailyCurrentAffairs

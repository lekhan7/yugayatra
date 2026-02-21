import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Calendar, User, Tag, Clock, ArrowRight, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const blogPosts = [
    {
      id: 1,
      title: 'Future of E-commerce: Trends and Predictions',
      excerpt: 'Explore the latest trends shaping the future of online retail, from AI-powered personalization to sustainable shopping practices.',
      content: 'The e-commerce landscape is rapidly evolving with new technologies and changing consumer behaviors. In this comprehensive guide, we explore the key trends that will define the future of online retail...',
      author: 'YugaYatra Retail (OPC) Pvt Ltd Team',
      date: '2024-01-15',
      category: 'Digital Marketing',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      tags: ['E-commerce', 'Digital Trends', 'Retail', 'Technology']
    },
    {
      id: 2,
      title: 'Digital Marketing Strategies for 2024',
      excerpt: 'Discover the most effective digital marketing strategies that will help your business thrive in the competitive online landscape.',
      content: 'As we navigate through 2024, digital marketing continues to evolve with new platforms, technologies, and consumer expectations. This article covers the essential strategies every business should implement...',
      author: 'Marketing Team',
      date: '2024-01-10',
      category: 'Digital Marketing',
      readTime: '7 min read',
      image: '/api/placeholder/400/250',
      tags: ['Marketing', 'Strategy', 'SEO', 'Social Media']
    },
    {
      id: 3,
      title: 'Building Strong Brand Presence Online',
      excerpt: 'Learn how to establish and maintain a powerful brand presence that resonates with your target audience and drives business growth.',
      content: 'In today\'s digital world, building a strong brand presence is crucial for business success. This comprehensive guide covers everything from brand identity to online reputation management...',
      author: 'Brand Strategy Team',
      date: '2024-01-05',
      category: 'Branding',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      tags: ['Branding', 'Strategy', 'Marketing', 'Identity']
    }
  ]

  const categories = ['All', 'Digital Marketing', 'Branding', 'Technology', 'Business', 'Design']

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-bg-main dark:bg-text-main transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-bg-main via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-text-main dark:text-white mb-6">
              Blog & <span className="text-accent-main">Insights</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-light dark:text-white/70 max-w-3xl mx-auto">
              Latest news, trends, and insights from our team of experts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-bg-main dark:bg-text-main border-b border-border-light dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent bg-card-bg dark:bg-card-bg/10 text-text-main dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-text-light dark:text-white/70" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-accent-main text-white'
                        : 'bg-card-bg text-text-main hover:bg-bg-main border border-border-light'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-bg-main dark:bg-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card-bg dark:bg-card-bg/10 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border-light dark:border-white/10"
              >
                {/* Post Image */}
                <div className="h-48 bg-gradient-to-br from-accent-main to-blue-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-2">📝</div>
                      <p className="text-sm opacity-90">Featured Image</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-main text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-text-light dark:text-white/70 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-text-main dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-text-light dark:text-white/70 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-bg-main text-text-light px-2 py-1 rounded-full text-xs font-medium border border-border-light dark:bg-card-bg/10 dark:text-white/70 dark:border-white/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-text-light dark:text-white/70">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                    </div>

                    <button className="text-accent-main dark:text-blue-300 font-semibold flex items-center hover:text-blue-700 transition-colors duration-200">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-text-light text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-text-main dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-text-light dark:text-white/70">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-bg-main dark:bg-text-main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-text-main dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-text-light dark:text-white/70 mb-8">
              Subscribe to our newsletter for the latest insights and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent bg-card-bg dark:bg-card-bg/10 text-text-main dark:text-white"
              />
              <button className="bg-accent-main text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Blog

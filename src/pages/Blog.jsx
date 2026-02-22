import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Search, Calendar, User, Tag, Clock, ArrowRight, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import { getBlogPosts, getBlogPostsByCategory } from '../services/supabase'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      fetchBlogPosts()
    } else {
      fetchBlogPostsByCategory()
    }
  }, [selectedCategory])

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const data = await getBlogPosts()
      setBlogPosts(data)
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(post => post.category))]
      setCategories(['All', ...uniqueCategories])
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBlogPostsByCategory = async () => {
    try {
      setLoading(true)
      const data = await getBlogPostsByCategory(selectedCategory)
      setBlogPosts(data)
    } catch (error) {
      console.error('Error fetching blog posts by category:', error)
    } finally {
      setLoading(false)
    }
  }

  const shareOnLinkedIn = () => {
  window.open('https://www.linkedin.com/company/yuga-yatra-retail-opc-pvt-ltd/posts/', '_blank')
}

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-bg-main dark:bg-text-main transition-colors duration-300">
      <Navbar />
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-[#BEF0DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold" style={{color: '#0D3D2B'}}>
              Blog & <span className="text-accent-main">Insights</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-main max-w-3xl mx-auto">
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-main w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent bg-card-bg dark:bg-card-bg/10 text-text-main"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-text-main" />
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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
            </div>
          ) : (
            <>
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
                    <div className="h-48 bg-gradient-to-br from-accent-main to-mint-200 relative">
                      {post.featured_image ? (
                        <img 
                          src={post.featured_image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-6xl mb-2">📝</div>
                            <p className="text-sm opacity-90">Featured Image</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent-main text-white px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-text-main mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.read_time || 5} min read</span>
                      </div>

                      <h3 className="text-xl font-bold text-text-main mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-text-main mb-4 line-clamp-3">
                        {post.excerpt || 'Read more about this topic...'}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags && post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-bg-main text-text-main px-2 py-1 rounded-full text-xs font-medium border border-border-light dark:bg-card-bg/10 text-text-main dark:border-white/10"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-text-main">
                          <User className="w-4 h-4 mr-1" />
                          <span>{post.author}</span>
                        </div>

                        <button 
                          onClick={() => shareOnLinkedIn()}
                          className="text-accent-main dark:text-mint-300 font-semibold flex items-center hover:text-mint-700 transition-colors duration-200"
                        >
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
                  <div className="text-text-main text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-text-main mb-2">
                    No articles found
                  </h3>
                  <p className="text-text-main">
                    Try adjusting your search or filter criteria
                  </p>
                </motion.div>
              )}
            </>
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
            <h2 className="text-3xl font-bold text-text-main mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-text-main mb-8">
              Subscribe to our newsletter for the latest insights and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent bg-card-bg dark:bg-card-bg/10 text-text-main"
              />
              <button className="bg-accent-main text-text-main px-6 py-3 rounded-lg font-semibold hover:bg-mint-300 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default Blog

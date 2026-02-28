import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getBlogPosts, getBlogPostsByCategory } from '../../services/supabase'

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
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

  const shareOnLinkedIn = () => {
  window.open('https://www.linkedin.com/in/yuga-yatra-retail-opc-pvt-ltd/recent-activity/all/', '_blank')
}

  const fetchBlogPosts = async () => {
    try {
      setLoading(true)
      const data = await getBlogPosts()
      setBlogPosts(data.slice(0, 6)) // Show only 6 posts in section
      
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
      setBlogPosts(data.slice(0, 6))
    } catch (error) {
      console.error('Error fetching blog posts by category:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="blog" className="py-20 bg-card-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-google-white mb-6">Blog & Insights</h2>
          <p className="text-xl md:text-2xl text-google-white/80 max-w-3xl mx-auto">
            Latest news, trends, and insights from our team
          </p>
        </motion.div>
      </div>

      {/* Blog Posts */}
      <div className="py-20 bg-bg-main dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border-2 font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-dark-blue-accent text-white border-dark-blue-accent'
                    : 'border-dark-blue-accent text-dark-blue-accent hover:bg-dark-blue-accent hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue-accent"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-card-bg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light">
                      {/* Blog Image */}
                      <div className="relative h-48 bg-gradient-to-br from-accent-main to-accent-main flex items-center justify-center">
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
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-accent-main/20 text-accent-main text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        {/* Date and Read Time */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-sm text-text-light">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.published_at || post.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-text-light">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.read_time || 5} min read
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-accent-main transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-text-light text-sm mb-4 line-clamp-3">
                          {post.excerpt || 'Read more about this topic...'}
                        </p>

                        {/* Author */}
                        <div className="flex items-center justify-between text-sm text-text-light mb-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Read More */}
                        <button 
                          onClick={() => shareOnLinkedIn()}
                          className="text-accent-main font-semibold flex items-center group-hover:text-accent-dark transition-colors duration-200"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {blogPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-text-light text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-text-main mb-2">
                    No articles found
                  </h3>
                  <p className="text-text-light">
                    Check back later for new blog posts and insights
                  </p>
                </div>
              )}
            </>
          )}

          {/* Load More / View All */}
          <div className="text-center mt-12">
            <Link 
              to="/blog"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center"
            >
              View All Posts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}

export default BlogSection

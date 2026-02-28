import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowLeft, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { getBlogPostBySlug, getBlogPosts } from '../services/supabase'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlogPost()
  }, [slug])

  const fetchBlogPost = async () => {
    try {
      setLoading(true)
      const postData = await getBlogPostBySlug(slug)
      setPost(postData)
      
      // Fetch related posts (same category, excluding current post)
      const allPosts = await getBlogPosts()
      const related = allPosts
        .filter(p => p.category === postData.category && p.id !== postData.id)
        .slice(0, 3)
      setRelatedPosts(related)
      
      setError(null)
    } catch (error) {
      console.error('Error fetching blog post:', error)
      setError('Blog post not found')
    } finally {
      setLoading(false)
    }
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')
  }

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${post?.title}&url=${window.location.href}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')
  }

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${post?.title}&body=Check out this article: ${window.location.href}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <ScrollToTop />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-main"></div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <ScrollToTop />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-accent-main text-white rounded-lg hover:bg-accent-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <ScrollToTop />
      
      {/* Hero Section with Featured Image */}
      <section className="relative">
        {post.featured_image ? (
          <div className="h-96 relative">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
        ) : (
          <div className="h-96 bg-gradient-to-br from-accent-main to-accent-main flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-8xl mb-4">📝</div>
              <p className="text-xl opacity-90">Featured Image</p>
            </div>
          </div>
        )}
        
        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-accent-main text-white px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                {post.is_featured && (
                  <span className="bg-accent-gold text-white px-4 py-2 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{post.read_time || 5} min read</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
              >
                {/* Excerpt */}
                {post.excerpt && (
                  <div className="mb-8">
                    <p className="text-xl text-text-light dark:text-white/80 italic leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                )}

                {/* Blog Content */}
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {post.content ? (
                    <div 
                      className="text-text-main dark:text-white leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
                    />
                  ) : (
                    <p className="text-text-light dark:text-white/70">
                      Content coming soon...
                    </p>
                  )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-text-main dark:text-white mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-text-main dark:text-white mb-4">Share this article</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={shareOnFacebook}
                      className="flex items-center px-4 py-2 bg-accent-main text-white rounded-lg hover:bg-accent-dark transition-colors"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </button>
                    <button
                      onClick={shareOnTwitter}
                      className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </button>
                    <button
                      onClick={shareOnLinkedIn}
                      className="flex items-center px-4 py-2 bg-accent-dark text-white rounded-lg hover:bg-accent-dark/80 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </button>
                    <button
                      onClick={shareViaEmail}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </button>
                  </div>
                </div>
              </motion.article>

              {/* Navigation */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <Link
                  to="/blog"
                  className="flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
                >
                  View All Posts
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Author Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-text-main dark:text-white mb-4">About Author</h3>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent-main rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-text-main dark:text-white">{post.author}</p>
                      <p className="text-sm text-text-light dark:text-white/70">Content Writer</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-light dark:text-white/70">
                    Passionate about sharing insights and knowledge on {post.category.toLowerCase()} topics.
                  </p>
                </motion.div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-text-main dark:text-white mb-4">Related Posts</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <h4 className="font-medium text-text-main dark:text-white group-hover:text-accent-main transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-text-light dark:text-white/70 mt-1">
                            {new Date(relatedPost.published_at || relatedPost.created_at).toLocaleDateString()}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPost

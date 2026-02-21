import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'

const BlogSection = () => {
  const blogPosts = [
    {
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies that will shape the future of web development...',
      author: 'John Doe',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Technology',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'UI/UX Best Practices for 2024',
      excerpt: 'Essential design principles and practices every designer should know this year...',
      author: 'Jane Smith',
      date: '2024-01-10',
      readTime: '8 min read',
      category: 'Design',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Digital Marketing Strategies That Work',
      excerpt: 'Proven strategies to boost your online presence and drive business growth...',
      author: 'Mike Johnson',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Marketing',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Building Scalable Applications',
      excerpt: 'Key considerations and best practices for building applications that can grow...',
      author: 'Sarah Williams',
      date: '2023-12-28',
      readTime: '10 min read',
      category: 'Development',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'The Power of Cloud Computing',
      excerpt: 'How cloud technologies are transforming businesses and enabling innovation...',
      author: 'John Doe',
      date: '2023-12-20',
      readTime: '7 min read',
      category: 'Cloud',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Mobile-First Design Approach',
      excerpt: 'Why designing for mobile first is crucial in today\'s digital landscape...',
      author: 'Jane Smith',
      date: '2023-12-15',
      readTime: '5 min read',
      category: 'Design',
      image: '/api/placeholder/400/250'
    }
  ]

  const categories = ['All', 'Technology', 'Design', 'Marketing', 'Development', 'Cloud']

  return (
    <section id="blog" className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
            Blog & <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto">
            Latest news, trends, and insights from our team
          </p>
        </motion.div>
      </div>

      {/* Blog Posts */}
      <div className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-accent-main text-accent-main font-medium hover:bg-blue-700 hover:text-white transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-card-bg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border-light">
                  {/* Blog Image */}
                  <div className="relative h-48 bg-gradient-to-br from-accent-main to-blue-600 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-accent-main/20 text-accent-main text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-sm text-text-light">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-accent-main transition-colors duration-200">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-text-light text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-text-light">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Read More */}
                    <button className="mt-4 text-primary font-semibold flex items-center group-hover:text-secondary transition-colors duration-200">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center">
              Load More Posts
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-bg-main dark:bg-text-main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold text-text-main dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-lg text-text-light dark:text-white/70 mb-8">
              Subscribe to our newsletter for the latest insights and updates
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border-light dark:border-white/10 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent bg-card-bg dark:bg-card-bg/10 text-text-main dark:text-white"
              />
              <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection

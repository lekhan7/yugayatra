import { motion } from 'framer-motion'

const Portfolio = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-20"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our recent projects and success stories
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Portfolio

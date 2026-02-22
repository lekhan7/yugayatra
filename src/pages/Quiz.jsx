import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const Quiz = () => {
  return (
    <div className="min-h-screen bg-bg-main dark:bg-text-main">
      <Navbar />
      <ScrollToTop />
      
      <main className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-main dark:text-white mb-6">
            Quiz <span className="text-accent-main">Challenge</span>
          </h1>
          <p className="text-lg text-text-light dark:text-white/80 mb-8 max-w-3xl mx-auto">
            Test your knowledge and compete with others in our exciting quiz challenges.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card-bg dark:bg-card-bg/10 rounded-xl shadow-lg p-6 border border-border-light dark:border-white/10"
            >
              <div className="text-accent-main text-2xl font-bold mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-text-main dark:text-white mb-2">Technical Quiz</h3>
              <p className="text-text-light dark:text-white/70 mb-4">
                Challenge yourself with our technical questions covering various domains.
              </p>
              <button className="w-full bg-accent-main text-white py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors duration-300">
                Start Technical Quiz
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card-bg dark:bg-card-bg/10 rounded-xl shadow-lg p-6 border border-border-light dark:border-white/10"
            >
              <div className="text-accent-gold text-2xl font-bold mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-text-main dark:text-white mb-2">Aptitude Test</h3>
              <p className="text-text-light dark:text-white/70 mb-4">
                Discover your strengths and aptitude through our comprehensive assessment.
              </p>
              <button className="w-full bg-accent-gold text-white py-3 rounded-lg font-semibold hover:bg-accent-main transition-colors duration-300">
                Take Aptitude Test
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card-bg dark:bg-card-bg/10 rounded-xl shadow-lg p-6 border border-border-light dark:border-white/10"
            >
              <div className="text-accent-dark text-2xl font-bold mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-text-main dark:text-white mb-2">Brain Teasers</h3>
              <p className="text-text-light dark:text-white/70 mb-4">
                Quick puzzles and brain teasers to sharpen your problem-solving skills.
              </p>
              <button className="w-full bg-accent-dark text-white py-3 rounded-lg font-semibold hover:bg-accent-main transition-colors duration-300">
                Try Brain Teasers
              </button>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Quiz

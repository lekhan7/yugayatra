import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgressBar from './components/ScrollProgressBar'
import ChatBot from './components/ChatBot'
import { Route, Routes, useLocation } from 'react-router-dom'
import NotificationProvider from './context/NotificationContext'

// Import pages
import Home from './pages/Home'
import InternshipApply from './pages/InternshipApply'
import Admin from './pages/Admin'
import Legal from './pages/Legal'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Alumni from './pages/Alumni'
import Quiz from './pages/Quiz'
import Contact from './pages/Contact'
import About from './pages/About'
import Achievements from './pages/Achievements'

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'

  return (
    <div className="min-h-screen bg-bg-main dark:bg-dark-bg transition-colors duration-300">
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <ScrollProgressBar />}
      <Routes>
        <Route path="/admin" element={
          <NotificationProvider>
            <Admin />
          </NotificationProvider>
        } />
        <Route path="/" element={
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Home />
            </motion.div>
            <Footer />
            <ScrollToTop />
          </>
        } />
        <Route path="/apply" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <InternshipApply />
          </motion.div>
        } />
        <Route path="/internship/apply/:role" element={
          <motion.div
            initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <InternshipApply />
            </motion.div>
        } />
        <Route path="/legal" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Legal />
          </motion.div>
        } />
        <Route path="/services" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Services />
            <Footer />
            <ScrollToTop />
          </motion.div>
        } />
        <Route path="/projects" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Projects />
            <Footer />
            <ScrollToTop />
          </motion.div>
        } />
        <Route path="/alumni" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Alumni />
            <Footer />
            <ScrollToTop />
          </motion.div>
        } />
        <Route path="/quiz" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Quiz />
            <Footer />
            <ScrollToTop />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Contact />
            <Footer />
            <ScrollToTop />
          </motion.div>
        } />
        
        <Route path="/about" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <About />
            <Footer />
            <ScrollToTop />
          </motion.div>
        } />
        <Route path="/achievements" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Achievements />
            <Footer />
            <ScrollToTop />
          </motion.div>
        } />
        <Route path="/blog" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Blog />
            <Footer />
            <ScrollToTop />
          </motion.div>
        } />
        <Route path="/blog/:slug" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BlogPost />
            <Footer />
            <ScrollToTop />
          </motion.div>
        } />
      </Routes>
      {!isAdminPage && <ChatBot />}
    </div>
  )
}

export default App

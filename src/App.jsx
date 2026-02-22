import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgressBar from './components/ScrollProgressBar'
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
import About from './pages/About'
import Achievements from './pages/Achievements'
import Alumni from './pages/Alumni'
import Contact from './pages/Contact'

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Home />
          </motion.div>
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
        <Route path="/blog" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Blog />
          </motion.div>
        } />
        <Route path="/blog/:slug" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BlogPost />
          </motion.div>
        } />
        <Route path="/services" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Services />
          </motion.div>
        } />
        <Route path="/projects" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Projects />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <About />
          </motion.div>
        } />
        <Route path="/achievements" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Achievements />
          </motion.div>
        } />
        <Route path="/alumni" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Alumni />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Contact />
          </motion.div>
        } />
      </Routes>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <ScrollToTop />}
    </div>
  )
}

export default App

import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgressBar from './components/ScrollProgressBar'
import { Route, Routes, useLocation } from 'react-router-dom'

// Import pages
import Home from './pages/Home'
import InternshipApply from './pages/InternshipApply'
import Admin from './pages/Admin'

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'

  return (
    <div className="min-h-screen bg-bg-main dark:bg-text-main transition-colors duration-300">
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <ScrollProgressBar />}
      <Routes>
        <Route path="/admin" element={<Admin />} />
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
      </Routes>
    </div>
  )
}

export default App

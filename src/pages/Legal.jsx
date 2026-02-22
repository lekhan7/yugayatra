import React from 'react'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import ScrollProgressBar from '../components/ScrollProgressBar'
import LegalSection from '../components/sections/LegalSection'

const Legal = () => {
  return (
    <div className="min-h-screen bg-bg-main transition-colors duration-300">
      <ScrollProgressBar />
      <ScrollToTop />
      
      {/* Legal Information Section */}
      <LegalSection />

      <Footer />
    </div>
  )
}

export default Legal

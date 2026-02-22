import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import ScrollProgressBar from '../components/ScrollProgressBar'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import JourneyTimeline from '../components/sections/JourneyTimeline'
import ServicesSection from '../components/sections/ServicesSection'
import AchievementSection from '../components/sections/AchievementSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import AlumniSection from '../components/sections/AlumniSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import BlogSection from '../components/sections/BlogSection'
import CareersSection from '../components/sections/CareersSection'
import ProfileSection from '../components/sections/ProfileSection'
import ContactSection from '../components/sections/ContactSection'
import QuizSection from '../components/sections/QuizSection'
import FAQSection from '../components/sections/FAQSection'

const Home = () => {
  return (
    <div className="min-h-screen bg-bg-main transition-colors duration-300">
      <ScrollProgressBar />
      <ScrollToTop />
    
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Journey Timeline Section */}
      <JourneyTimeline />

      {/* Services Section */}
      <ServicesSection />

      {/* Achievement Section */}
      <AchievementSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Alumni Section */}
      <AlumniSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Careers Section */}
      <CareersSection />

      {/* Profile Section */}
      <ProfileSection />

      {/* Quiz Section */}
      <QuizSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </div>
  )
}

export default Home

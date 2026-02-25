import { Link } from 'react-router-dom'
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
import TeamSection from '../components/sections/TeamSection'
import ContactSection from '../components/sections/ContactSection'
import QuizSection from '../components/sections/QuizSection'
import FAQSection from '../components/sections/FAQSection'

const Home = () => {
  return (
    <div className="min-h-screen bg-bg-main dark:bg-dark-bg transition-colors duration-300">
      <ScrollProgressBar />
      <ScrollToTop />
    
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="bg-surface-variant dark:bg-dark-surface transition-colors duration-300">
        <AboutSection />
      </section>

      {/* Journey Timeline Section */}
      <JourneyTimeline />

      {/* Services Section */}
      <section className="bg-surface-variant dark:bg-dark-surface transition-colors duration-300">
        <ServicesSection />
      </section>

      {/* Achievement Section */}
      <AchievementSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Alumni Section */}
      <section className="bg-surface-variant dark:bg-dark-surface transition-colors duration-300">
        <AlumniSection />
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Blog Section */}
      <section className="bg-surface-variant dark:bg-dark-surface transition-colors duration-300">
        <BlogSection />
      </section>

      {/* Quiz Section */}
      <QuizSection />

      {/* FAQ Section */}
      <section className="bg-surface-variant dark:bg-dark-surface transition-colors duration-300">
        <FAQSection />
      </section>

      {/* Contact Section */}
      <ContactSection />

    </div>
  )
}

export default Home

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
    <div className="min-h-screen bg-google-white transition-colors duration-300">
      <ScrollProgressBar />
      <ScrollToTop />
    
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="bg-google-green transition-colors duration-300">
        <AboutSection />
      </section>

      {/* Journey Timeline Section */}
      <JourneyTimeline />

      {/* Services Section */}
      <section className="bg-google-white transition-colors duration-300">
        <ServicesSection />
      </section>

      {/* Achievement Section */}
      <AchievementSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Alumni Section */}
      <section className="bg-google-yellow transition-colors duration-300">
        <AlumniSection />
      </section>

      {/* Team Section */}
      <section className="bg-google-yellow transition-colors duration-300">
        <TeamSection />
      </section>

      {/* Testimonials Section */}
      <section className="bg-google-white transition-colors duration-300">
        <TestimonialsSection />
      </section>

      {/* Blog Section */}
      <section className="bg-google-green transition-colors duration-300">
        <BlogSection />
      </section>

      {/* Quiz Section */}
      <section className="bg-google-red transition-colors duration-300">
        <QuizSection />
      </section>

      {/* FAQ Section */}
      <section className="bg-google-yellow transition-colors duration-300">
        <FAQSection />
      </section>

      {/* Contact Section */}
      <section className="bg-google-blue transition-colors duration-300">
        <ContactSection />
      </section>

    </div>
  )
}

export default Home

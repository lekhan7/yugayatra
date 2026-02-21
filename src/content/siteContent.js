// Central Content Management System
// This file contains all website content that can be edited from the admin panel

const defaultSiteContent = {
  // Home Page Content
  home: {
    hero: {
      title: "Welcome to YugaYatra",
      subtitle: "Your Journey to Excellence Starts Here",
      description: "We provide amazing opportunities for growth and learning through innovative internship programs and skill development initiatives.",
      primaryButtonText: "Explore Opportunities",
      secondaryButtonText: "Learn More",
      primaryButtonLink: "#internships",
      secondaryButtonLink: "#about"
    },
    
    about: {
      title: "About YugaYatra Retail (OPC) Pvt Ltd",
      subtitle: "Leading Educational Technology Company",
      description: "We are a leading educational technology company dedicated to shaping tomorrow's workforce through innovative internship programs and skill development initiatives.",
      
      mission: {
        title: "Mission",
        description: "To empower students with cutting-edge technology skills and practical experience through innovative internship programs."
      },
      
      vision: {
        title: "Vision", 
        description: "To become the leading platform for career development and skill enhancement in the technology sector."
      },
      
      values: {
        title: "Values",
        description: "Innovation, Excellence, Integrity, and Student Success are at the core of everything we do."
      },
      
      legalInfo: {
        pan: "AAAPJ1234F",
        udyam: "UDYAM-KR-01-1234567", 
        cin: "U72200KA2023PTC123456",
        fssai: "12345678901234",
        tm: "4567890"
      }
    },
    
    services: {
      title: "Our Services",
      subtitle: "Comprehensive Solutions for Your Career Growth",
      description: "We offer a wide range of services designed to help you achieve your career goals.",
      
      items: [
        {
          id: 1,
          title: "Internship Programs",
          description: "Hands-on experience in real-world projects with industry mentors.",
          icon: "briefcase"
        },
        {
          id: 2,
          title: "Skill Development",
          description: "Comprehensive training programs to enhance your technical skills.",
          icon: "code"
        },
        {
          id: 3,
          title: "Career Guidance",
          description: "Personalized career counseling and job placement assistance.",
          icon: "compass"
        },
        {
          id: 4,
          title: "Industry Connections",
          description: "Networking opportunities with leading companies and professionals.",
          icon: "network"
        }
      ]
    },
    
    internships: {
      title: "Internship Opportunities",
      subtitle: "Kickstart Your Career with Real-World Experience",
      description: "Join our internship programs and gain valuable industry experience while working on exciting projects.",
      
      roles: [
        {
          title: "Web Development Intern",
          description: "Build modern web applications using cutting-edge technologies.",
          skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"]
        },
        {
          title: "Mobile App Development Intern", 
          description: "Create innovative mobile applications for iOS and Android.",
          skills: ["React Native", "Flutter", "Firebase", "API Integration"]
        },
        {
          title: "UI/UX Design Intern",
          description: "Design beautiful and intuitive user interfaces for web and mobile.",
          skills: ["Figma", "Adobe XD", "Prototyping", "User Research"]
        },
        {
          title: "Digital Marketing Intern",
          description: "Learn and implement digital marketing strategies and campaigns.",
          skills: ["SEO", "Social Media", "Content Marketing", "Analytics"]
        }
      ]
    },
    
    contact: {
      title: "Get in Touch",
      subtitle: "We'd Love to Hear From You",
      description: "Reach out to us for any inquiries, collaborations, or to learn more about our programs.",
      
      email: "info@yugyatra.com",
      phone: "+91 1234567890",
      address: "123 Main Street, Bangalore, Karnataka 560001",
      
      form: {
        name: "Full Name",
        email: "Email Address", 
        subject: "Subject",
        message: "Message",
        submitButton: "Send Message"
      }
    }
  },
  
  // Navigation Content
  navigation: {
    logo: "YugaYatra",
    links: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Internships", href: "#internships" },
      { name: "Contact", href: "#contact" }
    ],
    ctaButton: {
      text: "Apply Now",
      href: "/apply"
    }
  },
  
  // Footer Content
  footer: {
    company: {
      name: "YugaYatra Retail (OPC) Pvt Ltd",
      description: "Leading educational technology company dedicated to shaping tomorrow's workforce."
    },
    
    quickLinks: {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#home" },
        { name: "About Us", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Internships", href: "#internships" },
        { name: "Contact", href: "#contact" }
      ]
    },
    
    services: {
      title: "Services",
      links: [
        { name: "Web Development", href: "#services" },
        { name: "Mobile Development", href: "#services" },
        { name: "UI/UX Design", href: "#services" },
        { name: "Digital Marketing", href: "#services" }
      ]
    },
    
    contact: {
      title: "Contact Info",
      email: "info@yugyatra.com",
      phone: "+91 1234567890",
      address: "123 Main Street, Bangalore, Karnataka 560001"
    },
    
    social: {
      title: "Follow Us",
      links: [
        { name: "Facebook", href: "https://facebook.com/yugyatra", icon: "facebook" },
        { name: "Twitter", href: "https://twitter.com/yugyatra", icon: "twitter" },
        { name: "LinkedIn", href: "https://linkedin.com/company/yugyatra", icon: "linkedin" },
        { name: "Instagram", href: "https://instagram.com/yugyatra", icon: "instagram" }
      ]
    },
    
    copyright: "© 2024 YugaYatra Retail (OPC) Pvt Ltd. All rights reserved."
  },
  
  // Apply Page Content
  apply: {
    hero: {
      title: "Apply for Internship",
      subtitle: "Take the First Step Towards Your Career",
      description: "Fill out the application form below to apply for our internship programs."
    },
    
    form: {
      personalInfo: {
        title: "Personal Information",
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        age: "Age",
        gender: "Gender",
        address: "Address"
      },
      
      education: {
        title: "Education Details",
        institution: "Current Institution",
        degree: "Degree Program",
        year: "Year of Study",
        specialization: "Specialization"
      },
      
      internship: {
        title: "Internship Details",
        role: "Desired Role",
        startDate: "Available Start Date",
        duration: "Internship Duration",
        motivation: "Why do you want to join this internship?"
      },
      
      skills: {
        title: "Skills & Experience",
        technical: "Technical Skills",
        experience: "Relevant Experience",
        portfolio: "Portfolio/GitHub Link (Optional)"
      },
      
      submitButton: "Submit Application"
    }
  },
  
  // Admin Panel Content
  admin: {
    navigation: {
      dashboard: "Dashboard",
      applications: "Applications",
      testimonials: "Testimonials", 
      services: "Services",
      content: "Content Manager",
      logout: "Logout"
    },
    
    contentManager: {
      title: "Content Manager",
      subtitle: "Manage website content across all sections",
      pages: [
        { id: 'home', label: 'Home', icon: 'home' },
        { id: 'about', label: 'About', icon: 'info' },
        { id: 'services', label: 'Services', icon: 'briefcase' },
        { id: 'internships', label: 'Internships', icon: 'graduation-cap' },
        { id: 'contact', label: 'Contact', icon: 'mail' },
        { id: 'navigation', label: 'Navigation', icon: 'menu' },
        { id: 'footer', label: 'Footer', icon: 'layout' },
        { id: 'apply', label: 'Apply Page', icon: 'file-text' }
      ],
      
      actions: {
        save: "Save",
        cancel: "Cancel", 
        edit: "Edit",
        reset: "Reset to Default",
        preview: "Preview",
        export: "Export",
        import: "Import"
      },
      
      messages: {
        saved: "Content saved successfully!",
        reset: "Content reset to default values!",
        error: "Error saving content. Please try again.",
        noChanges: "No changes to save."
      }
    }
  },
  
  // General UI Content
  ui: {
    loading: "Loading...",
    error: "An error occurred. Please try again.",
    success: "Success!",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    search: "Search...",
    filter: "Filter",
    sort: "Sort",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    reset: "Reset"
  }
}

// Content management utilities
export const contentUtils = {
  // Load content from localStorage or return default
  loadContent: () => {
    try {
      const savedContent = localStorage.getItem('siteContent')
      if (savedContent) {
        return { ...defaultSiteContent, ...JSON.parse(savedContent) }
      }
    } catch (error) {
      console.error('Error loading content from localStorage:', error)
    }
    return defaultSiteContent
  },
  
  // Save content to localStorage
  saveContent: (content) => {
    try {
      localStorage.setItem('siteContent', JSON.stringify(content))
      return true
    } catch (error) {
      console.error('Error saving content to localStorage:', error)
      return false
    }
  },
  
  // Reset content to default values
  resetContent: () => {
    try {
      localStorage.removeItem('siteContent')
      return defaultSiteContent
    } catch (error) {
      console.error('Error resetting content:', error)
      return defaultSiteContent
    }
  },
  
  // Get nested content value by path
  getValue: (content, path) => {
    return path.split('.').reduce((obj, key) => obj && obj[key], content)
  },
  
  // Set nested content value by path
  setValue: (content, path, value) => {
    const keys = path.split('.')
    const lastKey = keys.pop()
    const target = keys.reduce((obj, key) => {
      if (!obj[key]) obj[key] = {}
      return obj[key]
    }, content)
    target[lastKey] = value
    return content
  }
}

export default defaultSiteContent

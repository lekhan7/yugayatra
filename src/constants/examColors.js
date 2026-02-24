// Premium Dark Academic Theme - Exam Intelligence Hub
export const EXAM_COLORS = {
  // Main background - Deep slate
  background: '#0F172A',
  
  // Primary cards - Slate
  primary: '#1E293B',
  
  // Primary accent - Indigo
  accent: '#6366F1',
  
  // Secondary accent - Cyan
  secondary: '#22D3EE',
  
  // Status colors
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  
  // Glass morphism
  glass: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    backdrop: 'backdrop-blur-lg'
  },
  
  // Typography
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',
    muted: '#64748B'
  }
}

// Glass morphism utility classes
export const GLASSMORPHISM = {
  base: 'bg-white/5 backdrop-blur-lg border border-white/10',
  card: 'bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl',
  hover: 'hover:bg-white/10 hover:border-white/20',
  active: 'bg-white/15 border-white/30',
  input: 'bg-white/5 border border-white/10 text-white placeholder-white/50 focus:border-white/20 focus:outline-none'
}

// Exam type configurations
export const EXAM_CONFIG = {
  upsc: {
    id: 'upsc',
    name: 'UPSC',
    fullName: 'Union Public Service Commission',
    description: 'India\'s premier civil services examination',
    sections: ['overview', 'quiz-generator', 'current-affairs', 'youtube-suggestions', 'chatbot', 'analytics']
  },
  jee: {
    id: 'jee',
    name: 'JEE',
    fullName: 'Joint Entrance Examination',
    description: 'Engineering entrance examination',
    sections: ['overview', 'quiz-generator', 'current-affairs', 'youtube-suggestions', 'chatbot', 'analytics']
  },
  neet: {
    id: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    description: 'Medical entrance examination',
    sections: ['overview', 'quiz-generator', 'current-affairs', 'youtube-suggestions', 'chatbot', 'analytics']
  },
  cuet: {
    id: 'cuet',
    name: 'CUET',
    fullName: 'Common University Entrance Test',
    description: 'University entrance examination',
    sections: ['overview', 'quiz-generator', 'current-affairs', 'youtube-suggestions', 'chatbot', 'analytics']
  },
  kpsc: {
    id: 'kpsc',
    name: 'KPSC',
    fullName: 'Kerala Public Service Commission',
    description: 'Kerala state civil services examination',
    sections: ['overview', 'quiz-generator', 'current-affairs', 'youtube-suggestions', 'chatbot', 'analytics']
  }
}

// Animation presets
export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 }
  },
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1 }
  }
}

// Tailwind custom colors for the theme
export const TAILWIND_COLORS = {
  'deep-slate': '#0F172A',
  'slate-card': '#1E293B',
  'indigo-accent': '#6366F1',
  'cyan-accent': '#22D3EE',
  'success-green': '#10B981',
  'danger-red': '#EF4444',
  'warning-yellow': '#F59E0B'
}

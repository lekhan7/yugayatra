// Exam Intelligence Hub API Service
// This file contains all API endpoints for the exam dashboard functionality

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api'

class ExamAPIService {
  // AI Quiz Generator
  async generateQuiz(config) {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examType: config.examType,
          subject: config.subject,
          difficulty: config.difficulty,
          language: config.language,
          questionCount: config.questionCount
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate quiz')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error generating quiz:', error)
      throw error
    }
  }

  // AI Exam Chatbot
  async sendMessage(message, examType) {
    try {
      const response = await fetch(`${API_BASE_URL}/exam-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          examType,
          timestamp: new Date().toISOString()
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  // YouTube Learning Suggestions
  async getYouTubeSuggestions(examType, subject = null) {
    try {
      const params = new URLSearchParams({
        examType,
        ...(subject && { subject })
      })
      
      const response = await fetch(`${API_BASE_URL}/youtube-suggestions?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch YouTube suggestions')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching YouTube suggestions:', error)
      throw error
    }
  }

  // Daily Current Affairs
  async getCurrentAffairs(examType, date = null) {
    try {
      const params = new URLSearchParams({
        examType,
        ...(date && { date })
      })
      
      const response = await fetch(`${API_BASE_URL}/current-affairs?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch current affairs')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching current affairs:', error)
      throw error
    }
  }

  // Performance Analytics
  async getPerformanceData(userId, examType, period = '30d') {
    try {
      const response = await fetch(`${API_BASE_URL}/performance/${userId}?examType=${examType}&period=${period}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch performance data')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching performance data:', error)
      throw error
    }
  }

  // Save Performance Data
  async savePerformanceData(userId, examData) {
    try {
      const response = await fetch(`${API_BASE_URL}/performance/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...examData,
          timestamp: new Date().toISOString()
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to save performance data')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error saving performance data:', error)
      throw error
    }
  }

  // Cohorts/Practice Sets
  async getCohorts(examType) {
    try {
      const response = await fetch(`${API_BASE_URL}/cohorts?examType=${examType}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch cohorts')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching cohorts:', error)
      throw error
    }
  }

  // Enroll in Cohort
  async enrollInCohort(userId, cohortId) {
    try {
      const response = await fetch(`${API_BASE_URL}/cohorts/${cohortId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          enrolledAt: new Date().toISOString()
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to enroll in cohort')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error enrolling in cohort:', error)
      throw error
    }
  }

  // Submit Quiz Results
  async submitQuizResults(userId, quizResults) {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...quizResults,
          submittedAt: new Date().toISOString()
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit quiz results')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error submitting quiz results:', error)
      throw error
    }
  }

  // Get User Progress
  async getUserProgress(userId, examType) {
    try {
      const response = await fetch(`${API_BASE_URL}/progress/${userId}?examType=${examType}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch user progress')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching user progress:', error)
      throw error
    }
  }

  // Bookmark/Save Content
  async saveContent(userId, contentType, contentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/saved-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          contentType,
          contentId,
          savedAt: new Date().toISOString()
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to save content')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error saving content:', error)
      throw error
    }
  }

  // Get Saved Content
  async getSavedContent(userId, contentType = null) {
    try {
      const params = new URLSearchParams({
        userId,
        ...(contentType && { contentType })
      })
      
      const response = await fetch(`${API_BASE_URL}/saved-content?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch saved content')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching saved content:', error)
      throw error
    }
  }
}

// Export singleton instance
export const examAPI = new ExamAPIService()

// Export all methods for easy importing
export const {
  generateQuiz,
  sendMessage,
  getYouTubeSuggestions,
  getCurrentAffairs,
  getPerformanceData,
  savePerformanceData,
  getCohorts,
  enrollInCohort,
  submitQuizResults,
  getUserProgress,
  saveContent,
  getSavedContent
} = examAPI

export default examAPI

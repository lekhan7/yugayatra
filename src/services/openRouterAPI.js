// OpenRouter API Service - DeepSeek Model Integration
// This service handles all AI-powered features using OpenRouter's DeepSeek model

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

class OpenRouterService {
  constructor() {
    this.model = 'deepseek/deepseek-chat'
    this.maxTokens = 4000
    this.temperature = 0.7
  }

  // Generate structured quiz questions
  async generateQuiz(config) {
    const prompt = `Generate ${config.questionCount} multiple choice questions for ${config.examType} exam on the topic "${config.subject}" at ${config.difficulty} difficulty level in ${config.language} language.

Return ONLY a JSON array with this exact structure:
[
  {
    "question": "question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "detailed explanation here",
    "difficulty": "${config.difficulty}"
  }
]

Requirements:
- Questions should be exam-relevant and challenging
- Options should be plausible but clearly differentiated
- Only one correct answer per question
- Explanations should be educational and comprehensive
- Difficulty should match ${config.difficulty} level
- Language should be ${config.language}`

    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Exam Intelligence Hub'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert exam question generator. Always respond with valid JSON only. No explanations or additional text outside the JSON structure.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.maxTokens,
          temperature: this.temperature
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate quiz')
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content || '[]'
      
      // Parse JSON response
      try {
        return JSON.parse(content)
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError)
        // Fallback to empty array
        return []
      }
    } catch (error) {
      console.error('Error generating quiz:', error)
      throw error
    }
  }

  // Generate exam overview
  async generateExamOverview(examType) {
    const prompt = `Generate comprehensive overview for ${examType} exam including:

1. Exam pattern and structure
2. Stages (Prelims/Mains/Interview if applicable)
3. Important subjects and topics
4. Preparation strategy
5. Important dates and timeline
6. Eligibility criteria

Return as structured JSON with these sections. Be specific and practical.`

    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Exam Intelligence Hub'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert education counselor providing comprehensive exam information. Respond with structured, practical guidance.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.maxTokens,
          temperature: this.temperature
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate exam overview')
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || ''
    } catch (error) {
      console.error('Error generating exam overview:', error)
      throw error
    }
  }

  // Generate current affairs
  async generateCurrentAffairs(examType, date = null) {
    const dateFilter = date ? `for ${date}` : 'recent'
    const prompt = `Generate 5 important current affairs headlines ${dateFilter} that are relevant for ${examType} exam preparation.

For each headline, provide:
1. Title
2. Brief summary (2-3 sentences)
3. Why it's important for the exam
4. One possible MCQ question based on the news

Return as JSON array with structure:
[
  {
    "title": "headline here",
    "summary": "brief summary here",
    "importance": "why this matters for exam",
    "mcq": {
      "question": "question here",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0
    },
    "date": "2024-02-24",
    "category": "National/Economy/International/etc"
  }
]`

    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Exam Intelligence Hub'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a current affairs analyst specializing in competitive exam preparation. Provide factual, exam-relevant news analysis.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.maxTokens,
          temperature: this.temperature
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate current affairs')
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content || '[]'
      
      try {
        return JSON.parse(content)
      } catch (parseError) {
        console.error('Failed to parse current affairs response:', parseError)
        return []
      }
    } catch (error) {
      console.error('Error generating current affairs:', error)
      throw error
    }
  }

  // Generate YouTube suggestions
  async generateYouTubeSuggestions(examType, subject = null) {
    const subjectFilter = subject ? `specifically for ${subject}` : ''
    const prompt = `Generate 3 YouTube video suggestions for ${examType} exam preparation ${subjectFilter}.

For each video, provide:
1. Title
2. Channel name
3. Reason to watch (what student will learn)
4. YouTube search query

Return as JSON array:
[
  {
    "title": "video title here",
    "channel": "channel name here",
    "reasonToWatch": "specific learning outcome here",
    "youtubeSearchQuery": "search terms for YouTube"
  }
]`

    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Exam Intelligence Hub'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an educational content curator specializing in exam preparation resources.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.maxTokens,
          temperature: this.temperature
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate YouTube suggestions')
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content || '[]'
      
      try {
        return JSON.parse(content)
      } catch (parseError) {
        console.error('Failed to parse YouTube suggestions:', parseError)
        return []
      }
    } catch (error) {
      console.error('Error generating YouTube suggestions:', error)
      throw error
    }
  }

  // Chat with streaming support
  async *chatStream(message, examType, conversationHistory = []) {
    const prompt = `You are an expert ${examType} exam preparation assistant. Help students with:
- Exam strategy and guidance
- Subject explanations and doubts
- Study planning and time management
- Previous year question trends
- Preparation tips and tricks

Be concise, practical, and encouraging. Current question: "${message}"`

    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Exam Intelligence Hub'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert exam preparation assistant. Provide helpful, accurate, and encouraging guidance.'
            },
            ...conversationHistory.slice(-10), // Keep last 10 messages for context
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.maxTokens,
          temperature: this.temperature,
          stream: true
        })
      })

      if (!response.ok) {
        throw new Error('Failed to start chat stream')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices[0]?.delta?.content || ''
              if (content) yield content
            } catch (e) {
              // Skip invalid JSON
              continue
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in chat stream:', error)
      throw error
    }
  }

  // Generate performance analytics insights
  async generatePerformanceInsights(quizResults, examType) {
    const prompt = `Based on these quiz results for ${examType} exam, generate performance insights:

Quiz Results: ${JSON.stringify(quizResults)}

Provide:
1. Weak areas/topics
2. Strong areas/topics  
3. Suggested study focus
4. Daily study plan (next 7 days)
5. Improvement recommendations

Return as structured JSON with these sections.`

    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Exam Intelligence Hub'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an educational analyst providing data-driven study recommendations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.maxTokens,
          temperature: this.temperature
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate performance insights')
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || ''
    } catch (error) {
      console.error('Error generating performance insights:', error)
      throw error
    }
  }
}

// Export singleton instance
export const openRouterAPI = new OpenRouterService()

// Export individual methods
export const {
  generateQuiz,
  generateExamOverview,
  generateCurrentAffairs,
  generateYouTubeSuggestions,
  chatStream,
  generatePerformanceInsights
} = openRouterAPI

export default openRouterAPI

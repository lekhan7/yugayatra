// OpenRouter API Service - DeepSeek Model Integration
// This service handles all AI-powered features using OpenRouter's DeepSeek model

const OPENROUTER_API_KEY = import.meta.example.env.VITE_OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

// Debug: Check if API key is loaded
console.log('OpenRouter API Key loaded:', OPENROUTER_API_KEY ? 'Yes' : 'No')
console.log('API Key starts with:', OPENROUTER_API_KEY?.substring(0, 10) + '...')

if (!OPENROUTER_API_KEY) {
  console.error('OpenRouter API key is missing. Check your .env file.')
  // For development, you might want to add a fallback or throw an error
  throw new Error('OpenRouter API key is missing. Please add VITE_OPENROUTER_API_KEY to your .env file.')
}

class OpenRouterService {
  constructor() {
    this.model = 'deepseek/deepseek-chat'
    this.maxTokens = 4000
    this.temperature = 0.7
  }

  // Test API key validity
  async testApiKey() {
    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/models`, {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Key Test Failed:', {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText
        })
        return false
      }
      
      console.log('API Key is valid')
      return true
    } catch (error) {
      console.error('API Key Test Error:', error)
      return false
    }
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
        const errorText = await response.text()
        console.error('OpenRouter API Error:', {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText,
          apiKey: OPENROUTER_API_KEY ? 'Present' : 'Missing'
        })
        throw new Error(`OpenRouter API Error: ${response.status} - ${response.statusText}`)
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

1. ExamOverview with Name, Purpose, ConductingBody
2. ExamPatternAndStructure with Mode, Duration, TypeOfQuestions, TotalQuestions, Sections array, MarkingScheme object, TotalMarks
3. Stages information
4. ImportantSubjectsAndTopics with Physics, Chemistry, Biology arrays
5. PreparationStrategy with key strategies
6. ImportantDatesAndTimeline with key dates
7. EligibilityCriteria with Nationality, AgeLimit, EducationalQualification, Attempts

Return ONLY valid JSON with this exact structure:
{
  "ExamOverview": {
    "Name": "exam name",
    "Purpose": "purpose description",
    "ConductingBody": "conducting authority"
  },
  "ExamPatternAndStructure": {
    "Mode": "exam mode",
    "Duration": "duration",
    "TypeOfQuestions": "question type",
    "TotalQuestions": "number",
    "Sections": [
      {
        "Subject": "subject name",
        "Questions": "number",
        "Marks": "number"
      }
    ],
    "MarkingScheme": {
      "CorrectAnswer": "+4",
      "IncorrectAnswer": "-1",
      "Unanswered": "0"
    },
    "TotalMarks": "total marks"
  },
  "Stages": {
    "SingleStage": "description"
  },
  "ImportantSubjectsAndTopics": {
    "Physics": ["topic1", "topic2"],
    "Chemistry": ["topic1", "topic2"],
    "Biology": ["topic1", "topic2"]
  },
  "PreparationStrategy": {
    "UnderstandSyllabus": "strategy description",
    "StudyPlan": "strategy description",
    "Practice": "strategy description",
    "Revision": "strategy description",
    "Health": "strategy description"
  },
  "ImportantDatesAndTimeline": {
    "NotificationRelease": "date range",
    "ApplicationStart": "date range",
    "ApplicationEnd": "date range",
    "AdmitCardRelease": "date range",
    "ExamDate": "date",
    "ResultDeclaration": "date"
  },
  "EligibilityCriteria": {
    "Nationality": "eligibility info",
    "AgeLimit": {
      "MinimumAge": "age requirement",
      "MaximumAge": "age requirement"
    },
    "EducationalQualification": {
      "Class12": "requirement",
      "MinimumMarks": {
        "GeneralCategory": "percentage",
        "SC/ST/OBC": "percentage",
        "PWD": "percentage"
      }
    },
    "Attempts": "attempt limit"
  }
}

Respond with JSON ONLY. No additional text or explanations.`

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
              content: 'You are an expert education counselor providing comprehensive exam information. Always respond with valid JSON only. No explanations or additional text outside the JSON structure.'
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
        const errorText = await response.text()
        console.error('OpenRouter API Error (Overview):', {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText,
          apiKey: OPENROUTER_API_KEY ? 'Present' : 'Missing'
        })
        throw new Error(`OpenRouter API Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content || '{}'
      
      // Parse JSON response
      try {
        return JSON.parse(content)
      } catch (parseError) {
        console.error('Failed to parse exam overview response:', parseError)
        console.error('Raw content:', content)
        // Return fallback structure
        return {
          ExamOverview: {
            Name: examType,
            Purpose: "Information unavailable",
            ConductingBody: "Information unavailable"
          },
          error: "Failed to parse AI response"
        }
      }
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

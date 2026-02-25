import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Mic, 
  Loader2, 
  Bot, 
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  X,
  Sparkles
} from 'lucide-react'
import { EXAM_COLORS, GLASSMORPHISM } from '../../constants/examColors'
import { openRouterAPI } from '../../services/openRouterAPI'

const AIExamChatbot = ({ examConfig }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hello! I'm your AI assistant for ${examConfig.fullName}. I can help you with exam preparation, syllabus guidance, study strategies, and answer any questions about the exam. How can I assist you today?`,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [feedback, setFeedback] = useState({})
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)
    setIsStreaming(true)

    try {
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))

      const stream = await openRouterAPI.chatStream(
        `${inputMessage} (for ${examConfig.name} exam)`,
        examConfig.name,
        conversationHistory
      )

      let botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])

      // Handle streaming response
      for await (const chunk of stream) {
        botMessage.content += chunk
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { ...botMessage, content: botMessage.content }
          return updated
        })
      }

      setIsTyping(false)
      setIsStreaming(false)

    } catch (error) {
      console.error('Chat error:', error)
      setIsTyping(false)
      setIsStreaming(false)
      
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real implementation, this would start/stop voice recording
    if (!isRecording) {
      // Start recording logic here
      console.log('Starting voice recording...')
    } else {
      // Stop recording logic here
      console.log('Stopping voice recording...')
    }
  }

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content)
    // Show brief feedback
    const tempFeedback = { ...feedback }
    tempFeedback[Date.now()] = { copied: true }
    setFeedback(tempFeedback)
    setTimeout(() => {
      const newFeedback = { ...feedback }
      delete newFeedback[Date.now()]
      setFeedback(newFeedback)
    }, 2000)
  }

  const handleFeedback = (messageId, isPositive) => {
    const tempFeedback = { ...feedback }
    tempFeedback[messageId] = { [isPositive ? 'thumbsUp' : 'thumbsDown']: true }
    setFeedback(tempFeedback)
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }

  const suggestedQuestions = [
    `What is the exam pattern for ${examConfig.name}?`,
    `How should I prepare for ${examConfig.name} in 3 months?`,
    `What are the important topics for ${examConfig.name}?`,
    `Can you explain the eligibility criteria?`,
    `What study materials do you recommend?`,
    `Previous year question trends for ${examConfig.name}?`
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${GLASSMORPHISM.card} p-6 border-b border-white/10`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Exam Assistant</h2>
              <p className="text-gray-400">Get instant answers to your {examConfig.name} questions</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 ${GLASSMORPHISM.card} flex items-center space-x-2`}>
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-white font-semibold">AI Powered</span>
            </div>
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">AI is typing...</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`max-w-2xl ${message.type === 'user' ? 'bg-indigo-600' : 'bg-white/10'} rounded-2xl p-4`}>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                      {isStreaming && message.id === messages[messages.length - 1]?.id && (
                        <span className="inline-block w-2 h-4 bg-gray-600 animate-pulse" />
                      )}
                    </p>
                  </div>

                  {/* Message Actions */}
                  <div className="flex items-start space-x-2 ml-3">
                    {message.type === 'bot' && (
                      <>
                        <button
                          onClick={() => copyMessage(message.content)}
                          className="p-1 bg-white/10 hover:bg-white/20 text-white/70 rounded transition-colors"
                          title="Copy message"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, true)}
                          className={`p-1 rounded transition-colors ${
                            feedback[message.id]?.thumbsUp 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                          title="Helpful"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, false)}
                          className={`p-1 rounded transition-colors ${
                            feedback[message.id]?.thumbsDown 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                          title="Not helpful"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Timestamp */}
                <div className={`flex items-center text-xs text-gray-500 mt-2 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`${GLASSMORPHISM.card} p-6 border-t border-white/10`}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Suggested Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setInputMessage(question)}
              className="text-left p-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all"
            >
              <span className="text-white text-sm">{question}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`${GLASSMORPHISM.card} p-4 border-t border-white/10`}
      >
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything about the exam..."
              className={`w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg resize-none focus:border-white/20 focus:outline-none ${GLASSMORPHISM.input}`}
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
              title={isRecording ? 'Stop recording' : 'Start recording'}
            >
              <Mic className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isStreaming}
              className="p-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg disabled:opacity-50 flex items-center space-x-2 transition-all"
            >
              {isStreaming ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>Send</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>AI responses are streamed in real-time</span>
        </div>
      </motion.div>
    </div>
  )
}

export default AIExamChatbot

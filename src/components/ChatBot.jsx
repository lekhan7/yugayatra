import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, X, Bot, User, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Predefined Q&A database
  const qaDatabase = [
    {
      question: "what is yugayatra",
      answer: "Yugayatra is a retail company specializing in innovative solutions and services."
    },
    {
      question: "where are you located",
      answer: "We are located in Electronic City, Phase 1, Bengaluru."
    },
    {
      question: "what are your business hours",
      answer: "Our business hours are:\nMonday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed"
    },
    {
      question: "how can i contact you",
      answer: "You can reach us at:\nEmail: hr@yugayatraretail.com\nPhone: +91 8757728679"
    },
    {
      question: "what services do you offer",
      answer: "We offer retail solutions, consulting services, and innovative business solutions."
    },
    {
      question: "do you provide support",
      answer: "Yes, we provide 24/7 support to our clients."
    },
    {
      question: "what industries do you serve",
      answer: "We serve various industries including retail, technology, and business consulting."
    },
    {
      question: "how long have you been in business",
      answer: "Yugayatra has been serving clients with excellence for several years."
    },
    {
      question: "do you offer consultations",
      answer: "Yes, we offer free initial consultations for our services."
    },
    {
      question: "what makes you different",
      answer: "We differentiate ourselves through innovation, customer-centric approach, and reliable solutions."
    },
    {
      question: "do you have internship programs",
      answer: "Yes, we offer internship programs for students and fresh graduates. Check our careers page for current openings."
    },
    {
      question: "how can i apply for internship",
      answer: "You can apply for internships through our website's internship application page or email your resume to hr@yugayatraretail.com"
    },
    {
      question: "what is your response time",
      answer: "Our average response time is 24 hours for all inquiries."
    },
    {
      question: "do you offer remote services",
      answer: "Yes, we offer remote consulting and support services to our clients."
    },
    {
      question: "what is your satisfaction rate",
      answer: "We maintain a 100% satisfaction rate with our clients."
    },
    {
      question: "do you have physical stores",
      answer: "Yes, we have physical locations. Visit us at Electronic City, Phase 1, Bengaluru."
    },
    {
      question: "what payment methods do you accept",
      answer: "We accept various payment methods including credit cards, debit cards, UPI, and bank transfers."
    },
    {
      question: "do you provide training",
      answer: "Yes, we provide training programs for our clients and partners."
    },
    {
      question: "what is your refund policy",
      answer: "We have a customer-friendly refund policy. Please contact our support team for specific details."
    },
    {
      question: "do you offer custom solutions",
      answer: "Yes, we specialize in creating custom solutions tailored to your specific business needs."
    },
    {
      question: "how can i schedule a meeting",
      answer: "You can schedule a meeting by calling us at +91 8757728679 or emailing hr@yugayatraretail.com"
    },
    {
      question: "do you have mobile app",
      answer: "We are currently developing a mobile app. It will be available soon on both iOS and Android."
    },
    {
      question: "what is your company mission",
      answer: "Our mission is to provide innovative retail solutions that help businesses grow and succeed."
    },
    {
      question: "do you offer franchise opportunities",
      answer: "Yes, we offer franchise opportunities. Please contact our business development team for more information."
    },
    {
      question: "what is your pricing structure",
      answer: "Our pricing varies based on the services required. Contact us for a customized quote."
    },
    {
      question: "do you provide technical support",
      answer: "Yes, we provide comprehensive technical support for all our products and services."
    },
    {
      question: "how can i track my order",
      answer: "You can track your order through your account dashboard or by contacting our support team."
    },
    {
      question: "do you ship internationally",
      answer: "Currently, we serve primarily within India. Please contact us for international shipping inquiries."
    },
    {
      question: "what is your delivery time",
      answer: "Delivery times vary based on location and product type. Typically 3-7 business days within India."
    },
    {
      question: "do you have customer support",
      answer: "Yes, we have dedicated customer support available 24/7 to assist you."
    },
    {
      question: "how can i give feedback",
      answer: "We value your feedback! You can email us at hr@yugayatraretail.com or use the feedback form on our website."
    },
    {
      question: "do you offer bulk discounts",
      answer: "Yes, we offer competitive pricing for bulk orders. Contact our sales team for details."
    },
    {
      question: "what is your return policy",
      answer: "We have a flexible return policy. Please refer to our terms and conditions or contact support for details."
    },
    {
      question: "do you have partnerships",
      answer: "Yes, we partner with leading companies to provide comprehensive solutions to our clients."
    },
    {
      question: "how can i join your team",
      answer: "Check our careers page for current job openings or send your resume to hr@yugayatraretail.com"
    },
    {
      question: "do you offer warranties",
      answer: "Yes, we provide warranties on our products and services. Terms vary by product."
    },
    {
      question: "what is your company vision",
      answer: "Our vision is to be the leading retail solutions provider, known for innovation and customer satisfaction."
    },
    {
      question: "do you have testimonials",
      answer: "Yes, you can find client testimonials on our website's testimonials page."
    },
    {
      question: "how can i cancel my order",
      answer: "You can cancel your order by contacting our support team or through your account dashboard."
    },
    {
      question: "do you offer maintenance services",
      answer: "Yes, we provide comprehensive maintenance services for all our products."
    },
    {
      question: "what is your privacy policy",
      answer: "We take privacy seriously. Our privacy policy is available on our website for detailed information."
    },
    {
      question: "do you have social media presence",
      answer: "Yes, follow us on our social media platforms for updates and news."
    },
    {
      question: "how can i subscribe to newsletter",
      answer: "You can subscribe to our newsletter through the subscription form on our website."
    },
    {
      question: "do you offer free trials",
      answer: "Yes, we offer free trials for select services. Contact us to learn more."
    },
    {
      question: "what is your cancellation policy",
      answer: "Our cancellation policy varies by service. Please contact our team for specific details."
    },
    {
      question: "do you provide documentation",
      answer: "Yes, we provide comprehensive documentation for all our products and services."
    },
    {
      question: "how can i update my information",
      answer: "You can update your information through your account dashboard or by contacting support."
    },
    {
      question: "do you offer enterprise solutions",
      answer: "Yes, we provide enterprise-level solutions for large organizations."
    },
    {
      question: "what is your support availability",
      answer: "Our support team is available 24/7 via email, phone, and chat."
    },
    {
      question: "do you have certification programs",
      answer: "Yes, we offer certification programs for various skills and technologies."
    },
    {
      question: "how can i report an issue",
      answer: "You can report issues through our support portal, email, or by calling our support team."
    },
    {
      question: "do you offer cloud solutions",
      answer: "Yes, we provide cloud-based solutions for businesses of all sizes."
    },
    {
      question: "what is your data security policy",
      answer: "We implement industry-standard security measures to protect your data."
    },
    {
      question: "do you have affiliate programs",
      answer: "Yes, we have affiliate programs. Contact our business team for more information."
    },
    {
      question: "how can i check order status",
      answer: "You can check your order status through your account or by contacting support."
    },
    {
      question: "do you offer consulting",
      answer: "Yes, we provide expert consulting services for retail and business optimization."
    },
    {
      question: "what is your company culture",
      answer: "We foster a culture of innovation, collaboration, and customer-centricity."
    },
    {
      question: "do you have mobile solutions",
      answer: "Yes, we offer mobile-friendly solutions and are developing dedicated mobile apps."
    },
    {
      question: "how can i request a demo",
      answer: "You can request a demo by filling out the form on our website or calling us directly."
    },
    {
      question: "do you provide analytics",
      answer: "Yes, we provide comprehensive analytics and reporting tools for our clients."
    },
    {
      question: "what is your implementation timeline",
      answer: "Implementation timelines vary based on project complexity. Typically 2-6 weeks."
    },
    {
      question: "do you offer training materials",
      answer: "Yes, we provide detailed training materials and documentation for all our services."
    },
    {
      question: "how can i contact sales team",
      answer: "You can reach our sales team at +91 8757728679 or hr@yugayatraretail.com"
    },
    {
      question: "do you have case studies",
      answer: "Yes, you can find detailed case studies on our website showcasing our successful projects."
    },
    {
      question: "what is your upgrade policy",
      answer: "We offer regular updates and upgrades. Contact us for specific upgrade policies."
    },
    {
      question: "do you provide api access",
      answer: "Yes, we provide API access for integration with your existing systems."
    },
    {
      question: "how can i get technical help",
      answer: "Our technical support team is available 24/7. Contact us via phone, email, or chat."
    },
    {
      question: "do you offer customization",
      answer: "Yes, we specialize in customizing solutions to meet your specific business requirements."
    },
    {
      question: "what is your service level agreement",
      answer: "We offer comprehensive SLAs. Contact us for detailed SLA information."
    },
    {
      question: "do you have emergency support",
      answer: "Yes, we provide emergency support for critical issues."
    },
    {
      question: "how can i access documentation",
      answer: "Documentation is available in your client portal or on our website."
    },
    {
      question: "do you offer webinars",
      answer: "Yes, we regularly conduct webinars on various topics. Check our events page."
    },
    {
      question: "what is your pricing model",
      answer: "We offer flexible pricing models including subscription, one-time, and custom pricing."
    },
    {
      question: "do you provide onboarding",
      answer: "Yes, we provide comprehensive onboarding for all new clients."
    },
    {
      question: "how can i check system requirements",
      answer: "System requirements are listed in our documentation or contact our technical team."
    },
    {
      question: "do you have beta programs",
      answer: "Yes, we have beta programs for new features. Contact us to join."
    },
    {
      question: "what is your backup policy",
      answer: "We implement regular backups with multiple redundancy levels."
    },
    {
      question: "do you offer integration services",
      answer: "Yes, we provide integration services with various third-party systems."
    },
    {
      question: "how can i access my account",
      answer: "You can access your account through the login portal on our website."
    },
    {
      question: "do you provide reports",
      answer: "Yes, we provide detailed reports and analytics for all our services."
    },
    {
      question: "what is your renewal process",
      answer: "Our renewal process is simple. We'll notify you before your subscription expires."
    },
    {
      question: "do you have community forum",
      answer: "Yes, we have an active community forum for knowledge sharing and support."
    },
    {
      question: "how can i escalate an issue",
      answer: "You can escalate issues by contacting our support manager or using the escalation process."
    },
    {
      question: "do you offer white label solutions",
      answer: "Yes, we provide white label solutions for partners and resellers."
    },
    {
      question: "what is your compliance status",
      answer: "We comply with industry standards and regulations. Contact us for specific compliance details."
    },
    {
      question: "do you provide migration services",
      answer: "Yes, we offer seamless migration services from your existing systems."
    },
    {
      question: "how can i update payment method",
      answer: "You can update your payment method through your account settings or by contacting billing."
    },
    {
      question: "do you have knowledge base",
      answer: "Yes, we have a comprehensive knowledge base with articles and tutorials."
    },
    {
      question: "what is your uptime guarantee",
      answer: "We offer 99.9% uptime guarantee for our services."
    },
    {
      question: "do you offer multi-language support",
      answer: "Yes, we support multiple languages for our services and support."
    },
    {
      question: "how can i download invoices",
      answer: "You can download invoices from your account dashboard or request them from billing."
    },
    {
      question: "do you provide performance monitoring",
      answer: "Yes, we provide real-time performance monitoring and reporting."
    },
    {
      question: "what is your disaster recovery plan",
      answer: "We have comprehensive disaster recovery plans with regular testing and updates."
    },
    {
      question: "do you offer volume licensing",
      answer: "Yes, we provide volume licensing options for organizations."
    },
    {
      question: "how can i cancel subscription",
      answer: "You can cancel your subscription through your account or by contacting our support team."
    },
    {
      question: "do you have roadmaps",
      answer: "Yes, we share our product roadmaps with clients and partners."
    },
    {
      question: "what is your data retention policy",
      answer: "Our data retention policy follows industry standards and legal requirements."
    },
    {
      question: "do you offer training videos",
      answer: "Yes, we provide comprehensive training videos and tutorials."
    },
    {
      question: "how can i change my password",
      answer: "You can change your password through your account settings."
    },
    {
      question: "do you provide sandbox environment",
      answer: "Yes, we offer sandbox environments for testing and development."
    },
    {
      question: "what is your incident response time",
      answer: "Our incident response time is typically within 1 hour for critical issues."
    },
    {
      question: "do you offer partner programs",
      answer: "Yes, we have comprehensive partner programs with various benefits."
    },
    {
      question: "how can i access api keys",
      answer: "API keys are available in your developer dashboard or account settings."
    },
    {
      question: "do you provide health monitoring",
      answer: "Yes, we provide 24/7 health monitoring for all our services."
    },
    {
      question: "what is your scalability policy",
      answer: "We offer scalable solutions that grow with your business needs."
    },
    {
      question: "do you have beta testing",
      answer: "Yes, we conduct beta testing programs. Contact us to participate."
    },
    {
      question: "how can i request features",
      answer: "You can request features through our feedback portal or by contacting our product team."
    },
    {
      question: "do you offer dedicated resources",
      answer: "Yes, we provide dedicated resources for enterprise clients."
    },
    {
      question: "what is your update schedule",
      answer: "We release regular updates monthly with security patches as needed."
    },
    {
      question: "do you provide webhooks",
      answer: "Yes, we provide webhook functionality for real-time integrations."
    },
    {
      question: "how can i contact legal team",
      answer: "You can contact our legal team by emailing legal@yugayatraretail.com"
    },
    {
      question: "do you offer audit logs",
      answer: "Yes, we provide comprehensive audit logs for compliance and security."
    },
    {
      question: "what is your end-of-life policy",
      answer: "We provide advance notice for end-of-life products and migration paths."
    },
    {
      question: "do you have mobile apps",
      answer: "Our mobile apps are currently in development and will be available soon."
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findAnswer = (userQuestion) => {
    const normalizedQuestion = userQuestion.toLowerCase().trim()
    
    const found = qaDatabase.find(qa => 
      qa.question.toLowerCase().includes(normalizedQuestion) ||
      normalizedQuestion.includes(qa.question.toLowerCase())
    )
    
    return found?.answer
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot thinking
    await new Promise(resolve => setTimeout(resolve, 1000))

    const answer = findAnswer(inputValue)
    
    let botResponse
    if (answer) {
      botResponse = {
        id: Date.now() + 1,
        text: answer,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      }
    } else {
      botResponse = {
        id: Date.now() + 1,
        text: "I don't have an answer for that question. Let me connect you with our team on WhatsApp for better assistance.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        showWhatsAppButton: true
      }
    }

    setMessages(prev => [...prev, botResponse])
    setIsTyping(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const redirectToWhatsApp = () => {
    const phoneNumber = "918757728679"
    const message = encodeURIComponent("Hi, I have a question that wasn't answered by the chatbot.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  useEffect(() => {
    // Welcome message when chat opens
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: Date.now(),
          text: "Hello! I'm Yugayatra's assistant. I can help you with questions about our services, location, business hours, and more. How can I assist you today?",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        }])
      }, 500)
    }
  }, [isOpen, messages.length])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-accent-main to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-main to-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bot className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Yugayatra Assistant</h3>
                  <p className="text-xs opacity-90">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className="flex items-end space-x-2">
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-accent-main to-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        {message.showWhatsAppButton && (
                          <button
                            onClick={redirectToWhatsApp}
                            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Chat on WhatsApp</span>
                          </button>
                        )}
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-accent-main to-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-main focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-accent-main to-blue-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Powered by Yugayatra AI • 24/7 Support
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatBot

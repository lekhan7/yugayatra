import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Calendar, Users, Target, Award, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const JourneyTimeline = () => {
  const containerRef = useRef(null)
  const carRef = useRef(null)
  const roadRef = useRef(null)
  const [activeStop, setActiveStop] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStopIndex, setCurrentStopIndex] = useState(0)
  const [showFinalPopup, setShowFinalPopup] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)

  const journeyStops = [
    {
      id: 1,
      position: 10,
      title: "Our Beginning",
      date: "2020",
      description: "YugaYatra started with a vision to bridge the gap between education and industry.",
      icon: <MapPin className="w-6 h-6" />,
      color: "from-blue-500 to-purple-600",
      details: [
        "Founded by industry professionals",
        "Initial team of 5 members",
        "First office in Bangalore"
      ]
    },
    {
      id: 2,
      position: 30,
      title: "First Milestone",
      date: "2021",
      description: "Successfully placed our first batch of 100+ interns in top companies.",
      icon: <Award className="w-6 h-6" />,
      color: "from-green-500 to-teal-600",
      details: [
        "100+ internships completed",
        "Partnered with 15 companies",
        "95% satisfaction rate"
      ]
    },
    {
      id: 3,
      position: 50,
      title: "Expansion Phase",
      date: "2022",
      description: "Expanded our services to multiple cities and introduced new training programs.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-orange-500 to-red-600",
      details: [
        "Expanded to 5 cities",
        "Launched 10 new courses",
        "Team grew to 25 members"
      ]
    },
    {
      id: 4,
      position: 70,
      title: "Community Growth",
      date: "2023",
      description: "Built a strong community of 1000+ students and professionals.",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
      details: [
        "1000+ active community members",
        "50+ corporate partners",
        "25+ skill development programs"
      ]
    },
    {
      id: 5,
      position: 90,
      title: "Future Vision",
      date: "2024+",
      description: "Continuing to shape tomorrow's workforce with innovative solutions.",
      icon: <Target className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-600",
      details: [
        "AI-powered learning platform",
        "Global expansion plans",
        "Industry 4.0 focused programs"
      ]
    }
  ]

  useEffect(() => {
    const car = carRef.current
    const container = containerRef.current
    if (!car || !container) return

    // Auto-animate car through all stops
    const animateCar = () => {
      // Move to first stop
      gsap.to(car, {
        x: `${(journeyStops[0].position / 100) * 80}vw`,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentStopIndex(0)
          setActiveStop(journeyStops[0])
          setIsAnimating(true)
          
          setTimeout(() => {
            setActiveStop(null)
            setIsAnimating(false)
            
            // Move to second stop
            gsap.to(car, {
              x: `${(journeyStops[1].position / 100) * 80}vw`,
              duration: 2,
              ease: "power2.inOut",
              onComplete: () => {
                setCurrentStopIndex(1)
                setActiveStop(journeyStops[1])
                setIsAnimating(true)
                
                setTimeout(() => {
                  setActiveStop(null)
                  setIsAnimating(false)
                  
                  // Move to third stop
                  gsap.to(car, {
                    x: `${(journeyStops[2].position / 100) * 80}vw`,
                    duration: 2,
                    ease: "power2.inOut",
                    onComplete: () => {
                      setCurrentStopIndex(2)
                      setActiveStop(journeyStops[2])
                      setIsAnimating(true)
                      
                      setTimeout(() => {
                        setActiveStop(null)
                        setIsAnimating(false)
                        
                        // Move to fourth stop
                        gsap.to(car, {
                          x: `${(journeyStops[3].position / 100) * 80}vw`,
                          duration: 2,
                          ease: "power2.inOut",
                          onComplete: () => {
                            setCurrentStopIndex(3)
                            setActiveStop(journeyStops[3])
                            setIsAnimating(true)
                            
                            setTimeout(() => {
                              setActiveStop(null)
                              setIsAnimating(false)
                              
                              // Move to fifth stop
                              gsap.to(car, {
                                x: `${(journeyStops[4].position / 100) * 80}vw`,
                                duration: 2,
                                ease: "power2.inOut",
                                onComplete: () => {
                                  setCurrentStopIndex(4)
                                  setActiveStop(journeyStops[4])
                                  setIsAnimating(true)
                                  
                                  setTimeout(() => {
                                    setActiveStop(null)
                                    setIsAnimating(false)
                                    
                                    // Move to finish line
                                    gsap.to(car, {
                                      x: "90vw",
                                      duration: 3,
                                      ease: "power2.inOut",
                                      onComplete: () => {
                                        setTimeout(() => {
                                          setShowFinalPopup(true)
                                        }, 500)
                                      }
                                    })
                                  }, 3000)
                                }
                              })
                            }, 3000)
                          }
                        })
                      }, 3000)
                    }
                  })
                }, 3000)
              }
            })
          }, 3000)
        }
      })
    }

    // Start animation when component is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && currentStopIndex === 0 && !animationStarted) {
            setAnimationStarted(true)
            animateCar()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      gsap.killTweensOf(car)
    }
  }, [currentStopIndex, animationStarted])

  const restartAnimation = () => {
    setCurrentStopIndex(0)
    setActiveStop(null)
    setIsAnimating(false)
    setShowFinalPopup(false)
    setAnimationStarted(false)
    
    // Reset car position
    gsap.set(carRef.current, { x: 0 })
    
    // Restart animation after a brief delay
    setTimeout(() => {
      setAnimationStarted(true)
      
      // Move to first stop
      gsap.to(carRef.current, {
        x: `${(journeyStops[0].position / 100) * 80}vw`,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentStopIndex(0)
          setActiveStop(journeyStops[0])
          setIsAnimating(true)
          
          setTimeout(() => {
            setActiveStop(null)
            setIsAnimating(false)
            
            // Move to second stop
            gsap.to(carRef.current, {
              x: `${(journeyStops[1].position / 100) * 80}vw`,
              duration: 2,
              ease: "power2.inOut",
              onComplete: () => {
                setCurrentStopIndex(1)
                setActiveStop(journeyStops[1])
                setIsAnimating(true)
                
                setTimeout(() => {
                  setActiveStop(null)
                  setIsAnimating(false)
                  
                  // Move to third stop
                  gsap.to(carRef.current, {
                    x: `${(journeyStops[2].position / 100) * 80}vw`,
                    duration: 2,
                    ease: "power2.inOut",
                    onComplete: () => {
                      setCurrentStopIndex(2)
                      setActiveStop(journeyStops[2])
                      setIsAnimating(true)
                      
                      setTimeout(() => {
                        setActiveStop(null)
                        setIsAnimating(false)
                        
                        // Move to fourth stop
                        gsap.to(carRef.current, {
                          x: `${(journeyStops[3].position / 100) * 80}vw`,
                          duration: 2,
                          ease: "power2.inOut",
                          onComplete: () => {
                            setCurrentStopIndex(3)
                            setActiveStop(journeyStops[3])
                            setIsAnimating(true)
                            
                            setTimeout(() => {
                              setActiveStop(null)
                              setIsAnimating(false)
                              
                              // Move to fifth stop
                              gsap.to(carRef.current, {
                                x: `${(journeyStops[4].position / 100) * 80}vw`,
                                duration: 2,
                                ease: "power2.inOut",
                                onComplete: () => {
                                  setCurrentStopIndex(4)
                                  setActiveStop(journeyStops[4])
                                  setIsAnimating(true)
                                  
                                  setTimeout(() => {
                                    setActiveStop(null)
                                    setIsAnimating(false)
                                    
                                    // Move to finish line
                                    gsap.to(carRef.current, {
                                      x: "90vw",
                                      duration: 3,
                                      ease: "power2.inOut",
                                      onComplete: () => {
                                        setTimeout(() => {
                                          setShowFinalPopup(true)
                                        }, 500)
                                      }
                                    })
                                  }, 3000)
                                }
                              })
                            }, 3000)
                          }
                        })
                      }, 3000)
                    }
                  })
                }, 3000)
              }
            })
          }, 3000)
        }
      })
    }, 500)
  }

  const PopupCard = ({ stop }) => (
    <AnimatePresence>
      {activeStop?.id === stop.id && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="absolute z-50 w-96 bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100"
          style={{ 
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: `linear-gradient(135deg, white 0%, ${stop.color.includes('blue') ? '#f0f9ff' : stop.color.includes('green') ? '#f0fdf4' : stop.color.includes('orange') ? '#fff7ed' : stop.color.includes('purple') ? '#faf5ff' : '#f0f9ff'} 100%)`
          }}
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stop.color} text-white mb-6`}>
            {stop.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{stop.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Calendar className="w-5 h-5 mr-2" />
            {stop.date}
          </div>
          <p className="text-gray-700 mb-6 text-lg">{stop.description}</p>
          <div className="space-y-3 mb-6">
            {stop.details.map((detail, index) => (
              <div key={index} className="flex items-start">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mt-1.5 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{detail}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveStop(null)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Continue Journey
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const FinalPopup = () => (
    <AnimatePresence>
      {showFinalPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="absolute z-50 w-96 bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100"
          style={{ 
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #faf5ff 100%)'
          }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Journey Complete!
          </h3>
          <p className="text-gray-700 mb-6 text-lg">
            Thank you for joining us on our incredible journey!
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700">5 Major Milestones Achieved</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">1000+ Community Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Continuing to Grow</span>
            </div>
          </div>
          <button
            onClick={() => setShowFinalPopup(false)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <section id="journey-timeline" ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden py-20">
      {/* Section Title */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
        >
          Our Journey Timeline
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Follow our path of growth and innovation as we shaped the future of workforce development
        </motion.p>
      </div>

      {/* Road Container */}
      <div className="relative max-w-6xl mx-auto px-8">
        {/* Road */}
        <div 
          ref={roadRef}
          className="relative h-32 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full shadow-2xl overflow-hidden"
        >
          {/* Road Lines */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-yellow-400 opacity-80"></div>
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="inline-block w-8 h-1 bg-white mx-4"
                style={{ marginLeft: i === 0 ? '0' : '' }}
              ></div>
            ))}
          </div>
          
          {/* Road Side Lines */}
          <div className="absolute top-2 w-full h-0.5 bg-white opacity-60"></div>
          <div className="absolute bottom-2 w-full h-0.5 bg-white opacity-60"></div>

          {/* End Point Marker */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-16 bg-gradient-to-b from-red-500 to-red-600 rounded-full shadow-lg"></div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              FINISH
            </div>
          </div>

          {/* Journey Stops */}
          {journeyStops.map((stop) => (
            <div
              key={stop.id}
              className="absolute top-1/2 transform -translate-y-1/2"
              style={{ left: `${stop.position}%` }}
            >
              {/* Stop Marker */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-6 h-6 rounded-full bg-gradient-to-r ${stop.color} shadow-lg cursor-pointer border-2 border-white`}
                  onClick={() => setActiveStop(stop)}
                />
                <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 whitespace-nowrap`}>
                  {stop.date}
                </div>
              </div>
              
              {/* Popup Card */}
              <PopupCard stop={stop} />
            </div>
          ))}

          {/* Car */}
          <div
            ref={carRef}
            className="absolute top-1/2 transform -translate-y-1/2 left-0 z-20"
            style={{ transform: 'translateY(-50%)' }}
          >
            <motion.div
              animate={{ 
                rotate: isAnimating ? [-5, 5, -5, 0] : 0,
                scale: isAnimating ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0, repeatDelay: 1 }}
              className="relative"
            >
              {/* Car Shadow */}
              <div className="absolute -bottom-2 left-2 right-2 h-2 bg-black/20 rounded-full blur-md" />
              
              {/* Car Body */}
              <svg width="100" height="50" viewBox="0 0 100 50" className="drop-shadow-2xl filter brightness-110">
                {/* Car Main Body */}
                <rect x="15" y="20" width="60" height="20" rx="5" fill="url(#carGradient)" stroke="#1a1a1a" strokeWidth="1" />
                
                {/* Car Roof */}
                <path d="M 25 20 L 30 10 L 55 10 L 60 20 Z" fill="url(#carGradient)" stroke="#1a1a1a" strokeWidth="1" />
                
                {/* Windows */}
                <path d="M 27 18 L 31 12 L 48 12 L 52 18 Z" fill="url(#windowGradient)" opacity="0.9" stroke="#1a1a1a" strokeWidth="0.5" />
                
                {/* Wheels */}
                <g>
                  <circle cx="28" cy="42" r="6" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                  <circle cx="28" cy="42" r="4" fill="#333" />
                  <circle cx="28" cy="42" r="2" fill="#666" />
                  
                  <circle cx="62" cy="42" r="6" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                  <circle cx="62" cy="42" r="4" fill="#333" />
                  <circle cx="62" cy="42" r="2" fill="#666" />
                </g>
                
                {/* Headlights */}
                <ellipse cx="75" cy="25" rx="4" ry="3" fill="url(#headlightGradient)" stroke="#1a1a1a" strokeWidth="0.5" />
                
                {/* Tail Lights */}
                <rect x="12" y="28" width="4" height="5" rx="1" fill="#ff4444" stroke="#cc0000" strokeWidth="0.5" />
                
                {/* Door Handle */}
                <rect x="40" y="26" width="8" height="3" rx="1" fill="#1a1a1a" opacity="0.5" />
                
                {/* Side Mirror */}
                <rect x="58" y="16" width="4" height="3" rx="0.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="25%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="75%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="headlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Motion Effect */}
              {isAnimating && (
                <div className="absolute -inset-4 bg-blue-400/30 rounded-full blur-xl animate-pulse" />
              )}
              
              {/* Exhaust/Smoke effect when moving */}
              {!isAnimating && currentStopIndex > 0 && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
                  <div className="w-4 h-4 bg-gray-300/50 rounded-full animate-ping" />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Road Signs */}
        <div className="absolute -top-16 left-0 right-0 flex justify-between px-8">
          {journeyStops.map((stop) => (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stop.id * 0.1 }}
              className="text-center"
              style={{ marginLeft: `${stop.position}%`, transform: 'translateX(-50%)' }}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${stop.color} text-white mb-2 shadow-lg`}>
                {stop.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-16"
      >
        <p className="text-gray-600 text-lg mb-4">
          🚗 Watch the car travel along our journey timeline to the very end
        </p>
        <p className="text-gray-500 text-sm mb-6">
          The car will stop at each milestone for 3 seconds, then continue to the finish line
        </p>
        <button
          onClick={restartAnimation}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Restart Journey</span>
        </button>
      </motion.div>

      {/* Final Popup */}
      <FinalPopup />
    </section>
  )
}

export default JourneyTimeline

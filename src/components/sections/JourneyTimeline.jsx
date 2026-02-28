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
      title: "The Beginning",
      date: "2020",
      description: "YugaYatra started with a vision to bridge the gap between education and industry.",
      icon: <MapPin className="w-6 h-6" />,
      color: "from-accent-dark via-accent-main to-accent-gold dark:from-dark-blue-accent dark:via-dark-blue-primary dark:to-dark-blue-secondary",
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
      color: "from-accent-main via-accent-gold to-accent-dark",
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
      color: "from-accent-gold via-accent-light to-accent-dark dark:from-dark-blue-accent dark:via-dark-blue-primary dark:to-dark-blue-secondary",
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
      color: "from-accent-dark via-accent-main to-accent-light",
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
      color: "from-accent-main via-accent-gold to-accent-dark",
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
        left: `${journeyStops[0].position}%`,
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
              left: `${journeyStops[1].position}%`,
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
                    left: `${journeyStops[2].position}%`,
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
                          left: `${journeyStops[3].position}%`,
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
                                left: `${journeyStops[4].position}%`,
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
                                      left: "92%",
                                      duration: 3,
                                      ease: "power2.inOut",
                                      onComplete: () => {
                                        setCurrentStopIndex(5)
                                        setIsAnimating(true)
                                        
                                        setTimeout(() => {
                                          setIsAnimating(false)
                                          setShowFinalPopup(true)
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
    gsap.set(carRef.current, { left: '0%' })
    
    // Restart animation after a brief delay
    setTimeout(() => {
      setAnimationStarted(true)
      
      // Move to first stop
      gsap.to(carRef.current, {
        left: `${journeyStops[0].position}%`,
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
              left: `${journeyStops[1].position}%`,
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
                    left: `${journeyStops[2].position}%`,
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
                          left: `${journeyStops[3].position}%`,
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
                                left: `${journeyStops[4].position}%`,
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
                                      left: "92%",
                                      duration: 3,
                                      ease: "power2.inOut",
                                      onComplete: () => {
                                        setCurrentStopIndex(5)
                                        setIsAnimating(true)
                                        
                                        setTimeout(() => {
                                          setIsAnimating(false)
                                          setShowFinalPopup(true)
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
          }, 3000)
        }
      })
    }, 500)
  }

  const FinalPopup = () => (
    <AnimatePresence>
      {showFinalPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed z-[99999] w-80 bg-white rounded-xl shadow-2xl p-6 border-2 border-gray-200 text-center"
          style={{
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, white 0%, #f0fdf4 100%)'
          }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-accent-main to-accent-dark text-white mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Journey Complete!</h3>
          <p className="text-gray-700 mb-4 text-sm leading-relaxed">Thank you for joining us on our incredible journey!</p>
          <div className="space-y-2 mb-4 text-left inline-block">
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-accent-gold dark:text-dark-blue-accent" />
              <span className="text-gray-700 text-sm">5 Major Milestones Achieved</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-accent-light/100 dark:text-dark-blue-primary" />
              <span className="text-gray-700 text-sm">1000+ Community Members</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-accent-main dark:text-dark-blue-accent" />
              <span className="text-gray-700 text-sm">Continuing to Grow</span>
            </div>
          </div>
          <button
            onClick={() => setShowFinalPopup(false)}
            className="w-full bg-google-blue text-google-white px-4 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const PopupCard = ({ stop }) => {
  // Calculate position to keep pop-up within screen bounds
  const getPosition = () => {
    if (stop.position <= 20) {
      // For dots near the left edge, position pop-up to the right of the dot
      return { left: `${stop.position + 15}%`, top: '25%', transform: 'none' }
    } else if (stop.position >= 80) {
      // For dots near the right edge, position pop-up to the left of the dot
      return { left: `${stop.position - 15}%`, top: '25%', transform: 'none' }
    } else {
      // For dots in the middle, center them above the dot
      return { left: `${stop.position}%`, top: '25%', transform: 'translateX(-50%)' }
    }
  }

  const position = getPosition()

  return (
    <AnimatePresence>
      {activeStop?.id === stop.id && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="absolute z-[99999] w-72 bg-white rounded-xl shadow-2xl p-5 border-2 border-gray-200"
          style={{ 
            ...position,
            background: `linear-gradient(135deg, white 0%, ${stop.color.includes('blue') ? '#f0f9ff' : stop.color.includes('green') ? '#f0fdf4' : stop.color.includes('orange') ? '#fff7ed' : stop.color.includes('purple') ? '#faf5ff' : '#f0f9ff'} 100%)`
          }}
        >
          {/* Arrow pointing down to milestone */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-white" />
          
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-main text-white mb-3">
            {stop.icon}
          </div>
          <h3 className="text-base font-bold text-gray-800 mb-2">{stop.title}</h3>
          <div className="flex items-center text-xs text-gray-600 mb-2">
            <Calendar className="w-3 h-3 mr-1" />
            {stop.date}
          </div>
          <p className="text-gray-700 mb-3 text-xs leading-relaxed">{stop.description}</p>
          <div className="space-y-1 mb-3">
            {stop.details.map((detail, index) => (
              <div key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent-dark/100 to-accent-dark mt-1 mr-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-xs">{detail}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveStop(null)}
            className="w-full bg-google-blue text-google-white px-3 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs"
          >
            Continue Journey
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
  }

  return (
    <section id="journey-timeline" ref={containerRef} className="relative min-h-screen bg-google-red overflow-hidden py-20">
      {/* Section Title */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-black text-google-white mb-4"
        >
          Our Journey Timeline
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-google-white/80 max-w-3xl mx-auto"
        >
          Follow our path of growth and innovation as we shaped the future of workforce development
        </motion.p>
      </div>

      {/* Road Container */}
      <div className="relative w-screen px-4">
        {/* Road */}
        <div 
          ref={roadRef}
          className="relative h-40 w-full bg-gradient-to-b from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-2xl overflow-hidden border-4 border-gray-600"
        >
          {/* Timeline Track (in middle of road) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-16">
              {/* Dashed Road Line */}
              <div className="absolute top-1/2 transform -translate-y-1/2 w-full px-4">
                <div className="w-full h-0.5 bg-white opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, white 8px, transparent 8px)', backgroundSize: '16px 2px' }}></div>
              </div>
              
              {/* Car */}
              <div
                ref={carRef}
                className="absolute top-1/2 transform -translate-y-1/2 left-0 z-20"
                style={{ transform: 'translateY(-50%)' }}
              >
                <div className="relative">
                  {/* Car Body SVG */}
                  <svg width="60" height="30" viewBox="0 0 60 30" className="drop-shadow-lg">
                    {/* Car Body */}
                    <defs>
                      <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#DC2626" />
                        <stop offset="100%" stopColor="#991B1B" />
                      </linearGradient>
                      <linearGradient id="carTopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EF4444" />
                        <stop offset="100%" stopColor="#DC2626" />
                      </linearGradient>
                    </defs>
                    
                    {/* Main Car Body */}
                    <rect x="5" y="18" width="50" height="10" rx="2" fill="url(#carGradient)" stroke="#7F1D1D" strokeWidth="1"/>
                    
                    {/* Car Top/Cabin */}
                    <path d="M 15 18 L 15 10 Q 15 8 17 8 L 43 8 Q 45 8 45 10 L 45 18" fill="url(#carTopGradient)" stroke="#7F1D1D" strokeWidth="1"/>
                    
                    {/* Windows */}
                    <path d="M 17 10 L 17 16 L 28 16 L 28 10 Q 28 10 27 10 L 17 10" fill="#E0F2FE" stroke="#0369A1" strokeWidth="0.5" opacity="0.8"/>
                    <path d="M 32 10 L 32 16 L 43 16 L 43 10 Q 43 10 42 10 L 32 10" fill="#E0F2FE" stroke="#0369A1" strokeWidth="0.5" opacity="0.8"/>
                    
                    {/* Wheels */}
                    <circle cx="15" cy="26" r="3" fill="#1F2937" stroke="#111827" strokeWidth="1"/>
                    <circle cx="45" cy="26" r="3" fill="#1F2937" stroke="#111827" strokeWidth="1"/>
                    <circle cx="15" cy="26" r="1.5" fill="#6B7280"/>
                    <circle cx="45" cy="26" r="1.5" fill="#6B7280"/>
                    
                    {/* Headlights */}
                    <ellipse cx="55" cy="20" rx="2" ry="1.5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="0.5"/>
                    <ellipse cx="55" cy="24" rx="2" ry="1.5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="0.5"/>
                    
                    {/* Tail Lights */}
                    <rect x="3" y="19" width="2" height="2" rx="0.5" fill="#EF4444"/>
                    <rect x="3" y="23" width="2" height="2" rx="0.5" fill="#EF4444"/>
                  </svg>
                  
                  {/* Movement Effect */}
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Finish Flag on Timeline */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-20 bg-gradient-to-b from-accent-gold to-accent-dark dark:from-blue-500 dark:to-blue-700 rounded-full shadow-lg"></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-accent-gold/100 text-white text-xs px-2 py-1 rounded-full font-bold">
              FINISH
            </div>
          </div>
        </div>
        
        {/* Road Lines */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full px-8">
          <div className="w-full h-0.5 bg-white opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, white 8px, transparent 8px)', backgroundSize: '16px 2px' }}></div>
        </div>
        
        {/* Journey Stops */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full">
          {journeyStops.map((stop) => (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stop.id * 0.1 }}
              className="text-center absolute"
              style={{ left: `${stop.position}%`, transform: 'translateX(-50%)' }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-main text-white mb-2 shadow-lg">
                {stop.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Popup Cards - Rendered outside road container */}
      {journeyStops.map((stop) => (
        <PopupCard key={stop.id} stop={stop} />
      ))}

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
          className="bg-white text-black border border-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2"
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

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroAnimation = () => {
  const containerRef = useRef(null)
  const bowRef = useRef(null)
  const arrowRef = useRef(null)
  const stringRef = useRef(null)
  const yugaTextRef = useRef(null)
  const yatraTextRef = useRef(null)
  const trailRef = useRef(null)
  const glowTrailRef = useRef(null)
  const particlesRef = useRef([])
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.log('GSAP not loaded')
      return
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" }
    })

    // Create audio context for sound effect
    const playArrowSound = () => {
      if (!soundEnabled) return
      
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        console.log('Audio not supported')
      }
    }

    // Initial setup - hide Yuga text initially
    if (yugaTextRef.current) {
      gsap.set(yugaTextRef.current, { opacity: 0, scale: 0.8 })
    }
    if (yatraTextRef.current) {
      gsap.set(yatraTextRef.current, { opacity: 1, scale: 1 })
    }
    if (bowRef.current) {
      gsap.set(bowRef.current, { x: -100, opacity: 0 })
    }
    if (arrowRef.current) {
      gsap.set(arrowRef.current, { x: -100, opacity: 0 })
    }
    if (stringRef.current) {
      gsap.set(stringRef.current, { opacity: 0 })
    }
    if (trailRef.current) {
      gsap.set(trailRef.current, { opacity: 0 })
    }
    if (glowTrailRef.current) {
      gsap.set(glowTrailRef.current, { opacity: 0 })
    }
    
    // Setup particles
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        gsap.set(particle, {
          opacity: 0,
          scale: 0,
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50
        })
      }
    })

    // Animation sequence with enhanced bow and arrow movements
    tl.to(bowRef.current, {
      x: 0,
      opacity: 1,
      rotation: 0,
      duration: 1.0,
      ease: "power3.out"
    })
    .to(stringRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.6")
    .to(arrowRef.current, {
      x: 0,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.2)"
    }, "-=0.3")
    // Enhanced bow stretching animation with more realistic movement
    .to(bowRef.current, {
      scaleX: 0.82,
      scaleY: 1.05,
      transformOrigin: "center right",
      duration: 0.6,
      ease: "power2.inOut"
    })
    .to(stringRef.current, {
      scaleX: 1.15,
      transformOrigin: "center",
      duration: 0.6,
      ease: "power2.inOut"
    }, "-=0.6")
    // Enhanced arrow pull back with slight rotation
    .to(arrowRef.current, {
      x: -35,
      rotation: -3,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.inOut"
    }, "-=0.3")
    // Arrow release with enhanced motion blur effect
    .to(arrowRef.current, {
      x: 850,
      rotation: 1,
      scale: 1.1,
      duration: 0.9,
      ease: "power4.out",
      onStart: () => {
        playArrowSound()
        // Create enhanced glowing trail effect
        if (trailRef.current) {
          gsap.to(trailRef.current, {
            opacity: 0.9,
            scaleX: 1.2,
            scaleY: 1.5,
            duration: 0.4,
            ease: "power2.out"
          })
        }
        if (glowTrailRef.current) {
          gsap.to(glowTrailRef.current, {
            opacity: 0.7,
            scaleX: 1.3,
            scaleY: 2,
            duration: 0.4,
            ease: "power2.out"
          })
        }
        // Animate particles with more dynamic movement
        particlesRef.current.forEach((particle, i) => {
          if (particle) {
            const angle = (Math.PI * 2 * i) / particlesRef.current.length
            const distance = 100 + Math.random() * 150
            gsap.to(particle, {
              opacity: 0.8,
              scale: 1.2,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              duration: 1.2 + Math.random() * 0.6,
              ease: "power2.out",
              delay: i * 0.03
            })
          }
        })
      }
    })
    // Enhanced bow return to normal with elastic effect
    .to(bowRef.current, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)"
    }, "-=0.7")
    .to(stringRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)"
    }, "-=0.7")
    // Enhanced trail morphs into "Yuga" text
    .to(trailRef.current, {
      x: 200,
      scaleX: 0.2,
      scaleY: 0.8,
      opacity: 0.3,
      duration: 0.5,
      ease: "power2.inOut"
    }, "-=0.5")
    // Enhanced Yuga text appearance with smooth animation
    .to(yugaTextRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      onStart: () => {
        // Start moving dotted background animation
        setTimeout(() => {
          const dots = document.querySelectorAll('.moving-dot');
          if (dots.length > 0) {
            gsap.to(".moving-dot", {
              x: "+=100",
              y: "+=50",
              duration: 3 + Math.random() * 2,
              ease: "none",
              repeat: -1,
              yoyo: true,
              stagger: 0.1
            })
          }
        }, 100)
      }
    }, "-=0.4")
    // Enhanced fade out bow and arrow
    .to([bowRef.current, arrowRef.current, stringRef.current].filter(Boolean), {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.4")
    // Enhanced fade out trails
    .to([trailRef.current, glowTrailRef.current].filter(Boolean), {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.4")
    // Enhanced screen shake effect for hero section only
    tl.to(containerRef.current, {
      x: "+=4",
      y: "+=2",
      rotation: "+=0.5",
      duration: 0.03,
      repeat: 10,
      yoyo: true,
      ease: "power2.inOut"
    }, "-=0.3")
    // Return hero section to normal position within a second
    .to(containerRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "+=0.1")
    // Smooth final position reset
    tl.to(yugaTextRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    })

    return () => {
      tl.kill()
    }
  }, [soundEnabled])

  return (
    <div ref={containerRef} className="relative w-full h-[600px] flex items-center justify-center bg-gradient-to-br from-bg-main via-mint-50 to-mint-100 overflow-hidden">
      
      {/* Sound Toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-4 right-4 z-30 p-2 rounded-full bg-gray-800/10 backdrop-blur-sm text-gray-800 hover:bg-gray-800/20 transition-all duration-300"
        title={soundEnabled ? "Disable Sound" : "Enable Sound"}
      >
        {soundEnabled ? "🔊" : "🔇"}
      </button>
      
      {/* Enhanced Mythological Bow and Arrow SVG */}
      <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
        <svg
          ref={bowRef}
          width="220"
          height="320"
          viewBox="0 0 220 320"
          className="transform-gpu will-change-transform drop-shadow-2xl"
        >
          {/* Decorative Bow Grip */}
          <rect
            x="105"
            y="150"
            width="10"
            height="20"
            fill="url(#gripGradient)"
            rx="2"
          />
          
          {/* Main Bow Body with enhanced curves - Arjuna style */}
          <path
            d="M 110 50 Q 180 160 110 270"
            stroke="url(#bowGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Inner Bow Decoration */}
          <path
            d="M 110 65 Q 165 160 110 255"
            stroke="url(#bowInnerGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Bow String/ Rope with realistic styling */}
          <g ref={stringRef}>
            {/* Main string */}
            <path
              d="M 110 55 Q 112 160 110 265"
              stroke="url(#stringGradient)"
              strokeWidth="5"
              fill="none"
              opacity="0.9"
            />
            {/* String texture details */}
            <path
              d="M 110 55 Q 108 160 110 265"
              stroke="url(#stringHighlight)"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          </g>
          
          {/* Enhanced Arrow with golden color */}
          <g ref={arrowRef} transform="translate(135, 160)">
            {/* Arrow shaft (rectangular body) */}
            <rect
              x="0"
              y="-3"
              width="120"
              height="6"
              fill="url(#arrowShaftGradient)"
              rx="1"
            />
            
            {/* Arrow shaft highlight */}
            <rect
              x="0"
              y="-1"
              width="120"
              height="2"
              fill="url(#arrowShaftHighlight)"
              rx="0.5"
              opacity="0.7"
            />
            
            {/* Sharp Arrowhead with golden design */}
            <g transform="translate(120, 0)">
              {/* Main sharp arrowhead */}
              <polygon
                points="0,0 -25,-15 -25,15"
                fill="url(#arrowheadGradient)"
                stroke="url(#arrowheadBorder)"
                strokeWidth="2"
              />
              {/* Inner sharp detail */}
              <polygon
                points="0,0 -18,-10 -18,10"
                fill="url(#arrowheadInner)"
                opacity="0.9"
              />
              {/* Sharp tip point */}
              <polygon
                points="0,0 -6,-4 -6,4"
                fill="url(#arrowheadTip)"
                opacity="1"
              />
              {/* Sharp edge highlights */}
              <line
                x1="0"
                y1="0"
                x2="-25"
                y2="-15"
                stroke="url(#arrowheadEdge)"
                strokeWidth="1.5"
                opacity="0.8"
              />
              <line
                x1="0"
                y1="0"
                x2="-25"
                y2="15"
                stroke="url(#arrowheadEdge)"
                strokeWidth="1.5"
                opacity="0.8"
              />
            </g>
            
            {/* Enhanced Fletching (feathers) */}
            <g transform="translate(0, 0)">
              {/* Main feather shapes */}
              <path
                d="M 0,-3 Q -12,-12 -20,-20 L -20,-10 Q -8,-5 0,-3"
                fill="url(#fletchingGradient)"
                opacity="0.9"
              />
              <path
                d="M 0,3 Q -12,12 -20,20 L -20,10 Q -8,5 0,3"
                fill="url(#fletchingGradient)"
                opacity="0.9"
              />
              <path
                d="M 0,-1 Q -10,-5 -16,-5 L -16,5 Q -10,5 0,1"
                fill="url(#fletchingGradient)"
                opacity="0.8"
              />
              {/* Feather details */}
              <path
                d="M -3,-3 Q -10,-10 -15,-15"
                stroke="url(#fletchingDetail)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M -3,3 Q -10,10 -15,15"
                stroke="url(#fletchingDetail)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>
            
            {/* Arrow nock */}
            <circle
              cx="0"
              cy="0"
              r="4"
              fill="url(#nockGradient)"
            />
            <circle
              cx="0"
              cy="0"
              r="2"
              fill="url(#nockInner)"
            />
          </g>
          
          {/* Bow Decorative Elements */}
          <g opacity="0.8">
            {/* Upper decoration */}
            <circle cx="110" cy="50" r="8" fill="url(#decorationGradient)" />
            <circle cx="110" cy="50" r="4" fill="url(#decorationInner)" />
            
            {/* Lower decoration */}
            <circle cx="110" cy="270" r="8" fill="url(#decorationGradient)" />
            <circle cx="110" cy="270" r="4" fill="url(#decorationInner)" />
            
            {/* Grip decorations */}
            <rect x="107" y="155" width="6" height="4" fill="url(#decorationGradient)" rx="1" />
            <rect x="107" y="162" width="6" height="4" fill="url(#decorationGradient)" rx="1" />
          </g>
          
          {/* Enhanced Gradients for Mythological Look */}
          <defs>
            {/* Bow gradients */}
            <linearGradient id="bowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#654321" />
              <stop offset="20%" stopColor="#8B4513" />
              <stop offset="40%" stopColor="#A0522D" />
              <stop offset="60%" stopColor="#CD853F" />
              <stop offset="80%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#654321" />
            </linearGradient>
            
            <linearGradient id="bowInnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D2691E" />
              <stop offset="50%" stopColor="#DEB887" />
              <stop offset="100%" stopColor="#D2691E" />
            </linearGradient>
            
            {/* String/Rope gradients */}
            <linearGradient id="stringGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F4E4C1" />
              <stop offset="25%" stopColor="#E8D4B1" />
              <stop offset="50%" stopColor="#D4A574" />
              <stop offset="75%" stopColor="#E8D4B1" />
              <stop offset="100%" stopColor="#F4E4C1" />
            </linearGradient>
            
            <linearGradient id="stringHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="50%" stopColor="#FAEBD7" />
              <stop offset="100%" stopColor="#FFF8DC" />
            </linearGradient>
            
            {/* Golden Arrow gradients */}
            <linearGradient id="arrowShaftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8860B" />
              <stop offset="30%" stopColor="#DAA520" />
              <stop offset="60%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            
            <linearGradient id="arrowShaftHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFED4E" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
            
            <linearGradient id="arrowheadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DAA520" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            
            <linearGradient id="arrowheadBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#8B6914" />
            </linearGradient>
            
            <linearGradient id="arrowheadInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFED4E" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
            
            <linearGradient id="arrowheadTip" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFACD" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFED4E" />
            </linearGradient>
            
            <linearGradient id="arrowheadEdge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>
            
            <linearGradient id="fletchingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="50%" stopColor="#CD853F" />
              <stop offset="100%" stopColor="#DEB887" />
            </linearGradient>
            
            <linearGradient id="nockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#654321" />
            </linearGradient>
            
            <linearGradient id="nockInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D2691E" />
              <stop offset="100%" stopColor="#8B4513" />
            </linearGradient>
            
            <linearGradient id="arrowheadTip" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5F5F5" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E5E5E5" />
            </linearGradient>
            
            <linearGradient id="arrowheadEdge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C0C0C0" />
              <stop offset="100%" stopColor="#808080" />
            </linearGradient>
            
            <linearGradient id="fletchingDetail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#654321" />
              <stop offset="50%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#A0522D" />
            </linearGradient>
            
            {/* Grip gradient */}
            <linearGradient id="gripGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#654321" />
              <stop offset="50%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#654321" />
            </linearGradient>
            
            {/* Decoration gradients */}
            <linearGradient id="decorationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
            
            <linearGradient id="decorationInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="100%" stopColor="#FFE4B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Enhanced Glowing Trail for light theme */}
      <div
        ref={glowTrailRef}
        className="absolute left-40 top-1/2 transform -translate-y-1/2 w-96 h-3 bg-gradient-to-r from-transparent via-mint-100/60 via-mint-200/60 to-transparent blur-xl will-change-transform"
        style={{ transformOrigin: 'left center' }}
      />

      {/* Enhanced Arrow Trail for light theme */}
      <div
        ref={trailRef}
        className="absolute left-40 top-1/2 transform -translate-y-1/2 w-96 h-1.5 bg-gradient-to-r from-yellow-500/80 via-orange-400/80 via-amber-500/80 to-transparent will-change-transform"
        style={{ transformOrigin: 'left center' }}
      />

      {/* Main Text with centered/right positioning */}
      <div className="relative z-10 text-center" style={{ marginLeft: '10%' }}>
        <h1 className="text-7xl md:text-9xl font-black text-gray-800 mb-4">
          <span 
            ref={yugaTextRef}
            className="inline-block mr-3 bg-gradient-to-r from-mint-200 via-mint-300 to-mint-900 bg-clip-text text-transparent will-change-transform"
          >
            Yuga
          </span>
          <span 
            ref={yatraTextRef}
            className="inline-block bg-gradient-to-r from-mint-300 via-mint-900 to-mint-900 bg-clip-text text-transparent"
          >
            Yatra
          </span>
        </h1>
        
        {/* Subtitle */}
        <div className="text-2xl md:text-3xl font-light text-gray-600 max-w-4xl mx-auto opacity-0 animate-fade-in-up [animation-delay:2.5s]">
          Shaping Tomorrow's Workforce Today
        </div>
      </div>

      {/* Enhanced Moving Dotted Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className="moving-dot absolute bg-mint-200/60 rounded-full will-change-transform"
            style={{
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Add CSS styles
const style = document.createElement('style')
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.4;
    }
    25% {
      transform: translate(30px, -15px) scale(1.1);
      opacity: 0.6;
    }
    50% {
      transform: translate(-20px, 10px) scale(0.9);
      opacity: 0.5;
    }
    75% {
      transform: translate(15px, -25px) scale(1.05);
      opacity: 0.7;
    }
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out forwards;
  }
  
  .moving-dot {
    will-change: transform, opacity;
  }
`
if (!document.head.querySelector('style[data-hero-animation]')) {
  style.setAttribute('data-hero-animation', 'true')
  document.head.appendChild(style)
}

export default HeroAnimation

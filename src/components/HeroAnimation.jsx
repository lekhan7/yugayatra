import React from 'react'

const HeroAnimation = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Main Text with centered/right positioning */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center" style={{ marginLeft: '10%' }}>
          <h1 className="text-7xl md:text-9xl font-black text-gray-800 mb-4">
            <span className="inline-block mr-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Yuga
            </span>
            <span className="inline-block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
              Yatra
            </span>
          </h1>
          
          {/* Subtitle */}
          <div className="text-2xl md:text-3xl font-light text-gray-600 max-w-4xl mx-auto">
            Shaping Tomorrow's Workforce Today
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-400/20 rounded-full"
            style={{
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroAnimation

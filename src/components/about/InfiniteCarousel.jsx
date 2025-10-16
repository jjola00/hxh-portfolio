"use client";

import { useState } from 'react';

const InfiniteCarousel = ({ items, direction = 'left', speed = 20 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);

  // Double the items array to make carousel twice as long
  const doubledItems = [...items, ...items];
  
  const animationClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';
  const animationDuration = `${speed}s`;

  const handleLogoClick = (itemName) => {
    setShowTooltip(itemName);
    setTimeout(() => setShowTooltip(null), 2000); // Hide after 2 seconds
  };

  return (
    <div 
      className="w-full overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`flex items-center gap-4 sm:gap-6 md:gap-8 ${animationClass} ${isHovered ? 'paused' : ''}`}
        style={{ 
          animationDuration,
          width: 'fit-content'
        }}
      >
        {/* First set of doubled logos */}
        {doubledItems.map((item, index) => (
          <div key={`first-${index}`} className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <img
              src={item.logo}
              alt={item.alt}
              title={item.name}
              onClick={() => handleLogoClick(item.name)}
              className="
                w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
                object-cover object-center
                filter grayscale hover:grayscale-0
                transition-all duration-300 ease-in-out
                hover:scale-110
                cursor-pointer
                rounded-lg
              "
            />
            {index < doubledItems.length - 1 && (
              <span className="text-white/30 text-lg sm:text-xl md:text-2xl select-none">
                —
              </span>
            )}
          </div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {doubledItems.map((item, index) => (
          <div key={`second-${index}`} className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <img
              src={item.logo}
              alt={item.alt}
              title={item.name}
              onClick={() => handleLogoClick(item.name)}
              className="
                w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
                object-cover object-center
                filter grayscale hover:grayscale-0
                transition-all duration-300 ease-in-out
                hover:scale-110
                cursor-pointer
                rounded-lg
              "
            />
            {index < doubledItems.length - 1 && (
              <span className="text-white/30 text-lg sm:text-xl md:text-2xl select-none">
                —
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile tooltip */}
      {showTooltip && (
        <div className="
          fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50
          bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg
          text-sm font-medium
          animate-fade-in-out
          sm:hidden
        ">
          {showTooltip}
        </div>
      )}

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          20% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }

        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }

        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out;
        }

        .paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default InfiniteCarousel;

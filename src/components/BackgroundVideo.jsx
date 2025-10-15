"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useBackground } from './BackgroundManager';

const BackgroundVideo = forwardRef((props, ref) => {
  const { mode, customVideoIndex, nextVideo } = useBackground();
  const wallpapers = [
    '/wallpapers/Arcane.mp4',
    '/wallpapers/EldenRing.mp4',
    '/wallpapers/EldenRing2.mp4',
    '/wallpapers/KillBill.mp4'
  ];

  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const switchToNext = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      nextVideo(); // Use the context function
      setIsTransitioning(false);
    }, 300); // 300ms fade transition
  };

  // Expose switchToNext function to parent component
  useImperativeHandle(ref, () => ({
    switchToNext
  }));

  useEffect(() => {
    // Auto-switch videos every 60 seconds
    intervalRef.current = setInterval(() => {
      switchToNext();
    }, 60000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle video load to ensure smooth playback
  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  // Only render when in custom mode
  if (mode !== 'custom') {
    return null;
  }

  return (
    <video
      ref={videoRef}
      key={customVideoIndex} // Force re-render when video changes
      className={`
        fixed top-0 left-0 w-full h-full object-cover -z-50
        transition-opacity duration-300 ease-in-out
        ${isTransitioning ? 'opacity-0' : 'opacity-25'}
      `}
      autoPlay
      loop
      muted
      playsInline
      onLoadedData={handleVideoLoad}
      onError={(e) => console.error('Video load error:', e)}
    >
      <source src={wallpapers[customVideoIndex]} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

BackgroundVideo.displayName = 'BackgroundVideo';

export default BackgroundVideo;

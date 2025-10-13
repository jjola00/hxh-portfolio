/*
You are helping update a Next.js 13+ App Router project (anime portfolio) located in `src/app/page.js`. I have multiple MP4 wallpapers stored in `/public/wallpapers/` (e.g., Arcane.mp4, EldenRing.mp4, KillBill.mp4). I want to replace the static background on the home page with a dynamic video background system.

Implement the following:

1. Create a new component in `src/components/BackgroundVideo.jsx`:
   - Loads an array of video file paths from `/public/wallpapers/`
   - Renders a `<video>` element as a fullscreen fixed background (z-index: -1, object-fit: cover, autoplay, loop, muted)
   - Handles switching videos every 60 seconds using React state + `setInterval`
   - Expose a function or button to manually switch to the next wallpaper

2. On the home screen (`src/app/page.js`):
   - Import and render the BackgroundVideo component behind all content
   - Place a “Change Wallpaper” button (bottom-right or top-right)
     - Tailwind styled: subtle anime glow, hover pulse, small size
     - On click: immediately switches to the next video

3. Requirements:
   - Only one `<video>` active at a time to prevent performance issues
   - Optional fade transition between videos (CSS opacity or Tailwind transition)
   - Use absolute/fixed positioning so it doesn’t interfere with existing layout or animations
   - Do NOT break existing components like FireFliesBackground, navigation, or model rendering

4. Integration Tip:
   - The portfolio currently uses `home-background.png` in `/public/background/`
   - Remove or override it only for the homepage background

5. Deliver:
   - `BackgroundVideo.jsx` component
   - Update to `page.js`
   - Example array like: `const wallpapers = ['/wallpapers/Arcane.mp4', '/wallpapers/EldenRing.mp4'];`

Make sure this works specifically inside the Next.js `app/` directory architecture with `"use client"` where necessary.
*/

"use client";

import { useRef } from "react";
import RenderModel from "@/components/RenderModel";
import Netero from "@/components/models/Netero";
import Navigation from "@/components/navigation";
import BackgroundVideo from "@/components/BackgroundVideo";

export default function Home() {
  const backgroundVideoRef = useRef(null);

  const handleWallpaperChange = () => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.switchToNext();
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between relative">
        {/* Dynamic Video Background */}
        <BackgroundVideo ref={backgroundVideoRef} />

        {/* Change Wallpaper Button */}
        <button
          onClick={handleWallpaperChange}
          className="
            fixed top-6 right-6 z-50
            bg-black/30 backdrop-blur-sm border border-purple-500/30
            text-purple-300 text-sm font-medium
            px-4 py-2 rounded-lg
            hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-purple-200
            hover:shadow-lg hover:shadow-purple-500/25
            active:scale-95
            transition-all duration-300 ease-out
            hover:animate-pulse
            glow-effect
          "
          title="Change Wallpaper"
        >
          <svg
            className="w-4 h-4 mr-2 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Change Wallpaper
        </button>

        <div className="w-full h-screen">
          <Navigation/>
          <RenderModel className="-z-10">
            <Netero />
          </RenderModel>
        </div>

      </div>

      <style jsx>{`
        .glow-effect {
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
        }
        .glow-effect:hover {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </>
  );
}

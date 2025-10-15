"use client";

import { useBackground } from './BackgroundManager';

const BackgroundControls = () => {
  const { 
    mode, 
    ambientEffect, 
    switchToCustom, 
    switchToAmbient, 
    setEffect, 
    nextVideo 
  } = useBackground();

  const effects = [
    { id: 'aurora', name: 'Aurora' },
    { id: 'swirl', name: 'Swirl' },
    { id: 'shift', name: 'Shift' },
    { id: 'coalesce', name: 'Coalesce' },
    { id: 'pipeline', name: 'Pipeline' }
  ];

  return (
    <>
      {/* Top-right controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        {mode === 'ambient' ? (
          <button
            onClick={switchToCustom}
            className="
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
            title="Use Custom Wallpapers"
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
            Use Custom Wallpapers
          </button>
        ) : (
          <>
            <button
              onClick={switchToAmbient}
              className="
                bg-black/30 backdrop-blur-sm border border-blue-500/30
                text-blue-300 text-sm font-medium
                px-4 py-2 rounded-lg
                hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-200
                hover:shadow-lg hover:shadow-blue-500/25
                active:scale-95
                transition-all duration-300 ease-out
                hover:animate-pulse
                glow-effect-blue
              "
              title="Back to Ambient"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Ambient
            </button>
            <button
              onClick={nextVideo}
              className="
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
              title="Change Video"
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
              Change Video
            </button>
          </>
        )}
      </div>

      {/* Bottom ambient effect controls - only show in ambient mode */}
      {mode === 'ambient' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="
            bg-black/20 backdrop-blur-md border border-white/10
            rounded-2xl px-6 py-3
            flex gap-2 items-center
            shadow-2xl
          ">
            {effects.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setEffect(effect.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-300 ease-out
                  ${ambientEffect === effect.id
                    ? 'bg-white/20 text-white border border-white/30 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10 border border-transparent'
                  }
                `}
              >
                {effect.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .glow-effect {
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
        }
        .glow-effect:hover {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        }
        .glow-effect-blue {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
        .glow-effect-blue:hover {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </>
  );
};

export default BackgroundControls;

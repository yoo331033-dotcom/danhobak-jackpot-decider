
import React from 'react';

const FloatingStickers: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-20 left-[10%] text-6xl rotate-12 animate-float opacity-80">👾</div>
      <div className="absolute bottom-40 left-[5%] text-8xl -rotate-12 animate-float opacity-80" style={{animationDelay: '1s'}}>🔥</div>
      <div className="absolute top-40 right-[15%] text-7xl rotate-[20deg] animate-float opacity-80" style={{animationDelay: '2s'}}>💿</div>
      <div className="absolute bottom-20 right-[20%] text-6xl -rotate-[15deg] animate-float opacity-80" style={{animationDelay: '1.5s'}}>💊</div>
      
      <div className="absolute top-[15%] left-[30%] w-24 h-24 border-4 border-brutal-black bg-acid-green rotate-45 shadow-brutal transition-transform hover:scale-110"></div>
      <div className="absolute bottom-[25%] right-[10%] w-32 h-32 rounded-full border-4 border-brutal-black bg-electric-blue border-dashed animate-spin-slow opacity-60"></div>
      
      {/* Neo-brutalist corner decorations */}
      <div className="fixed top-0 left-0 p-0 pointer-events-none z-50 mix-blend-multiply opacity-50">
        <svg height="200" viewBox="0 0 200 200" width="200">
          <rect fill="#ccff00" height="200" width="40" x="0" y="0"></rect>
          <rect fill="#ccff00" height="40" width="200" x="0" y="0"></rect>
          <rect fill="black" height="20" width="20" x="40" y="40"></rect>
        </svg>
      </div>
      <div className="fixed bottom-0 right-0 p-0 pointer-events-none z-50 mix-blend-multiply opacity-50 rotate-180">
        <svg height="200" viewBox="0 0 200 200" width="200">
          <rect fill="#ff0099" height="200" width="40" x="0" y="0"></rect>
          <rect fill="#ff0099" height="40" width="200" x="0" y="0"></rect>
          <rect fill="black" height="20" width="20" x="40" y="40"></rect>
        </svg>
      </div>
    </div>
  );
};

export default FloatingStickers;


import React from 'react';

const JackpotDisplay: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center relative select-none w-full z-[80] py-0">
      <div className="relative flex flex-col items-center">
        {/* '단호박' 메인 타이틀 */}
        <div className="relative flex items-center justify-center h-16 sm:h-22 md:h-28">
          <h1 className="font-display text-[70px] sm:text-[100px] md:text-[140px] font-[900] leading-none tracking-[-0.08em] uppercase italic flex flex-row items-center gap-0">
            {/* 단 */}
            <span className="relative inline-block transform -rotate-6 hover:rotate-0 transition-transform duration-200">
              <span className="absolute inset-0 translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 text-acid-green">단</span>
              <span className="absolute inset-0 -translate-x-1 -translate-y-1 md:-translate-x-2 md:-translate-y-2 text-hot-pink">단</span>
              <span className="relative text-brutal-black">단</span>
            </span>
            {/* 호 */}
            <span className="relative inline-block transform rotate-3 hover:rotate-0 transition-transform duration-200 -ml-2">
              <span className="absolute inset-0 translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 text-electric-blue">호</span>
              <span className="relative text-brutal-black">호</span>
            </span>
            {/* 박 */}
            <span className="relative inline-block transform -rotate-2 hover:rotate-0 transition-transform duration-200 -ml-2">
              <span className="absolute inset-0 translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 text-acid-green">박</span>
              <span className="absolute inset-0 -translate-x-1 -translate-y-1 md:-translate-x-2 md:-translate-y-2 text-hot-pink opacity-50">박</span>
              <span className="relative text-brutal-black">박</span>
            </span>
          </h1>
          
          {/* 장식용 스파클링 아이콘 */}
          <div className="absolute top-0 -right-5 md:-right-8 text-2xl md:text-4xl animate-bounce">✨</div>
          <div className="absolute -bottom-1 -left-5 md:-left-8 text-xl md:text-3xl animate-pulse text-hot-pink">⚡</div>
        </div>
        
        {/* '결정기' 태그: 마진을 추가하여 타이틀과 분리 */}
        <div className="relative z-30 mt-3 md:mt-5 transform rotate-1 hover:rotate-0 transition-transform cursor-default">
          <div className="bg-brutal-black text-white border-[3px] md:border-[4px] border-brutal-black px-5 py-1 md:px-12 md:py-1.5 shadow-brutal flex flex-col items-center group">
            <h2 className="font-pixel text-[9px] sm:text-base md:text-lg tracking-[0.3em] leading-none uppercase italic text-acid-green group-hover:text-hot-pink transition-colors">
              DECIDER
            </h2>
            <div className="h-0.5 w-full bg-white/20 mt-1 rounded-full overflow-hidden">
              <div className="h-full bg-hot-pink w-2/3 animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          {/* 모서리 포인트 */}
          <div className="absolute -left-1.5 -bottom-1.5 w-4 h-4 bg-white border-[2px] border-brutal-black rotate-45 z-[-1]"></div>
          <div className="absolute -right-1.5 -top-1.5 w-4 h-4 bg-electric-blue border-[2px] border-brutal-black -rotate-12 z-[-1]"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default JackpotDisplay;

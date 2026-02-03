
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl mx-auto flex flex-row items-center justify-between py-2 md:py-3 px-3 md:px-5 mb-4 md:mb-6 bg-white border-[2px] md:border-[3px] border-brutal-black shadow-brutal rounded-2xl relative overflow-hidden">
      {/* 배경 장식 원 크기 축소 */}
      <div className="absolute -top-6 -right-6 w-16 h-16 md:w-20 md:h-20 bg-acid-green rounded-full border-2 border-brutal-black z-0 opacity-50 md:opacity-100"></div>
      
      <div className="flex items-center gap-2 md:gap-3 z-10 relative">
        <div className="w-8 h-8 md:w-12 md:h-12 bg-brutal-black text-acid-green flex items-center justify-center border-2 border-brutal-black shadow-[2px_2px_0px_#ccff00]">
          <span className="material-symbols-outlined text-xl md:text-3xl">stadia_controller</span>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase transform -skew-x-12 leading-none">단호박</h2>
          <span className="font-doodle text-[10px] md:text-sm text-hot-pink font-bold block rotate-[-1deg]">No more thinking!</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 z-10">
        <div className="flex items-center gap-1.5 px-2 md:px-4 py-1 bg-brutal-black text-white font-pixel text-[7px] md:text-[9px] border-2 border-transparent hover:border-acid-green transition-all shadow-[2px_2px_0px_#ccff00]">
          <span className="animate-pulse text-acid-green">●</span>
          <span className="hidden xs:inline">LIVE</span>
          <span className="hidden sm:inline ml-1 text-gray-400">UNLIMITED</span>
        </div>
        <div className="w-7 h-7 md:w-10 md:h-10 bg-white border-2 border-brutal-black flex items-center justify-center hover:bg-hot-pink hover:text-white transition-colors cursor-pointer shadow-brutal">
          <span className="material-symbols-outlined font-bold text-sm md:text-lg">face_5</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

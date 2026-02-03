
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full max-w-4xl mx-auto">
      <div className="bg-white border-2 md:border-[3px] border-brutal-black shadow-brutal rounded-full px-4 py-2.5 flex items-center justify-between gap-4">
        {/* 모든 정보를 한 줄로 압축 */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar whitespace-nowrap w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[7px] md:text-[9px] bg-brutal-black text-acid-green px-1.5 py-0.5 rounded-sm">V2.5</span>
            <span className="font-black text-[9px] md:text-xs tracking-tighter uppercase italic">DANHOBAK DECIDER</span>
          </div>
          
          <div className="h-3 w-[1px] bg-gray-300 hidden sm:block"></div>
          
          <div className="flex gap-4 items-center">
            <a href="#" className="font-bold text-[9px] md:text-xs hover:text-hot-pink transition-colors">TERMS</a>
            <a href="#" className="font-bold text-[9px] md:text-xs hover:text-electric-blue transition-colors">PRIVACY</a>
            <span className="font-medium text-[8px] md:text-[10px] text-gray-400">© 2024</span>
          </div>
          
          <div className="hidden md:flex gap-1">
            <div className="w-2 h-2 rounded-full bg-acid-green border border-black"></div>
            <div className="w-2 h-2 rounded-full bg-hot-pink border border-black"></div>
            <div className="w-2 h-2 rounded-full bg-electric-blue border border-black"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

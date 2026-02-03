
import React, { useEffect, useState } from 'react';

interface ResultsModalProps {
  winner: string;
  onClose: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ winner, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  
  const emojis = ['🎃', '🔥', '✨', '💎', '🎰', '💖', '🚀', '🤑', '🌈'];
  const confettiCount = 20;

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* 배경 스트로브 및 블러 */}
      <div className="absolute inset-0 bg-brutal-black/60 backdrop-blur-xl animate-strobe opacity-30" onClick={onClose}></div>
      
      {/* 스캔라인 효과 */}
      <div className="absolute inset-0 scanlines opacity-30"></div>

      {/* 쏟아지는 이모지 컨페티 */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: confettiCount }).map((_, i) => (
          <div 
            key={i}
            className="absolute animate-confetti-fall text-4xl"
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {emojis[i % emojis.length]}
          </div>
        ))}
      </div>

      {/* 메인 카드 */}
      <div className={`
        relative bg-white border-[10px] border-brutal-black p-1 md:p-2 rounded-[40px] shadow-brutal-xl max-w-2xl w-full
        transition-all duration-500 transform
        ${showContent ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-12 opacity-0'}
      `}>
        <div className="bg-[#f0f0f0] border-4 border-brutal-black rounded-[30px] p-8 md:p-12 relative overflow-hidden">
          {/* 장식용 텍스트 배너 */}
          <div className="absolute top-0 left-0 w-full bg-brutal-black text-acid-green py-2 overflow-hidden whitespace-nowrap">
            <div className="animate-[scroll_10s_linear_infinite] inline-block font-pixel text-[10px] uppercase">
              JACKPOT! • YOU GOT LUCKY! • BEST CHOICE! • NO REGRETS! • DANHOBAK POWER! • JACKPOT! • 
            </div>
          </div>

          <div className="mt-8 text-center relative z-10">
            <div className="inline-block relative">
               <span className="absolute inset-0 translate-x-1 translate-y-1 text-electric-blue font-pixel text-xl md:text-2xl blur-[1px]">당첨! 당첨! 당첨!</span>
               <h2 className="relative font-pixel text-hot-pink text-xl md:text-2xl mb-12 drop-shadow-brutal">
                 오늘의 운명은?
               </h2>
            </div>
            
            <div className="relative mb-14 group">
              {/* 당첨 단어 글리치 및 강조 */}
              <div className="text-7xl md:text-9xl font-black uppercase italic leading-none animate-glitch text-brutal-black tracking-tighter">
                {winner}
              </div>
              <div className="absolute -top-10 -right-4 md:-right-10 text-6xl animate-bounce">🤟</div>
              <div className="absolute -bottom-10 -left-4 md:-left-10 text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🔥</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={onClose}
                className="group relative bg-acid-green text-brutal-black px-12 py-5 rounded-2xl font-black text-2xl hover:bg-brutal-black hover:text-acid-green transition-all shadow-brutal active:translate-y-2 active:shadow-none w-full sm:w-auto"
              >
                <span className="relative z-10">한 번 더!</span>
                <div className="absolute inset-0 bg-hot-pink scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 -z-0"></div>
              </button>
              
              <button 
                className="bg-electric-blue text-brutal-black px-8 py-5 rounded-2xl font-bold text-lg border-4 border-brutal-black hover:bg-white transition-all shadow-brutal active:translate-y-2 active:shadow-none w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">share</span>
                인증하기
              </button>
            </div>
            
            <p className="mt-8 font-doodle text-gray-500 font-bold italic">
              *결과에 불복 시 호박이 됨 (진짜임)
            </p>
          </div>

          {/* 데코레이션 폼 */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-hot-pink border-4 border-brutal-black rounded-full mix-blend-multiply animate-pulse"></div>
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-electric-blue border-4 border-brutal-black rotate-45 animate-bounce"></div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ResultsModal;


import React from 'react';

interface SlotMachineBaseProps {
  children: React.ReactNode;
  isSpinning: boolean;
}

const SlotMachineBase: React.FC<SlotMachineBaseProps> = ({ children, isSpinning }) => {
  return (
    <div className={`relative w-full transition-all duration-300 ${isSpinning ? 'scale-[0.99] translate-y-1' : 'scale-100'}`}>
      {/* 바닥 그림자 레이어 */}
      <div className="absolute inset-0 bg-brutal-black translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 rounded-[32px] -z-10 opacity-20"></div>
      <div className="absolute inset-0 bg-brutal-black translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 rounded-[32px] -z-10"></div>
      
      {/* 메인 프레임 */}
      <div className="relative z-10 bg-white border-[6px] md:border-[10px] border-brutal-black p-4 md:p-8 rounded-[32px] overflow-hidden">
        {/* 상단 장식 헤더 */}
        <div className="absolute top-0 left-0 w-full h-3 md:h-4 bg-acid-green border-b-[4px] border-brutal-black"></div>
        <div className="absolute top-0 right-12 md:right-20 w-12 md:w-16 h-8 md:h-10 bg-hot-pink border-b-[4px] border-x-[4px] border-brutal-black flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
        
        {/* 내부 콘텐츠 (SlotWindow) */}
        <div className="relative z-10 mt-4 md:mt-6">
          {children}
        </div>
        
        {/* 하단 데코레이션 벤트 */}
        <div className="mt-6 md:mt-8 flex justify-center gap-2 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 md:w-12 h-1 bg-brutal-black rounded-full"></div>
          ))}
        </div>
      </div>

      {/* 측면 버튼 장식 */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        <div className="w-6 h-6 bg-hot-pink border-4 border-brutal-black rounded-full"></div>
        <div className="w-6 h-6 bg-electric-blue border-4 border-brutal-black rounded-full"></div>
      </div>
    </div>
  );
};

export default SlotMachineBase;


import React, { useState, useRef, useEffect } from 'react';

interface LeverProps {
  onPull: () => void;
  isSpinning: boolean;
}

const Lever: React.FC<LeverProps> = ({ onPull, isSpinning }) => {
  const [pullProgress, setPullProgress] = useState(0); // 0 (정지) ~ 1 (최대 당김)
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const startProgressRef = useRef(0);
  
  // 물리적 작동 범위
  const dragRange = 180; 
  const triggerPoint = 0.8; 

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSpinning) return;
    setIsDragging(true);
    startYRef.current = e.clientY;
    startProgressRef.current = pullProgress;
    // 드래그 중 영역 이탈 방지
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - startYRef.current;
    const newProgress = Math.max(0, Math.min(1, startProgressRef.current + (deltaY / dragRange)));
    setPullProgress(newProgress);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (pullProgress >= triggerPoint) {
      onPull();
      setPullProgress(0);
    } else {
      setPullProgress(0);
    }
  };

  useEffect(() => {
    if (isSpinning) {
      setPullProgress(0);
    }
  }, [isSpinning]);

  // 애니메이션: 드래그 시 즉시 반응, 뗐을 때 물리적인 복원력(Spring) 구현
  const transitionStyle = isDragging 
    ? 'none' 
    : 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  // 3D 수치 계산
  const maxTilt = 110; // 앞으로 최대 110도 회전
  const currentTilt = pullProgress * maxTilt;
  const scaleEffect = 1 + (pullProgress * 0.2); // 앞으로 다가올 때 시각적으로 커짐
  const shadowOpacity = 0.2 + (pullProgress * 0.4); // 내려올수록 그림자 진해짐

  return (
    <div className="relative w-20 md:w-28 h-[300px] md:h-[380px] flex flex-col items-center select-none group touch-none perspective-[1200px]">
      
      {/* 1. 고정 피벗 소켓 (Pivot Socket) - 기계 본체 고정부 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 md:w-24 h-16 md:h-24 z-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-gray-600 via-gray-800 to-black border-[4px] border-brutal-black rounded-2xl shadow-brutal-lg flex items-center justify-center overflow-hidden">
          {/* 내부 기계 장치 디테일 */}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-brutal-black bg-gray-950 flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-600 rounded-full border-2 border-black animate-pulse"></div>
          </div>
          {/* 소켓 내부 그림자 가이드 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </div>

      {/* 2. 회전하는 레버 유닛 (Lever Unit) - 소켓보다 앞에 위치(z-50) */}
      <div 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ 
          transform: `rotateX(-${currentTilt}deg) scale(${scaleEffect})`,
          transformOrigin: 'center bottom',
          transition: transitionStyle,
          bottom: '40px', // 회전 중심점을 소켓 중앙에 일치
        }}
        className="absolute w-full h-[220px] md:h-[280px] flex flex-col items-center cursor-grab active:cursor-grabbing z-50 transform-gpu"
      >
        {/* 손잡이 볼 (Handle Ball) */}
        <div className={`
          relative w-16 md:w-24 h-16 md:h-24 rounded-full border-[5px] border-brutal-black flex items-center justify-center
          bg-gradient-to-br from-red-500 via-red-600 to-red-950 shadow-brutal-lg transition-transform
          ${isDragging ? 'brightness-125' : 'group-hover:scale-105'}
        `}>
          {/* 입체적 하이라이트 */}
          <div className="absolute top-3 left-5 w-1/3 h-1/3 bg-white/40 rounded-full blur-[3px] pointer-events-none"></div>
          <span className="text-4xl md:text-6xl filter drop-shadow-xl transform rotate-[10deg] select-none">🎰</span>
        </div>

        {/* 레버 암 (Arm) */}
        <div className="w-7 md:w-10 flex-grow bg-gradient-to-r from-gray-400 via-gray-100 to-gray-600 border-x-[5px] border-brutal-black relative shadow-2xl">
          {/* 금속 반사 및 마찰 흔적 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-around py-10 opacity-30">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="w-full h-1 bg-black"></div>
             ))}
          </div>
        </div>
        
        {/* 레버 하단 가림판 - 회전축과 자연스럽게 연결 */}
        <div className="w-12 md:w-16 h-4 bg-gray-800 border-x-4 border-brutal-black rounded-b-lg"></div>
      </div>

      {/* 3. 물리적 그림자 (바닥면에 비치는 레버 그림자) */}
      <div 
        style={{ 
          opacity: shadowOpacity,
          transform: `scaleX(${1 + pullProgress}) translateY(${pullProgress * 40}px) rotateX(60deg)`,
        }}
        className="absolute bottom-0 w-12 md:w-16 h-8 bg-black rounded-full blur-xl -z-10 transition-all duration-300"
      ></div>

      {/* 안내 텍스트 */}
      {!isSpinning && !isDragging && pullProgress === 0 && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-hot-pink text-white border-[3px] border-brutal-black px-5 py-2 rounded-full shadow-brutal z-[60] animate-bounce pointer-events-none">
          <p className="font-pixel text-[8px] md:text-[10px] whitespace-nowrap uppercase tracking-widest">Pull Me Down!</p>
        </div>
      )}
    </div>
  );
};

export default Lever;

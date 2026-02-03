
import React, { useState, useEffect, useMemo, useRef } from 'react';

interface SlotWindowProps {
  options: string[];
  isSpinning: boolean;
  result: string | null;
  onOptionChange: (index: number, value: string) => void;
  allowRepeats: boolean;
  onToggleRepeats: () => void;
}

const Reel: React.FC<{ 
  items: string[], 
  isSpinning: boolean, 
  targetItem: string | null,
  delay: number,
  initialValue: string
}> = ({ items, isSpinning, targetItem, delay, initialValue }) => {
  const [offset, setOffset] = useState(0);
  const [isStopping, setIsStopping] = useState(false);
  const [localSpinning, setLocalSpinning] = useState(false);
  const requestRef = useRef<number>(null);
  const currentOffsetRef = useRef(0);
  const [itemHeight, setItemHeight] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      setItemHeight(window.innerWidth >= 768 ? 140 : 120);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayItems = useMemo(() => {
    const validItems = items.length > 0 ? items : [initialValue || '???'];
    const finalItems = [...validItems];
    if (initialValue && !finalItems.includes(initialValue)) {
      finalItems.unshift(initialValue);
    }
    return finalItems;
  }, [items, initialValue]);

  const fullList = useMemo(() => {
    let list: string[] = [];
    for (let i = 0; i < 40; i++) {
      list = [...list, ...displayItems];
    }
    return list;
  }, [displayItems]);

  const animate = () => {
    currentOffsetRef.current -= 60;
    const oneSetHeight = displayItems.length * itemHeight;
    if (currentOffsetRef.current <= -oneSetHeight) {
      currentOffsetRef.current += oneSetHeight;
    }
    setOffset(currentOffsetRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isSpinning) {
      setIsStopping(false);
      setLocalSpinning(true);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (targetItem) {
        const stopTimer = setTimeout(() => {
          if (requestRef.current) cancelAnimationFrame(requestRef.current);
          setIsStopping(true);
          setLocalSpinning(false);
          const targetIndex = displayItems.indexOf(targetItem);
          const safeTargetIndex = targetIndex >= 0 ? targetIndex : 0;
          const stopSet = Math.abs(Math.floor(currentOffsetRef.current / (displayItems.length * itemHeight))) + 3; 
          const finalPosition = -( (stopSet * displayItems.length + safeTargetIndex) * itemHeight );
          currentOffsetRef.current = finalPosition;
          setOffset(finalPosition);
        }, delay);
        return () => clearTimeout(stopTimer);
      } else {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        const selfIndex = displayItems.indexOf(initialValue);
        const startPos = selfIndex >= 0 ? -(selfIndex * itemHeight) : 0;
        currentOffsetRef.current = startPos;
        setOffset(startPos);
        setIsStopping(false);
        setLocalSpinning(false);
      }
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isSpinning, targetItem, displayItems, delay, itemHeight, initialValue]);

  return (
    <div 
      className="relative bg-white overflow-hidden border-b-[3px] border-brutal-black"
      style={{ height: `${itemHeight}px` }}
    >
      <div className="absolute inset-0 checkers opacity-10"></div>
      <div 
        className={`reel-strip absolute top-0 left-0 w-full flex flex-col ${isStopping ? 'bounce-stop' : ''} ${localSpinning ? 'blur-[4px]' : ''}`}
        style={{ transform: `translateY(${offset}px)`, transitionProperty: isStopping ? 'transform' : 'none' }}
      >
        {fullList.map((item, idx) => (
          <div 
            key={idx} 
            style={{ height: `${itemHeight}px` }}
            className="flex items-center justify-center shrink-0 w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic text-brutal-black tracking-tighter whitespace-nowrap px-2 text-center select-none"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/15 pointer-events-none z-10"></div>
    </div>
  );
};

const SlotWindow: React.FC<SlotWindowProps> = ({ options, isSpinning, result, onOptionChange, allowRepeats, onToggleRepeats }) => {
  const pool = useMemo(() => {
    const valid = options.filter(o => o.trim() !== "");
    return valid.length > 0 ? valid : ['?'];
  }, [options]);

  return (
    <div className={`relative w-full max-w-xl bg-white border-[5px] border-brutal-black rounded-[24px] shadow-brutal-lg overflow-hidden ${isSpinning ? 'animate-shake-mini' : ''}`}>
      {/* 상단 캡 (기계 상단부) */}
      <div className="bg-brutal-black p-3 flex justify-between items-center border-b-[3px] border-brutal-black">
        <div className="flex gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full border border-white/20 ${isSpinning ? 'bg-acid-green animate-pulse' : 'bg-red-500'}`}></div>
          <div className="w-2.5 h-2.5 rounded-full border border-white/20 bg-gray-700"></div>
        </div>
        <div className="font-pixel text-[8px] text-white tracking-widest flex gap-4">
          <span className="opacity-50">SYNC_OK</span>
          <span className={isSpinning ? 'text-hot-pink animate-pulse' : 'text-acid-green'}>READY</span>
        </div>
      </div>

      {/* 슬롯 릴 영역 */}
      <div className="grid grid-cols-3 bg-gray-200 border-b-[3px] border-brutal-black p-2 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col bg-white border-[3px] border-brutal-black shadow-brutal">
            <Reel items={pool} isSpinning={isSpinning} targetItem={result} delay={i * 150} initialValue={options[i]} />
          </div>
        ))}
      </div>

      {/* 하단 입력 및 제어부 (머신 베이스 통합) */}
      <div className="bg-off-white p-3 md:p-4 border-t-[3px] border-brutal-black">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[0, 1, 2].map((i) => (
            <input 
              key={i}
              className="w-full bg-white border-2 border-brutal-black text-brutal-black font-black text-xs md:text-base px-1 py-2 focus:outline-none text-center italic shadow-[2px_2px_0px_#000] focus:shadow-none focus:translate-x-[1px] focus:translate-y-[1px] disabled:opacity-50 transition-all"
              placeholder={`항목 ${i+1}`}
              value={options[i] || ''}
              onChange={(e) => onOptionChange(i, e.target.value)}
              disabled={isSpinning}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
             <button 
               onClick={onToggleRepeats}
               className={`w-10 h-5 rounded-full border-2 border-brutal-black relative transition-colors ${allowRepeats ? 'bg-acid-green' : 'bg-gray-300'}`}
             >
               <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white border border-black transition-transform ${allowRepeats ? 'translate-x-5' : 'translate-x-0'}`}></div>
             </button>
             <span className="font-bold text-[9px] uppercase tracking-tighter">Repeat</span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => [0,1,2].forEach(idx => onOptionChange(idx, ''))}
              className="px-3 py-1 bg-white border-2 border-brutal-black font-pixel text-[8px] hover:bg-hot-pink hover:text-white shadow-brutal active:shadow-none active:translate-y-1 transition-all"
            >
              RESET
            </button>
            <button className="px-4 py-1 bg-brutal-black text-white font-pixel text-[8px] shadow-brutal hover:bg-acid-green hover:text-black active:shadow-none active:translate-y-1 transition-all">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotWindow;
